---
title: DP Discussion
date: 2020-08-02
thumbnail: /post-images/dynamic-programming.png
draft: false
extract: A deep dive into DP problems
categories: 
    - Dynamic Programming
tags:
    - Dynamic programming
---

1. [Introduction](#introduction)
2. [Longest Increasing Subsequence](#longest-increasing-subsequence)


### Introduction
In this post, we'll be dealing with some interesting problems and we'll understand how to use DP to solve them. Before we deep dive let's see what types of problems can be solved using DP:

- Recursive problems with overlapping structures. This means, any problem in the [recursion](/recursion) post that has substructure where we're solving already solved subproblems (factorial, subset sum, common subsequence, common substring, min insertions and deletions, stair case et). I've discussed such approaches in the [unbounded knapsack](/unbounded-knapsack) and [0-1 knapsack](/0-1-knapsack) posts.

- DP programming can also be used to solve problems where solutions are built on top of previously derived solutions. Let's look at a few such problems:

### Longest Increasing Subsequence

**Given an array, return the length of the longest increasing subsequence**.

Example:
```cpp
Input: arr[] = {50, 3, 10, 7, 40, 2, 60}
Output: Length of LIS = 4
The longest increasing subsequence is {3, 7, 40, 50}
```

You can think of this problem recursively where each element can either be picked or ignored. In that case, our running time would be $O(2^N)$ since each element has 2 choices and there are a total of $N$ elements. A better approach might be possible if we think about the subproblems involved.

Let's see. The base case is when there just a single element, since an element by itself can be characterized as increasing. Therefore, our LIS length if we're given just a single character would be 1. 

Next, as we move along our array of elements, we need som way to keep track of the LIS so far, we'll use a variable called `lisSoFar`. Initially, this would be 1. Next, we'll also keep track of the position where we changed this value just so that we can keep track of the last increasing value we saw. We'll call this `lisPos`. 

```cpp
//Initialization
lisSoFar = 1
lisPos = 0 //first element
``` 

Next, we'll start with `arr[1]`, `i` represents our current position:
```cpp

lisSoFar = 1
lisPos = 0

    i
50  3   10  7   40  2   60
```

If our `arr[i]` > the last element in the increasing subsequence, we'll increment `lisSoFar` and assign `i` to `lisPos`. However, 3 < 50, so we'll not make any updates and 

