---
title: Insertion Sort 
date: 2019-08-17
thumbnail: /post-images/insertion.png
draft: false
extract: Explanation and implementation of insertion sort algorithm
categories: 
    - DS&A
tags:
  - Sorting Algorithms
  - Insertion Sort
---

### Introduction

The idea behind insertion sort is to start with an array that has two sections: a sorted section and an unsorted section. We'll pick an element from the unsorted section, go through the sorted section of the array and place that element in its correct position.

### Code

You can copy and paste this implementation in your IDE and this should work without any issues but I'd rather you understand what is going on. Here is my version of insertion sort:

```cpp {numberLines: true}
void SelectionSort(vector<int>& A){
    for (int j = 1; j < A.size(); j++){
        int i = j-1,curr = j, ptr = i;
        while (ptr >= 0 && A[ptr] > A[curr]){
            swap(A[ptr],A[curr]);
            ptr--;curr--;
        }
    }
}
```

### Explanation

We've got an outer loop that starts at 1 and goes up till the size of our array. This loop will always point to the start of the unsorted section. Then, we've got another variable `i` that'll keep track of the position where our sorted section ends. We start `j` at 1 since a single element is by definition sorted. 

Next, we assign variables `curr` to `j` and `ptr` to `i` so that we can begin our comparisons as we find the correct spot for the element at `A[j]` in the sorted section. We continue to move this element toward the 0th index until we find the correct position. In the process, we continue to swap elements.  

### Example

Say we're in the following state:
```cpp
     i j
{7,8,9,3,12,2,1}
```

Notice how elements from 0 till `i` are partially sorted. We then pick the next element, `3`, to be placed in the sorted section. Here're the swaps that we make to find correct position for `3`: (we re-assign `i` to `ptr` and `j` to `curr`):

```cpp
  ptr 
   | 
{7,8,3,9,12,2,1}
     |
    curr

ptr 
 | 
{7,3,8,9,12,2,1}
   |
  curr


ptr 
| 
{3,7,8,9,12,2,1}
 |
curr
```

We need to continue until `ptr` falls off OR we find an element that is actually smaller than the currently chosen element. 


### Conclusion

The running time of insertion sort is $O(N^2)$. This is because at worst, we need to sort an array which is in reverse order and we need to keep picking an element and shifting it down to the left until we find the correct position. 

Why would someone use insertion sort at all when there are other more efficient algorithms present? It is because insertion sort is the preferred algorithm when you know your data is small and is almost sorted. In fact, insertion sort is commonly used as a part of a quicksort implementation. Out of the three elementary sorts (insertion sort, [selection sort](/selection-sort) and [bubble sort](/bubble-sort)), insertion sort is the most used.

At best, insertion sort would run in O(N) time since we'd have to pass through the array once until `i` reaches the end of our array. We'd never enter the inner `while` condition since the tests for it would not be true for a sorted array.