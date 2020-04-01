---
date: 2020-01-06
title: Recursion
thumbnail: content/images/weightedundirectedgraph/graph-1.png
draft: true
extract: Explanation of recursion and a survey of its applications
categories: 
    - General
tags:
    - C++
    - Recursion
---

### Introduction
In this post, I'll talk explain what recursion is, some of its applications as well as when not to use recursion.

#### Triangular Numbers

Numbers that follow this pattern:
 
$$$
1,3,6,10,15,21,....
$$$

Therefore, `triangularNumber(2)` should return 3. To put it recursively, you'd look at it and notice that

$$$
3 = 2 + 1
$$$ 

ie, the value passed in, 2, plus the value for previous term which is 1. 

`triangularNumber(3)` should return 6, which is 3 added to the 3rd term:

$$$
6 = 3 + 3
$$$ 

In general, the first term is 1 and $n^{th}$ term is obtained by adding $n$ to the $n-1^{st}$ term. Converting that to a mathematical formula we get:

$$$
a_{1} = 1
$$$
$$$
a_{n} = a_{n-1} + n
$$$

Translating that to a function in c++, we get:

```cpp{numberLines: true}
int triangularNumbers(int num){
    if (num == 1)
        return 1;
    return (num + triangularNumbers(num - 1));
}
```

#### Factorials

Another overused example is that of factorials:

$$$
0! = 1
$$$
$$$
1! = 1
$$$
$$$
2! = 2 * 1
$$$
$$$
3! = 3 * 2 * 1 
$$$

Mathematically, this is:

$$$
a_{0} = 1
$$$
$$$
a_{1} = 1
$$$
$$$
a_{n} = n * (n-1)!
$$$
