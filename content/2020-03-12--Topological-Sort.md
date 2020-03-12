---
title: Topological Sort
date: 2020-03-12
draft: true
extract: Analysis of topological sort algorithm
categories: 
    - Sorting Algorithms
tags:
  - Graphs
  - Sorting Algorithms
---

### Table of Contents

1. [Motivation](#motivation)

2. [Logic](#logic)

3. [Code](#code)

4. [Resource](#resources)

In this post, I'll assume you have sufficient directed graph knowledge. If not, feel free to browse through my post on [directed graphs](/directed-graphs).

### Motivation

The word topology literally means **the way in which constituent parts are interrelated or arranged**. Therefore, topological sort deals with the idea of sorting elements based on their arrangement or specified order. For example, we can use topological sort to come up with a curriculum for a typical CS student based on the classes required for graduation and their pre-requisites. The idea is that you can't enroll for advanced algorithms without completing introduction to computer science class. 

### Logic

Let's say you're a math major and have this arrangement of required classes for your degree:

![Topological-Sort-Image-1](images/topologicalsort/topologicalsort_1.png)[Image Credit - La Fore Data Structures](https://www.pearson.com/us/higher-education/program/Lafore-Data-Structures-and-Algorithms-in-Java-2nd-Edition/PGM32075.html)

The directed graph above shows that before you enroll for Senior Seminar, you need to have passed Advanced Algebra and before you can enroll for Advanced Algebra, you need to have successfully passed Algebra. Therefore, one possible path to getting a degree is:

```css
CABFDEGH
```

Notice how we take the introductory courses first and then proceed to more advanced courses. There is no course taken out of order. Also, the arrangement of courses for a given degree plan might not be a unique solution. For example, instead of completing `CAB` first in that order, one might choose to complete the requirements in this order: 

```css
ABCFDEGH
```

Creating this course plan from the possible courses directed graph requires the use of topological sort.
