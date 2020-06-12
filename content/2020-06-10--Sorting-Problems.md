---
title: Sorting Problems 
date: 2020-06-10
thumbnail: /post-images/sorting_problems.png
draft: false
extract: Problems related to sorting algorithms
categories: 
    - Algorithms
tags:
  - Sorting Problems
---

Header credit: <a href="https://iconscout.com/icons/text-rotation-down" target="_blank">Text Rotation Down Icon</a> by <a href="https://iconscout.com/contributors/google-inc">Google Inc.</a> on <a href="https://iconscout.com">Iconscout</a>

### Table of Contents

1. [Introduction](#introduction)
2. Problems
    * [Compute intersection of two sorted arrays](#compute-intersection-of-two-sorted-arrays)
    * [Merge two sorted arrays](#merge-two-sorted-arrays)
2. [Conclusion](#conclusion)

### Introduction

Sorting is commonly used to pre-process a collection to make searching faster (such as binary search that uses a sorted array). Naive sorting algorithms: [bubble sort](/bubble-sort/), [insertion sort](/insertion-sort/) and [selection sort](/selection-sort/) run in $O(N^2)$ time as we've seen previously. 

Better sorting algorithms run in $O(NlogN)$ time:
- heap sort
- [merge sort](/merge-sort)
- [quick sort](/quick-sort)

Here's a quick comparison for each sorting algorithm:

|  | **Running Time** | **Stable** | **In Place** | **Preferred When**
| -- | -- | -- | -- | -- | -- |
| **Bubble Sort** | $O(N^2)$ | $Y$ | $Y$ | - |
| **Selection Sort** | $O(N^2)$ | $N$ | $Y$ | - |
| **Insertion Sort** | $O(N^2)$ | $Y$ | $Y$ | Use this when few elements need to be sorted. It is faster than others |
| **Heap Sort** | $O(NlogN)$ | $N$ | $Y$ | If every element is known to be at most k places from its final location - use min heap |
| **Merge Sort** | $O(NlogN)$  | $N$ | $N$ |
| **Quick Sort** | $O(NlogN)$  | $N$ | Depends | A well implemented quicksort is usually the best choice for sorting |


Quick recap for each sorting algorithm:
- **Bubble sort** "bubbles" its way to the right: it has an `out` pointer that starts off at the right end of the array and an `in` pointer that compares two adjacent elements until `in` < `out`. At the end, `out` is decremented and `in` starts at 0 again. 
- **Selection Sort** "selects" the smallest element from the unsorted section of the array and places it in the sorted section. Initially, we start `unsorted` at `A[1]` and `sorted` at `A[0]`. The algorithm runs from `unsorted` till end of array and keeps track of `min`. Once it reaches the end, `min` is swapped with `sorted`. `sorted` is then incremented and the process repeated until `sorted` equals one less than last element in the array.
- **Insertion Sort** also has two sections in the array: sorted and unsorted. Unlike selection sort (where we ran through the array till the end to find the minimum), insertion sort picks the next element in the array (instead of searching for the min) and places this element in its correct position in the sorted section. This continues until the unsorted section reaches end of array.
- **Heap sort** creates a heap out of the unordered array and then repeatedly calls delete on heap until the heap is empty. [Here's](/heap/#sample-heap-sort) a sample heap sort implementation.
- **Merge Sort** breaks down the array, and then builds it back up. Real work is done by the `merge` call.
- **Quick sort** partitions the array around a pivot, and then recursively determines new partitions on smaller arrays and partitions the array.

### Compute intersection of two sorted arrays

**Write a program which takes as input two sorted arrays, and returns a new array containing elements that are present in both of the input arrays. The input arrays may have duplicate entries, but the returned array should be free of duplicates. For example, the input is (2,3,3,5,5,6,7,7,8,12} and (5,5,6,8,8,9,10,10), your output should be (5,6,8).**

Approach 1: Insert each array in a set, then repeatedly remove from each and compare and populate the answer array. We know we can do better!

Approach 2: Best approach is to have 2 pointers, `i` and `j`, that are at the start of each array. Similar to how we increment `l` and decrement `hi` in quicksort for finding pivot, here, we'd increment `i` until `A[i]`  is less than `A[j]`. Since both arrays are sorted, we'd either get to a point where `A[i]` becomes greater than `A[j]` or equal to it. If it is equal, we add to our answer array. 

We also need to check for duplicates since duplicates are allowed: we need to keep incrementing `i` and `j` until the value is equal to what we just pushed to the answer array. 

### Merge two sorted arrays

**Suppose you are given two sorted arrays of integers. If one array has enough empty entries at its end, it can be used to store the combined entries of the two arrays in sorted order. For example, consider:**
 
 ```cpp
(5,13,17,_,_,_,_,_) and 
(3,7,11,19)

where _ denotes an empty entry
``` 
**Then the combined sorted entries can be stored in the first array as:**

```cpp
(3,5,7,11,13,17,19,_)
```

 **Write a program which takes as input two sorted arrays of integers, and updates the first to the combined entries of the two arrays in sorted order. Assume the first array has enough empty entries at its end to hold the result.**

Approach 1: We can copy elements for array A into a temporary array and then write the result back to array A. This takes extra space.

Approach 2: We already have extra space at the end of array A which we can utilize.  

### Conclusion

- To sort an array, use `sort` in the `<algorithm>` header. This runs in $ONlogN)$ time
- Use `list::sort()` to sort a list. This runs in $ONlogN)$ time
- Sorting problems are usually of two kinds:
    - One uses sorting to make subsequent steps in an algorithm simpler. To do so, use a library sort function
    - Design a custom sorting routine. To do so use a BST, heap or array indexed by values
- Sorting can be used to speed up searching
- It is also possible to sort in $O(N)$ time for small or specialized input
- Most often, sorting can be implemented in less space as compared to brute force
    
