---
date: 2022-01-06
draft: false
thumbnail: /post-images/security.png
title: AWS - Security
extract: Notes for AWS Security
categories:
    - AWS
tags:
    - blog
    - AWS
--- 


### Table of Contents

- [What is CloudTrail?](#what-is-cloudtrail)
- [AWS Shield](#aws-shield)
- [AWS WAF](#aws-waf)

## What is [CloudTrail](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html)?

AWS CloudTrail is an AWS service that helps you enable governance, compliance, and operational and risk auditing of your AWS account. Actions taken by a user, role, or an AWS service are recorded as events in CloudTrail. Events include actions taken in the AWS Management Console, AWS Command Line Interface, and AWS SDKs and APIs.

CloudTrail is enabled on your AWS account when you create it. When activity occurs in your AWS account, that activity is recorded in a CloudTrail event. You can easily view recent events in the CloudTrail console by going to Event history. For an ongoing record of activity and events in your AWS account, create a trail. 

CloudTrail allows you to identify which users and account made API calls to AWS services, what the source IP address was and when the calls occurred. CloudTrail, however, cannot track RDP or SSH calls

## AWS Shield

AWS Shield can be used to protect users on ELB, CloudFront and Route53 against SYN/UDP floods, reflection attacks and other layer 3 and 4 attacks.

## AWS WAF

AWS Web Application Firewall, or WAF, allows you to monitor HTTP and HTTPS requests that are forwarded to CloudFront or LoadBalancer. It also lets you control access to your content. You can configure various conditions such as what IP addresses are allowed to make requests or what query string parameters need to be passed for the request to be allowed. WAF operates at Layer7.
