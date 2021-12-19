---
title: Quick Sort 
date: 2020-04-09
thumbnail: /post-images/quick.png
draft: false
extract: Explanation and implementation of quick sort algorithm
categories: 
    - DS&A
tags:
  - Sorting Algorithms
  - Quick Sort
---

### Table of Contents

1. [Introduction](#introduction)

2. [Logic](#logic)

3. [Sort](#sort)

4. [Conclusion](#conclusion)

### Introduction

In this post I'll talk about a sorting algorithm called Quick Sort. Idea behind quick sort is similar to what merge sort does: divide and conquer. However, quick sort does the heavy lifting before it recurses. Let's have a look at an example: 

### Logic

Here're the three basic steps of quick sort:

- Shuffle the array so that the elements are in random order
- Choose a `pivot`: an item that has all the elements less than it to its left and elements greater than it to its right
- Repeat these steps for each half of the array 

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

Notice now that ALL elements to the left of `j` (4,3,1,2) are less than `arr[j]` and all elements to the right of `j` (7,8,6) are greater than `arr[j]`. We also want to capture what position we partitioned based off so that we can determine what the left and right halves should be. 

Now, in the example above we always chose `arr[0]` as our pivot that can degenerate running time of quick sort to $O(N^2)$ if our array is in sorted order. That is because each time we pick the smallest element in the array and on each call to partition, we iterate over the entire array from left to right. This is why, a better approach is to use a median of 3: look at the first, middle and last element in the array and find the median of three. For example, if we have a sorted array like so:

```cpp

1   2   3   4   5   6   7   8   9

```

you'll look at 1, (0 + (8-0)/2) which is 5 and 9. You find that 5 is the median because 1 < 5 < 9. So you choose 5 as the pivot and move it to the front of the array:

```cpp

5   2   3   4   1   6   7   8   9

```

and now you run your partition on this array. This allows us to handle cases where the array is already sorted.

Here's the code for our partition function:

```cpp{numberLines: true}
int partition(vector<int>& A, int i, int j){
    //Median of three pivot calculation
    int pivot = medianOfThree(A, i, j);
    int temp = A[i];
    A[i] = A[pivot];
    A[pivot] = temp;
    pivot = i;
    i++;
    
    while (true){
        while (A[i] < A[pivot] && i <= j)
            i++;
        
        while (A[j] > A[pivot] && j >= i)
            j--;
        
        if (i >= j){
            int temp = A[pivot];
            A[pivot] = A[j];
            A[j] = temp;
            break;
        }
        
        int temp = A[i];
        A[i] = A[j];
        A[j] = temp;
        i++;
        j--;
    }
    return j;
}

//Function to calculate median of three
int medianOfThree(vector<int>& A,int i, int j){
    int m = i + (j-i)/2;
    int pivot = -1;
    if (A[i] > A[m] && A[i] > A[j])
        pivot = A[m] < A[j] ? j : m;
    else if (A[j] > A[m] && A[j] > A[i])
        pivot = A[m] < A[i] ? i : m;
    else
        pivot = A[j] < A[i] ? i : j;
    return pivot;
}

```

Also, notice that before we begin partitioning, we always place the pivot at the `ith` index so that we have it out of the way. Once we're done moving the elements around, we place the pivot in its correct position by swapping it with whatever is at `A[j]`.

The partition function returns an integer that we just partitioned the array around. Meaning that that number is now in its correct position. So, remaining iterations would now take place after excluding the `j`s. We also have a median of three function that calculates which integer needs to be the pivot. 

### Sort

Here's the code that calls itself recursively and in turn calls the partitioning function:

```cpp
void quickSort(vector<int>& A, int lo, int hi){
    if (lo == hi)
        return;
    int p = partition(A, lo,hi);
    quickSort(A, lo, p-1);
    quickSort(A, p+1,hi);
}
```

If `lo == hi`, it means that we don't have anything to sort because the indices we passed in signify that we're looking at just 1 element. This would be our base case. If we have multiple elements to partition, we call the partition function and swap all elements less than the calculated partition (using the median of 3 approach) and return the position we just partitioned around. Next, we call quicksort again but this time with left and right parts of the array. 


### Conclusion

So, to conclude, we can use quick sort and median of three to get $O(NlogN)$ average case running time. We use median of three to make sure that even if we get a partially or completely sorted array, our running time doesn't degenerate to $O(N^2)$. Quick sort also uses $O(1)$ amount of extra memory since we do not copy over the array in any step. 