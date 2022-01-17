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
- [Read/Write Capacity Mode](#readwrite-capacity-mode)
- [On-Demand Mode](#on-demand-mode)
  - [Read Request Units and Write Request Units](#read-request-units-and-write-request-units)
- [Provisioned Mode](#provisioned-mode)
  - [Read Capacity Units and Write Capacity Units](#read-capacity-units-and-write-capacity-units)
- [Read Consistency](#read-consistency)
  - [Eventually Consistent Reads](#eventually-consistent-reads)
  - [Strongly Consistent Reads](#strongly-consistent-reads)
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
- Eventually consistent reads by default but can be changed to strongly consistent reads (more on this later)
- Comes with a fully managed caching service called DynamoDB Accelerator or DAX. Usually, when applications have a caching layer, caches are queried first to check if data resides in cache. If so, the result is returned, otherwise, the DB is queried. In the case of DAX, DAX sits between DB and application and updates itself based off a cache hit or miss.
- Uses encryption at rest using KMS
- Can connect using Direct Connect (DX)

## DynamoDB Transactions

DynamoDB transactions provide us with atomicity, consistency, isolation and durability (ACID) across 1 or more tables within a single AWS account and region. You can use transactions when building applications that require coordinated CRUD operations as part of a single business oepration. Examples include bank transactions, ticketing systems etc.

## Read/Write Capacity Mode
Amazon DynamoDB has two read/write capacity modes for processing reads and writes on your tables: on-demand and provisioned (default, free-tier eligible)

The read/write capacity mode controls how you are charged for read and write throughput and how you manage capacity. You can set the read/write capacity mode when creating a table or you can change it later. Secondary indexes inherit the read/write capacity mode from the base table. 

## On-Demand Mode

When you choose on-demand mode, DynamoDB instantly accommodates your workloads as they ramp up or down to any previously reached traffic level. If a workload’s traffic level hits a new peak, DynamoDB adapts rapidly to accommodate the workload. Tables that use on-demand mode deliver the same single-digit millisecond latency, service-level agreement (SLA) commitment, and security that DynamoDB already offers. You can choose on-demand for both new and existing tables and you can continue using the existing DynamoDB APIs without changing code.

On-demand mode is a good option if any of the following are true:

- You create new tables with unknown workloads.

- You have unpredictable application traffic.

- You prefer the ease of paying for only what you use.

### Read Request Units and Write Request Units

For on-demand mode tables, you don't need to specify how much read and write throughput you expect your application to perform. DynamoDB charges you for the reads and writes that your application performs on your tables in terms of read request units and write request units.

**One read request unit represents:**

- One strongly consistent read request, or two eventually consistent read requests for an item up to 4 KB in size. 
- Two read request units represent one transactional read for items up to 4 KB. 
- You'd need additional read request units for items > 4 KB. Here, the total number of read request units required depends on the item size, and whether you want an eventually consistent or strongly consistent read. For example, if your item size is 8 KB, you require 2 read request units to sustain one strongly consistent read, 1 read request unit if you choose eventually consistent reads, or 4 read request units for a transactional read request.

**One write request unit represents** 

- One write for an item up to 1 KB in size 
- You'd need additional write request units for items > 1 KB. Here, transactional write requests require 2 write request units to perform one write for items up to 1 KB. The total number of write request units required depends on the item size. For example, if your item size is 2 KB, you require 2 write request units to sustain one write request or 4 write request units for a transactional write request.

## Provisioned Mode

If you choose provisioned mode, you specify the number of reads and writes per second that you require for your application. You can use auto scaling to adjust your table’s provisioned capacity automatically in response to traffic changes. This helps you govern your DynamoDB use to stay at or below a defined request rate in order to obtain cost predictability.

Provisioned mode is a good option if any of the following are true:

- You have predictable application traffic.

- You run applications whose traffic is consistent or ramps gradually.

- You can forecast capacity requirements to control costs.

### Read Capacity Units and Write Capacity Units

For provisioned mode tables, you specify throughput capacity in terms of read capacity units (RCUs) and write capacity units (WCUs):

**One read capacity unit represents**: 

- One strongly consistent read per second, or two eventually consistent reads per second, for an item up to 4 KB in size. Transactional read requests require two read capacity units to perform one read per second for items up to 4 KB. 
- If you need to read an item that is larger than 4 KB, DynamoDB must consume additional read capacity units. The total number of read capacity units required depends on the item size, and whether you want an eventually consistent or strongly consistent read. For example, if your item size is 8 KB, you require 2 read capacity units to sustain one strongly consistent read per second, 1 read capacity unit if you choose eventually consistent reads, or 4 read capacity units for a transactional read request. 


**One write capacity unit represents**: 

- One write per second for an item up to 1 KB in size. 
- If you need to write an item that is larger than 1 KB, DynamoDB must consume additional write capacity units. Transactional write requests require 2 write capacity units to perform one write per second for items up to 1 KB. The total number of write capacity units required depends on the item size. For example, if your item size is 2 KB, you require 2 write capacity units to sustain one write request per second or 4 write capacity units for a transactional write request. 

## Read Consistency
DynamoDB supports eventually consistent and strongly consistent reads. 

### Eventually Consistent Reads

When you read data from a DynamoDB table, the response might not reflect the results of a recently completed write operation. The response might include some stale data. If you repeat your read request after a short time, the response should return the latest data.

### Strongly Consistent Reads
When you request a strongly consistent read, DynamoDB returns a response with the most up-to-date data, reflecting the updates from all prior write operations that were successful. However, this consistency comes with some disadvantages:

- A strongly consistent read might not be available if there is a network delay or outage. In this case, DynamoDB may return a server error (HTTP 500).

- Strongly consistent reads may have higher latency than eventually consistent reads.

- Strongly consistent reads are not supported on global secondary indexes.

- Strongly consistent reads use more throughput capacity than eventually consistent reads. 


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

