---
title: DP Discussion
date: 2020-08-02
thumbnail: /post-images/dynamic-programming.png
draft: true
extract: A deep dive into DP problems
categories: 
    - Dynamic Programming
tags:
    - Dynamic programming
---

1. [Introduction](#introduction)
2. [Tiling](#tiling)
3. [Dominoes Board Filling]

100. [Conclusion](#conclusion)


### Introduction
In this post, we'll be dealing with some interesting problems and we'll understand how to use DP to solve them. Before we deep dive let's see what types of problems can be solved using DP:

- Recursive problems with overlapping structures. This means, any problem in the [recursion](/recursion) post that has substructure where we're solving already solved sub-problems (factorial, subset sum, common subsequence, common substring, min insertions and deletions, stair case etc). I've discussed such approaches in the [unbounded knapsack](/unbounded-knapsack) and [0-1 knapsack](/0-1-knapsack) posts.

Let's look at a few techniques on how to solve such problems:

### Tiling

**Given a “2 x n” board and tiles of size “2 x 1”, count the number of ways to tile the given board using the 2 x 1 tiles. A tile can either be placed horizontally i.e., as a 1 x 2 tile or vertically i.e., as 2 x 1 tile.**

Ok, so let's start with the base case: 

- **Base Cases**

One base case is when the board is 2 X 1. Here, we've got one way to fill it: by vertically placing our tile.

Another base case is when the board is 2 X 2. Here, we've got two ways to fill it: by vertically placing the tile twice or by horizontally placing the tile twice

- **Recursive Cases**

Recursive case is determined when we apply our choices to the problem. We have two choices:

- If we choose to place our tile vertically, the problem is reduced to $2 \times N - 1$ since a vertical tile will cover only one column
- If we choose to place our tile horizontally, the problem is reduced to $2 \times N - 2$ since a horizontal tile will cover two columns

Finally, the total number of ways is the sum of the two choices above. Converting this to code we have:

```cpp
int numWays(int n){
    if (n == 1 || n == 2)
        return n;
    int vert = numWays(n-1);
    int horiz = numWays(n-2);
    return vert + horiz;
}
```

We can then apply factorial DP technique to reduce the run time of this problem 


### Conclusion

- For generic DP problems, look to break the problem down by starting with smallest valid input. Next, determine what choices you have and what to do with results you get back after applying those choices to the problem.