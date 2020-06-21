---
title: Dynamic Programming
date: 2020-06-21
thumbnail: /post-images/dynamic-programming.png
draft: false
extract: Dynamic programming
categories: 
    - General
tags:
    - Dynamic programming
---

1. [Fibonacci](#fibonacci)

### Introduction

DP is a general technique for solving optimization, search, and counting problems that can be decomposed into sub-problems. You should consider using DP whenever you have to make choices to arrive at the solution, specifically, when the solution relates to sub-problems.
Like divide-and-conquer, DP solves the problem by combining the solutions of multiple smaller problems, but what makes DP different is that the same sub-problem may reoccur. Therefore, a key to making DP efficient is caching the results of inter- mediate computations. 

The key to solving a DP problem efficiently is finding a way to break the problem into sub-problems such that
• the original problem can be solved relatively easily once solutions to the sub¬ problems are available, and
• these sub-problem solutions are cached.
Usually, but not always, the sub-problems are easy to identify.

### Fibonacci

Let's start with fibonacci as an example for dp. Fibonacci series is this sequence:

$$$
F_{N} = F_{N-1} + F_{N-2}
$$$
$$$
F(0) = 0;
$$$
$$$
F(1) = 1;
$$$

Now, a simple C++ program to calculate $N^{th}$ fibonacci number:

```cpp
int Fib(int n){
    if (n == 0)
        return 0;
    if (n == 1)
        return 1;
    int ans = Fib(n-1) + Fib(n-2);
    return ans;
}
```

This approach works and is quite easy to derive. Let's run through the calls to see how we'd get the 5th fib number (5):

![Fib-5-Image](./images/fib/fib.png)

In the image above, notice how we're calculating fib(3) twice, and fib(2) 4 times!  This is in efficient. We can reduce the time complexity by caching results that we've already calculated. This would allow us to reduce our time from polynomial to linear at the expense of additional space:

```cpp
int DPFib(int n){
    if (n == 0)
        return 0;
    if (n == 1)
        return 1;
    
    int minusTwo = 0;
    int minusOne = 1;
    int currFib = -1;
    for (int i = 2; i <= n; i++){
        currFib = minusOne + minusTwo;
        minusTwo = minusOne;
        minusOne = currFib;
    }
    return currFib;
}
```

We only need to keep track of the previous two terms, so every time we calculate a new term, we update minus one and minus two.



