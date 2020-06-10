---
date: 2019-08-11
title: Bubble Sort
thumbnail: /post-images/bubble.png
draft: false 
extract: Explanation and implementation of bubble sort algorithm
categories: 
    - Algorithms
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


### Approach
Remember, the rules of the game are simple:
- Compare two items
- If one on the left is larger, swap them, else, do nothing
- Move one position over and repeat until you reach the end

```cpp{numberLines}
void BubbleSort(vector<int>& A){
    int count = 0;
    int size = int(A.size()) - 1, out = size;
    for (;out >= 0; out--){
        for (int in = 0; in < out; in++){
            count++;
            if (A[in] < A[in+1]){
                swap(A[in], A[in+1]);
            }
        }
    }
}
```

### Analysis

The above approach does the following: we've got two loops, an outer loop and an inner loop. The outer loop starts at the end of 
the array and moves toward the beginning of the array. The inner loop, on each outer loop iteration, starts at the beginning of the array and keeps moving 
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

are always in sorted order. This remains true at the beginning of our algorithm: 

`out = A.size() - 1` and there is nothing to the right of `out` so it holds true.

It is also true at the end:

`out = A[1]` and we've made our last swap if needed.

### Conclusion

The running time of bubble sort is $O(N^2)$. This is because at worst, we need to sort an array which is in reverse order and we need to bubble each element from the left of the array to the right for **each** element in the array. 

At best, bubble sort would run in $O(N)$ time since we'd have to pass through the array once to realize that no swaps were required. 