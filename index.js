var cli = require("./lib/cli");

var options = process.argv;
options = options.splice(1);

if (options[1] === "ssh") {
  cli.ssh(options);
} else {
  console.log("Usage: ec2 [command] [options]");
  console.log("\nCommands:");
  console.log(" ssh         Choose which instance to connect using SSH");
  console.log("\nOptions:");
  console.log(" --help, -h  See more options for each command");
  console.log("\nMore information available at: https://github.com/Colex/ec2-cli/");
}
