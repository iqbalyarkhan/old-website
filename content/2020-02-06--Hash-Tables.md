---
title: Hash Tables
date: 2020-02-06
draft: true
extract: An analysis of hash table data structure
categories: 
    - Data Structures
tags:
  - Data Structures
  - Hash Tables
---

### Table of Contents

1. [Introduction](#introduction)

2. [Structure](#structure)

3. [Constructor](#constructor)

4. [Insert](#insert)

5. [Recursive Insert](#recursive-insert)

6. [Traversal](#traversal)

7. [Find](#find)

8. [Max](#max)

9. [Min](#min)

10. [Delete](#delete)

11. [Destructor](#destructor)

12. [Running time analysis](#running-time-analysis)

13. [Trees as arrays](#trees-as-arrays)

14. [Conclusion](#conclusion)
### Introduction

In this post I'll talk about a type data structure called hash table. Staying true to our theme so far, each data structure we've seen has offered some pros and cons and depending on your use case, you'd weigh those pros and cons and choose the relevant data structure. Similarly, hash tables have their pros and cons that make them suitable for certain scenarios and disadvantageous for others. Let's have a look at the properties of a hash table.

Hash tables offer very fast insertion and deletion. No matter how many items there are$^*$, hash tables offer $O(1)$ insert, search and deletion. That sounds too good to be true! It is because in some cases this might not hold however hash tables do offer faster lookup, insert and delete than tree data structures. 

On the other hand, hash tables are built on top of arrays and as we know, expanding the capacity of an array is expensive once it has been intialized. Additionally, hash tables are not ideal when you need to access/visit items in an order.

In short, if you have a fairly good idea of how many elements you're going to be adding to your table in advance and do not need to access items in a particular order (for example smallest to largest), then hash tables are the way to go!

### Structure

The example below shows a sample hash table. Notice how it looks very much like an array. That's because it is an array. We leverage array's $O(1)$ access time to make hash tables' fast access, delete and inserts. 

![Array-structure](images/hashtables/hash1.png)

How do we determine which value goes in which cell? To do so, we use something called a "hash function". A hash function has one job:


**- Take in an input** 

**- Do some calculation**
  
**- Return a value (which is the outcome of the calculation in step 2)**

Usually, the calculation is to perform a modulo operation of the input with the size of the array. So, for example, if our input is 36 and array size is 8, then 

36 % 8 = 4

Meaning that 36, should be placed in our array at index 4. Do so for each input and you've populated your hash table:



![Array-Structure-With-Hash-Function](images/hashtables/hash2.png) [Image Credit](https://cse.iitkgp.ac.in/~wbcm/wbcm/assignment/public/cs290032015s/asgn12/common/)


