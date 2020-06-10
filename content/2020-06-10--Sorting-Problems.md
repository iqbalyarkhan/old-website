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
- **Insertion Sort** also has two sections in the array: sorted and unsorted. Unlike selection sort (where we ran through the array till the end to find the minimum), insertion sort picks the next element in the array (instead of searching for the min) and places this element in its correct position in the sorted section.   