function Ec2Instance(instanceData) {
  this.id = instanceData.InstanceId;
  this.name = Ec2Instance.extractName(instanceData);
  this.publicIp = instanceData.PublicIpAddress || null;
  this.keyName = instanceData.KeyName;
}

Ec2Instance.extractName = function(instaceData) {
  for (var i = 0; i < instaceData.Tags.length; i++)
    if (instaceData.Tags[i].Key === 'Name')
      return instaceData.Tags[i].Value;
  return null;
};

module.exports = Ec2Instance;
