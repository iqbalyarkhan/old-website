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

