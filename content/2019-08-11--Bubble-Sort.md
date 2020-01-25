---
date: 2019-08-11
title: Bubble Sort
draft: false 
extract: Explanation and implementation of bubble sort algorithm
categories: 
    - Sorting Algorithms
tags:
  - Sorting Algorithms
  - Bubble Sort
---

### Introduction

In this post I'll talk about one of the most common sorting algorithms called Bubble Sort. 
There are plenty of implementations available on the internet but I, instead of looking at someone else's code, 
decided to understand the logic and implement it on my own. I like to do things this way so that I remember how it's done. 
The best way to understand anything is to do it yourself! I'd hate to memorize bubble sort implementation thus I'm using this 
post as a 'note to self' to keep a track of the things I learned while implementing bubble sort. To make sure we get the most out 
of this post, instead of just copying and pasting code from my IDE, I'll explain each line of code and why I chose to do what I did. Let's begin.

The idea behind bubble sort is to build our array from the right end (part of the array with the largest index) and move 
gradually to the opposite end. We begin by looking at each adjacent pair `i` and  `j` and checking whether the value `i` is 
greater than `j`. This could be changed if you're sorting your array in decreasing order (we'll then simply check if `i`
 is less than `j`). We keep repeating this until we find that **we've not made any swaps** in our iteration. As the algorithm 
 progresses, the biggest item bubble up to the top end of the array. Simple! 

### Code

You can copy and paste this implementation in your IDE and this should work without any issues but I'd rather you understand what is going on. Here is my version of bubble sort:

```cpp {numberLines: true}
#include <stdio.h>
#include <iostream>
#include <string>
#include <vector>

using namespace std;

int main(){
    vector<int> A = {2,4,1,6,8,5,3,7};
    cout << "Array as of now: " << endl;
    for (int i = 0; i < A.size(); ++i){
        cout << A[i] << " ";
    }
    cout << endl;
    int swapped = -1;
    while (swapped != 0){
        swapped = 0;
        int i = 0, j = 1;
        while (true){
            if (j == A.size()){
                break;
            }
            if (A[i] > A[j]){
                int temp = A[i];
                A[i] = A[j];
                A[j] = temp;
                ++i;
                ++j;
                swapped++;
            } else {
                ++i;
                ++j;
            }
        }
        
        cout << "Array as of now: " << endl;
        for (int i = 0; i < A.size(); ++i){
            cout << A[i] << " ";
        }
        cout << endl;
    }
}
```

### Output

```
Array as of now: 
2 4 1 6 8 5 3 7 
Array as of now: 
2 1 4 6 5 3 7 8 
Array as of now: 
1 2 4 5 3 6 7 8 
Array as of now: 
1 2 4 3 5 6 7 8 
Array as of now: 
1 2 3 4 5 6 7 8 
Array as of now: 
1 2 3 4 5 6 7 8 
```

### Explanation

From lines 9-14:
```cpp{numberLines:9}
    vector<int> A = {2,4,1,6,8,5,3,7};
    cout << "Array as of now: " << endl;
    for (int i = 0; i < A.size(); ++i){
        cout << A[i] << " ";
    }
    cout << endl;
```
I declare a vector and print it out (I like to visualize things).
Next:
```cpp{numberLines:15}
    int swapped = -1;
```
I declare the `swapped` variable and assign it any value other than zero. This value is used to keep a track of whether we've made any swaps. If `swapped == 0`, we'll know that we're done sorting.

```cpp{numberLines:16}
while (swapped != 0)
```
Here we have the check for the `swapped` variable like I described above and then we go into the `while` loop. Next I set `swapped` to 0

```cpp{numberLines:17}
    swapped = 0;
```
so that we're only incrementing the value if we make any swaps. Next I initialize two variables `i = 0` and `j = 1` to start our looping from `A[i]` and `A[j]`. Therefore, for every iteration, we'll have our loop starting from `A[0]` and `A[1]` element. 

Next, before we do any operations, we need to make sure that our loop hasn't reached the end by checking

```cpp{numberLines:20}
    if (j == A.size()){
        break;
    }
```
This condition will be true when we've incremented our `i` and `j` counters. If `j == A.size()` then we've reached the end of our vector and thus we break.

Now comes the meat of the algorithm:

#### Iteration 1:

```cpp{numberLines:23}
    if (A[i] > A[j]){
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
        ++i;
        ++j;
        swapped++;
    }
```
This block checks to see if `A[i] > A[j]`. This is where we make the comparison to see if a swap is needed. In the first iteration of the loop, this condition is not true:

```
//i = 0, j = 1 
//A[0] = 2, A[1] = 4
{2,4,1,6,8,5,3,7}

```
Since this condition is not true, we fall to the else statement

```cpp{numberLines:30}
} else {
    ++i;
    ++j;
}
```
where we simply increment values for `i` and `j`

#### Iteration 2:

Since we incremented `i` and `j` at the end of iteration 1,  `i =1` and `j = 2` now. Therefore, our `A[1] = 4` and `A[2] = 1`. Keep in mind that we're still inside the `while(true)` loop (since the break condition hasn't been met). Our `swapped` variable is still 0. 

Next on line 23 we check: 

```cpp{numberLines:23}
if (A[i] > A[j]){
```
which is true since `4 > 2`. Lines, 24-26 swap elements in position `A[i]` and `A[j]`. Once the swap is performed, our array would look like this:

```cpp
{2,1,4,6,8,5,3,7}
```
Once done, we increment our `i` and `j` so that now `i = 2` and `j = 3`. We also increment `swapped` which was initially 0 and is now 1. Since we're still inside the `while(true)` statement, we go through iteration 3.

#### Iteration 3:

Now since our `i = 2` and `j = 3` due to our increments at the end of iteration 2, our `A[i] = 4` and `A[j] = 6`. No swaps are needed here so we increment `i` and `j` again until we get to `i = 4` and `j = 5`. This is when `A[i] = 8` and `A[j] = 5`. 
So far, our array looks like this:

```cpp
{2,1,4,6,8,5,3,7}
         i j
```
Notice now that we need to swap `A[i]` and `A[j]` after which our array looks like this:

```cpp
{2,1,4,6,5,8,3,7}
           i j
```
and our `swapped` counter is incremented to 2. These swaps are repeated until our array looks like this

```cpp
{2,1,4,6,5,3,7,8}
               i j
```
and our `swapped` counter is currently at 4. 

Notice, j is pointing beyond the array now and in our following iteration, the condition on lines 20-23:

```cpp{numberLines:20}
    if (j == A.size()){
        break;
    }
```
would be true. This is because `j = 8` and `A.size() = 8`. We break out of this loop and print our second output to console (first output was just printing the array as is):

```cpp{numberLines: 3}
Array as of now: 
2 1 4 6 5 3 7 8 
```
We then move back to line 16 to this check:

```cpp{numberLines:16}
while (swapped != 0){
```

and since `swapped` was 4 we continue to proceed inside this `while` loop and the process described above operates on our updated array.

Like I said earlier, this process continues until we don't have any more swaps to perform at which point our array is entirely sorted. 

### Alternative Approach
This is all well and good but you can see we can make an improvement to our code: we, unnecessarily go all the way to the last element of the array on each iteration. 
This is not required since at the end of each iteration, the right most element in the array is guaranteed to be in the correct position. 
We can leverage this information my adding a small check to the code above. However, I've added another approach below that accomplishes the same task:
Remember, the rules of the game are simple:
- Compare two items
- If one on the left is larger, swap them, else, do nothing
- Move one position over and repeat until you reach the end

```cpp{numberLines}
int main(){
    
    vector<int> A = {0,99,88,77,66,55,44,7};
    cout << "Array as of now: " << endl;
    for (int i = 0; i < A.size(); ++i){
        cout << A[i] << " ";
    }
    
    //We start our "out" counter at the end
    //of the array and keep moving it inward
    for (int out = A.size() - 1; out > 1; out--){
        //We take our "in" counter up till
        //out.
        for (int in = 0; in < out; in++){
            if (A[in] > A[in + 1]){
                //swap
                int temp = A[in];
                A[in] = A[in + 1];
                A[in + 1] = temp;
            }
        }
    }
    cout << endl;
    cout << "Array at the end: " << endl;
    
    for (int i = 0; i < A.size(); ++i){
        cout << A[i] << " ";
    }
    cout << endl;
    
}
```

Output:
```
Array as of now: 
0 99 88 77 66 55 44 7 
Array at the end: 
0 7 44 55 66 77 88 99 
Program ended with exit code: 0
```

### Analysis

The above approach is simple: we've got two loops, an outer loop and an inner loop. The outer loop starts at the end of 
the array and moves toward the beginning of the array. The inner loop starts at the beginning of the array and keeps moving 
forward until it encounters `out`. This check prevents us from going farther than we have to since at the end of each outer loop iteration, 
we're guaranteed to have positions greater than `out` in sorted order. This is possible because at the end of each iteration
of `out`, the inner loop would've found the largest element so far and moved it to `A[out]`. That is possible because in 
each iteration of `in`, we're moving an element to the "right" if it is greater than its neighbor. As a result, when we're
done, we'd have moved the largest element to the right.

To summarize, we use `out` loop to keep track of position where we need to insert the new element while we use the `in` loop to find
the element that would go at position `A[out]`.


#### Example array:

Say this is what our array looks like at the beginning:

```cpp
0 99 88 77 66 55 44 7
in                 out
```

At the end of the first pass, this is what our array would look like:

```cpp
0 88 77 66 55 44 7  99
in              out  
```

Notice how the largest element in the array is now where `out` used to be. This is after our entire inner loop is done running.

Also notice that in the first pass, when`out` is equal to `A.size() - 1`, we're doing between $0$ and $N-1$ swaps. In the next pass,
when we've got the largest element in `A[out]` and `out` is equal to `A.size() - 2`, we're doing between $0$ and $N-2$ swaps because 
you know the last position, at `A.size() - 1`, already has the largest value. 

### Invariant
In each sorting algorithm, there is a condition that is true at the end of each iteration and we call this condition the **invariant**. The word invariant literally means "not changing" so what is the one thing that is not changing at the end of each iteration of bubble sort?  Our invariant, in this alternative is: 
$$$
values > out
$$$

are always in sorted order. 

This remains true at the beginning of our algorithm: 

`out = A.size() - 1` and there is nothing to the right of `out` so it holds true.

It is also true at the end:

`out = A[1]` and we've made our last swap if needed.

### Conclusion

The running time of bubble sort is O(n<sup>2</sup>). This is because at worst, we need to sort an array which is in reverse order and we need to bubble each element from the left of the array to the right for **each** element in the array. 

At best, bubble sort would run in O(n) time since we'd have to pass through the array once to realize that no swaps were required. 