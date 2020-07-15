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
3. [Longest Common Subsequence Memoized](#longest-common-subsequence-memoized)
4. [Longest Common Subsequence Bottom up](#longest-common-subsequence-bottom-up)


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
If the two characters match, you've found a member of the sequence, so you recursively call the function again but add 1 to the total since there's a match. For example, say you have the following two strings and `n` and `m` are pointing to the characters shown:

```cpp
                n
A   B   J   L   P
                m
B   N   L   C   P
```

Here, the two characters are equal, so we will continue to recurse BUT will add 1 to our total. Also, we'll decrement both `n` and `m` to search remaining characters:

```cpp
if (A[n-1] == B[m-1]){
    return 1 + LCS(A, B, n-1, m-1); 
}
```

* **Current characters do not match**:

```cpp
                n
A   B   J   L   P
                m
B   N   L   P   K
```

In this case, you might get a match from a smaller substring in either one of the strings so you can't decrement both `n` and `m` at the same time. That is because we're told that the strings need not be of the same size. Therefore, you'll have two options in this case:

- Keep A as is and search in the shorter version of B:

```cpp
                n
A   B   J   L   P
            m
B   N   L   P   K
```

- Keep B as is and search in the shorter version of A:

```cpp
            n
A   B   J   L   P
                m
B   N   L   P   K
```

Then, you return the max of the results from these two recursive calls:

```cpp
//Decrement one and compare
b = LCS(A, B, n-1, m);
//Decrement other and compare
c = LCS(A, B, n, m-1);
return max(b,c);
```

Putting all these cases together, we get:

```cpp {numberLines: true}
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

The running time is exponential: $O(N * 2^N)$

### Longest Common subsequence Memoized

As we learned in previous posts, when a recursive call is being made to the function itself more than once, there's a good chance that we're redoing a lot of the work. Therefore, an obvious improvement would be to store intermediate results using memoization:

```cpp
vector<vector<int>> dp (A.size() + 1, vector<int> (B.size() + 1, 0));
```

Next, before a recursive call, we'll check to see if the result is already saved. If so, we'll return, otherwise at each recursive call, we'll save the computed result:

```cpp
vector<vector<int>> dp (A.size() + 1, vector<int>(B.size() + 1,-1));
int LCSMemoized(string A, string B, int n, int m){
    if (n == 0 || m == 0)
        return 0;
    
    if (dp[n][m] != -1)
        return dp[n][m];
    
    if (A[n-1] == B[m-1]){
        return dp[n][m] = (1 + LCS(A, B, n-1, m-1));
    } else {
        int b = 0, c = 0;
        b = LCS(A, B, n-1, m);
        c = LCS(A, B, n, m-1);
        return dp[n][m] = max(b,c);
    }
}
```

### Longest Common subsequence Bottom Up

Let's look at the most preferable solution: the bottom up solution! Here, we'll take the memoized solution one step further and get rid of the recursive calls by creating a 2D table. 

The size of the table would be the size of string A + 1 and size of string B + 1:

```cpp
string A = ABCD
string B = AEBFD
```

I'll choose to represent `A` as rows and `B` as columns:

|  | **0** | **1** | **2** | **3** | **4** | **5** |
| -- | -- | -- | -- | -- | -- | -- |
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** (1) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **2** (1,2) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **3** (1,2,3) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 
| **4** (1,2,3,4) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

Let's talk about the meaning of the entry at (2,3): This means that if I'm given:
- `AB` from string `A`
- `AEB` from string `B`

then the longest common subsequence of these two substrings would reside in position (2,3).

Let's look at the complete bottom up code:

```cpp
int LCSTabular(string A, string B, int n, int m){
    vector<vector<int>> dp (n+1, vector<int>(m+1,0));
    
    for (int i = 1; i <= n; i++){
        for (int j = 1; j <= m; j++){
            if (A[i-1] == B[j-1]){
                dp[i][j] = 1 + dp[i-1][j-1];
            } else {
                int b = dp[i-1][j];
                int c = dp[i][j-1];
                dp[i][j] = max(b,c);
            }
        }
    }
    
    for (int i = 0; i <= A.size(); i++){
        for (int j = 0; j <= B.size(); j++){
            cout << dp[i][j] << " ";
        }
        cout << endl;
    }
    
    return dp[n][m];
}
```

Once completely filled, the table would look like this for the example we chose above:

```text
0 0 0 0 0 0 
0 1 1 1 1 1 
0 1 1 2 2 2 
0 1 1 2 2 2 
0 1 1 2 2 3
```