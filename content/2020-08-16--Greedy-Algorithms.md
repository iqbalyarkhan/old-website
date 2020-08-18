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
    * [Max water between vertical lines]


### Introduction
In this post, we'll discuss the greedy technique to solving various problems. Let's start with what it means to be greedy while designing an algorithm to solve a problem. A greedy algorithm is an algorithm that that computes a solution in steps and at each step this algorithm makes a **locally optimum** decision. Once that decision is made, the algorithm DOES NOT return to the step in question and undoes the decision.

Let's see what greedy approach is all about:

**Given a target change that needs to be made and possible coins, find the fewest number of coins needed to make that change**

Say our target is \$48 and possible coins are \$30, \$24, \$12, \$6 and \$3. Greedy approach would make the locally optimum choice by picking the **largest denomination** available less than the change that needs to be made:

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

### Max water between vertical lines

**An array of integers naturally defines a set of lines parallel to the Y-axis, starting from x = 0 as illustrated in Figure 18.4(a). The goal of this problem is to find the pair of lines that together with the X-axis "trap" the most water.**

Example:

```cpp

            |       |               |
    |       |       |       |       |       
    |   |   |   |   |   |   |   |   |   |   |
    0   1   2   3   4   5   6   7   8   9   10
    i                                       j
```

The diagram above shows an example. Each vertical bar is the height and the X-axis shows the position of each line. The max area is when we choose the lines at 2,8 giving us a total area of (8-2) * 3 = 18. 

How do we go about solving this?

Approach 1: First thing that comes to mind is that we can use 2 nested loops where we start at X = 0 and keep incrementing the ending line from 1 till 10. In the process we keep track of the max area. We then move to X = 1 and keep incrementing the ending line from 2 till 10. Once we're done, we would've looked at all possible combinations and in the process calculated our max. This approach obviously takes $O(N^2)$ time. Let's see what other problem solving technique we can use to tackle this problem:

Approach 2: Let's be greedy! We'll use 2 pointers: one at X = 0 (call this `i`) and the other at X = 10 (call this `j`). We'll initialize a max variable to minimum integer. Next, we calculate the area enclosed by the two lines we chose:

```cpp
int area = (i-j)*(min(A[i],A[j]));
```

If this calculated area is greater than the current max, update the max and move on. This is where things get interesting. How do we **move on**? We're interested in the tallest and farthest lines to maximize our area. So, we'll move `i` if height of `i` is less than `j` or we'll move `j` if height of `j` is less than `i`. That is because we know that the smaller height line will not give us the max area. In the example above, 0's height is greater than 10's height, so we'll move `j` inward:

```cpp

            |       |               |
    |       |       |       |       |       
    |   |   |   |   |   |   |   |   |   |   |
    0   1   2   3   4   5   6   7   8   9   10
    i                                   j
``` 

We then perform the following calculations:

```cpp
            |       |               |
    |       |       |       |       |       
    |   |   |   |   |   |   |   |   |   |   |
    0   1   2   3   4   5   6   7   8   9   10
    i                                   j

maxArea = max (maxArea,(9-0)*(min(1,2)));
```

We continue to move inward until `i == j`. At that point we would've found the max area. Here's the code for this approach:

```cpp
int maxArea(vector<int>& A){
    int i = 0, j = int(A.size()) - 1, maxArea = numeric_limits<int>::min();
    
    while (i != j){
        int currArea = (j-i)*min(A[i],A[j]);
        maxArea = max(maxArea, currArea);
        if (A[i] < A[j])
            i++;
        else
            j--;
    }
    return maxArea;
}

int main(int argc, const char * argv[]) {
    // insert code here...
    vector<int> A = {2,1,3,1,3,1,2,1,3,1,1};
    int ans = maxArea(A);
    cout << ans << endl;
    return 0;
}
```

Running time: $O(N)$