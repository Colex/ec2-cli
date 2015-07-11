var Navigator = require("./navigator");
var EC2 = require("./ec2");
var program = require('commander').version("1.0.0");

function formatInstance(instance) {
  var name = instance.name ? " ("+instance.name+")" : "";
  return instance.id + name;
}

function filterInstancesByName(list, name) {
  var filtered = [], regex = new RegExp(name, "ig");
  for (var i = 0; i < list.length; i++) {
    if (list[i].name && list[i].name.match(regex))
      filtered.push(list[i]);
  }
  return filtered;
}

module.exports.ssh = function(options) {
  var region, ec2;

  program
    .option("-n, --name [name]", "Filter instances by matching the given name", null)
    .option("-i, --identity [file]", "SSH identity file (Default: ~/.ssh/[key].pem)", null)
    .option("-u, --user [username]", "User to be used on ssh (Default: ec2-user)", "ec2-user")
    .option("-r, --region [username]", "User to be used on ssh (Default: ec2-user)", null)
    .parse(options);

  function sshInstance(instance) {
    var identity = program.identity || process.env.HOME+"/.ssh/"+instance.keyName+".pem";
    var spawn = require('child_process').spawn;
    var prc;

    console.log("Connecting to "+instance.name+"... (ssh -i "+identity+" "+program.user+"@"+instance.publicIp+")")
    sshPrc = spawn("ssh", ["-i", identity, program.user+"@"+instance.publicIp], {stdio: 'inherit'});

    sshPrc.on('exit', function (code) { console.log('Disconnecting EC2-CLI...'); });
  }

  region = program.region || process.env.AWS_REGION || "eu-west-1";
  ec2 = new EC2(region);

  ec2.instances().then(function(list) {
    var filteredList = program.name ? filterInstancesByName(list, program.name) : list;
    if (filteredList.length > 0) {
      var navigator = new Navigator(filteredList, formatInstance, sshInstance);
      navigator.show(0, 10, true);
    } else {
      console.log("No instances found...")
    }
  });
}
