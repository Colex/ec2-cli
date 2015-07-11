EC2 CLI
===============

**EC2 Command Line Interface** provides an easy and quick way to connect into your AWS instances.

```shell
$ ec2 ssh -n dashboard
```
It automatically finds all instances in your account that match the given name and list them for you, so you can easily navigate and choose which one to connect to.


## Installation
```shell
$ npm install -g ec2-cli
```

## Setup
EC2-CLI uses aws-sdk, so it will automatically use the keys you have setup in your computer to query your list of instances.
```shell
export AWS_SECRET_ACCESS_KEY=IkwsDF41wER2vd/DDDWdxzAqWE4r5cb7xFeiI0
export AWS_ACCESS_KEY_ID=AKIAIWE5Y789GJNAQQWE
```
You may also define what is your **default region** by setting the environment variable `AWS_REGION`.
```shell
export AWS_REGION=eu-west-1
```

## Usage

### Connect
EC2-CLI is meant to be very simple to use. Call `ec2 ssh` and get a list of all your instances.
```shell
$ ec2 ssh
0) i-08d561f1 (email-service)
1) i-28a5c38d (webserver)
2) i-e6dc4d03 (webserver)
3) i-2a1e27dd (dashboard)
4) i-81ach562 (spark-slave)
5) i-27godf99 (spark-slave)
6) i-111111bb (spark-master)
7) i-23abce23 (mongodb)
8) i-41ab2mc2 (mysql)
9) i-4924cma1 (cache-server)
Use the arrows to navigate up and down or ESC to exit
Select a row [0-9]:
```
Then choose which instance you want to connect to.

### Filter
If you are dealing with hundreds of instances, this list can be overwhelming. Therefore, you may use the option `ec2 ssh --name [regex]` to filter the instances.
```shell
$ ec2 ssh -n spark
1) i-81ach562 (spark-slave)
2) i-27godf99 (spark-slave)
3) i-111111bb (spark-master)
Use the arrows to navigate up and down or ESC to exit
Select a row [0-9]:
```

### Identity File (SSH Key)
By default, it will try to find the necessary pem key in your **~/.ssh** folder. But you can overwrite this behaviour by specifying which key you want to choose.
```shell
$ ec2 ssh -i dashboard-key.pem
```

### Specify Region
As said before, it will automatically use whatever region you have set up in your environment variable `AWS_REGION`. You can overwrite that behaviour by using `ec2 ssh --region` option.
```shell
$ AWS_REGION=eu-west-1 ec2 ssh
$ ec2 ssh --region eu-west-1
$ ec2 ssh -r eu-west-1
```

### Specify SSH User
By default, **ec2-cli** will attempt to connect to your instance using the user **ec2-user**, you can specify a different user using the option `ec2 ssh --user ubuntu`.
```ssh
$ ec2 ssh -u root
```

## Notes
This project was quickly built to help me on my day to day tasks. I've only added a few features and will be adding more as I need. In the meantime. Feel free to **fork** and **contribute** with improvements or let me know of any feature you think would help your productivity.
