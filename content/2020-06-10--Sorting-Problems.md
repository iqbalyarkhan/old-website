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
    * [Writing your own sort function](#writing-your-own-sort-function)
2. Problems
    * [Compute intersection of two sorted arrays](#compute-intersection-of-two-sorted-arrays)
    * [Merge two sorted arrays](#merge-two-sorted-arrays)
    * [Find h index](#find-h-index)
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

### Writing your own sort function

It's important to know how to effectively use the sort functionality provided by C++. Let's say you're given a Student struct and that implements a compare method that compares students by name. By default, the array sort library will sort by name. To sort by GPA, you need to explicitly specify the compare function to the sort routine.

Here's our student struct:

```cpp
struct Student{
    bool operator<(const Student& that) const {
        return name < that.name;
    }
    
    string name;
    double gpa;
};
```
Notice that the overloaded `<` operator for the struct accepts an instance of the struct `student` and then compares the two names. This operator is provided by the struct itself. So if you run this code:

```cpp
    Student s1 = {"Stacy", 2.9};
    Student s2 = {"Bill", 3.4};
    if (s1 < s2){
        cout << s1.name << " < " << s2.name << endl;
    } else{
        cout << s1.name << " > " << s2.name << endl;
    }
    
``` 

The overloaded `<` operator will be used to make the comparison and the output will be:

```cpp
Stacy > Bill
```
We know it is comparing by name and not by GPA because Stacy's GPA is < Bill's GPA. So now, if you do this:

```cpp
vector<Student> S = {{"Bob",3.2}, {"James",2.4}, {"Bill",3.4}, {"Harry",3.9}, {"Sara",4.0}};
sort(S.begin(), s.end());
```

The students list will be sorted using the `<` defined in the class. 


Now, let's say our vector of students needs to be sorted based on GPA. To do so, we'll use C++ lambdas. A lambda expression is actually a syntactic shortcut for a function object, i.e. an object that can be called as if it was a function (to that end, it defines the operator() ). A lambda expression bypasses the explicit creation of a function. The basic syntax of a lambda expression goes as follows:

```cpp
[captures] (argument list) -> return-type 
{ 
       lambda body; 
}
```

So, if you want to sort by GPA, you'd call the sort function. This function accepts a vector of Student that we'll be sorting by GPA. It then calls the sort function that can be overloaded with: `first, last, comparator`. Inside this function we'll call the `sort` function and we'll be providing `begin` and `end` and a custom compare function. In our case, the custom compare function is a lambda function that takes in two students and compares whether the gpa of one is greater than the other.

```cpp
void SortByGPA(vector<Student>* students){
    sort(
        begin(*students),end(*students),
        [](const Student& a, const Student& b){
        return a.gpa >= b.gpa;
        }
    );
}
```



A lambda expression is actually a syntactic shortcut for a function object, i.e. an object that can be called as if it was a function (to that end, it defines the operator() ). A lambda expression bypasses the explicit creation of a function object. The basic syntax of a lambda expression goes as follows:

```cpp
[captures] (argument list) -> return-type 
{ 
       lambda body; 
}
```

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

Approach 2: We already have extra space at the end of array A which we can utilize. Assuming we're given the actual number of valid entries in A, we can figure out the position where we can start populating A. Using the example above, let's say we have these two for A and B:

```cpp

A:  5   13  17  _   _   _   _   _
    0   1   2   3   4   5   6   7   
 
B:  3   7   11  19
    0   1   2   3
``` 

And we know that:

```cpp
m = 3 (size of A)
n = 4 (size of B)
k = m + n - 1 : position we can start filling A = 3 + 4 - 1 = 6
i = m-1
j = n-1
```


```cpp
             i              k
A:  5   13  17  _   _   _   _   _
    0   1   2   3   4   5   6   7   
 
                j
B:  3   7   11  19
    0   1   2   3
``` 

We can then start comparing if `A[i]` and `B[j]` to see which is larger. The larger value will go at `A[k]` and we'll decrement the correct pointer based on the answer

Code:

```cpp
vector<int> MergeArrays(vector<int>& A, vector<int>& B, int m, int n){
    //K is index in A where we'll start adding our answers
    //i points to largest entry in A
    //j points to largest entry in B
    int k = m + n - 1, i = m - 1, j = n - 1;
    while (true){
        if (j >= 0 && i < 0){
            //We've got remaining entries in B
            while (j >= 0){
                A[k] = B[j];
                j--;k--;
            }
            break;
        } else if (j >= 0 && B[j] > A[i]){
            A[k] = B[j];
            j--;k--;
        } else if (i >= 0 && A[i] > B[j]){
            A[k] = A[i];
            k--;i--;
        } else if (i >= 0 && j < 0){
            break;
        }
    }
    return A;
}
```

Running time: $O(m + n)$ where `m` is the size of actual entries in `A` and `n` is the size of actual entries in `B` 

### Find h index

**Given an array of positive integers, find the largest `h` such that there are at least `h` entries in the array that are greater than or equal to `h`.**

Example:
```cpp
4,2,8,7,9,3,1,6
```
`h` = 4 since there are at least 4 entries >= 4 (these are 6,7,8,9). 3 also has atleast 3 entries >= 3 but we want the largest `h` which is 4.

Best approach is easy to see: sort the list and start from the highest index. Move your way back to the other end using a pointer (let's call this pointer `curr`). At each entry check if `size - curr` >= `A[curr]`. Whenever that condition holds true, return the value at the index. Otherwise, decrement `curr`. 

```cpp
int GetH(vector<int>& A){
    sort(A.begin(), A.end());
    int size = int(A.size()) - 1;
    int ans = -1;
    for (int curr = size; curr >= 0; curr--){
        if ((size - curr) >= A[curr]){
            ans = A[curr];
            break;
        }
    }
    return ans;
}
```

Running time: $O(NLogN)$ to sort and then $O(N)$ for the loop.

### Conclusion

- To sort an array, use `sort` in the `<algorithm>` header. This runs in $ONlogN)$ time
- Use `list::sort()` to sort a list. This runs in $ONlogN)$ time
- Sorting problems are usually of two kinds:
    - One uses sorting to make subsequent steps in an algorithm simpler. To do so, use a library sort function
    - Design a custom sorting routine. To do so use a BST, heap or array indexed by values
- Sorting can be used to speed up searching
- It is also possible to sort in $O(N)$ time for small or specialized input
- Most often, sorting can be implemented in less space as compared to brute force
    
