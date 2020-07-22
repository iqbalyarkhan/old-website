---
title: Recursion
date: 2020-06-21
thumbnail: /post-images/recursion.png
draft: true
extract: Principles of recursion
categories: 
    - Dynamic Programming
tags:
    - Recursion
---

1. [Introduction](#introduction)
2. [Approach](#approach)
2. [Examples](#Examples)
    * [Sum](#sum)
    * [Factorial](#factorial)
    * [Sum of first N integers](#sum-of-first-n-integers)
    * [Self similar](#self-similar)
3. [Leap of faith](#leap-of-faith)
4. [Diagram](#diagram)
5. [Linear Recursion](#linear-recursion)
    * [Power](#power)
    * [Decimal to binary](#decimal-to-binary)
    * [Count number of bits set to 1](#count-number-of-bits-set-to-1)
6. [Binary Search](#binary-search)
2. [Binary Search Tree](#binary-search-tree)
3. [Recursion: Base, Hypothesis and Induction](#recursion-base-hypothesis-and-induction)
4. [Print from 1 to N](#print-from-1-to-n-using-recursion)
5. [Print from N to 1](#print-from-n-to-1-using-recursion)


### Introduction
Recursion is a common technique to define a problem or a relation where subsequent "terms" build on calculations for previous terms. Our aim is to make decisions based on the existing choices we have and each time we make a choice, we obviously would reduce the number of problems that we'd have to solve. 

A lot of the definitions of recursion insist that we reduce the size of our problem. That is something that I find misleading since the aim is not to reduce the size but to make decisions and as a result of making those decisions, our problem size in-effect decreases. It is a consequence of the decision we make. 

Therefore, recursion is all about making decisions that help us reduce the input. How do we know that the problem has a recursive solution? The problem would be defined by the choices that we have and the decisions that we can make. It'd be clear that there are various choices and soon as we pick a choice, the complexity of our problem is reduced.

### Approach
We'll use this approach to break down recursive problems:
- Determine the size of the problem (how many times do we have to recurse?)
- Determine the base case (what is the smallest valid input?)
- Create a diagram (we'll see them below)
- Test!

### Examples
Let's have a look at a few examples to build some recursive intuition:

### Sum
**Say you're given this general formula**:
$$$
S_N = S_{N-1} + S_{N-2}
$$$

This is the simplest and most obvious form of recursion: the entity being defined, $S$, appears on both sides of the equation. This means that the elements are defined in terms of themselves. If we provide this information:

$$$
S_1 = 1 \textrm{ and } S_2 = 1
$$$

we've provided a complete recursive definition of the problem where:

$$$

  S_N=\begin{cases}
    1 & \text{if $N=1$}.\textrm(base case) \\ 
    1 & \text{if $N=2$}.\textrm(base case) \\
    S_{N-1} + S_{N-2} & \text{if $N>2$}. \textrm(recursive case)
    
  \end{cases}
$$$

### Factorial
Another recursive definition:
$$$
N! \text{ = } 1 \times 2 \times 3 \times 4 \times \text{. . . . } \times (N-1) \times N   
$$$

There's no explicit $N!$ on the RHS but since:

$$$
N! \text{ = } 1 \times 2 \times 3 \times 4 \times \text{. . . . } \times (N-1) \times N   
$$$

$$$
N! \text{ = } (N-1)! \times N   
$$$

we can see that this is also recursive since our final solution is a repeat of the original BUT with smaller term: $N-1$. Again, if we're to provide the trivial case where $0! = 1$ then we'll get:

$$$

  N!=\begin{cases}
    1 & \text{if $N=0$}. \\ 
    (N-1)! \times N & \text{if $N>0$}.
    
  \end{cases}
$$$

### Sum of first N integers

Let's say we have this:

$$$
S_N = 0 + 1 + 2 + 3 + 4 + ..... + N-1 + N
$$$

Then how can we break it into a recursive formula? ie, express $N$ in terms of $N-1$:

$$$
S_N = 0 + 1 + 2 + 3 + 4 + ..... + N-1 + N\\
S_N = S_{N-1} + N
$$$

Recursive definition for this function would be:

$$$

  S_N=\begin{cases}
    0 & \text{if $N=0$}.\\ 
    S_{N-1} + N & \text{if $N>0$}.
    
  \end{cases}
$$$

### Self similar
Each example we've seen above is an example of **self similar** recursion where each problem is a smaller version of itself ie self similar. Here, the smaller version is a smaller instance of the original problem.

### Leap of faith
In each of the problems above, we described the smaller version of the problem in terms of the original problem: ie:

$$$
S_N = S_{N-1} + N \\
N! = (N-1)! \times N \\
S_N = S_{N-1} + S_{N-2}
$$$

When we're writing recursive functions, we use these smaller versions to determine what to do next once we have our solution. We assume that if I want to sum up till $N$, then $S_{N-1}$ will correctly get the sum for me from $1 \text{ till } N-1$. Now, once I have that sum, what do I do with it to get to sum till $N$? Add $N$ to it! This faith that I'll get the previous sum correctly is called the leap of faith. And this is how we'll go about defining the recursive functions.

You assume that the code works for smaller problems even if you have not yet written a line of code! 

### Diagram

Let's look at a simple diagram that'll help us tackle recursive problems:

```text

    input                  Final solution  
      |                        | 
      |                        |        Perform recursive step  
      |                        |            here
      |                        | 
    smaller    ----->  solution for smaller 
     input                  input
```

Here, we start with the input and break it into a smaller input: ie we go from $S_N$ to $S_{N-1}$. We then get the solution of this smaller input. Now, what do we do once we get this smaller solution? We perform the recursive step and then return the final solution. 

Let's look at a few examples:

**Find the sum for all positive integers from 1 till N given N = 5**

Base case: sum is 1 if N = 1

decomposition: keep subtracting 1

```text

   input = 5            Final solution  = 15 
      |                        | 
      |                        |        Perform recursive step  
      |                        |            here => 10 + what gives me final answer?  
      |                        |            => 10 + N 
      4                        |            => 10 + 5
    smaller    ----->  solution for smaller 1 + 2 + 3 + 4 = 10 
     input                  input
    (input - 1)
```


```cpp
int sum(int n){
    if (n == 1) //base case
        return 1;
    return sum(n-1) + n; //recursive case
}
```

**Sum the digits of an integer: given 5432 you should return 14**

```text
   input 5432           Final solution  = 14
      |                        | 
      |                        |        Perform recursive step  
      |                        |            here => 12 + what gives me final answer? ie N % 10  
      |                        |            => 12 + N 
     543                       |            => 12 + 2
    smaller    ----->  solution for smaller 5 + 4 + 3 = 12 
     input                  input
    (input/10)
```

Base case: if n < 10, sum is simply n

decomposition: keep dividing by 10

```cpp
int sumDigits(int n){
    if (n < 10)
        return n;
    return (sumDigits/10) + n % 10;
}
```

So far we've seen problems where there's only a single sub-problem: ie divide n by 10 or subtract 1 from n. What if there are multiple sub-problems?

**Given an array, find the max in the array by dividing array in 2 and getting max from each half**

```text
   [9,2,8,4,5]           Final solution  = 9
      |                        | 
      |                        |   Perform recursive step  
      |                        |   what should I return given            
      |                        |   the 2 maxes? max(max1, max2)
     [9,2,8] ----->         solution: 9
     [4,5]  ----->         solution: 5
    smaller       
     input                  
```

Base case: when size of array is 1, return that element.

```cpp
int findMax(vector<int>A, int lo, int hi){
    if (lo == hi)
        return A[lo]; //base case
    int m = lo + (hi-lo)/2;
    int leftMax = findMax(A,lo,m);
    int rightMax = findMax(A,m+1,hi);
    return max(leftMax, rightMax);
}
```
 
### Linear Recursion
Linear recursion is the case where a method calls itself once and in each call, output of the recursive call is processed before producing or returning the current call's result.

### Power
**Given base 2 and exponent P(base, exponent), return base raised to the power**

```text
    P(2,4)               Final solution = 16  
      |                        | 
      |                        |        Perform recursive step  
      |                        |        8 * what = 16?        
      |                        |        8 * base = 16
    P(2,3)    ----->  solution for smaller  2 * 2 * 2 = 8 
  smaller input                  input
```

base case: when exponent = 1, return base 

decomposition: keep reducing the exponent

```cpp
int power(int base, int exp){
    if (exp == 1)
        return base;
    return power(base, exp-1) * base;
}
```

### Decimal to binary
**Given an integer in decimal, return an int representation of this decimal in binary**

At times, you have to look at all possible cases to determine the solution:
even input:
```text
    C(8)               Final solution = 1000  
      |                        |        Recursive step:
      |                        |        100 * 10  
      |                        |                
      |                        |        
    C(4)    ----->  solution for smaller  4 = 100
  smaller input                  input
    8/2
```

odd input:
```text
    C(7)               Final solution = 111  
      |                        |        Recursive step:
      |                        |        11 * 10 + 1  
      |                        |                
      |                        |        
    C(3)    ----->  solution for smaller  3 = 11
  smaller input                  input
    7/2
```

### Count number of bits set to 1

**Given an integer in base 10, count the number of bits that are set to 1 for this integer's binary representation**

The problem is quite simple. Let's say we use 5 as an example:
```text
5 in binary is 0101
```

Let's first see a simple method to convert decimal to binary:

```text

5/2 = 2 remainder 1
2/2 = 1 remainder 0
1/2 = 0 remainder 1
0/2 END ADD 0:    0         
```

Notice how the final result would have a 1 when the current element modulus 2 is 1. We'll take advantage of this fact. Finally, remember the problem is to **count the number of 1s in binary representation**.

**Base Case**
This occurs when we have smallest valid input: ie when n <= 1. In this case, we just return `n`. Why does this work? How many 1s are in binary representation of 1 (0001)? 1. How many 1s are in binary representation of 0 (0000)? 0. 

**Decomposition**
How are we going to make our way toward base cases? In the example above, we kept dividing n by 2, so we'll do the same. We'll decompose the problem in 2. 

**Diagram**
```text
    count(5)               Final solution = 2 
      |                        |        Recursive step:
      |                        |        solution + n % 2. 
      |                        |         1 + (5 % 2) = 2       
      |                        |        
    count(5/2)    ----->  solution for smaller 2 = 1 
  smaller input                  input
    5/2
```

```cpp
int numberOfBitsSetToOne(int n){
    if (n <= 1)
        return n;
    return numberOfBitsSetToOne(n/2) + n%2;
}
```

### Binary Search
**A common algorithm that uses recursion is binary search: given a sorted list, find the given element. If present, return the index, otherwise, return -1.**

Base case: array is comprised of 1 item: perform check and return

Decomposition: keep searching in each half based on mid value

We're given the element we need to find. We'll calculate the value of `mid` and look in either half based on the element at A[mid]:

```cpp
int binarySearch(vector<int>A, int f, int lo, int hi){
    if (hi < lo)
        return -1;
    int mid = lo + (hi-lo)/2;
    if (A[mid] == f){
        return m;
    } else if (A[mid] < f){
        return binarySearch(A, f, mid+1, hi);
    } else {
        return binarySearch(A, f, lo, mid-1);
    }
}
```

### Binary Search Tree

Similar to binary search, a binary search tree has data stored in a logical manner where keys less than the node appear in left subtree and keys greater than the node appear in right subtree. Searching in a binary search tree also involves recursion:

Base case: value is at root or root pointer is null

Decomposition: Keep discarding half the tree based on whether the key is greater or less than the current node's value

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