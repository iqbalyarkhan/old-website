---
date: 2022-01-06
draft: false
thumbnail: /post-images/cloud-formation.png
title: AWS - CloudFormation
extract: Notes for AWS CloudFormation
categories:
    - AWS
tags:
    - blog
    - AWS
--- 


### Table of Contents

- [What is CloudFormation?](#what-is-cloudformation)
  - [Templates](#templates)
  - [Stacks](#stacks)
  - [Change Sets](#change-sets)
  - [Dynamic Values](#dynamic-values)
  - [Properties](#properties)
- [Elastic BeanStalk](#elastic-beanstalk)


## What is [CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)?

AWS CloudFormation is a service that helps you model and set up your AWS resources so that you can spend less time managing those resources and more time focusing on your applications that run in AWS. You create a template that describes all the AWS resources that you want (like Amazon EC2 instances or Amazon RDS DB instances), and CloudFormation takes care of provisioning and configuring those resources for you. You don't need to individually create and configure AWS resources and figure out what's dependent on what; CloudFormation handles that.

When you use AWS CloudFormation, you work with templates and stacks. You create templates to describe your AWS resources and their properties. Whenever you create a stack, CloudFormation provisions the resources that are described in your template.


### Templates

A CloudFormation template is a JSON or YAML formatted text file. You can save these files with any extension, such as .json, .yaml, .template, or .txt. CloudFormation uses these templates as blueprints for building your AWS resources. In the template, you declare the AWS resources you want to create and configure. You declare an object as a name-value pair or a pairing of a name with a set of child objects enclosed. The syntax depends on the format you use.

Let's take a look at a basic template. The following template declares a single resource of type AWS::S3::Bucket: with the name HelloBucket.

```json
{
    "Resources" : {
        "HelloBucket" : {
            "Type" : "AWS::S3::Bucket"
        }
    }
}
```

If you use this template to create a stack, AWS CloudFormation will create an Amazon S3 bucket. Creating a bucket is simple, because CloudFormation can create a bucket with default settings. For other resources, such as an Amazon EC2 Auto Scaling group or EC2 instance, CloudFormation requires more information. Resource declarations use a Properties attribute to specify the information used to create a resource.

Depending on the resource type, some properties are required, such as the ImageId property for an AWS::EC2::Instance resource, and others are optional. Some properties have default values, such as the AccessControl property of the AWS::S3::Bucket resource, so specifying a value for those properties is optional. Other properties aren't required but may add functionality that you want, such as the WebsiteConfiguration property of the AWS::S3::Bucket resource. Specifying a value for such properties is entirely optional and based on your needs. In the example above, because the AWS::S3::Bucket resource has only optional properties and we didn't need any of the optional features, we could accept the defaults and omit the Properties attribute.

Usually, a property for a resource is simply a string value. For example, the following template specifies a canned ACL (PublicRead) for the AccessControl property of the bucket.

```json
{
    "Resources" : {
        "HelloBucket" : {
            "Type" : "AWS::S3::Bucket",
            "Properties" : {
               "AccessControl" : "PublicRead"               
            }
        }
    }
}
```

Let's look at another example. If you created a stack with the following template, CloudFormation provisions an instance with an ami-0ff8a91507f77f867 AMI ID, t2.micro instance type, testkey key pair name, and an Amazon EBS volume.

```json
{
  "AWSTemplateFormatVersion" : "2010-09-09",
  "Description" : "A sample template",
  "Resources" : {
    "MyEC2Instance" : {
      "Type" : "AWS::EC2::Instance",
      "Properties" : {
        "ImageId" : "ami-0ff8a91507f77f867",
        "InstanceType" : "t2.micro",
        "KeyName" : "testkey",
        "BlockDeviceMappings" : [
          {
            "DeviceName" : "/dev/sdm",
            "Ebs" : {
              "VolumeType" : "io1",
              "Iops" : 200,
              "DeleteOnTermination" : false,
              "VolumeSize" : 20
            }
          }
        ]
      }
    }
  }
}
```
One of the greatest benefits of templates and CloudFormation is the ability to create a set of resources that work together to create an application or solution. The name used for a resource within the template is a logical name. When CloudFormation creates the resource, it generates a physical name that's based on the combination of the logical name, the stack name, and a unique ID.

You're probably wondering how you set properties on one resource based on the name or property of another resource. For example, you can create a CloudFront distribution backed by an S3 bucket or an EC2 instance that uses EC2 security groups, and all of these resources can be created in the same template. CloudFormation has a number of intrinsic functions that you can use to refer to other resources and their properties. You can use the Ref function to refer to an identifying property of a resource. Frequently, this is the physical name of the resource; however, sometimes it can be an identifier, such as the IP address for an AWS::EC2::EIP resource or an Amazon Resource Name (ARN) for an Amazon SNS topic.

The following template contains an AWS::EC2::Instance resource. The resource's SecurityGroups property calls the Ref function to refer to the AWS::EC2::SecurityGroup resource InstanceSecurityGroup.

```json
{
    "Resources": {
        "Ec2Instance": {
            "Type": "AWS::EC2::Instance",
            "Properties": {
                "SecurityGroups": [
                    {
                        "Ref": "InstanceSecurityGroup"
                    }
                ],
                "KeyName": "mykey",
                "ImageId": ""
            }
        },
        "InstanceSecurityGroup": {
            "Type": "AWS::EC2::SecurityGroup",
            "Properties": {
                "GroupDescription": "Enable SSH",
                "SecurityGroupIngress": [
                    {
                        "IpProtocol": "tcp",
                        "FromPort": 22,
                        "ToPort": 22,
                        "CidrIp": "0.0.0.0/0"
                    }
                ]
            }
        }
    }
}
```

### Stacks

When you use CloudFormation, you manage related resources as a single unit called a stack. You create, update, and delete a collection of resources by creating, updating, and deleting stacks. All the resources in a stack are defined by the stack's CloudFormation template. Suppose you created a template that includes an Auto Scaling group, Elastic Load Balancing load balancer, and an Amazon Relational Database Service (Amazon RDS) database instance. To create those resources, you create a stack by submitting the template that you created, and CloudFormation provisions all those resources for you. 

### Change Sets

If you need to make changes to the running resources in a stack, you update the stack. Before making changes to your resources, you can generate a change set, which is a summary of your proposed changes. Change sets allow you to see how your changes might impact your running resources, especially for critical resources, before implementing them.

For example, if you change the name of an Amazon RDS database instance, CloudFormation will create a new database and delete the old one. You will lose the data in the old database unless you've already backed it up. If you generate a change set, you will see that your change will cause your database to be replaced, and you will be able to plan accordingly before you update your stack.

### Dynamic Values

You can also have dynamic parameters in your template. These could be provided by user as they're deploying the template.You can use parameters to ask users for input. You can also create mappings that allow you to choose values from a list of possible values based on conditions.

### Properties

CloudFormation is perfect for creating immutable architecture. When you create resources using CF, you can easily pick that template up and run it anywhere you want.

## Elastic BeanStalk

BeanStalk allows you to create your platform and deploy it and allow AWS to manage the entire process for you. To do so, BeanStalk creates and manages standard EC2 architecture behind the scenes for you!