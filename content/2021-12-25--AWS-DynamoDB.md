---
date: 2021-12-25
draft: false
thumbnail: /post-images/dynamo-db.png
title: AWS - DynamoDB
extract: Notes for DynamoDB
categories:
    - AWS
tags:
    - blog
    - AWS
--- 


### Table of Contents

- [What is DynamoDB?](#what-is-dynamodb)
- [Features](#features)
- [DynamoDB Transactions](#dynamodb-transactions)
- [DynamoDB On-Demand Backup and Restore](#dynamodb-on-demand-backup-and-restore)
- [Point in time recovery](#point-in-time-recovery)
- [DynamoDB Streams](#dynamodb-streams)
- [DynamoDB Global Tables](#dynamodb-global-tables)




## What is [DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Introduction.html)?
Amazon DynamoDB is a fully managed NoSQL database service that provides fast and predictable performance with seamless scalability. DynamoDB lets you offload the administrative burdens of operating and scaling a distributed database so that you don't have to worry about hardware provisioning, setup and configuration, replication, software patching, or cluster scaling. DynamoDB also offers encryption at rest, which eliminates the operational burden and complexity involved in protecting sensitive data.

DynamoDB automatically spreads the data and traffic for your tables over a sufficient number of servers to handle your throughput and storage requirements, while maintaining consistent and fast performance. All of your data is stored on solid-state disks (SSDs) and is automatically replicated across multiple Availability Zones in an AWS Region, providing built-in high availability and data durability. You can use global tables to keep DynamoDB tables in sync across AWS Regions. 

## Features

DynamoDB is:
- Stored on SSD storage
- Spread across 3 geographically distinct data centers
- Eventual consistent reads by default but can be changed to strongly consistent reads
- Comes with a fully managed caching service called DynamoDB Accelerator or DAX. Usually, when applications have a caching layer, caches are queried first to check if data resides in cache. If so, the result is returned, otherwise, the DB is queried. In the case of DAX, DAX sits between DB and application and updates itself based off a cache hit or miss.
- Uses encryption at rest using KMS
- Can connect using Direct Connect (DX)

## DynamoDB Transactions

DynamoDB transactions provide us with atomicity, consistency, isolation and durability (ACID) across 1 or more tables within a single AWS account and region. You can use transactions when building applications that require coordinated CRUD operations as part of a single business oepration. Examples include bank transactions, ticketing systems etc.

## DynamoDB On-Demand Backup and Restore

DynamoDB has the capabilty to perform on demand backup and restore operations. This allows you to perform full backups at any time with zero impact on performance or availability. Backups are consistent within seconds and retained until deleted. Backups operate within same region as the source table. 

## Point in time recovery

PITR protects against accidental writes or deletes and allow syou to restore to any point in the last 35 days. Backups are done incrementally. By default PITR is turned OFF. 

Here's a demo showing how to enable PITR and add items to your newly created DynamoDB table:

<!-- copy and paste. Modify height and width if desired. -->
<iframe class="embeddedObject shadow resizable" name="embedded_content" scrolling="no" frameborder="0" type="text/html" 
        style="overflow:hidden;" src="https://www.screencast.com/users/IqbalKhan8502/folders/Capture/media/cff63444-1109-485b-8d57-8d8362e07802/embed" height="762" width="1432" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

## DynamoDB Streams

DDB streams are time-ordered sequence of item-level changes in a table. These changes could be create, update or delete operations on the table. Data in the stream is stored for 24 hours. These streams can be combined with lambda functions for functionality like stored procedures. 

## DynamoDB Global Tables

Global tables are managed, multi-master, multi-region replicated tables that are used for globally distributed applications. Global tables are enabled via DynamoDB streams. Therefore, to enable global tables, you need dynamo db streams. Global tables allow you to have multi-region redundancy for disaster recovery and also result in high availability. 

Let's check out a demo where we:

- create a table in us-east-1
- add items to our table
- check to see if the table exists in us-west-1
- enable global tables (will ask us to enable dynamodb streams)
- add us-west-1
- create replica in the correct region
  
  <!-- copy and paste. Modify height and width if desired. -->
<iframe class="embeddedObject shadow resizable" name="embedded_content" scrolling="no" frameborder="0" type="text/html" 
        style="overflow:hidden;" src="https://www.screencast.com/users/IqbalKhan8502/folders/Capture/media/b3ff9c3e-2908-4e6b-9c3b-ec59c5ff07ec/embed" height="758" width="1434" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

