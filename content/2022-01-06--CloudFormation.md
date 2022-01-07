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


## What is [CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html)?

AWS CloudFormation is a service that helps you model and set up your AWS resources so that you can spend less time managing those resources and more time focusing on your applications that run in AWS. You create a template that describes all the AWS resources that you want (like Amazon EC2 instances or Amazon RDS DB instances), and CloudFormation takes care of provisioning and configuring those resources for you. You don't need to individually create and configure AWS resources and figure out what's dependent on what; CloudFormation handles that.

When you use AWS CloudFormation, you work with templates and stacks. You create templates to describe your AWS resources and their properties. Whenever you create a stack, CloudFormation provisions the resources that are described in your template.


### Templates

A CloudFormation template is a JSON or YAML formatted text file. You can save these files with any extension, such as .json, .yaml, .template, or .txt. CloudFormation uses these templates as blueprints for building your AWS resources. 

For example, if you created a stack with the following template, CloudFormation provisions an instance with an ami-0ff8a91507f77f867 AMI ID, t2.micro instance type, testkey key pair name, and an Amazon EBS volume.

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

You can also specify multiple resources in a single template and configure these resources to work together. For example, you can modify the previous template to include an Elastic IP address (EIP) and associate it with the Amazon EC2 instance, as shown in the following example:

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
      },
      "MyEIP" : {
        "Type" : "AWS::EC2::EIP",
        "Properties" : {
          "InstanceId" : {"Ref": "MyEC2Instance"}
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

You can also have dynamic parameters in your template. These could be provided by user as they're deploying the template.