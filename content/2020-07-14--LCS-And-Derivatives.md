---
title: LCS And Derivatives
date: 2020-07-14
thumbnail: /post-images/lcs.png
draft: false
extract: Longest Common Subsequence and its derivatives
categories: 
    - Dynamic Programming
tags:
    - Dynamic programming
---

1. [Introduction](#introduction)
2. [Longest Common Subsequence Recursive](#longest-common-subsequence-recursive)


### Introduction

In this section we'll be dealing with some interesting string problems and we'll understand how to use DP to solve them

### Longest Common subsequence recursive
**Given two strings, find the length of longest common subsequence present in both strings**

```cpp
string A = "ABDGEWL";
string B = "GFEDWSL";
//Longest common subsequence: GEWL therefore 4
```

(1) **Base Case**
In our recursion post, we started with the smallest valid input. Therefore, if we're given two strings as input, then what would be the smallest valid input? It would be where n == 0 OR m == 0 where n is the size of string A and m is the size of string B.

If any one of our two strings is of size 0, ie one is empty or both are empty, what is the length of LCS of these two strings? It'd be 0! So, we've figured out what our base case should be.

Translating this to code we have:

```cpp
int LCS(string A, string B, int n, int m){
    if (m == 0 || n == 0)
        return 0;
}
```

(2) **Choices we have**
Next, let's look at the case where our strings aren't empty:
* **Current characters match**:
If the two characters match, you've found a member of the sequence, so you recursively call the function again but add 1 to the total since there's a match

* **Current characters do not match**:
If the two don't match, you decrement the size of one string and keep the other at its current length and recurse. Then you decrement the other and keep the original as is and recurse. Finally, you return the max returned from these two recursive calls:


```cpp
int LCS(string A, string B, int n, int m){
    if (n == 0 || m == 0)
        return 0;
    if (A[n-1] == B[m-1]){
        //There's a match!
        return (1 + LCS(A, B, n-1, m-1));
    } else {
        int b = 0, c = 0;
        //Decrement one and compare
        b = LCS(A, B, n-1, m);
        //Decrement other and compare
        c = LCS(A, B, n, m-1);
        return max(b,c);
    }
}
```