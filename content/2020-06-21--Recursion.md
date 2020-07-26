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
    * [Reverse a string](#reverse-a-string)
    * [isPalindrome](#ispalindrome)
    * [Power set](#power-set)
6. [Binary Search](#binary-search)
7. [Multiple recursion](#multiple-recursion)
    * [Is list sorted in ascending](#is-list-sorted-in-ascending-order)
    * [Find max contiguous sum](#find-max-contiguous-sum)
8. [Counting Problems](#counting-problems)
    * [Permutations](#permutations)
    * [Stair case](#stair-case)
    * [Manhattan Path](#manhattan-path)



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

```cpp

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

```cpp

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

```cpp
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

```cpp
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

```cpp
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
```cpp
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
```cpp
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

```cpp

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
```cpp
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

### Reverse a string
**Given a string, reverse it using recursion**

Base case: A single character, just return it
Decomposition: Keep moving back one character

```cpp
string reversal(string s, int n, string ans){
    if (n == 0){
        stringstream ss;
        string ret;
        ss << s[n];
        ss >> ret;
        return ret;
    }
    return ans + s[n] + reversal(s, n-1, ans);
}
```

### isPalindrome
**Given a string, check if it is a palindrome**
We can obviously solve this using an iterative approach but let's try using recursion:

**Base Case**
This occurs when the string has either 1 character or 2 characters

**Decomposition**
How would we check if a string is a palindrome? We need to check if:

```yaml
//A = string, n = size of string
A[0] == A[n]
A[1] == A[n-1]
A[2] == A[n-2]
....
A[n/2] == A[(n/2)+1] 
```
Therefore, on each iteration, we're decreasing the size of the string by 2, by moving on from character at the last and the first position.

**Diagram**
```cpp
    afccfa               Final solution = true
      |                        |  Recursive step:
      |                        |  compare the two removed        
      |                        |  characters. Then AND with other result 
      |                        |  return (currMatch && otherMatch)
    fccf    --------------->  true     
  smaller input               solution
```

```cpp
bool isPalindrome(string A, int i, int j){
    if (i == j)
        return true;
    if (abs(i-j) == 1){
        return A[i] == A[j];
    }
    bool currMatch = A[i] == A[j];
    bool othersMatch = isPalindrome(A, i+1, j-1);
    return currMatch && othersMatch;
}
```

We'll use two pointers, `i` and `j` to simulate removal of characters. The first base case is simple, where there's just a single character in the string. The second base case, where difference between `i` and `j` is that of 1, we're handling the case where we're given a string with just two characters:

```yaml
ab //not a palindrome
aa //is a palindrome
```
Therefore, if we're given a string with 2 characters, all we need to return is the result of a check for the characters' equality.

Running time: $O(N)$

### Power set
A power set is the set of all possible subsets. For example, if we're given:

```cpp
abc
```

then the power set would be:

```cpp
{a},{b},{c},{ab},{bc},{ac},{abc}
```

**Base Case**
This would occur when we're given just a single character. In that case, we'll push that character to the `perms` vector and return.

**Problem size**
This is equal to the number of characters in the string

**Decomposition**
We'll start from the end of the string and make our way down to the first character. Therefore, the decomposition would comprise of removing one character at a time.

**Diagram**


```cpp
     abc        final solution={a},{b},{c},{ab},{bc},{ac},{abc}
      |                        |  Recursive step:
      |                        |  1. add current char to list
      |                        |  2. Add curr char to every string in list      
      |                        |  except for the current char added      
     ab     ----------------> [{a},{b},{ab}]              
```

Code: 

```cpp
void getPowerSet(string A, int n, vector<string>& powerSet){
    if (n == 0){
        powerSet.emplace_back(string() + A[n]);
        return;
    }
    getPowerSet(A, n-1, powerSet);
    powerSet.emplace_back(string() + A[n]);
    int currSize = int(powerSet.size()) - 1, i = 0;
    while (i < currSize){
        string newAdd = string() + powerSet[i] + A[n];
        powerSet.emplace_back(newAdd);
        i++;
    }
    return;
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

### Multiple recursion
So far we've seen linear recursion where the recursive function is called once in each recursive call. Multiple recursion, as the name suggests, has multiple recursive calls present in the method and the solutions from these multiple calls are combined, extended or modified to get the solution for the main problem. Divide and conquer fall in this category. Here, we'll see a few problems that use multiple recursion:

### Is List sorted in ascending order
**Given a list (array), return true if it is sorted in ascending order, false otherwise**

**Base case**
There's only one element in the list where we can return true

**Size of problem**
`n`: number of elements

**Decomposition**
We can check one element at a time OR divide the list into two halves and check. We'll use the latter approach.

**Example**
Happy path example:
[1,3,7,9]

```cpp
    1,3,7,9               Final solution = true 
      |                        |        Recursive step:
      |                        |        return (left && right);
      |                        |         
      |                        |        
    1,3     ------------>  left = true;          
    7,9     ------------>  right = true; 
```
Failing example:
[1,8,6,9]

```cpp
    1,8,6,9               Final solution = false 
      |                        |        Recursive step:
      |                        |        return (left && right);
      |                        |         
      |                        |        
    1,8     ------------>  left = true;          
    6,9     ------------>  right = true; 
```

It is clear from the failing example that simply testing the two sub-lists isn't enough. In the top row our solution shows that the final answer should be false but in the recursive step our logic returns a true. How do we handle this? We need to check the two elements that are across sub-lists: ie last element of left and first element of right. This changes our solution:


```cpp
    1,8,6,9               Final solution = false 
      |                        |        Recursive step:
      |                        |        bool cross = leftLast && rightFirst;
      |                        |        return left && cross && right;
      |                        |        
    1,8     ------------>  left = true;          
    6,9     ------------>  right = true; 
```

```cpp
bool isAscending(vector<int>A, int lo, int hi){
    if (hi <= lo)
        return true;
    int m = lo + (hi - lo)/2;
    bool left = isAscending(A, lo, m);
    bool cross = (A[m] < A[m+1]);
    bool right = isAscending(A, m+1, hi);
    return left && cross && right;
}
```

Here's the recursive definition for this function:

$$$

  T(n)=\begin{cases}
    1 & \text{if $n$ <= $1$}.\\ 
    2T(n/2) + 1 & \text{if $n>1$}.
    
  \end{cases}
$$$

Therefore, running time is $O(N)$

### Find max contiguous sum
**Given an array, find the maximum continuous sum**

(There's an algorithm called Kadane's algorithm that solves this problem in $O(N)$ time BUT we'll be using divide and conquer to better understand how this technique works!)

Example: [-1, 3, 4, -5, 9, -2] Then the max contiguous sum is 3 + 4 -5 + 9 = 11

**Base case**
When there's just one element, max is that one element

**Size of problem**
Number of elements in the array

**Decomposition**
We'll break this problem in two halves, recursively solve each half and then do some more analysis.

**Diagram**
```cpp
  -1,3,4,-5,9,-2        Final solution = 3 + 4  -5 + 9 = 11 
      |                        |        Recursive step:
      |                        |        max(leftSum,rightSum)
      |                        |         
      |                        |        
    -1,3,4     ------------>  leftSum = 6           
    -5,9,-2    ------------>  rightSum = 2; 
```

As the diagram above shows, just getting the max from each half is not enough. What if the max spans the two halves like this case? Well, in that case, we need to start on each side of mid and get the max sum. We'll then add the two sums that cross the middle:

```cpp
  -1,3,4,-5,9,-2        Final solution = 3 + 4  -5 + 9 = 11 
      |                        |        Recursive step:
      |                        |        <crossingSumCalculation>
      |                        |         
      |                        |        
    -1,3,4     ------------>  leftSum = 6           
    -5,9,-2    ------------>  rightSum = 2; 
```

Here's the crossing sum calculation:
```cpp
            <--------   -------->
                    m   m+1
            -1  3   4   -5  9   -2
runningSum: 6   7   4   -5  4   2 
```

We're to get the max sum from both halves and add the two:

```cpp
            <--------   -------->
                    m   m+1
            -1  3   4   -5  9   -2
runningSum: 6   7   4   -5  4   2 
Return 7 + 4 = 11
```

Finally, our diagram is:

```cpp
  -1,3,4,-5,9,-2        Final solution = 3 + 4  -5 + 9 = 11 
      |                        |        Recursive step:
      |                        |        max (leftSum,rightSum,crossingSum)
      |                        |        max(6,2,11)
      |                        |        
    -1,3,4     ------------>  leftSum = 6           
    -5,9,-2    ------------>  rightSum = 2; 
```

code:

```cpp{numberLines: true}
int middleSum(vector<int>& A, int lo, int m, int hi){
    int leftMax = A[m], leftSum = A[m], rightSum = A[m+1], rightMax = A[m+1];
    for (int i = m-1; i >= lo; i--){
        leftSum = leftSum + A[i];
        if (leftSum > leftMax)
            leftMax = leftSum;
    }
    for (int i = m + 2; i <= hi; i++){
        rightSum = rightSum + A[i];
        if (rightSum > rightMax)
            rightMax = rightSum;
    }
    return leftMax + rightMax;
}

int maxSum(vector<int> A, int lo, int hi, int maximum){
    if (hi <= lo){
        return (A[hi] > maximum ? A[hi] : maximum);
    }
    int m = lo + (hi-lo)/2;
    int left = maxSum(A, lo, m, maximum);
    int right = maxSum(A, m+1, hi, maximum);
    int midSum = middleSum(A, lo, m, hi);
    return max(left, max(right, midSum));
}
```

Running time:
- In the `maxSum` function:
    - the base case takes constant time
    - calculation of `m` takes constant time
    - call to get `left` takes $T(n/2)$ time
    - call to get `right` takes $T(n/2)$ time
    - call to get `midSum` takes $\theta(n)$ time
    - return takes constant time

Therefore, overall running time is:

$$$
2T(n/2) + \theta(n)
$$$

This is the same as merge sort therefore the running time is $O(nlogn)$ 

### Counting Problems
Recursion can be used in combinatorics which is a mathematical field that deals with counting. This section will deal with such algorithms and we'll see how recursion will help us solve these types of problems. 

### Permutations
**Given a string, print all possible permutations of the string**. Example:

```cpp
string A = "ABC"
//permutations:
ABC
ACB
BAC
BCA
CAB
CBA
```

**Base case**: We've got just a single character, in which case, we'll print out that character and be done

**Size of the problem**: Number of characters in the string

**Decomposition**: Discard (or ignore) one character and permute the remaining characters. Keep ignoring until you reach the last character

code:

```cpp
void generatePerms(string s, int n){
    if (n == s.size() - 1){
        cout << s << endl;
        return;
    }
    for (int i = n; i < int(s.size()); i++){
        swap(s[i], s[n]);
        generatePerms(s, n+1);
    }
    return;
}
```

Base is case is checking if the parameter, `n`, is equal to the size of the string, in which case we've got nothing to do but print the string. Secondly, notice above that we've got the loop running from `n` till the end of the string and not from 0 till end of string. This is to simulate the "ignore" effect. Finally, we recurse on next available character.

### Stair case

**Given that you can climb either 1 step at a time or 2 steps at a time, count the number of ways to climb 6 steps**

**Base case**: This is the smallest valid step that you can take: ie you can take 1 step and the number of ways to take 1 step is 1 (by taking just 1 step). Another smallest valid step is that you can take 2 steps. How many ways can you take 2 steps? Well, you can take 1 step twice (way 1) or you can take 2 steps once (way 2):

```cpp
if (n == 1)
    return 1;
if (n == 2)
    return 2;
```

**Decomposition**: Well, you've got 6 steps that you need to climb. In this case, let's look at our choice diagram:

```cpp
                    6
                  /   \         
                 4     5
               /   \ /  \
              2    3 3   4
```

The diagram above shows that we start with 6 steps. Next, the left choice is when we take 2 steps and the right choice is when we take 1 step. On each step, we're to add the number of ways that we've calculated so far. Therefore, we'll be cascading up as we calculate the number of ways for each step. Then, it is clear to see that total number of ways that we can get to 6 steps is by adding the total number of ways we can get to 4 steps and the total number of ways we can get to 5 steps:

$$$
Ways(6) = Ways(5) + Ways(4) \\
\textrm{ie } F(n) = F(n-1) + F(n-2)
$$$

**Size of problem** Size is equal to the number of steps we're asked to climb ie 6 in our example

Now, the code becomes quite simple:

```cpp
int numberOfWaysToClimb(int n){
    if (n == 1)
        return 1;
    if (n == 2)
        return 2;
    int oneBack = numberOfWaysToClimb(n-1);
    int twoBack = numberOfWaysToClimb(n-2);
    return oneBack + twoBack;
}
```

### Manhattan Path
**Given a grid and a target point in that grid at (m,n), find the number of ways to get from 0,0 to m,n.**

Example:

![Grid-Image](./images/recursion/grid.png)

Legal moves are denoted by the red arrows. 

**Base case**: This is when either `m` or `n` is 0. In that case, we're either along the x axis (if n is 0) or y axis (if m is 0). In both these scenarios, the number of ways to get to the point is 1: ie move in one direction until the point is reached

**Decomposition**: Here, we decompose our problem based on `m` and `n`:

![Decomposition-Image](./images/recursion/decomposition.png)[Image credit](https://learning.oreilly.com/library/view/introduction-to-recursive/9781351647175/)

Where we want to reduce `m` by one and keep `n` the same or reduce `n` by one and keep `m` the same. 

Finally, we add up all the ways up to `m` and `n`:

```cpp
int ManhattanPath(int m, int n){
    if (m == 0 || n == 0)
        return 1;
    int reducedMWays = ManhattanPath(m-1, n);
    int reducedNWays = ManhattanPath(m, n-1);
    return reducedMWays + reducedNWays;
}
```

### Conclusion
- Use recursion if
    - The problems is worded such that the final solution is made up solutions to smaller problems
    - There is some sort of counting involved: ie count the number of ways, or get the total number of ways etc
- Sometimes, you can represent recursion using decomposition diagram (linear recursion mostly) and at other times you'd need a choice diagram (counting problems: stair climb)
