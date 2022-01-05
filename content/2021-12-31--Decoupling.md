---
date: 2021-12-31
draft: false
thumbnail: /post-images/decoupled.png
title: AWS - Decoupled Workflows
extract: Notes for decoupling workflows
categories:
    - AWS
tags:
    - blog
    - AWS
--- 


### Table of Contents

- [What is Coupling?](#what-is-coupling)
- [Loose Coupling](#loose-coupling)



## What is Coupling?

Coupling refers to how related or dependent components are on one another in an architecture. For example, a tightly coupled architecture would entail that if one of my component fails, my entire architecture fails. On the other hand, a loosely coupled architecture is one where a component is not dependent on other components. 

Tight coupling could occur when your architecture has just a single webserver that serves requests to a single backend server. Your user directly interacts with the single webserver. It is easy to see that if either one of the servers fails, our entire service fails. This is why, we want our architecture to be loosely coupled.

A good read [here](https://aws.amazon.com/blogs/architecture/building-a-scalable-document-pre-processing-pipeline/) and [here](https://docs.aws.amazon.com/prescriptive-guidance/latest/patterns/build-a-loosely-coupled-architecture-with-microservices-using-devops-practices-and-aws-cloud9.html) on a loosely coupled architecture.

## Loose Coupling

As discussed in the intro, we want our arch to be loosely coupled. To convert our single server example into a loosely coupled arch, we can place multiple EC2s behind an ELB to act as our webserver. We can then ask our webserver to interact with another ELB that sits in front of our multiple backend servers. With multiple servers and ELB, even if some of our frontend servers go out of service, our architecture won't fail. 

**YOU'D NEVER WANT A SINGLE SERVER TALKING TO ANOTHER SINGLE SERVER**. Best approach is to have a scalable, highly available service between multiple servers to process requests. In the example above, we used ELB as the service between fleets of EC2s. There're other services as well that can act as that intermediary.

In our example, ELB implies that our backend services have an open line of communication with our front-end. There might be use-cases where we wouldn't want that. We can have SQS that holds our messages and when the backend resources are ready, they can poll SQS for messages. If you want to push out notifications, you can use SNS. SNS allows you to take one notification and proactively deliver it to your customers.

To look at some of AWS services that allow loosely coupled architectures, check out blog posts on [SQS](/aws-sqs) and SNS.

