---
title: Stack and Queue Problems
date: 2020-05-04
thumbnail: /post-images/stack.png
draft: true
extract: Stack and queue sample problems
categories: 
    - Problems
tags:
    - Stack and queue Problems
---

### Table of Contents
1. [Intro](#intro)

2. [Stack Problems]
    * [Evaluate Postfix Expression](#evaluate-postfix-expression)
    * [String to int without libraries](#string-to-int-without-libraries)
    * [Int to string without libraries](#int-to-string-without-libraries)
    * [Change base of string](#change-base-of-string)
    * [Compute spread sheet column encoding](#spread-sheet-column-encoding)
    * [Check Palindromicity](#check-palindromicity)
    * [Reverse words in a string](#reverse-words-in-a-string)

### Intro

**Stack**:
- Stack is LIFO and you can use the `#include <stack>` to make use of it.
- Stacks support these operations:
    - **push(e)**: pushes a new element on the stack
    - **pop()**: removes the top element BUT doesn't return it
    - **top()**: returns top element BUT doesn't remove it
    - **empty()**: returns true if stack is empty
- Stacks are useful when you need to parse an input or somehow reverse its order. 

### Evaluate postfix expression
**Given a postfix expression, evaluate and return the value representing the expression**

Example: 34+2*1+ = 15

The logic is quite simple: if you encounter a digit, push to stack, if you encounter an operator, pop top 2 from stack, perform the relevant operation and push the result back on stack.

Running time is $O(N)$ where $N$ is the length of the string.

```cpp
int convert(string in){
    stack<int> s;
    int ans = 0;
    for (int i = 0; i < in.size(); i++){
        char ch = in[i];
        if (isdigit(ch)){
            s.push(ch - '0');
        } else {
            int A = s.top();
            s.pop();
            int B = s.top();
            s.pop();
            
            if (ch == '+')
                ans = A + B;
            else if (ch == '-')
                ans = A - B;
            else if (ch == '*')
                ans = (A*B);
            else
                ans = (A/B);
            
            s.push(ans);
            
        }
    }
    
    return ans;
}
```

