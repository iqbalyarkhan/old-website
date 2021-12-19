---
title: Key Indexed Counting
date: 2020-04-10
thumbnail: /post-images/keyindexcounting.png
draft: true
extract: An analysis of key index counting of strings
categories: 
    - DS&A
tags:
  - Algorithms
  - Key index counting
---

### Table of Contents

1. [Introduction](#introduction)

2. [Logic](#logic)

3. [Insertion](#insertion)

4. [Code](#code)

    * [Put](#put)
    
    * [Find](#find)

### Introduction
There are plenty of applications where we need to search through strings. To do so, we can use conventional sorting algorithms such as quick sort and merge sort that run in $O(N log N)$ time, but can we do better? This post will have a look at an approach that allows us to do better.

### Logic

Let's see how we can go about sorting a string without actually using compares. This approach is great for situatios where the keys that we're using to sort are small integers. Say, we have 4 sections in a class and we want to list the names of students in each section but this list needs to be ordered by section number. So, section 1 students should be listed first, then section 2 and so on. Let's say we have this array:

```css
Name Section
asd     1
wew     2
nas     3
kop     1
mnx     2
gge     1
wes     4
mki     3
jds     4
qqq     2
fdd     1
nhy     3
nij     4
mih     1
hhe     2
```
Here's how the algorithm goes: Create an array equal to 1 more than the number of sections. Let's call this array `count`: [0,0,0,0,0].

Next, iterate through the data and increment `count[section+1]` for each section encountered. For example, if we get section 2, increment `count[4]`. We'll later see why we need to do this. So, here's what the `count` array would look like if you populated it using the data we looked at earlier:

