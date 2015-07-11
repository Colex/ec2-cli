var aws = require("aws-sdk");
var Promise = require("bluebird");
var Ec2Instance = require("./ec2instance");

function EC2(region) {
    this.ec2 = new aws.EC2({ region: region });
}

EC2.prototype.instances = function() {
  var self = this;
  return new Promise(function(resolve, reject) {
    self.ec2.describeInstances(function(err, list) {
      if (err) reject(err);
      else resolve(EC2.extractInstances(list));
    })
  });
};

EC2.extractInstances = function(list) {
  var reservation, reservations = list.Reservations;
  var instances = [];
  var i, j, k;
  for (var i = 0; i < reservations.length; i++) {
    reservation = reservations[i];
    for (var j = 0; j < reservation.Instances.length; j++) {
      if (reservation.Instances[j].State.Code === 16)  
        instances.push(new Ec2Instance(reservation.Instances[j]));
    }
  }
  return instances;
};

module.exports = EC2;
