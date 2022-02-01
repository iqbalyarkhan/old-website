---
date: 2021-12-29
draft: false
thumbnail: /post-images/aws-cloudwatch.png
title: AWS - CloudWatch & CloudTrail
extract: Notes for AWS CloudWatch & CloudTrail
categories:
    - AWS
tags:
    - blog
    - AWS
--- 


### Table of Contents

- [What is CloudWatch?](#what-is-cloudwatch)
- [Metrics](#metrics)
- [CW Logs](#cw-logs)
- [CloudTrail](#cloudtrail)
  - [Management Events](#management-events)
  - [Data Events](#data-events)
  - [Trail](#trail)



## What is [CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html)?
Amazon CloudWatch monitors your Amazon Web Services (AWS) resources and the applications you run on AWS in real time. You can use CloudWatch to collect and track metrics, which are variables you can measure for your resources and applications.

The CloudWatch home page automatically displays metrics about every AWS service you use. You can additionally create custom dashboards to display metrics about your custom applications, and display custom collections of metrics that you choose.

You can create alarms that watch metrics and send notifications or automatically make changes to the resources you are monitoring when a threshold is breached. For example, you can monitor the CPU usage and disk reads and writes of your Amazon EC2 instances and then use that data to determine whether you should launch additional instances to handle increased load. You can also use this data to stop under-used instances to save money.

With CloudWatch, you gain system-wide visibility into resource utilization, application performance, and operational health.

## Metrics

With AWS CW, you have 2 types of metrics:
- Default (those that are provided out of the box)
- Custom (configured by the user)

The standard reporting interval for metrics is 5 minutes whereas detailed is 1 minute. 

To allow your logs to flow into CW, you need to associate a role with an EC2 instance.

## CW Logs

CW Logs allow you to store, monitor and access logging data of services. CW logs have built-in integration with many AWS services such as EC2, lambda, CloudTrail etc. You can use IAM roles or service roles to allow logs to flow to CW. You can use a cloudwatch agent to transfer logs from outside services into cloudwatch.

CW logs are aggregated into **log streams** where a log stream is a sequence of CW logs from the same source. Log streams are distinguished by timestamps.

CW log streams are aggregated within **log groups** where each source of logs (DB, EC2 etc) has its own log group. Log groups have setting associated with them such as retention periods and permissions. You can then create metrics on top of these log groups and can create alarms using metrics. 

## CloudTrail

AWS CloudTrail is an AWS service that helps you enable governance, compliance, and operational and risk auditing of your AWS account. Actions taken by a user, role, or an AWS service are recorded as events in CloudTrail. A CloudTrail event is the record captured of any activity occurring in an AWS account. Activities include action taken by a service, role or user. Here're some more facts:

By default, 90 days of events are stored by CloudTrail. If you need to store data for more than 90 days, you need to create a trail. 

CloudTrail events can be of two types: **management** or **data** events.

### Management Events
Management events are **control plane** operations such as creating an EC2 instance, creating a VPC, stopping an EC2 instance, uploading an object to S3, lambda invocation etc. Management events are logged by default. 

### Data Events

Data events provide information about the resource operations performed on or in a resource. These are also known as data plane operations. Data events are often high-volume activities. The following data types are recorded: Amazon S3 object-level API activity (for example, GetObject, DeleteObject, and PutObject API operations) on buckets and objects in buckets, AWS Lambda function execution activity (the Invoke API) etc.

### Trail

A CT trail is a unit of config in CT which helps you to use a trail to to enable delivery of CT events to an S3 bucket, cloudwatch logs etc. A trail can be used to track a single region OR it can be used to track all regions. Global services( IAM, SS, CloudFront) will publish their logs to trails in us-east-1. These are called Global Service Events that will need to be enabled on a trail. 




