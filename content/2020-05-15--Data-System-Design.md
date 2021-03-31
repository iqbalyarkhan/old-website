---
title: Data System Design
date: 2020-05-14
thumbnail: /post-images/system-design.png
draft: false
extract: Data system design
categories: 
    - System Design
tags:
    - Data system design
---

1. [Intro](#introduction)
    * [DNS](#dns)
    * [Types of data](#types-of-data)
        * [Types of data - Relational Model](#types-of-data---relational-model)
        * [Types of data - Document Model](#types-of-data---document-model)
        * [Types of data - Relation vs Document Model](#types-of-data---relation-vs-document-model)
        * [Types of data - Graph model](#types-of-data---graph-model)
    * [Types of Databases](#types-of-databases)
        * [Relational Database](#relational-database)
        * [When to pick RDBs](#when-to-pick-rdbs)
        * [NoSQL Database](#nosql-dbs)
        * [NoSQL vs RDBs](#nosql-vs-rdbs)
    * [Data Encoding](#data-encoding)
        * [Data Encoding - Language Specific Encoders](#data-encoding---language-specific-encoders)
        * [Data Encoding - JSON and XML](#data-encoding---json-and-xml)
        * [Data Encoding - AVRO](#data-encoding---avro)
    * [DataFlow](#data-flow)
        * [Data Flow - REST](#data-flow---rest)
    * [Communication Between Services]
2. [Distributed](#distributed)
2. [Scalability](#scalability)
3. [Reliability](#reliability)
4. [CAP Theorem](#cap-theorem)
3. [Vertival vs Horizontal Scaling](#vertical-vs-horizontal-scaling)
4. [Load Balancers](#load-balancers)
    * [Why load balance](#why-load-balance)
    * [Load Balancers Deep Dive](#load-balancers-deep-dive)
    * [Balancing algorithms](#balancing-algorithms)
    * [Redundant Load Balancers](#redundant-load-balancers)
5. [Replication](#replication)
    * [Replication Deep Dive](#replication-deep-dive)
    * [Single Leader replication](#single-leader-replication)
        * [Single Leader: Synch vs Asynch replication](#single-leader-synch-vs-asynch-replication)
        * [Single Leader: Eventual Consistency](#single-leader-eventual-consistency)
    * [Multileader replication](#multi-leader-replication)
        * [MultiLeader: Pros](#multi-leader-pros)
        * [MultiLeader: Cons](#multi-leader-cons)
    * [Leaderless replication](#leaderless-replication)
6. [Partitioning](#partitioning)
    * [Partitioning: Techniques](#partitioning-techniques)
    * [Partitioning: Criteria](#partitioning-criteria)
    * [Partitioning: Issues](#partitioning-issues)
6. [Indexes](#indexes)
    * [Indexing Example](#indexing-example)
    * [Index: Write Performance](#index-write-performance)
6. [Caching](#caching)
    * [Cache Types](#cache-types)
7. [CDN](#content-delivery-network-cdn)
8. [Web Tier and Statelessness](#web-tier-and-statelessness)
9. [Data Centers](#data-centers)
    * [Data Centers: Geo-Routing](#data-centers-geo-routing)
10. [Decoupling](#decoupling)
    * [Decoupling: Message queues](#decoupling-message-queues)
11. [System Design](#system-design)
    * [Reliable vs Available]

100. [Useful architectures](#useful-architectures)

### Introduction
If you were to setup your website today, from scratch, how would you go about doing it? You'd probably have a single server to serve your website. In this single server setup, everything is running on one server: your web application, maybe a database, your cache etc. You'll have something like this:

![Basic-Simple-Setup-Flow](./images/system-design/basic-setup.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

A user would hit your website by either going to his/her browser or the mobile app, and enter the URL to your website. Next, this request will be routed to a domain name server that translates the address to an IP address and returns back to you. Let's talk a little more about the DNS:
 
### DNS
 
 Anything connected to the internet - laptops, phones etc has an IP address. A DNS's job is to convert the IP address to something more recognizable (from 64.202.189.170 to yourwebsite.com). So, when you type yourwebsite.com into your browser, your browser sends a query over the internet to find the website for yourwebsite.com. The query, in simplified terms, would be "What is the IP address of yourwebsite.com". The request is first sent to the **recursive resolver (RR)** (usually operated by your ISP). RR knows which other DNS servers might know the answer to your question. 
 
The first server RR talks to is called the **Root Server**. These servers are running all over the world and each one knows DNS information about top level domains. These root servers are placed strategically around the world to handle user traffic appropriately. The root server then returns the IP address to the recursive resolver. Since the internet supports IPv4 and IPv6, the recursive resolver returns both ip addresses. Finally, now that the recursive resolver has the answer for "What is the IP address of yourwebsite.com", it can go ahead and visit the IP address and the server at that address responds to your request.  

Now, say as your website grows, you want to show a personalized page for each visitor. To store each visitor's information, you need a data-store: ie database. This is what our flow would look like with a database:

![Flow-with-DB](./images/system-design/setup-with-db.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

Now, your website server would hit the database, get the user information/preferences and return the page rendered with that information.

A few questions you should ask:

### Types of Data

**(1) What type of database should I use?**

In order to answer this question, you need to understand the data model that you'll use to represent your data! The data model will determine how you THINK about the problem. You can use JSON or XML documents, tables in a relational database or a graph model. The representation that you choose for your data would determine how your data is queried, searched, manipulated and processed in various ways. Let's look at some common data models:

### Types of data - Relational Model
This is by far the best known model: the SQL model. Here, data is organized into relations (tables in SQL) where each relation is an unordered collection of tuples (rows in SQL). Common use cases for the SQL model constitute transaction processing such as entering sales or banking transactions, airline reservations etc and batch processing: customer invoicing, payroll, reporting  etc. 

In the relational model, the data is laid out in the open: a table is simply a collection of rows and that's it! There are no nested structures or complicated access paths to follow if you want to look at the data. You can read any or all rows in a table, selecting those that match a condition. In relational DBs, the **query optimizer** automatically decides which parts of the query to execute in which order, and which indexes to use. Those choices, when compared to document model, are effectively the access path BUT they're made automatically by the optimizer and not the app developer. 

The key insight of the relational model is this: you only need to build a query optimizer once and all applications that use the DB can benefit from it.  

Sometimes, there's an awkward transitional layer required between the objects in application code (POJOs for example) and the database model of tables, rows and columns. In order to remedy this, object-relational mapping frameworks can be used such as Hibernate, Spring DAO etc. 

### Types of data - Document Model
In this category, the pre-dominant force is the family of NoSQL DBs. These came into existence to solve for:

- A need for greater scalability than relational databases: ie handling very large datasets and very high throughput
- Specialized query operations that are not well supported by relational model

In the document model, records are saved as a single document. For example, a resume that can be represented using JSON. Databases such as MongoDB, RethinkDB, CouchDB and Espresso support document model. Document model reverted back to the hierarchical model by storing nested records within the parent record rather than in a separate table:

```js
[
    {
        "year" : 2013,
        "title" : "Turn It Down, Or Else!",
        "info" : {
            "directors" : [ "Alice Smith", "Bob Jones"],
            "release_date" : "2013-01-18T00:00:00Z",
            "rating" : 6.2,
            "genres" : ["Comedy", "Drama"],
            "image_url" : "http://ia.media-imdb.com/images/N/O9ERWAU7FS797AJ7LU8HN09AMUP908RLlo5JF90EWR7LJKQ7@@._V1_SX400_.jpg",
            "plot" : "A rock band plays their music at high volumes, annoying the neighbors.",
            "actors" : ["David Matthewman", "Jonathan G. Neff"]
        }
    },
    {
        "year": 2015,
        "title": "The Big New Movie",
        "info": {
            "plot": "Nothing happens at all.",
            "rating": 0
        }
    }
]
```

### Types of data - Relation vs Document Model
There are many differences to consider when deciding whether to use relational DBs or document DBs. Let's create a quick table to compare and contrast the two:

|  | Relation Model | Document Model |
| -- | -- | -- |
| **Schema Flexibility** | If you want to add a new field to your existing schema, you'd have to update the tables. There needs to be a middle layer to translate your code objects to data in DB. | Schema changes are easier in the document model where all you need to do is add a field to the schema and expect the clients to handle that new field. Plus, your application code would have the same data objects that the DB uses.| 
| **Performance** | In order to get all the data that you need, you'd have to customize your query. | In document model, the performance is better due to locality. If your application needs to access the entire document (to render on a web page for example), then reading entire data in one go would be better than having to join across tables to get all relevant information|
| **Relations in data** | There's better support for joins, many-to-one and many-to-many relationships | For joins and multiple relations, you'd have to have references that can get complicated pretty fast! | 

### Types of data - Graph model

We've seen that many-to-many relationships can cause relational and document models to break. If your data consists of numerous many to many relations, then the graph model would be best suited. As with our vanilla graph data structure, a graph model comprises of vertices and edges. Well known graph algorithms can then operate on these structures.

### Types of Databases
Now that we've talked about the types of data that our application can expect to collect, let's talk about the types of databases that can be used to store our data.

### Relational Database
This is the most common & widely used type of database in the industry. A relational database saves data containing relationships. One to One, One to Many, Many to Many, Many to One etc. It has a relational data model. SQL is the primary data query language used to interact with relational databases. MySQL is the most popular example of a relational database. What are relationships? Let’s say you as a customer buy five different books from an online book store. When you created an account on the book store you would have been assigned a customer id say C1. Now that C1[You] is linked to five different books B1, B2, B3, B4, B5. This is a one to many relationship. In the simplest of forms, one table will contain the details of all the customers & another table will contain all the products in the inventory. One row in the customer table will correspond to multiple rows in the product inventory table. On pulling the user object with id C1 from the database we can easily find what books C1 purchased via the relationship model.

Besides, the relationships, relational databases also ensure saving data in a normalized fashion. In very simple terms, normalized data means a unique entity occurs in only one place/table, in its simplest and atomic form and is not spread throughout the database. This helps in maintaining the consistency of the data. In future, if we want to update the data, we just update at that one place and every fetch operation gets the updated data. Had the data been spread throughout the database in different tables. We would have to update the new value of an entity everywhere. This is troublesome and things can get inconsistent.
 
Besides normalization & consistency, relational databases also ensure ACID transactions.
ACID – Atomicity, Consistency, Isolation, Durability.
An acid transaction means if a transaction in a system occurs, say a financial transaction, either it will be executed with perfection without affecting any other processes or transactions; the system will have a new state after the transaction which is durable & consistent. Or if anything amiss happens during the transaction, say a minor system failure, the entire operation is rolled back. When a transaction happens, there is an initial state of the system State A & then there is a final state of the system State B after the transaction. Both the states are consistent and durable. A relational database ensures that either the system is in State A or State B at all times. There is no middle state. If anything fails, the system goes back to State A. If the transaction is executed smoothly the system transitions from State A to State B.


### When to pick RDBs
If you are writing a software which has anything to do with money or numbers, that makes transactions, ACID, data consistency super important to you. Relational DBs shine when it comes to transactions & data consistency. They comply with the ACID rule, have been around for ages & are battle-tested.

If your data has a lot of relationships like which friends of yours live in a particular city? Which of your friends already ate at the restaurant you plan to visit today? etc. There is nothing better than a relational database for storing this kind of data. Relational databases are built to store relationships.  

### NoSQL DBs
Not only SQL DBs, or NoSQL DBs, are like JSON-based databases built for Web 2.0. Some of the popular NoSQL databases used in the industry are MongoDB, Redis, Neo4J, Cassandra.
They are built for high frequency read & writes, typically required in social applications like Twitter, LIVE real-time sports apps, online massive multi-player games etc.Now, one obvious question that would pop-up in our minds is: Why the need for NoSQL databases when relational databases were doing fine, were battle-tested, well adopted by the industry & had no major persistence issues?

Well, one big limitation with SQL based relational databases is Scalability. Scaling relational databases is something which is not trivial. They have to be Sharded or Replicated to make them run smoothly on a cluster. In short, this requires careful thought and human intervention. On the contrary, NoSQL databases have the ability to add new server nodes on the fly & continue the work, without any human intervention.

NoSQL databases are designed to run intelligently on clusters. And when I say intelligently, I mean with minimal human intervention. Today, the server nodes even have self-healing capabilities. That’s pretty smooth. The infrastructure is intelligent enough to self-recover from faults. Though all this innovation does not mean old school relational databases aren’t good enough & we don’t need them anymore. Relational databases still work like a charm & are still in demand. They have a specific use-case. Also, NoSQL databases had to sacrifice Strong consistency, ACID Transactions & much more to scale horizontally over a cluster & across the data centres.
The data with NoSQL databases is more Eventually Consistent as opposed to being Strongly Consistent.

### NoSQL vs RDBs
**Why RDBs**
Here are a few reasons to choose a SQL database: We need to ensure ACID compliance. ACID compliance reduces anomalies and protects the integrity of your database by prescribing exactly how transactions interact with the database. Generally, NoSQL databases sacrifice ACID compliance for scalability and processing speed, but for many e-commerce and financial applications, an ACID-compliant database remains the preferred option.
Your data is structured and unchanging. If your business is not experiencing massive growth that would require more servers and if you’re only working with data that is consistent, then there may be no reason to use a system designed to support a variety of data types and high traffic volume.

**Why NoSQL**
Here are a few reasons to use NoSQL database: When all the other components of our application are fast and seamless, NoSQL databases prevent data from being the bottleneck. Big data is contributing to a large success for NoSQL databases, mainly because it handles data differently than the traditional relational databases. A few popular examples of NoSQL databases are MongoDB, CouchDB, Cassandra, and HBase.
Storing large volumes of data that often have little to no structure. A NoSQL database sets no limits on the types of data we can store together and allows us to add new types as the need changes. With document-based databases, you can store data in one place without having to define what “types” of data those are in advance. Making the most of cloud computing and storage. Cloud-based storage is an excellent cost-saving solution but requires data to be easily spread across multiple servers to scale up. Using commodity (affordable, smaller) hardware on-site or in the cloud saves you the hassle of additional software and NoSQL databases like Cassandra are designed to be scaled across multiple data centers out of the box, without a lot of headaches. Rapid development. NoSQL is extremely useful for rapid development as it doesn’t need to be prepped ahead of time. If you’re working on quick iterations of your system which require making frequent updates to the data structure without a lot of downtime between versions, a relational database will slow you down.


### Data Encoding
Since we're on the topic of data, let's talk about another common action performed with (on?!) data: data encoding. Usually, applications keep data in in-memory data structures such as arrays, hash tables, trees etc. where it is easy to access and modify. When want to send that same data over a network to another process or save that data in a file, you need to encode it. The translation of data from in-memory representation to a byte sequence is called **encoding** and when you receive that same information over a network and want to use it locally in your application you perform the reverse process: aka **decoding**. There are a myriad different libraries and encoding formats to choose from. 

### Data Encoding - Language specific encoders
Most OOP languages come built-in with encoders. For example, Java has java.io.Serializable, Ruby has Marshal etc. The advantage of using these libraries is they're convenient and easy to use. However, disadvantage here is that you're now tied to that language. If you're sending over data serialized using java's serializable, you expect your recipient to deserialize it using the same. Plus, this encoding/decoding process is notorious for its poor performance and bloated encoding. 

### Data Encoding - JSON and XML
Moving on from language specific encoders, we can use JSON, XML and CSV as encoding options. These are widely known and are language agnostic. However, using these formats, it is hard to distinguish between a string and an integer. You're also limited by the precision of your floating point integers. In addition, JSON and XML, although popular, are not the most memory/space efficient encoding methods.

### Data Encoding - AVRO
Apache AVRO, is a binary encoding format that uses a schema (in .avsc files) to specify the structure of the data being encoded. The resulting encoded data is in binary format and is compact as compared to JSON and XML. In addition, AVRO allows forward and backward compatibility semantics. To parse avro data, you go through the fields in the order that they appear in the schema and use the schema to tell you the datatype of each field. This means binary data can be decoded correctly if the code is reading the data using the exact same schema as the code that wrote the data.

### Data Flow
So far we've discussed how data is stored, retrieved and encoded but have avoided how it is transferred. For example, how would a service, running on a server receive our data and how would it respond back to our request? The most common arrangement for communication over a network is to have two roles: clients and servers. The servers expose an API over the network and the client connect to the servers to make requests to that API. The API exposed by the service is also known as service. Let's look at a few basic modes of data flow:

### Data Flow - REST
When HTTP is used as the underlying protocol for talking to a service running on a server, it is called a web-service. One approach to speak with a web-service is to use  REST. REST is not a protocol but a design philosophy that models its principles after HTTP. It uses verbs to interact with the web-service by utilizing GET to retrieve information and POST to update it on a web-service. With REST APIs you can expect the response from a running service instantaneously. 

### Data Flow - Message Passing
So far, we've looked at the REST philosophy of interacting with web-services which is a synchronous request-response model. We can also pass data to services using asynchronous message passing systems that deliver messages to another process with low latency via an intermediary called the **message broker or message queue**. The message queue stores the message temporarily and acts as a buffer between the sender and the web-service. There are several advantages if MQs are used: 

- They can act as a buffer if the recipient is unavailable or overloaded thus improving system reliability
- It can automatically redeliver messages to a process that crashed, thus improving system durability
- It allows one sender to send messages to multiple recipients
- It **decouples** the sender from the recipient: the sender will send the message out into the abyss and won't care what services consume those messages

The general flow of data to MQs is as follows: One process sends a message to a queue or a topic, and the broker ensures that the message is delivered to one or more consumers of or subscribers to the that queue or topic.  

### Communication Between Services
Long-Polling, WebSockets, and Server-Sent Events are popular communication protocols between a client like a web browser and a web server in addition to HTTP pull and push mechanisms. Let's look at these protocols in detail:

### Ajax Polling

Polling is a standard technique used by the vast majority of AJAX applications. The basic idea is that the client repeatedly polls (or requests) a server for data. The client makes a request and waits for the server to respond with data. If no data is available, an empty response is returned.

 - The client opens a connection and requests data from the server using regular HTTP.
 - The requested webpage sends requests to the server at regular intervals (e.g., 0.5 seconds).
 - The server calculates the response and sends it back, just like regular HTTP traffic.
 - The client repeats the above three steps periodically to get updates from the server.

The problem with Polling is that the client has to keep asking the server for any new data. As a result, a lot of responses are empty, creating HTTP overhead. 

### HTTP Long-Polling
This is a variation of the traditional polling technique that allows the server to push information to a client whenever the data is available. With Long-Polling, the client requests information from the server exactly as in normal polling, but with the expectation that the server may not respond immediately. That’s why this technique is sometimes referred to as a “Hanging GET”.

If the server does not have any data available for the client, instead of sending an empty response, the server holds the request and waits until some data becomes available.
Once the data becomes available, a full response is sent to the client. The client then immediately re-request information from the server so that the server will almost always have an available waiting request that it can use to deliver data in response to an event.

### Web Sockets
WebSocket provides [Full duplex](https://en.wikipedia.org/wiki/Duplex_(telecommunications)#Full_duplex) communication channels over a single TCP connection. It provides a persistent connection between a client and a server that both parties can use to start sending data at any time. The client establishes a WebSocket connection through a process known as the WebSocket handshake. If the process succeeds, then the server and client can exchange data in both directions at any time. The WebSocket protocol enables communication between a client and a server with lower overheads, facilitating real-time data transfer from and to the server. This is made possible by providing a standardized way for the server to send content to the browser without being asked by the client and allowing for messages to be passed back and forth while keeping the connection open. In this way, a two-way (bi-directional) ongoing conversation can take place between a client and a server.

### Server Sent Events
Under SSEs the client establishes a persistent and long-term connection with the server. The server uses this connection to send data to a client. If the client wants to send data to the server, it would require the use of another technology/protocol to do so.

 - Client requests data from a server using regular HTTP.
 - The requested webpage opens a connection to the server.
 - The server sends the data to the client whenever there’s new information available.
 
SSEs are best when we need real-time traffic from the server to the client or if the server is generating data in a loop and will be sending multiple events to the client.

### Distributed
So far, we've looked at a simple single server architecture. We've talked about how our data can be encoded and transmitted to services. In summary this is what we have as of now:

![Basic-Simple-Setup-Flow](./images/system-design/basic-setup.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

We've talked about data that's stored on a single machine but ask this question:

**What if there are a lot of users connecting to your site at the same time?**
By asking this question, you're looking to make your website **scalable, available and reliable**. (With this type of architecture, your data storage and retrieval would occur between multiple databases):

### Scalability

A scalable system is one that is **able to deal with its growth**. Growth can be defined as increased volume of data or increased traffic volume. Scalability is used to describe how the system copes with increased load. 

It doesn't make sense to just say system X is scalable. What does that mean? Scalability needs to be considered by asking questions like **if the system's load increases how are we going to handle that growth?** For example, a system could suddenly go from 100 to million users or a client uploads TBs of data through our system: is our system able to handle these sudden spikes? 

### Reliability

A reliable system is one that **continues to work correctly(ie correct function and performance levels) in the face of adversity(hardware or software failures).**

Reliable systems are fault tolerant: this fault can be a human error (incorrect input) or hardware/software errors. Even under faulty circumstances, our system continues to be reliable. Reliable systems are **resilient** and **fault tolerant**.

There are several types of faults:
- Hardware faults: Hard disk crash, RAM becomes faulty, electric outage etc. To prevent hardware faults, we add redundancy to our applications: setup disks in RAID (redundant array of independent disks) configuration, have dual power supplies, backup power for data centers etc.  

- Software faults: Leap year errors, bad input errors etc. Happen in unusual set of circumstances. 

- Human errors
 
In the example where you have a single server, your server might grind to a halt if a number of users hit your website at the same time. You have 2 options:
- Scale vertically: Add more compute power to a single machine
- Scale horizontally: Add more servers to your backend

### CAP Theorem
CAP theorem states that it is impossible for a distributed software system to simultaneously provide more than two out of three of the following guarantees (CAP): Consistency, Availability, and Partition tolerance. When we design a distributed system, trading off among CAP is almost the first thing we want to consider. CAP theorem says while designing a distributed system, we can pick only two of the following three options:

Consistency: All nodes see the same data at the same time. Consistency is achieved by updating several nodes before allowing further reads.

Availability: Every request gets a response on success/failure. Availability is achieved by replicating the data across different servers.

Partition tolerance: The system continues to work despite message loss or partial failure. A partition-tolerant system can sustain any amount of network failure that doesn’t result in a failure of the entire network. Data is sufficiently replicated across combinations of nodes and networks to keep the system up through intermittent outages.

![CAP-Theorem](./images/system-design/cap-theorem.png) [Image Credit](https://www.educative.io/module/lesson/grokking-system-design-interview/3w8r0BNQLwn)


### Vertical vs Horizontal Scaling
Vertical scaling is when you join many CPUs, RAMs and disks together under one OS where a fast interconnect allows any CPU to access any part of the memory or disk. In this kind of **shared memory** architecture, all components can be treated as a single machine. Therefore, when the number of users increase, the only thing you can do is add more CPU, RAM and disk to that single machine.

Horizontal scaling is when you have multiple machines running the same software connected via a network. Each machine running the software or holding our DB is called a node. Each node uses its CPUs, RAM and disks independently. Any coordination between nodes is done at the software level, using a conventional network. From this point on, in this post, we'll assume that we've chosen to use horizontal scaling and have multiple cheap machines connected together over the network. 

### Load Balancers
Now that our backend is setup with a horizontally scaled system, we can go ahead and improve our system's availability, reliability and scalability. To test our system so far, consider this: say you suddenly start receiving a lot of traffic and have a collection of servers in your backend, how do you direct traffic to each of the servers? You want to utilize the servers to a point where the work-load is evenly distributed among all available servers. Enter **load balancers**:

![Load Balancers](./images/system-design/load-balancers.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

A user connects to the **public IP** of your load balancer (public IP means one that is available over the internet) and we move the web servers to private IP addresses (NOT reachable over the internet). Now, all traffic is directed to the load-balancer. The load balancer will be aware of the status of each of the web servers and if either goes down, traffic can be routed to the correct server. With the addition of a load balancer, we've solved the problem of servers going down.

To utilize full scalability and redundancy, we can try to balance the load at each layer of the system. We can add LBs in three places:

- Between the user and the web server
- Between web servers and an internal platform layer, like application servers or cache servers
- Between internal platform layer and database.

![load-balancers-2](./images/system-design/load-balancers-2.png) [Image Credit](https://www.educative.io/module/lesson/grokking-system-design-interview/3w8r0BNQLwn)

### Why load balance
Users experience faster, uninterrupted service. Users won’t have to wait for a single struggling server to finish its previous tasks. Instead, their requests are immediately passed on to a more readily available resource.
Service providers experience less downtime and higher throughput. Even a full server failure won’t affect the end user experience as the load balancer will simply route around it to a healthy server.
Load balancing makes it easier for system administrators to handle incoming requests while decreasing wait time for users.
Smart load balancers provide benefits like predictive analytics that determine traffic bottlenecks before they happen. As a result, the smart load balancer gives an organization actionable insights. These are key to automation and can help drive business decisions.
System administrators experience fewer failed or stressed components. Instead of a single device performing a lot of work, load balancing has several devices perform a little bit of work.

### Load Balancers Deep Dive
Now, you might be wondering, what are the different ways I can choose to route which traffic goes to which server? Well, in an OSI model, there are 7 layers: the most abstract layer is the application layer (ie application logic) and the most concrete layer is the physical layer:

![OSI Layers](./images/system-design/osi-layers.jpeg)

Load balancing can be done at:

- **Layer 4 (L4)**: 
Here, load balancers work at the transport level. That means they can make routing decisions based on the TCP or UDP ports that packets use along with their source and destination IP addresses. L4 load balancers perform Network Address Translation but do not inspect the actual contents of each packet.

- **Layer 7 (L7)**: 
Here, load balancers act at the application level, the highest in the OSI model. They can evaluate a wider range of data than L4 counterparts, including HTTP headers and SSL session IDs, when deciding how to distribute requests across the server farm.

### Balancing algorithms
There are a few algorithms that can be used by a balancer to determine which server gets the request from a pool of possible servers. Here're a few common algorithms:

- **Least Connection Method** 
This method directs traffic to the server with the fewest active connections. This approach is quite useful when there are a large number of persistent client connections which are unevenly distributed between the servers.

- **Least Response Time Method**
This algorithm directs traffic to the server with the fewest active connections and the lowest average response time.

- **Least Bandwidth Method**
This method selects the server that is currently serving the least amount of traffic measured in megabits per second (Mbps).

- **Round Robin Method**
This method cycles through a list of servers and sends each new request to the next server. When it reaches the end of the list, it starts over at the beginning. It is most useful when the servers are of equal specification and there are not many persistent connections.

- **Weighted Round Robin Method**
The weighted round-robin scheduling is designed to better handle servers with different processing capacities. Each server is assigned a weight (an integer value that indicates the processing capacity). Servers with higher weights receive new connections before those with less weights and servers with higher weights get more connections than those with less weights.

- **IP Hash**
Under this method, a hash of the IP address of the client is calculated to redirect requests to a server.

### Redundant Load Balancers
The load balancer can be a single point of failure; to overcome this, a second load balancer can be connected to the first to form a cluster. Each LB monitors the health of the other and, since both of them are equally capable of serving traffic and failure detection, in the event the main load balancer fails, the second load balancer takes over.

![Redundant-LB](./images/system-design/redundant-lb.png) [Image Credit](https://www.educative.io/module/lesson/grokking-system-design-interview/3w8r0BNQLwn)

Following links have some good discussion about load balancers:
[What is load balancing](https://avinetworks.com/what-is-load-balancing/)
[Introduction to architecting systems](https://lethain.com/introduction-to-architecting-systems-for-scale/)
[Load balancing](https://en.wikipedia.org/wiki/Load_balancing_(computing))

With the help of load-balancers, we've managed to break our web-service so that user requests for the home page are forwarded to only those nodes that are healthy and are not under heavy load. To do so, we'll be using one of the load balancing algorithms described above. Having said that, this is what our architecture looks like as of now:

![load-balancer-single-db](./images/system-design/load-balancer-single-db.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)


Now the web tier looks good but what about the data tier? The current design has one database, so it does not support failover and redundancy. Meaning, what if our DB is hit with a time consuming query or what if the database node is down? Database replication is a common technique to address those problems. Let us take a look.

### Replication
In replication, the idea is to **replicate** the same information across multiple databases. To replicate this information, we'll designate one server that holds our database as the **leader** and remaining servers as **followers**. The leader will:

- Handle all CUD (Create, update and delete) operations
- Forward any new data to the followers so that the followers have up to date information

The followers will:
- Handle all read operations

A setup with multiple DBs (along with leader/follower) setup might look like this: 


![Leader Follower](./images/system-design/leader-follower.png) [Image Credit](https://www.amazon.com/Designing-Data-Intensive-Applications-Reliable-Maintainable/dp/1449373321)

Advantages of replicating our databases:
- Improved performance
- Reliability: If one node goes down, we have the data on several other nodes
- Availability: By having replicas close to your clients, you can render content fast

The entire system is shown below:

![Entire System](./images/system-design/entire-system.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

Finally, the flow for this design shown would be:

- A user gets the IP address of the load balancer from DNS.
- A user connects the load balancer with this IP address.
- The HTTP request is routed to either Server 1 or Server 2.
- A web server reads user data from a follower database.
- A web server routes any data-modifying operations to the master database. This includes write, update, and delete operations.

### Replication Deep Dive
As we said earlier, replicating data allows us to create available, scalable systems. Replicating data that is not changing (static) is easy, real difficulty lies in replicating data that is changing often. There are 3 main ways to replicate data: **single leader replication** (one we discussed briefly above), **multi-leader replication** and **leaderless replication**. Let's have a look at all 3 in detail:

### Single Leader Replication
As we said in our intro, this type of replication deals with a single node acting as a leader. This node is responsible for receiving insert/update requests from the user and then propagating any changes made to the data to the followers. We have the remaining nodes acting as followers: followers are used for read operations only. Whenever the leader writes new data to its local storage, it also sends the data change to all of its followers.

The leader can transmit the changes to the followers via 2 methods: **synchronous replication** and **asynchronous replication**:

### Single Leader: Synch vs Asynch Replication
In **synchronous replication**, the leader waits to get an ok response from **all** followers before sending an ok response back to the client. The advantage here is that all the followers will ALWAYS have up to date information. Disadvantage is that if one follower is down, the entire system will grind to a halt. This defeats the purpose of having a highly available system! Therefore, it is impractical to have completely synchronous replication.

In **asynchronous replication**, the leader will only update its local storage with the updates and send the ok response back to the client, without waiting for ANY of the followers to send back the ok response. Advantage here is response times are low. Disadvantage here is that if the leader goes down, there could be information loss.

**Compromise** here is that replication is usually **semi-asynchronous** where the leader will wait for at-least one follower to respond with an ok before sending the confirmation back to the client. 

### Single Leader: Eventual consistency

In read heavy workloads, the attractive option is to create many followers and distribute read requests across the followers. This removes load from the leader and allows read requests to be served by nearby replicas. As the number of followers increase, the probability that one of the followers has stale data (assuming asynchronous replication) also increases. We call this phenomenon **eventual consistency**: the reality where all followers will eventually have up to date data. This eventual propagation of data to followers is called **replication lag**. 

This replication lag results in poor customer experience! Imagine you posted a comment on facebook and when you refreshed the page your comment disappeared! There are a few solutions to tackle this problem:

- **Read your own writes**

Always read the user's profile from the leader, and any other user's profiles from a follower. In our facebook example, we used user profile, in other systems this information could be something else (that a user updated). BUT, what if the user can edit a lot of items?!

- **Make all reads from leader**

Now what if the user can make edits to a bunch of items, all requests would end up with the leader which defeats the purpose of having a distributed system! In that case read your own writes won't work. Another possible solution is to keep track of the latest update and say for one minute after the last update, direct all read requests to the leader. BUT, what if the users of the system make a lot of edits?!

- **Read from same replica**

Another solution is to read from the same replica for the same user. That way the user is always guaranteed to see up to date, instant changes. 

### Multi-leader Replication
If you have a setup with multiple data-centers located in geographically separated locations, you'd have to use multi-leader replication. That is because each user would be connected to the data center closest to him/her and the leader from that data center would then asynchronously replicate that information to other leaders and data centers.   

### Multi-leader: Pros
As compared to single leader replication, there're advantages that a multi-leader setup enjoys:

- **Performance**

In single leader, every write must go to the single leader. No matter how far you're located from that leader, every write will go the leader via the internet. In multi-leader, every write can be processed at the local data center and then replicated to other data centers. This results in a better perceived performance.

- **Tolerance**

If single leader goes down, new writes/updates need to be halted and a new leader has to be elected before accepting new writes/updates. With multi-leader, if a leader goes down, other centers can continue to operate and the down leader can catch up once it is back.  

### Multi-Leader: Cons
In single leader, since all writes go to one leader, there's always just a single source of truth. If 2 clients try to write at the same time, one client would have to wait until the other is done. With multi-leader, that is not the case: there can be write conflicts. 

To resolve for write conflicts, there're a bunch of different techniques: last write wins, merger of writes, ask user to resolve conflicts etc. 

If your setup requires low latency high availability for geographically dispersed users, multi-leader configuration is the way to go. 

### Leaderless replication
Another method to replicate data across servers is to get rid of leaders entirely: every node is a leader. The client sends its writes to multiple nodes and waits for a specific number of acknowledgements before a write can be considered a success. 

If a node goes down and is unable to receive a write, it'll return stale data. Upon returning stale data, up to date nodes can provide the stale data node with up to date information. This is called **read repair**

Another way to prevent stale data from being returned is to perform periodic scans of all nodes and update any nodes that have fallen behind. This is called **anti-entropy process**.

### Partitioning
Replication of your data across multiple servers goes hand in hand with partitioning of data. Data partitioning is a technique to break up a big database (DB) into many smaller parts. It is the process of splitting up a DB/table across multiple machines to improve the manageability, performance, availability, and load balancing of an application. The justification for data partitioning is that, after a certain scale point, it is cheaper and more feasible to scale horizontally by adding more machines than to grow it vertically by adding beefier servers. Say for example, your data set is so large that it is impossible for us to hold it on a single machine. This is where data **sharding** or **partitioning** comes into picture. The main reason for wanting to partition data is scalability. Different partitions can be placed on different nodes. As a result, a large data set can be distributed across many disks and the query load can be distributed across many processors. The goal is to spread the data and query load evenly across our nodes. 

Unfair partitioning would result in **skewed** queries that result in **hotspots**. There are multiple approaches to distributing or sharding data across partitions:

### Partitioning: Techniques
The simplest approach to help avoid hotspots is to assign records to nodes randomly. That would distribute the data quite evenly across nodes. HOWEVER, when you go back to read the partitioned data, you'd have no way of knowing where the data is since it was partitioned randomly! 

A better approach is to partition by **key range**: for example, keys between Aa - Bf will be stored on node 1, Bg - Cf will be stored on node 2 and so on. Another approach is to partition using **hash of key** where the hash function produces a uniformly random value. 

Another approach is to use **dynamic partitioning**: when a partition grows to exceed a configured size, it is split into two partitions so that each partition handles approximately half of the data. This is similar to how a B-Tree handles node splitting. 

Now as you can imagine, the data is partitioned on different nodes and is usually moved between nodes as data is added or deleted, we need to be able to know at all times, the location of each piece of data. This process is called **service discovery**. To solve this problem, there're 3 approaches:

(1) Send request to all nodes and the node that has the data will respond
(2) Send request to the one node that has information about all nodes and have it forward your request to the correct node
(3) Have client maintain this information on its end.

Many systems rely on a separate coordination service such as Zookeeper to keep track of cluster metadata. Each node registers itself in Zookeeper and Zookeeper maintains the mapping of partitions to nodes. So, whenever any mapping information is updated, Zookeeper informs the routing tier that can then update its records:

![Zookeeper](./images/system-design/zookeeper.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

Cassandra and Riak use a different approach called the **gossip protocol** to disseminate any changes in cluster state. Requests can be sent to any node and that node forwards them to the appropriate node for the requested partition. This comes at a cost of added complexity but removes dependency on external coordination services like Zookeeper. 

Below are three of the most popular schemes used by various large scale applications.

a. Horizontal partitioning: In this scheme, we put different rows into different tables. For example, if we are storing different places in a table, we can decide that locations with ZIP codes less than 10000 are stored in one table and places with ZIP codes greater than 10000 are stored in a separate table. This is also called a range based partitioning as we are storing different ranges of data in separate tables. Horizontal partitioning is also called as Data Sharding.

The key problem with this approach is that if the value whose range is used for partitioning isn’t chosen carefully, then the partitioning scheme will lead to unbalanced servers. In the previous example, splitting location based on their zip codes assumes that places will be evenly distributed across the different zip codes. This assumption is not valid as there will be a lot of places in a thickly populated area like Manhattan as compared to its suburb cities.

b. Vertical Partitioning: In this scheme, we divide our data to store tables related to a specific feature in their own server. For example, if we are building Instagram like application - where we need to store data related to users, photos they upload, and people they follow - we can decide to place user profile information on one DB server, friend lists on another, and photos on a third server.

Vertical partitioning is straightforward to implement and has a low impact on the application. The main problem with this approach is that if our application experiences additional growth, then it may be necessary to further partition a feature specific DB across various servers (e.g. it would not be possible for a single server to handle all the metadata queries for 10 billion photos by 140 million users).

c. Directory Based Partitioning: A loosely coupled approach to work around issues mentioned in the above schemes is to create a lookup service which knows your current partitioning scheme and abstracts it away from the DB access code. So, to find out where a particular data entity resides, we query the directory server that holds the mapping between each tuple key to its DB server. This loosely coupled approach means we can perform tasks like adding servers to the DB pool or changing our partitioning scheme without having an impact on the application.

### Partitioning Criteria
a. Key or Hash-based partitioning: Under this scheme, we apply a hash function to some key attributes of the entity we are storing; that yields the partition number. For example, if we have 100 DB servers and our ID is a numeric value that gets incremented by one each time a new record is inserted. In this example, the hash function could be ‘ID % 100’, which will give us the server number where we can store/read that record. This approach should ensure a uniform allocation of data among servers. The fundamental problem with this approach is that it effectively fixes the total number of DB servers, since adding new servers means changing the hash function which would require redistribution of data and downtime for the service. A workaround for this problem is to use Consistent Hashing.

b. List partitioning: In this scheme, each partition is assigned a list of values, so whenever we want to insert a new record, we will see which partition contains our key and then store it there. For example, we can decide all users living in Iceland, Norway, Sweden, Finland, or Denmark will be stored in a partition for the Nordic countries.

c. Round-robin partitioning: This is a very simple strategy that ensures uniform data distribution. With ‘n’ partitions, the ‘i’ tuple is assigned to partition (i mod n).

d. Composite partitioning: Under this scheme, we combine any of the above partitioning schemes to devise a new scheme. For example, first applying a list partitioning scheme and then a hash based partitioning. Consistent hashing could be considered a composite of hash and list partitioning where the hash reduces the key space to a size that can be listed.

### Partitioning Issues
On a partitioned database, there are certain extra constraints on the different operations that can be performed. Most of these constraints are due to the fact that operations across multiple tables or multiple rows in the same table will no longer run on the same server. Below are some of the constraints and additional complexities introduced by partitioning:

a. Joins and Denormalization: Performing joins on a database which is running on one server is straightforward, but once a database is partitioned and spread across multiple machines it is often not feasible to perform joins that span database partitions. Such joins will not be performance efficient since data has to be compiled from multiple servers. A common workaround for this problem is to denormalize the database so that queries that previously required joins can be performed from a single table. Of course, the service now has to deal with all the perils of denormalization such as data inconsistency.

b. Referential integrity: As we saw that performing a cross-partition query on a partitioned database is not feasible, similarly, trying to enforce data integrity constraints such as foreign keys in a partitioned database can be extremely difficult.

Most of RDBMS do not support foreign keys constraints across databases on different database servers. Which means that applications that require referential integrity on partitioned databases often have to enforce it in application code. Often in such cases, applications have to run regular SQL jobs to clean up dangling references.

c. Rebalancing: There could be many reasons we have to change our partitioning scheme:

The data distribution is not uniform, e.g., there are a lot of places for a particular ZIP code that cannot fit into one database partition.
There is a lot of load on a partition, e.g., there are too many requests being handled by the DB partition dedicated to user photos.
In such cases, either we have to create more DB partitions or have to rebalance existing partitions, which means the partitioning scheme changed and all existing data moved to new locations. Doing this without incurring downtime is extremely difficult. Using a scheme like directory based partitioning does make rebalancing a more palatable experience at the cost of increasing the complexity of the system and creating a new single point of failure (i.e. the lookup service/database).

When we're re-balancing our partitions, there're a few issues that can crop up. Say, for example, that you initially had 12 servers and your data is partitioned across these servers. In order to assign data to a server, you used the mod technique: 

```cpp
index = key % num_of_servers
``` 

Now, as your load grows, you add more servers. This would change our `num_of_servers` variable and we'd have to move most of the keys from one node to another based on the new number of servers. The same applies if your load decreases and you reduce the number of servers in your cluster. Such frequent moves make re-balancing expensive. We need an approach that doesn't move data around more than necessary. Enter **consistent hashing**.

**Consistent Hashing**
Consistent hashing was designed to avoid the problem of having to change the server assignment of every object when a server is added or removed. The main idea is to use a hash function to randomly map both the objects and the servers to a unit circle, e.g. at an angle of **hash(object) mod 360** degrees w.r.t. the horizontal axis. Each object is then assigned to the next server that appears on the circle in clockwise order. This provides an even distribution of objects to servers. But, more importantly, if a server fails and is removed from the circle, only the objects that were mapped to the failed server need to be reassigned to the next server in clockwise order. Likewise, if a new server is added, it is added to the unit circle, and only the objects mapped to that server need to be reassigned. Importantly, when a server is added or removed, the vast majority of the objects maintain their prior server assignments.

![Consistent Hashing](./images/system-design/consistent-hashing.png) [Image Credit](https://blog.hltbra.net/2019/02/18/consistent-hashing.html)


Before we move forward, let's recap what we've seen so far:

![Entire System](./images/system-design/entire-system.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

Diagram above shows that the user gets the IP address of the load balancer from DNS. User connects to the load balancer with this IP address. The HTTP request is routed to either Server 1 or Server 2. A web server reads user data from a follower database. A web server routes any data-modifying operations to the leader database. This includes write, update, and delete operations.

### Indexes
Indexes are well known when it comes to databases. Sooner or later there comes a time when database performance is no longer satisfactory. One of the very first things you should turn to when that happens is database indexing.

The goal of creating an index on a particular table in a database is to make it faster to search through the table and find the row or rows that we want. Indexes can be created using one or more columns of a database table, providing the basis for both rapid random lookups and efficient access of ordered records.

### Indexing: Example
A library catalog is a register that contains the list of books found in a library. The catalog is organized like a database table generally with four columns: book title, writer, subject, and date of publication. There are usually two such catalogs: one sorted by the book title and one sorted by the writer name. That way, you can either think of a writer you want to read and then look through their books or look up a specific book title you know you want to read in case you don’t know the writer’s name. These catalogs are like indexes for the database of books. They provide a sorted list of data that is easily searchable by relevant information.

Simply saying, an index is a data structure that can be perceived as a table of contents that points us to the location where actual data lives. So when we create an index on a column of a table, we store that column and a pointer to the whole row in the index. Let’s assume a table containing a list of books, the following diagram shows how an index on the ‘Title’ column looks like:

![index-example](./images/system-design/index-example.png) [Image Credit](https://www.educative.io/module/lesson/grokking-system-design-interview/3w8r0BNQLwn)

Just like a traditional relational data store, we can also apply this concept to larger datasets. The trick with indexes is that we must carefully consider how users will access the data. In the case of data sets that are many terabytes in size, but have very small payloads (e.g., 1 KB), indexes are a necessity for optimizing data access. Finding a small payload in such a large dataset can be a real challenge, since we can’t possibly iterate over that much data in any reasonable time. Furthermore, it is very likely that such a large data set is spread over several physical devices—this means we need some way to find the correct physical location of the desired data. Indexes are the best way to do this.

### Index: Write Performance
An index can dramatically speed up data retrieval but may itself be large due to the additional keys, which slow down data insertion & update.

When adding rows or making updates to existing rows for a table with an active index, we not only have to write the data but also have to update the index. This will decrease the write performance. This performance degradation applies to all insert, update, and delete operations for the table. For this reason, adding unnecessary indexes on tables should be avoided and indexes that are no longer used should be removed. To reiterate, adding indexes is about improving the performance of search queries. If the goal of the database is to provide a data store that is often written to and rarely read from, in that case, decreasing the performance of the more common operation, which is writing, is probably not worth the increase in performance we get from reading.

[Detailed read here](https://en.wikipedia.org/wiki/Database_index)

### Caching
So far, we've improved the availability and reliability of our system. We can now concentrate on speeding up our architecture by improving latency by improving response and load times for our web-page. Now, as you can imagine, querying the database for the same information over and over again can be quite expensive. For example, let's say we perform a join on a few tables to render on each user's page the most frequently visited part of the site for a particular day. Getting this information for each and every site visitor is expensive. Since this information does not change frequently, we can look up this information once and then **cache** it for future use. This will improve the performance of our application. 

The **cache tier** is temporary data store layer that lies between the server and the database. If the information we want is present in the cache tier, we'll grab it from there, otherwise we'll query the DB, store this information in cache and return. Retrieving data from the cache tier is faster than querying the database for the same information. In addition, using the cache tier will also reduce database workloads. We can use Memcache, Redis etc based on the data we're caching. Interacting with cache servers is simple because most cache servers provide APIs for common programming languages.

Here's a possible cache tier setup:

![Cache Tier](./images/system-design/cache-tier.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

Not all types of data can be stored in cache! Let's look at a few pitfalls when using caches:

- **Type of data**
Since cache data is read once and then stored in cache tier, it is not advisable to cache data that changes frequently. The ideal candidate for cached data is one that is read frequently but updated infrequently. It is a good idea to set an expiration policy where the cache is **invalidated** and the data in cache is refreshed by performing another read of the DB. 

- **Inconsistency**
Even if you set an expiration policy, your cache data might be out of date therefore it is important to keep cache and data store in sync using TTL.

- **Eviction Policy**
Once the cache is full, we'll have to start removing content from the cache. To do so, we can use something called LRU (least recently used) cache eviction policy where the least recently used data is removed from cache.

### Cache: Types
There are several strategies where the choice to pick the correct strategy depends on your **data access patterns**. For example: do you have more writes than reads? (ie time based logs), do you have write once and read multiple times? (ie think user profiles on Facebook), do you have a combination? (update and search data). Depending on your use-case, your caching strategy would evolve. Let's look at the various types of caches available.

- **Side Cache**

![Side cache](./images/system-design/cache-aside.png) [Image Credit](https://codeahoy.com/2017/08/11/caching-strategies-and-how-to-choose-the-right-one/)

This is the simplest of them all: the application, before calling the DB, checks the cache to see if there's a cache hit: if so, application returns the data. In case of a cache miss, the DB is queried, cache is updated and data is then returned to the application. If the cache goes down, application can continue to query the DB.

- **Read Through Cache**

![Read through Cache](./images/system-design/read-through.png) [Image Credit](https://codeahoy.com/2017/08/11/caching-strategies-and-how-to-choose-the-right-one/)

As the name suggests, read through cache is placed between the application and the database. This means that the application ONLY interacts with the cache and NOT the DB. Any cache misses are populated and cache hits are returned. For example:

 (1) Given a key-value pair, the application first tries to read the data from DB. If the cache is populated with the data (cache hit), the value is returned. If not, on to step 2.
 
 (2) Transparent to the application, if there was a cache miss, cache fetches the key-value pair from DB.
 
 (3) To make the data available for any subsequent reads, the key-value pair is then populated in the cache.
 
 (4) The key-value pair then returns the value back to the application.
 
 If cache goes down, access to DB will also be lost. Disadvantage here is that on the first request, since the cache is empty, you'll have to query the DB so the first request will always be slow. Read through cache is a good use case for **read heavy** work loads.  

- **Write Through Cache**

![Write through Cache](./images/system-design/write-through.png) [Image Credit](https://codeahoy.com/2017/08/11/caching-strategies-and-how-to-choose-the-right-one/)

Similar to read-through cache, write-through cache also sits in line with the DB and the cache is updated as data is written to DB. Here're the data flow for a write through cache:

 (1) For a given key-value pair, the application writes to the DB.
 
 (2) Cache intercepts the write and then writes the key-value pair to DB.
 
 (3) Upon a successful write, the cache is hydrated with the new value so that any subsequent reads for the same key-value pair result in a cache hit. If the write is unsuccessful, the exception is returned to the application.
 
 (4) The acknowledgement of a successful write is then returned to the application.
 
 Write through and read-through caches can be deployed together to simplify the use of caches. Because a write-through cache automatically caches the update, there's a slight amount of latency for writes. However, the advantage here is that data that is written is also immediately available for reads! Think about it: you have a DB that stores title and summary of new books that you publish. Say you've published a new book and on the landing page of your website you have a huge banner advertising this new book. Before you push the banner to your site, you update your DB with the book title and summary. As soon as you write to the DB, your cache is updated (since it is a write through cache). Now when millions of users flock to your website, they request this new book and its summary which is returned from the cache and NOT the DB. 
 
 Therefore, **write-through cache is advantageous for read heavy workloads**. 

- **Write Around Cache**

 ![Write Around Cache](./images/system-design/write-around.png) [Image Credit](https://aws.amazon.com/blogs/database/amazon-dynamodb-accelerator-dax-a-read-throughwrite-through-cache-for-dynamodb/)

Some workloads in the IoT or ad tech space have a considerable amount of data that is written once and read never. In these scenarios, it often doesn’t make sense to use a write-through cache. If the cache is populated with data that is never read, it usually means that the utilization and cache/hit miss ratio is low, reducing the utility of the cache. To work around this issue (pun intended), you can employ a write-around pattern in which writes go directly to DynamoDB. Only the data that is read—and thus has a higher potential to be read again—is cached.

- **Write Back Cache**

 ![Write Back Cache](./images/system-design/write-back.png) [Image Credit](https://aws.amazon.com/blogs/database/amazon-dynamodb-accelerator-dax-a-read-throughwrite-through-cache-for-dynamodb/)

Whereas both read-through and write-through caches address read-heavy workloads, a write-back (or write-behind) cache is designed to address write-heavy workloads. In this scenario, items are written to the cache and then asynchronously written to the underlying data store. The process is as follows:

(1) The item is written to the cache.

(2) The item is acknowledged by the cache, and success is returned to the application.

(3) As a background process, items are de-staged and written to DynamoDB.

(4) The cache acknowledges the write.

### Content delivery network (CDN)
While we're on the topic of getting content to users fast, it is apt to talk about content delivery networks or CDNs. A CDN is a network of geographically dispersed servers that is used to deliver **static** content. CDN caches static content such as images, CSS, JS and HTML pages that are then delivered to customers close to the server in the CDN. CDNs help improve site load times. Examples of CDNs are Amazon CloudFront, Akamai ImageManager, Fastly IO, PageCDN etc.

Here's how a CDN might work:

![CDN](./images/system-design/cdn.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

- User 1 requests an image that is not found in the CDN. The image is requested from **origin** (or the main server)
- The image is then stored in the CDN
- The image is then returned to the user
- User 2 requests the same image from the same geographical location. The image is found in the CDN and the image is returned to user 2 faster.

CDN content comes with a **TTL** or time to live that describes how long the image can be cached. 

**CDN Drawbacks**
- **Cost** 
CDNs are run by third-party providers, and you are charged for data transfers in and out of the CDN. Caching infrequently used assets provides no significant benefits so you should consider moving them out of the CDN.

- Setting an appropriate cache expiry: For time-sensitive content, setting a cache expiry time is important. The cache expiry time should neither be too long nor too short. If it is too long, the content might no longer be fresh. If it is too short, it can cause repeated requests to the origin servers thus making the CDN useless.

- If all your users are located within the same geographical region, say Europe, you don't need a CDN in US for your customers.

- **CDN fallback**
You should consider how your website/application copes with CDN failure. If there is a temporary CDN outage, clients should be able to detect the problem and request resources from the origin.

Here's the complete diagram with CDN and cache added:

![Complete with CDN and Cache](./images/system-design/complete-with-cdn-and-cache.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

In the diagram above we have plenty of improvements over our single server setup:
- Static assets are directly fetched from CDNs that are located close to the end user
- A load balancer is able to scale up/down our backend based on demand and is able to route our requests appropriately
- Database load is lightened by caching data
- Data stored in the database is replicated across followers so that reads are faster

### Web Tier and Statelessness
To understand statelessness we must first understand what stateful means. In a stateful architecture, a user's data is "remembered" between sessions. For example, say a user connects to server A, updates his/her profile, and then disconnects. The next time user A re-connects, he/she needs to be re-directed to server A since that is where user's latest information is. Example:

![Stateful](./images/system-design/stateful.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

Now if user A's login information is stored on server A, then to authenticate user A, all his/her requests need to be routed to server A. The issue here is that the same client must be routed to the same original server. This leaves us at a disadvantage that prevents us from scaling down or up since the server needs to stay up in-case user A logs back in! This also makes it difficult for us to handle server failures. 

A better approach would be to have **non-sticky** sessions where no user information is stored on ANY server. Instead, user information is kept in shared storage in the **data tier** that allows us to fetch user information whenever he/she logs in. This is called **stateless** architecture:

![Stateless](./images/system-design/stateless.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)
   
As you can see above, our users can be re-directed to ANY server which will then fetch state data from a shared data store. As a result, state data is kept out of web tier which makes our **web tier stateless**. 

Now, our overall picture with a stateless web tier looks like so:

![Overall Stateless](./images/system-design/overall-stateless.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

After the state data is moved out of web servers, auto-scaling of the web tier is easily achieved by adding or removing servers based on traffic load. We no longer have to keep servers around unnecessarily since web tier servers contain no state information and can be added/removed based on traffic. 

### Data Centers
Now let's say this is where we are in our journey to build the ultimate fault tolerant website:
- We have CDN setup to deliver static content to our user FAST
- Our web tier lies behind a load balancer that uses one of the algos listed earlier to route requests
- Our web tier is configured to auto-scale
- Our state data is in the data tier
- Our data tier is replicated 
- We have cache setup for better response times

But what if our servers (both in web and data tier) located in the USA east region and there's a power outage that takes down our server farm? Our website would be down as well! How would we go about making sure that our website is immune to such accidents and is still able to load for users that are farther away from us geographically?

Enter: **multiple data centers**

We'd have multiple data centers with the same setup(architecture) BUT located in geographically separated regions. For example, we could have one data center in Virginia USA and another in Oregon USA. Thinking globally, we can have another in Shanghai and another in London. 

Now, with the introduction of multiple data centers, how do we route our customers' requests? For example, if a user is in Europe, would the request be routed to Oregon data center or London? Obviously London! We'll do that via **geo-routing**

### Data Centers: Geo routing
Geolocation routing lets you choose the resources that serve your traffic based on the geographic location of your users, meaning the location that DNS queries originate from. For example, you might want all queries from Europe to be routed to a load balancer in the London region. It allows domain names to be resolved to IP addresses based on the location of a user:

![Geo DNS](./images/system-design/geo-dns.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

Now, if the data center closest to the customer is down (due to a natural disaster), requests can then be routed to the second closest data center. In order to make geo routing possible, there're a few things that need to be figured out:

 - Traffic redirection: Effective tools are needed to direct traffic to the correct data center. GeoDNS can be used to direct traffic to the nearest data center depending on where a user is located.
 - Data synchronization: Users from different regions could use different local databases or caches. In failover cases, traffic might be routed to a data center where data is unavailable. A common strategy is to replicate data across multiple data centers.
 - Test and deployment: With multi-data center setup, it is important to test your website/application at different locations. Automated deployment tools are vital to keep services consistent through all the data centers. 


### Decoupling
Let's have another look at the system we've designed so far:

![Overall](./images/system-design/geo-dns.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

In the system above, we've got our servers receiving requests from the client. Let's assume, our client requests are simple: delivering your dynamic website. The architecture as shown would work perfectly. Now imagine if your website offers another service: processing images and returning the classification of objects found in the image: 

![Image classification](./images/system-design/image-classification.png) [Image Credit](https://www.kdnuggets.com/2018/09/object-detection-image-classification-yolo.html)

Now the classification process is more time consuming than simply returning an HTML webpage. Your servers that receive request from your client must wait for the processing servers to finish classification and THEN return back to the client. Your client servers are dependent on processing servers. This makes our system tightly coupled. We want to decouple our system so that we can scale up or down our processing servers. This classification process cannot be performed by any of the services we've seen so far:
 
 - CDN: this is only for static content
 - Load balancer: Routes your traffic
 - Cache: Prevents multiple hits to the database
 
 We need something else! Enter: **message queues**

### Decoupling: Message Queues
A message queue is a durable component, stored in memory, that supports asynchronous communication. It serves as a buffer and distributes asynchronous requests. The basic architecture of a message queue is simple. Input services, called producers/publishers, create messages, and publish them to a message queue. Other services or servers, called consumers/subscribers, connect to the queue, and perform actions defined by the messages. We'll add these queues to the datacenter.

![MQ](./images/system-design/message-queue.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

Decoupling makes the message queue a preferred architecture for building a scalable and reliable application. With the message queue, the producer can post a message to the queue when the consumer is unavailable to process it. The consumer can read messages from the queue even when the producer is unavailable. If the number of messages in our queue reach a certain threshold, we can increase the size of our processing cluster to quickly process the classification requests. Once the requests are no more, we can scale down our processing cluster:


![MQ2](./images/system-design/message-queue-2.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

Here's the architecture (with only a single data center shown - in reality you'll have multiple data centers):

![Decoupled](./images/system-design/decoupled.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

Having said that, here's a summary of techniques we've talked about:

- Keep web tier stateless
- Build redundancy at every tier
- Cache data as much as you can
- Support multiple data centers
- Host static assets in CDN
- Scale your data tier by sharding
- Split tiers into individual services
- Monitor your system and use automation tools

### System Design
Before we can design a system, we need to be able to understand the key characteristics of a distributed, robust system. These characteristics include Scalability, Reliability, Availability, Efficiency, and Manageability. We've already seen what scalability means (vertical vs horizontal), reliability (where even with system failures, the service remains functional with no impact on services) and availability (system is up - not necessarily reliable though).

### Reliable vs Available
If a system is reliable, it is available. However, if it is available, it is not necessarily reliable. In other words, high reliability contributes to high availability, but it is possible to achieve a high availability even with an unreliable product by minimizing repair time and ensuring that spares are always available when they are needed. 

### Back of the envelope Estimation
Below is a table explaining the data volume unit 

![Power of Two](./images/system-design/power-of-two.png) [Image Credit](https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF)

Some common facts: 

                   • Memory is fast but the disk is slow.
                   • Avoid disk seeks if possible.
                   • Simple compression algorithms are fast.
                   • Compress data before sending it over the internet if possible.
                   • Data centers are usually in different regions, and it takes time to send data between them.
                   


### Useful architectures
 - [WordPress on AWS](https://docs.aws.amazon.com/whitepapers/latest/best-practices-wordpress/reference-architecture.html)
 - [Netflix active-active](https://netflixtechblog.com/active-active-for-multi-regional-resiliency-c47719f6685b)
 