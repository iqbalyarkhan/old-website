---
date: 2020-01-06
title: Recursion
draft: true
extract: Explanation of recursion and a survey of its applications
categories: 
    - C++
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

Writing the function for this becomes trivial:

```cpp{numberLines: true}
int triangularNumbers(int num){
    if (num == 1)
        return 1;
    return (num + triangularNumbers(num - 1));
}
```