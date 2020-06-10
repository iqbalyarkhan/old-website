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

3. [Merge](#merge)

4. [Sort](#sort)

5. [Output](#output)

6. [Conclusion](#conclusion)

### Introduction

In this post I'll talk about a sorting algorithm called Merge Sort. The idea behind merge sort is to start with breaking down an array into smaller pieces and then merging those smaller pieces back together in sorted order. This approach is commonly called **divide and conquer** where we divide our array into smaller chunks (via recursion) and perform the conquer operation of merging those smaller chunks back together. 

### Logic

Here're the three basic steps of merge sort:

- Divide an array into smaller halves
- Recursively sort each half
- Merge the sorted halves

Let's start with a sample array and see how we can use merge sort to sort it:

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| -- | -- | -- | -- | -- | -- | -- | -- | -- |
| 8 | 1 | 6 | 2 | 4 | 3 | 5 | 7 | 9 |

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

### Merge

Let's start with the idea of merging. Assume we've got an array that is divided into two halves and the two halves are already sorted (indices 0 - 4 are sorted and 5 - 8 are sorted):

```cpp

value   1   2   3   6   8   4   5   7   9
index   0   1   2   3   4   5   6   7   8

```


Let's assign variables to the indices. `lo` is the lowest index in the array, `mid` is middle and `hi` is the last index:

```cpp
        lo             mid mid+1        hi
value   1   2   3   6   8   4   5   7   9
index   0   1   2   3   4   5   6   7   8

```

Next, we copy over the elements to an temp array and then populate the original array in sorted order. To do so, we have the following pointers:
 - Start at index `lo` of the original array using a pointer `k`. This is the index at which we'll start over-writing values
 - A pointer at position `lo` in the temp array and call it `i` 
 - A pointer at position `mid+1` and call it `j`:

```cpp
value   1   2   3   6   8   4   5   7   9
        k

temp    1   2   3   6   8   4   5   7   9
        i                   j
```

We use `lo` and `mid+1` to signify that :

- `lo` - `mid` is sorted and
- `mid+1` - `hi` is sorted 

Next, we start our comparisons with a  simple logic. If `temp[i]` < `temp[j]` copy it over to `arr[k]` otherwise copy over `temp[j]`. Increment `k` and whichever pointer you copied over from:

```cpp

if (temp[i] < temp[j]){
    originalArr[k] = temp[i];
    i++;
} else {
    originalArr[k] = temp[j];
    j++;
}

k++;
```

So, here's how we'll proceed:

```cpp

Step 1:

value   1   2   3   6   8   4   5   7   9
        k

temp    1   2   3   6   8   4   5   7   9
        i                   j

i < j, copy i and increment i and k:

value   1   2   3   6   8   4   5   7   9
            k

temp    1   2   3   6   8   4   5   7   9
            i               j

Step 2:

again,i < j, copy i and increment i and k:

value   1   2   3   6   8   4   5   7   9
                k

temp    1   2   3   6   8   4   5   7   9
                i           j
```

We continue until either `i` crosses over to `mid+1` or if `j` gets to `hi + 1`. In either case, if the other hasn't reached its end, we'd continue to copy over the elements until the pointers reach their respective ends. We need the value of mid being passed to `merge` because if we have odd number of elements in the array, our mid calculation by subtracting `lo` from `hi` would be off. 

Here's the code for merging:

```cpp{numberLines: true}
void Merge(vector<int>& originalArr,int lo, int hi){
    vector<int> temp(originalArr);
    int mid = lo + ((hi - lo)/2);
    int i = lo;
    int j = mid + 1;
    int k = lo;
    
    for (; k <= hi; k++){
        if ((i <= mid) && temp[i] < temp[j]){
            originalArr[k] = temp[i];
            i++;
        } else if ((j <= hi) && temp[j] < temp[i]){
            originalArr[k] = temp[j];
            j++;
        } else if (j > hi){
            originalArr[k] = temp[i];
            i++;
        } else {
            originalArr[k] = temp[j];
            j++;
        }
    }
}
```

One caveat above: we need to assign `k` to `lo` and not 0 because since we're passing in a reference to our original array, the current iteration of merge is only responsible for handling the merging between `lo` and `hi`. If we assign `k` to 0, we'd be overwriting the work of other merges in the current call.

### Sort

The sort procedure's job is to recursively break down the array into smaller chunks which means the `sort` procedure is responsible for calculating the `lo`,`mid` and `hi`, and sending to merge when appropriate:

```cpp{numberLines: true}
void MergeSort(vector<int>& A, int lo, int hi){
    if (lo == hi)
        return;
    int mid = lo + ((hi - lo)/2);
    MergeSort(A, lo, mid);
    MergeSort(A, mid+1, hi);
    Merge(A,lo,hi);
}
```

The function checks first to make sure that we have more than 1 elements to sort. If so, it calculates the `mid` value and calls itself first with the left half and then the right half. Once it is down to the smallest element, it starts calling the merge recursively.

### Output

Let's examine the output when we call merge sort with the array: 9,8,7,6,5:

```css
Original Array:
9 8 7 6 5

Returning from merge: 
8 9 7 6 5 

Returning from merge: 
7 8 9 6 5 

Returning from merge: 
7 8 9 5 6 

Returning from merge: 
5 6 7 8 9 

Finally: 
5 6 7 8 9 
Program ended with exit code: 0
``` 

### Conclusion
Merge sort runs in $O(N log N)$ time and its space complexity is $O(N)$.