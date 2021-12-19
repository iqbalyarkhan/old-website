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

- [Introduction](#introduction)
- [Tiling](#tiling)
- [Longest Increasing Subsequence](#longest-increasing-subsequence)
- [Minimum Path Sum](#minimum-path-sum)
- [Conclusion](#conclusion)

100. [Conclusion](#conclusion)


### Introduction
In this post, we'll be dealing with some interesting problems and we'll understand how to use DP to solve them. Before we deep dive let's see what types of problems can be solved using DP:

- Recursive problems with overlapping structures. This means, any problem in the [recursion](/recursion) post that has substructure where we're solving already solved sub-problems (factorial, subset sum, common subsequence, common substring, min insertions and deletions, stair case etc). I've discussed such approaches in the [unbounded knapsack](/unbounded-knapsack) and [0-1 knapsack](/0-1-knapsack) posts.

- Some problems are not recursive in nature but still use DP. These are problems where we need to keep track of previously calculated values and obtain current answer by performing some modification, or comparing those values. 

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

### Longest Increasing Subsequence
**The Longest Increasing Subsequence (LIS) problem is to find the length of the longest subsequence of a given sequence such that all elements of the subsequence are sorted in increasing order. For example, the length of LIS for {10, 22, 9, 33, 21, 50, 41, 60, 80} is 6 and LIS is {10, 22, 33, 50, 60, 80}**

Let's start with an imaginary array, `A`, that is currently being processed at index `i` and we already know the length of LIS from positions A[0....i-1]:

```cpp
                        i 
A = {......, 4, 11, 8, 10
LIS = {...., 3, 5,  2, __ }
```

Since we're processing `i`, we need to find the longest increasing subsequence length at `i`. Now, how would we go about calculating this value? We'll have to compare value at `A[i]` with every element seen so far. We can add 10 at the end of any sequence where the element is < 10 (since the problem asks for longest increasing subsequence). Let's work our way through the array. We'll use `j` to move back from `i`:

```cpp
                    j   i 
A = {......, 4, 11, 8, 10
LIS = {...., 3, 5,  2, __ }

is A[j] < 10? Yes! We can add 10 to sequence ending at 8. 
In doing so, our sequence ending at 10 would have length 3:

                    j   i 
A = {......, 4, 11, 8, 10
LIS = {...., 3, 5,  2, 3 }

Let's move j back again:

                 j      i 
A = {......, 4, 11, 8, 10
LIS = {...., 3, 5,  2, 3 }

is A[j] < 10? No, we cannot add 10 after 11,
ignore and move on:

             j          i 
A = {......, 4, 11, 8, 10
LIS = {...., 3, 5,  2, 3 }

is A[j] < 10? Yes! If I add 10 to 
sequence ending at 4, would I get a longer
sequence than what I currently have? 
I currently have sequence of length 3 at 10,
if I use sequence ending at 4, I'd have length
4! So i'll use this sequence:

             j          i 
A = {......, 4, 11, 8, 10
LIS = {...., 3, 5,  2, 4 }
```

That's it! We continue with this logic until there're no more items to be processed. While going through this process, we can also keep track of the newly updated value that can then be returned at the end:

```cpp
int lis(vector<int>& vals){
    vector<int> maxVals(int(vals.size()), 1);
    int ans = 0;
    for (int i = 1; i < vals.size(); i++){
        for (int j = i-1; j >= 0; j--){
            if( (vals[i] > vals[j]) && (maxVals[j] + 1 > maxVals[i]) ){
                maxVals[i] = maxVals[j] + 1;
                ans = maxVals[i];
            }
        }
    }
    
    return ans;
}
```

Running time is $O(N^2)$

### Minimum Path Sum
**Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right, which minimizes the sum of all numbers along its path. Note: You can only move either down or right at any point in time.**

Example:
```cpp

[
    [1,3,1],
    [1,5,1],
    [4,2,1]
]

answer = 7
1-3-1-1-1:

[
    [1,3,1],
    [X,X,1],
    [X,X,1]
]
```

Ok, so how do we know this is a dynamic programming problem? The wording is our clue here: `minimum` path sum. We're asked to minimize the sum. 

### Conclusion

- For generic DP problems, look to break the problem down by starting with smallest valid input. Next, determine what choices you have and what to do with results you get back after applying those choices to the problem.