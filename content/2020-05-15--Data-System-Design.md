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

**These are my notes as I go through the book [designing data intensive applications](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/)**

1. [Intro](#intro)
2. [Reliability](#reliability)
3. [Scalability](#scalability)
    * [Load](#load)
    * [Twitter](#twitter)
4. [Storage and Retrieval](#storage-and-retrieval)

### Intro

As the amount of data produced by various sources increases, so does the need to process and make sense of the data. As a result, applications today are `data intensive` as opposed to `compute intensive`. 

These data intensive apps may need to:
- Store data (in databases)
- Speed up reads by remembering results of expensive operations (caches)
- Allow users to search/filter the data collected (search index)
- Allow for multi-processing by sending message to another application asynchronously (stream processing)
- Process large chunks of data at regular intervals (batch processing)

To do so there are various tools and techniques that can be used in conjunction to create a tool for the job at hand. Since these systems can get complex with multiple mini systems "stitched" together, we create an API to hide the details of such a system from the client. In doing so, you have created a special purpose data system from smaller, general purpose components.

When such systems are created, there are 3 main concerns for the designer: 
- Reliability of the system
- Scalability of the system
- Maintainability of the system

### Reliability

A reliable system is one that **continues to work correctly(ie correct function and performance levels) in the face of adversity(hardware or software failures).**

Reliable systems are fault tolerant: this fault can be a human error (incorrect input) or hardware/software errors. Even under faulty circumstances, our system continues to be reliable. Reliable systems are **resilient** and **fault tolerant**.

There are several types of faults:
- Hardware faults: Hard disk crash, RAM becomes faulty, electric outage etc. To prevent hardware faults, we add redundancy to our applications: setup disks in RAID (redundant array of independent disks) configuration, have dual power supplies, backup power for data centers etc.  

- Software faults: Leap year errors, bad input errors etc. Happen in unusual set of circumstances. 

- Human errors

### Scalability

A scalable system is one that is **able to deal with its growth**. Growth can be defined as increased volume of data or increased traffic volume. Scalability is used to describe how the system copes with increased load. 

It doesn't make sense to just say system X is scalable. What does that mean? Scalability needs to be considered by asking questions like **if the system's load increases how are we going to handle that growth?** For example, a system could suddenly go from 100 to million users or a client uploads TBs of data through our system: is our system able to handle these sudden spikes? 

#### Load

To handle `load`, we need to first describe what load means and how we can measure it. To do so, we make use of **load parameters**: these could be:
- Requests per second for a web server: as number of users increase the number of requests for your homepage increase thus the requests per second increase
- Ratio of reads to writes for a database: as a user uploads TBs of data through our system, we need to be able to handle large writes etc.

In each unique scenario, the load would mean something different: perhaps the bottleneck is due to a small number of extreme cases.

#### Twitter

Let's have a look at a concrete example using twitter: twitter's main operations are:
- post tweet: Publish a tweet to one's followers (4.6K req/sec on avg 12K at peak) 
- home timeline: View one's timeline (300K req/sec)

This seems easy to handle until you consider **fan-out** where each user follows many people and each user is followed by many people. 

One approach could be to store tweets in a single DB. When I open twitter and request my TL, lookup all the people I follow, grab their tweets from the DB, sort them by time and display those tweets for me. This is quite expensive if I follow a lot of people who tweet alot! 

Another approach could be to have a cache for my timeline. If I follow Elon, every time he tweets, insert that new tweet into my home TL cache. So, when I open my TL the next time, I'll have all the tweets already present ready to be displayed for me. The request to read here is cheap because the results have been calculated ahead of time.

When twitter initially launched, the first approach was used but the systems were overwhelmed. That was because people request for the home TL twice as much as they tweet so it is preferred to do more work at write time than at read time. It makes sense that since most people are requesting for timelines, twitter would make sure that the TL loads faster. 

The second approach also has a downside: every time someone tweets, the system has to lookup all that person's followers and add it to their cached TLs. Consider this for a famous person who has millions of followers, delivering the new tweets to each follower's TL in < 5 secs is a challenge. Therefore, in our twitter example, the key **load parameter** would be the number of followers per user weighted by the frequency of tweets. If a person with millions of followers tweets a lot, this would be a significant increase in twitter's load as compared to a person with few followers who rarely tweets. 

As it turns out, twitter has implemented a hybrid approach where people with few followers are delivered cached tweets (approach 2) while people with millions of followers are delivered tweets using approach 1.


### Storage and retrieval  
