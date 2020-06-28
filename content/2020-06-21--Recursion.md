---
title: Recursion
date: 2020-06-21
thumbnail: /post-images/recursion.png
draft: false
extract: Principles of recursion
categories: 
    - Dynamic Programming
tags:
    - Recursion
---

1. [Introduction](#introduction)
2. [Recursion Tree](#recursion-tree)
3. [Recursion: Base, Hypothesis and Induction](#recursion-base-hypothesis-and-induction)
4. [Triangular Numbers](#triangular-numbers)
5. [DP Intro](#dp-intro)
6. [Max subarray](#max-subarray)
7. [Unique ways to make change]()
12. [Conclusion](#conclusion) 


### Introduction
Recursion is a common technique to define a problem or a relation where subsequent "terms" build on calculations for previous terms. Our aim is to make decisions based on the existing choices we have and each time we make a choice, we obviously would reduce the number of problems that we'd have to solve. 

A lot of the definitions of recursion insist that we reduce the size of our problem. That is something that I find misleading since the aim is not to reduce the size but to make decisions and as a result of making those decisions, our problem size in-effect decreases. It is a consequence of the decision we make. 

Therefore, recursion is all about making decisions that help us reduce the input. How do we know that the problem has a recursive solution? The problem would be defined by the choices that we have and the decisions that we can make. It'd be clear that there are various choices and soon as we pick a choice, the complexity of our problem is reduced.

There are various techniques to solve recursive problems but some problems are easier to solve using one method while others fit better with another technique. Let's see the various methods with which recursive problems can be solved:  

### Recursion Tree
Let's talk about how we're going to represent the choices and the decisions that we need to make while using recursion. To represent the choices and the decisions, we'll use something called a recursion tree. Let's look at a concrete example.
 
 Say, you're to find all combinations (where order doesn't matter) of strings given a string. For example:
 
 ```cpp
Given: "ab"
return: {"", "a", "b", "ab"} 
``` 

How would we go about doing this? Iteratively, we might say let's start with the empty string. Then iterate over the characters and add each individual character to the set. Then start again at the first character and form a string with each of the other characters. Do the same for remaining characters. Then iterate over all characters again and add it to the set. This is just for a string with 3 characters. What if we had more? This seems like an inefficient way to solve this problem. 

Let's see how we can use recursion. To do so, we'll use a recursion tree where you keep track of your input (decision space) and the output (result when you make a choice from the decision space). Let's see what this means:

```cpp
                    OP: ""   IP: "ab"
                    /                   \
                reject 'a'              accept 'a'
                /                           \
              OP:"", IP: "b"               OP: "a", IP: "b"       
``` 

In the diagram above, we start with our output as empty because we haven't made any choices yet and our input is the entire string that was given to us. Next, we have two choices: we either include the first character, represented by `accept a` or we don't include it, represented by `reject a`. Once we've made our decision, our output would either include `a` or would not. In either case, we've reduced our input size by 1 since we've made a decision for one of the candidates. Let's continue:

```cpp
                                         OP: ""   IP: "ab"
                                    /                        \
                                reject 'a'                  accept 'a'
                                /                                   \
                        OP:"", IP: "b"                             OP: "a", IP: "b"       
                       /            \                               /                 \ 
                   reject `b`       accept `b`                   reject 'b'             accept 'b' 
                   /                    \                       /                           \
                OP: "", IP: ""      OP: "b", IP: ""          OP: "a", IP: ""             OP: "ab", IP: ""

``` 

We're done since we don't have any more input to process. Therefore, our output at the leaf level gives us our answer:

```cpp
OP: "", OP: "b", OP: "a", OP: "ab"
```

### Recursion: Base, Hypothesis and Induction
Let's talk about another technique that can be used to solve a different class of recursive problems. As a concrete example, let's look at fibonacci numbers. 

```cpp
0,1,1,2,3,5,8,13,21,.....
```

A fibonacci series can be defined by:


$$$
F_{N} = F_{N-1} + F_{N-2}
$$$
$$$
F(0) = 0; \textrm{(base case)}
$$$
$$$
F(1) = 1; \textrm{(base case)}
$$$


Formally, this is how we can define fibonacci series:

$$$
\textrm{
Basis Step: Specifies the value of the function for the first terms. It is not needed to calculate the values for these terms recursively.}
$$$
$$$
\textrm{
Recursive Step: Gives a rule for finding subsequent values using previous values beginning at those defined in the basis step.
}
$$$

It is easy to derive these equations but how do we prove these equations are correct? If you notice, these equations look a lot like mathematical induction (basis step, recursive step) which is exactly what we used to derive the relationships. I won't use induction to prove these equations but will use it to see how we can write a recursive C++ program to solve the fibonacci series.

Ok, so let's think through this. We know we've got a basis step:

```cpp
int Fib(int n){
    if (n == 0)
        return 0;
    if (n == 1)
        return 1;
}
```

Now let's see how we can see use our recursive step. We'll say, let's assume we know what the previous two ($N-1$ and $N-2$) terms are. We are assuming that we've got our function `Fib()` that no matter what, will ALWAYS be able to calculate the previous two terms, then how are we going to calculate the current term ($N$)? It is quite simple: using the equation we derived above, we know 

$$$
F_{N} = F_{N-1} + F_{N-2}
$$$

and we'll do the same in our recursive function. And what do I do once I get the current value? Just return it:

```cpp
int Fib(int n){
    if (n == 0)
        return 0;
    if (n == 1)
        return 1;
    int ans = Fib(n-1) + Fib(n-2);
    return ans;
}
```

### Print from 1 to N using recursion
**This is quite a simple problem: print all numbers from 1 to N using recursion.**

Let's break this down into inductive step and base case:

**Induction Step** Now let's say we have a function called `print()` and we know that this function is always able to print from 1 to N. This is the inductive step. No matter what we provide to this function, it'll be able to print from 1 to N.

**Base case** This is the smallest valid input which in our case is 1. 

Based on this information, let's create our **hypothesis** that'll allow us to create a solution:
- If the value given, $N$, to us is 4, then our inductive step will print 1,2,3,4. 
- What if I have a smaller input. For example if the value given to us is $N-1$, we know that the function will print from 1 till $N-1$. 

This means that if we're given $N$ and asked to print till $N$, we'll call `print(n-1)`. This will get us all the values from $1$ till $N-1$. Now when I finally get my $N$, all I need to do is print it! Let's see the code for this logic:

Base case:
```cpp
void Print(int n){
    if (n == 1) {
        cout << "1 ";   //Base
        return;
    }
}
```

Here's the hypothesis added with the base condition:
```cpp
void Print(int n){
    if (n == 1) {
        cout << "1 ";   //Base --> Smallest valid input
        return;
    }
    Print(n-1); //Inductive step
    cout << n << " "; 
}
```

We could've used a recursive tree for this problem as well but we'd soon realize there are no big decisions to be made in this problem. All we're doing is handing off the work we need to do by using the hypothesis we created. Therefore, we used basis, hypothesis and induction. If it is hard to see the decisions that need to be made, see if you can use induction.

### Print from N to 1 using recursion
**This is quite a simple problem: print all numbers from N to 1 using recursion.**

**Induction Step** Let's say this time, when we call our function, `print(n)` on $N$ terms, it'll print for us all the integers from N to 1
Now, if we call this function on $N - 1$ terms, then it'll get us all integers from N - 1 till 1. This means:
- `print(7)` prints all numbers from 7 to 1
- `print(6)` prints all numbers from 6 to 1

So if I've already got all the elements from $N - 1$ to $1$, then what else is left for me to do? I need to print $N$ right? Because I've got all the elements from $N-1$ to $1$, the only thing left in the sequence to finish the job is to print $N$.
Here's what this means:

```cpp
print N and call print(n-1) to print remaining
```

Finally, the base case, where the smallest valid input is 1.

Here's the code:

```cpp
void Print(int n){
    if (n == 1) {
        cout << "1 ";
        return;
    }
    
    cout << n << " ";
    Print(n-1);
}
```

We need to print the current and then let `print(n-1)` call handle the rest

 
**For each recursive problem, there might be cases where it's easier for us to see a solution using recursion tree, or using induction.**


Therefore recursive functions:
- Call themselves 
- The call made to itself is to solve a smaller version of the original problem
- There's some version of the problem that doesn't need to be solved and can be returned without making another call (the base case)