---
title: Dynamic Programming
date: 2020-06-26
thumbnail: /post-images/dynamic-programming.png
draft: false
extract: Dynamic programming
categories: 
    - General
tags:
    - Dynamic programming
---

1. [Introduction](#introduction)
2. [DP and Recursion](#dp-and-recursion)
3. [0-1 Knapsack](#0-1-knapsack-problem)
6. [Max subarray](#max-subarray)
7. [Unique ways to make change]()
12. [Conclusion](#conclusion) 


### Introduction

DP is a general technique for solving optimization, search, and counting problems that can be decomposed into sub-problems. You should consider using DP whenever you have to make choices to arrive at the solution, specifically, when the solution relates to sub-problems.

Like divide-and-conquer, DP solves the problem by combining the solutions of multiple smaller problems, but what makes DP different is that the same sub-problem may reoccur. Therefore, a key to making DP efficient is caching the results of inter- mediate computations. 

The key to solving a DP problem efficiently is finding a way to break the problem into sub-problems such that

- the original problem can be solved relatively easily once solutions to the sub¬ problems are available, and
- these sub-problem solutions are cached. (Usually, but not always, the sub-problems are easy to identify) 

DP can be used to find the total number of ways to do something (for example making a change) and if you optimize how you determine each "way", you'd get the optimal solution. Thus, DP can be used to find all combinations AND the optimal solution.

From the discussion above, it is clear to see that DP is nothing but optimized recursion. Therefore, before jumping into dynamic programming, be sure to go over my [recursion](/recursion) post. 

### DP and recursion

I said earlier that DP is optimized recursion. What does that mean? It means that while we're recursing to solve a problem, we might run into instances where we're redoing work that was previously done in another recursive call. As a result we're performing work that has already been done which is obviously inefficient. To get rid of this redundancy, we can trade space for time where we use extra space to store results we've already calculated. This technique of storing results is known as dynamic programming. 

While trying to understand the DP, I found various sources on the internet that used the table creation technique. Our aim should not be to create the said table but to understand WHY that table is created. DP doesn't require the creation of a table for every problem! 

So how do we know that DP is required to solve a given problem:
 
- If DP is optimized recursion, any recursive problem is also a DP problem!
    - There'll be a **choice** (include or exclude something etc) to make and the subproblems overlap. If there are more than one calls being made in each recursive call, ie the recursive functions is calling itself more than once, there is a good chance that it can be optimized using DP.
    
- DP also deals with optimization as in find the least number of steps, or the most profitable method etc
    - There might be keywords such as minimum, maximum, etc. Where you're looking to either find the max or the min or the least or the most!
    
Therefore, to summarize if there's recursion and there are more than 1 calls being made to the recursive function in each recursive call:

```cpp
    return Fib(n-1) + Fib(n-2)
```

then we can use DP to cache the results. Secondly, if it is an optimization problem, then using DP is required. Without a recursive solution, creating a table would result in errors. 

### 0-1 Knapsack Problem
**The knapsack problem is a problem in combinatorial optimization: Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible. It derives its name from the problem faced by someone who is constrained by a fixed-size knapsack and must fill it with the most valuable items. The problem often arises in resource allocation where the decision makers have to choose from a set of non-divisible projects or tasks under a fixed budget or time constraint, respectively.**


### Max Subarray

**Find the maximum sum over all subarrays of a given array of integers.The maximum subarray is one where consecutive entries when added yield the largest sum of all subarrays.** 

Example:
```cpp
<4,3,-9,8,-1,5,6,-2,-9,7>
```

The maximum sum would be this subarray: 8 + -1 + 5 + 6 = 18 

Approach 1: Start at first index, add to this index every other element in succession and keep track of the largest sum seen in this sequence. For example, start with 4 then:

- 4 + 3
- 4 + 3 - 9
- 4 + 3 - 9 + 8
- 4 + 3 - 9 + 8 -1
 
 and so on. Repeat this process for every other element and compare the max. This would get you the max in $O(N^2)$ time. That is because you'd have to do $O(N)$ work for each element when you iterate over every other element. Can we do better?

Approach 2: We can keep a running sum and start from there. Let's see:

```cpp
        4   3   -9  8   -1  5   6   -2  -9  7
sum:    4   7   -2  6   5   10  16  14  5   12
```
Ok, so the running sum doesn't help but it's a start. Now let's think through it logically. When we look at the running sum, notice that we were good until the third element after which the running sum and the correct answer had no correlation. That makes sense because we have negative integers in the array. Just keeping the sum is not enough. 

We're looking for the largest sum right? So whenever the running sum becomes less than the current element, change the running sum's value to the current element. That is because up to the third index, we were doing the best we could but suddenly a higher number was presented and we can be 100% sure that the max sum in the array CANNOT be before 8. So ditch the running sum, and update it to the current element:

 Formally:
 
$$$
\textrm{runningSum} = max (A[i],\textrm{runningSum} + A[i]) 
$$$

Let's see how this affects our totals:

```cpp
        4   3   -9  8   -1  5   6   -2  -9  7
sum:    4   7   -2  8   7   12  18  16  7   14
```

Now, notice how the max sum, 16, occurs at the end of the sequence! This works because at each index, the max sum has 2 possibilities:
- The max sum is just the element itself
- The max sum is sum so far and the element

Since there can be only one max, we choose the larger value of the two bullet points above to determine our max.

To summarize, this algorithm is called **Kadane's Algorithm** where running sum is equal to the max of curr and running sum plus curr.
Code:

```cpp
int MaxSum(vector<int>& A){
    int curr = A[0], sum = curr, ans = curr;
    for (int i = 1; i < int(A.size()) - 1; i++){
        curr = A[i];
        sum = max(curr,sum + curr);
        ans = max(ans, sum);
    }
    
    return ans;
}
```

Running time is $O(N)$

### Unique ways to make change

**Given an amount and the denominations for the currency, find the total number of unique ways that the amount can be created. For example:**

```cpp
Amount = 5
Coins = 1,2,5

You can make 5 using 4 unique combinations:
 1 + 1 + 1 + 1 + 1 = 5
 1 + 1 + 1 + 2 = 5
 1 + 2 + 2 = 5
 5 = 5
``` 

How do we go about tackling this? Notice the quest

### Conclusion

- DP is applied usually when you need to iterate or find something from ALL combinations of a sequence
- DP can be used when you're looking for a combination out of possible scenarios. These are questions where you need to make decisions based on where you are in the algorithm