---
title: Stack and Queue Problems
date: 2020-05-04
thumbnail: /post-images/stack.png
draft: false
extract: Stack and queue sample problems
categories: 
    - Problems
tags:
    - Stack and queue Problems
---

### Table of Contents
1. [Intro](#intro)

2. Stack Problems
    * [Evaluate Postfix Expression](#evaluate-postfix-expression)
    * [Valid Parens](#valid-parens)

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
                ans = B + A;
            else if (ch == '-')
                ans = B - A;
            else if (ch == '*')
                ans = (B*A);
            else
                ans = (B/A);
            
            s.push(ans);
            
        }
    }
    
    return ans;
}
```

Be careful with the order of operations. For example,if you get this: 62/ you'd be doing 6/2 = 3. So make sure your order is correct when you pop and perform the calculation. In the code above, when you pop, you pop 2 (which becomes `A`) first and then 6 (which becomes `B`). So you can't do `A/B`, since that would be 2/6 = 0. You want 6/2 so we do B/A.

### Valid Parens

**Given a string, check if it has valid parenthesis**

Example: 
[{()}] is valid
[{)] is not valid

```cpp{numberLines: true}
bool isValid(string s){
    stack<char> parens;
    for (int i = 0; i < s.size(); i++){
        char curr = s[i];
        if (curr == '(' || curr == '{' || curr == '['){
            parens.push(curr);
        } else {
            if (parens.empty())
                return false;
            char topL = parens.top();
            parens.pop();
            if (topL == '(' && curr == ')'){}
            else if (topL == '{' && curr == '}'){}
            else if (topL == '[' && curr == ']'){}
            else
                return false;
        }
    }
    
    if (parens.empty())
        return true;
    
    return false;
}
```

The solution is quite simple, if it is an opening brace, push to stack, if it is a closing brace, pop from stack and make sure the read brace and the popped brace match. Also, I've used a simpler if else statement that does nothing if the conditions match (since conditions that are valid are fewer than conditions that are invalid). This results in cleaner and shorter code. 

Running time: $O(N)$ where $N$ is the size of the string. Space complexity is also $O(N)$ for the stack. 



