---
title: Greedy Algorithms
date: 2020-08-16
thumbnail: /post-images/greedy.png
draft: true
extract: A deep dive into greedy algorithms
categories: 
    - General
tags:
    - Greedy Algorithms
---

1. [Introduction](#introduction)
2. [Examples](#examples)
    * [Coin change](#coin-change)


### Introduction
In this post, we'll discuss the greedy technique to solving various problems. Let's start with what it means to be greedy while designing an algorithm to solve a problem. A greedy algorithm is an algorithm that that computes a solution in steps and at each step this algorithm makes a **locally optimum** decision. Once that decision is made, the algorithm DOES NOT return to the step in question and undoes the decision.

Let's see what greedy approach is all about:

**Given a target change that needs to be made and possible coins, find the fewest number of coins needed to make that change**

Say our target is \$48 and possible coins are \$30, \$24, \$12, \$6 and \$3. Greedy approach would make the locally optimum approach by choosing the **largest denomination** available less than the change that needs to be made:

```cpp
target 48
pick: 30

target: 18
pick 12

target: 6
pick 6

total of 3 coins
``` 

It is clear that greedy approach won't work here since fewest coins are \$24 and \$24 (total of 2 coins). Having said that, there're problems where greedy approach DOES indeed result in a globally optimum solution. Let's have a look at a few such examples.





 
