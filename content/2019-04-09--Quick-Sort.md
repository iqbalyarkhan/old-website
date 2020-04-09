---
title: Quick Sort 
date: 2020-04-09
thumbnail: /post-images/quick.png
draft: false
extract: Explanation and implementation of quick sort algorithm
categories: 
    - Algorithms
tags:
  - Sorting Algorithms
  - Quick Sort
---

### Table of Contents

1. [Introduction](#introduction)

2. [Logic](#logic)

3. [Merge](#merge)

4. [Sort](#sort)

5. [Output](#output)

6. [Conclusion](#conclusion)

### Introduction

In this post I'll talk about a sorting algorithm called Quick Sort. Idea behind quick sort is similar to what merge sort does: divide and conquer. However, quick sort does the heavy lifting before it recurses. Let's have a look at an example: 

### Logic

Here're the three basic steps of merge sort:

- Shuffle the array so that the elements are in random order
- Choose a `pivot`: an item that has all the elements less than it to its left and elements greater than it to its right
- Repeat these steps for each half of the pivot 

Let's start with a sample array and see how we can use quick sort to sort it:

```cpp
5   3   1   2   7   4   8   6
```

Let's say our pivot is 5, located at `arr[0]`. We'll have 3 pointers:

- `i` that points to `arr[1]`
- `j` that points to the last element in the array
- `k` that points to the pivot

`i` and `j` will be used to define our **sort** window. In the first iteration, this window would be the entire array.

Ok, so what do we do with these pointers? 

- If `i` is at an element that is smaller than pivot, keep incrementing `i`.
- If `j` is at an element that is greater than pivot, keep decrementing `j`.
- When `arr[i]` is greater than pivot AND `arr[j]` is less than pivot, swap `arr[i]` and `arr[j]`.
- Continue doing so until `i` and `j` cross over. 

Start:
 ```cpp
5   3   1   2   7   4   8   6
k   i                       j
 ```
arr[i] is less than pivot, increment `i`. arr[j] is greater than pivot, decrement `j`. Keep incrementing `i` and decrementing `j` until `i` lands on something that is greater than pivot and `j` lands on something that is smaller than the pivot:

 ```cpp
5   3   1   2   7   4   8   6
k               i   j
 ```
Ok! We found a case where that holds true. Swap `arr[i]` with `arr[j]` increment `i` and decrement `j`.

 ```cpp
5   3   1   2   4   7   8   6
k               j   i
 ```

At this point, swap `j` with `k`:

 ```cpp
4   3   1   2   5   7   8   6
k               j   i
 ```

Notice now that ALL elements to the left of `j` (4,3,1,2) are less that `arr[j]` and all elements to the right of `j` (7,8,6) are greater than `arr[j]`. We also want to capture what position we partitioned based off so that we can determine what the left and right halves should be. 

Here's the code for our partition and swap function:

```cpp{numberLines: true}
int partition(vector<int>& A, int i, int j, int pivot){
    while (true){
        //While A[i] < pivot and hasn't crossed over
        //j, keep incrementing i
        while (A[i] < A[pivot] && i <= j)
            i++;
        //While A[j] > pivot and hasn't crossed over
        //i, keep decrementing j
        while (A[j] > A[pivot] && j >= i)
            j--;
        
        //Check if i and j crossed over or if
        //we got a point where j < pivot and
        //i > pivot
        if (i >= j){
            //swap and exit if crossover
            int temp = A[pivot];
            A[pivot] = A[j];
            A[j] = temp;
            break;
        }
        //Just swap and move if not crossover
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
        i++;
        j--;
    }
    //This is the position where we partitioned
    return j;
}
```


