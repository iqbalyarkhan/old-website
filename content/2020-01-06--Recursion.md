---
date: 2020-01-06
title: Recursion
thumbnail: /post-images/recursion.png
draft: false
extract: Explanation of recursion and a survey of its applications
categories: 
    - General
tags:
    - C++
    - Recursion
---

1. [Triangular Numbers](#triangular-numbers)
2. [Factorials](#factorials)
3. [Fibonacci](#fibonacci)

### Introduction
Recursion is a common technique to define a problem or a relation where subsequent "terms" build on calculations for previous terms. For example, I could say, every number in a sequence is the sum of its preceding number and 2. I've defined a function in terms of itself ie I'm using the solution that the function found for a previous term and then determining  the subsequent term using that solution. If I had to mathematically represent this sequence (every number in a sequence is the sum of its preceding number and 2), it would look like this:

$$$
S_{N} = S_{N-1} + 2
$$$  

Which simply means:

$$$
S_{4} = S_{3} + 2
$$$

So, to get the solution for $S_{4}$, I need to know what $S_3$ is. To know what $S_3$ is, I need to know what $S_2$. See the problem here? This sequence appears to continue for eternity! No matter what value I ask you to calculate, you'd never be able to get to a solution with just the information I provided above.

We need at-least one value which is not required to be calculated. This means, that there exists a single term that is already known and we don't need to recursively call $S$ to get its value. This term is called the **base case**. Now, if I tell you this:

 $$$
 S_{N} = S_{N-1} + 2
 $$$
 $$$
 S_0 = 0
 $$$
 $$$
 S_1 = 1
 $$$  

you can easily calculate what $S_2$ is! 

This is what recursion means: repeatedly calling the function until you get to the base case and then building your solution back up from the base case. OR, you can start at the base case and move up toward the solution.

### Triangular Numbers

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

### Factorials

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

Converting this to code we get:

```cpp
int Fact(int n){
    if (n == 1)
        return 1;
    return (n * Fact(n-1));
}
```

### Fibonacci

Another famous sequence used to showcase recursion is the fibonacci series. This can be defined as:

$$$
F_{N} = F_{N-1} + F_{N-2}
$$$
$$$
F_{0} = 0
$$$
$$$
F_{1} = 1
$$$

Converted to code:

```cpp
int Fib(int n){
    if (n == 0)
        return 0;
    if (n == 1)
        return 1;
    return Fib(n-1) + Fib(n-2);
}
```