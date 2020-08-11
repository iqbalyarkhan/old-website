---
title: Insertion Sort 
date: 2019-08-17
thumbnail: /post-images/insertion.png
draft: false
extract: Explanation and implementation of insertion sort algorithm
categories: 
    - Algorithms
tags:
  - Sorting Algorithms
  - Insertion Sort
---

### Introduction

The idea behind insertion sort is to start with an array that has two sections: a sorted section and an unsorted section. We'll pick an element from the unsorted section, go through the sorted section of the array and place that element in its correct position.

### Code

You can copy and paste this implementation in your IDE and this should work without any issues but I'd rather you understand what is going on. Here is my version of insertion sort:

```cpp {numberLines: true}
#include <iostream>
#include <string>
#include <vector>
#include <stdio.h>

using namespace std;

int main(){
    vector<int> a = {2,4,1,6,8,5,3,7};
    
    for (int i = 1; i < a.size(); ++i){
        int j = i - 1;
        int curr = a[i];
        int ptr = i;
        while( a[j] > curr && j >= 0){
            swap(a[j],a[ptr]);
            j--;
            ptr--;
        }
        cout << "Array as of now: " << endl;
        for (int k = 0; k < a.size(); k++){
            cout << a[k] << " ";
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
1 2 4 6 8 5 3 7 
Array as of now: 
1 2 4 6 8 5 3 7 
Array as of now: 
1 2 4 6 8 5 3 7 
Array as of now: 
1 2 4 5 6 8 3 7 
Array as of now: 
1 2 3 4 5 6 8 7 
Array as of now: 
1 2 3 4 5 6 7 8 
```

### Explanation

On line 11:
```cpp{numberLines:11}
   for (int i = 1; i < a.size(); ++i){
```

I start with `i = 1` since I assume `a[0]` is the sorted part of the array. Thus, `a[1]` onwards is the unsorted part of the array. 

Next:
```cpp{numberLines:12-14}
    int j = i - 1;
    int curr = a[i];
    int ptr = i;
```

I assign a variable, `j`, to the point where the sorted part of the array **ends** and assign the current variable being analyzed to `curr`. 

Lines 15-21 are the meat of the algorithm:
```cpp{numberLines:15-21}
    while( a[j] > curr && j >= 0){
        int temp = a[j];
        a[j] = a[ptr];
        a[ptr] = temp;
        j--;
        ptr--;
    }
```
While `a[j]` is greater than the current element being processed, keep swapping the elements until the current element is in its correct position. This way, we keep moving the smaller element until we find its correct position in the sorted part of the array. Let's go through some iterations with actual numbers and see how elements are moving.

#### Iteration 1:

At the beginning of iteration 1, our values are as follows:
`i = 1, j = 0, curr = 4 and ptr = 1`

Therefore, `a[j]` is `2` which is NOT greater than `curr` (where `curr = 4`). So, we never enter the `while` loop and simply print the array as is.

#### Iteration 2:

At the beginning of iteration 2, our values are as follows:
`i = 2, j = 1, curr = 1 and ptr = 2`

Therefore, `a[j]` is `4` which is  greater than `curr` (where `curr = 1`). So, we enter the `while` loop.

Now, we should recognize this from our insertion sort post that we're simply swapping two elements. In this iteration, the two elements are `a[j]` and `a[ptr]` (we're swapping the values 1 and 4) so that our array looks like this:

`2 1 4 6 8 5 3 7`

but we're not done with the while loop yet. After the swap we decrement `j` and `ptr` so that

`j = 0` and `ptr = 1` 

which results in 

`a[j] = 2` and `a[ptr] = 1` 

and the condition at the beginning of `while` loop is true again. Therefore, we fall into the body of the `while` loop again and swap `a[j]` and `a[ptr]`. In doing so, our array now looks like this:

`1 2 4 6 8 5 3 7`

Before we exit out of the `while` loop, we decrement `j` from 0 to -1 and `ptr` from 1 to 0. Next time, when we hit line 15:

```cpp{numberLines:15}
    while( a[j] > curr && j >= 0){
```
the condition `j >= 0` is not true any more and we skip the while loop and print out our array.

So, in this iteration, our array went through the following swaps:

`2 4 1 6 8 5 3 7`

`2 1 4 6 8 5 3 7`

`1 2 4 6 8 5 3 7`

#### Following iterations:

This process repeats again when our `i` is equal to 5 and `a[i] = 5`. Up till that point, our sorted portion of the array is:

`1 2 4 6 8` and unsorted portion is `5 3 7`:

`1 2 4 6 8    5 3 7`

As it is obvious by looking at the iterations above, our invariant is the fact that $elements <= i$ are in partially sorted order. Partially sorted means that the array is sorted based on the elements seen so far. They might not be in their final positions but are sorted at that point in time. 

We then pick the value `5` from the unsorted portion and keep moving it down until we find the correct position for `5` in the sorted portion. Then our array would look like this:

sorted: `1 2 4 5 6 8` unsorted: `3 7`:

` 1 2 4 5 6 8    3 7`

The process then repeats until `i` reaches end of the array.

### Conclusion

The running time of insertion sort is $O(N^2)$. This is because at worst, we need to sort an array which is in reverse order and we need to keep picking an element and shifting it down to the left until we find the correct position. 

Why would someone use insertion sort at all when there are other more efficient algorithms present? It is because insertion sort is the preferred algorithm when you know your data is small and is almost sorted. In fact, insertion sort is commonly used as a part of a quicksort implementation. Out of the three elementary sorts (insertion sort, [selection sort](/selection-sort) and [bubble sort](/bubble-sort)), insertion sort is the most used.

At best, insertion sort would run in O(N) time since we'd have to pass through the array once until `i` reaches the end of our array. We'd never enter the inner `while` condition since the tests for it would not be true for a sorted array.