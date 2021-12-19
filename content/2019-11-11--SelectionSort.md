---
title: Selection Sort
date: 2019-08-18
thumbnail: /post-images/selection.png
draft: true
extract: Implementation and analysis of selection sort in C++
categories: 
    - DS&A
tags:
  - Sorting Algorithms
  - Selection Sort
---

### Introduction

In this post I'll talk about one of the most common sorting algorithms called Selection Sort.The idea behind selection sort is to start with an array that has two sections: a sorted section and an unsorted section. We'll **select** the smallest element from the unsorted section and place it in the sorted section. 

We'll first find the smallest element in the unsorted section and insert it at arr[0]. Then we'll find the second smallest element from the array and insert it at arr[1] and so on. As it is obvious, unlike [bubble sort](/bubble-sort), sorted elements are gathered at the left end (end starting with subscript 0) of our array, while bubble sort gathered elements at the opposite end.

### Code

```cpp{numberLines}
void SelectionSort(vector<int>& A){
    int size = int(A.size());
    for (int i = 0; i < size; i++){
        int min = i;
        for (int j = min+1; j < size; j++){
            if (A[j] < A[min])
                min = j;
        }
        swap(A[min], A[i]);
    }
}
```

### Explanation

We've got two loops that run: outer loop to keep track of position we're currently filling with the smallest element and the inner loop to actually find the minimum element from the unsorted section. Once we've reached the end of the inner loop, `min` contains the index of the smallest element. We then proceed to swap `a[i]` and `a[min]`. Once we've swapped the two, we then move `i` to the right and again run the inner loop to find the new `min`. 

Therefore, the [invariant](/bubble-sort#invariant) for this algorithm is:

$$$
values <= i
$$$

are always in sorted order. That is because in every iteration, we look for the smallest element and place it at `a[i]` and increment `i`. 


### Analysis

It is clear to see that the running time of selection sort is $O(N^2)$ . That is because we've got two nested loops where the outer loop (going from $0$ to $N - 1$) determines the position where our selection would be inserted and the inner loop also going till $N$ would look for the item to be inserted. 

A drawback of selection sort is that no matter what the order of inputs is, it'll always take $O(N^2)$ time for the algorithm to run. The algorithm is constructed such that it has to iterate over all the elements before it can exit. However, as compared to [bubble sort](/bubble-sort), selection sort is faster because selection sort has to perform fewer swaps: we've reduced the number of swaps from $O(N^2)$ to $O(N)$.