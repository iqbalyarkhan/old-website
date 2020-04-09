---
title: Merge Sort 
date: 2019-08-18
thumbnail: /post-images/merge.png
draft: false
extract: Explanation and implementation of merge sort algorithm
categories: 
    - Algorithms
tags:
  - Sorting Algorithms
  - Merge Sort
---

### Table of Contents

1. [Introduction](#introduction)

2. [Logic](#logic)

### Introduction

In this post I'll talk about a sorting algorithm called Merge Sort. The idea behind merge sort is to start with breaking down an array into smaller pieces and then merging those smaller pieces back together in sorted order. This approach is commonly called **divide and conquer** where we divide our array into smaller chunks (via recursion) and perform the conquer operation of merging those smaller chunks back together. 

### Logic

Let's start with a sample array and see how we can use merge sort to sort it:

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| -- | -- | -- | -- | -- | -- | -- | -- |
| 8 | 1 | 6 | 2 | 4 | 3 | 5 | 7 |

The idea is to keep breaking the array into pieces until we get to the smallest element possible: a single element. An element, by itself, is already in sorted order: if I gave you an array that looked like this: `[2]` (with a single element) and asked you if it was sorted, you'd say yes!

So, let's start with breaking this array down. Randomly, I chose the left half of the array:

```cpp

[8   1   6   2]
```

Next, we break it down farther:

```cpp

[8   1]       [6   2]
```

and some more:

```cpp

[8]       [1]       [6]       [2]
```

We now have 4 elements: 8,1,6 and 2 that are by themselves in arrays of size 1. We're now ready to merge our way back up.

Let's start with two sorted arrays of 8 and 1:

```cpp
[8]   [1]
```

How do we merge two sorted arrays? Well, we create a new array of size equal to the two arrays, place two pointers (`i` and `j`) at the start of each array, and then place in the new array the element that is the smallest. We keep incrementing the pointers until we've reached the end.

```cpp

new arr:            [,]
                     i     j           
                     |     |
old sorted arrs:    [8]   [1]
```

`j` < `i` so add `rightArr[j]` to `newArr`, increment `j` and keep `i` in its old position:

```cpp

new arr:            [1,]
                     i       j           
                     |       |
old sorted arrs:    [8]   [1]
```

We don't have anymore elements in `rightArr` since `j` is past the end of `rightArr`. We can now copy over all the elements from `leftArr` into our `newArr`:

```cpp

new arr:            [1,8]
                       i     j           
                       |     |
old sorted arrs:    [8]   [1]
```
Our new arr is sorted with 2 elements! We can now return this new arr. We repeat this process with other elements as well and keep merging with the sorted array. 