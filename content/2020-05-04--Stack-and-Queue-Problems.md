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
    * [Implement max() functionality](#implement-max-functionality)
    * [Sunset View](#sunset-view)

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

### Implement Max functionality

**Design a stack that includes a max operation, in addition to push and pop. The max method should return the maximum value stored in the stack.**

It is easy to think that we can just keep track of the max element in the stack. But how would you update the max once we pop an item off the stack?

```cpp
push 4:


  4  
_____   
stack   max = 4

push 9:

  9
  4  
_____   
stack   max = 9

pop:

  
  4  
_____   
stack   max = ??
```

One approach is to keep popping elements off the stack, figure out the new max and then put those items back and return the new max. This approach would take $O(2N) \approx O(N)$ time to pop elements off and then put them back in the right order. It takes $O(1)$ space. This is quite slow if you have a lot of elements on your stack.

A better approach is to maintain 2 stacks. `mainSt` to keep track of all `push` and `pop` operations and a `maxStack` to keep track of every max we've seen so far. Let's see how this would work:

- If the max stack is empty, push the new element onto the max stack
- If a new element pushed to main stack is greater than the top of the max stack, push this new element to the max stack as well. Otherwise do nothing with the max stack
- If an element popped from the main stack is same as the element top of the max stack, pop from the max stack as well.

```cpp
push 4:


  4         4  
_____   ________
stack   max stack

push 9:

  9         9
  4         4
_____   _________
stack   max stack

pop:

  
  4         4
_____   _________
stack   max stack

push 12:

  12        12
  4         4
_____   _________
stack   max stack

push 5:

  5
  12        12
  4         4
_____   _________
stack   max stack

push 14:
  14
  5         14
  12        12
  4         4
_____   _________
stack   max stack

pop
  
  5         
  12        12
  4         4
_____   _________
stack   max stack
getMax() -> 12
``` 


Here's the `maxStack` class:

```cpp
class MaxStack{
private:
    stack<int> maxStack;
    stack<int> mainStack;
    
public:
    void push(int x){
        mainStack.push(x);
        if (maxStack.empty()){
            maxStack.push(x);
        } else {
            int currMax = maxStack.top();
            if (currMax < x)
                maxStack.push(x);
        }
    }
    
    void pop(){
        if (mainStack.top() == maxStack.top()){
            maxStack.pop();
        }
        mainStack.pop();
    }
    
    int top(){
        return mainStack.top();
    }
    
    void peekMax(){
        cout << "Max: " << maxStack.top() << endl;
    }
    
    int popMax(){
        int max = maxStack.top();
        maxStack.pop();
        return max;
    }
};
```

### Sunset view

**You are given with a series of buildings that have windows facing west. The buildings are in a straight line, and any building which is to the east of a building of equal or greater height cannot view the sunset.
  Design an algorithm that processes buildings in east-to-west order and returns the set of buildings which view the sunset. Each building is specified by its height.**
  
One approach is to store the heights of all the buildings in an array and then start from the last index, keep track of max and determine which buildings have a view. This requires $O(N)$ space and $O(N)$ time where $N$ is the number of buildings.

A better approach uses less space. Say, here're our buildings:

```text
        WEST          EAST
SUN ->  2, 10, 4, 12, 8
```

We start from the east end so we get the first value, `8`. We record it:

```cpp
   
8     
```

Next, we get a 12. 12 > 8 meaning 12 would prevent 8 from viewing the sunset, so 8 can no longer see the sunset but 12 can, so remove 8 and add 12:

```cpp
   
12    
```

Next, we get a 4. 4 is not > 12, so just add 4 to the list as well since 4 can also see the sunset:

```cpp
   
4
12    
```

Next, we get a 10. 10 > 4, so 4 cannot see the sunset, keep removing elements from the list until you find an element > 10 and then add 10 to the list.

```cpp
   
10
12    

As of now, only 2 buildings can see the sunset, 10 and 12.
```

Next, we get a 2. 2 is not greater than 10, so 2 can also see the sunset, add it to the list:

```cpp
2
10
12    
```

We're done: we've got 3 buildings that can see the sunset: 2,10 and 12. Notice the order: we're eliminating buildings based off the height of the building we just received: ie LIFO. The list can be stored in a stack! 



