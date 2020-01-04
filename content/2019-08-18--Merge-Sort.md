---
title: Merge Sort 
date: 2019-08-18
draft: false
categories: 
    - Sorting Algorithms
tags:
  - Sorting Algorithms
  - Merge Sort
---

Yet another merge sort implementation!
<!-- end -->

### Introduction

In this post I'll talk about a sorting algorithm called Merge Sort. The idea behind merge sort is to start with breaking down an array into smaller pieces and then merging those smaller pieces back together in sorted order. This approach is commonly called **divide and conquer** where we divide our array into smaller chunks (via recursion) and perform the conquer operation of merging those smaller chunks back together. 

### Code

You can copy and paste this implementation in your IDE and this should work without any issues but I'd rather you understand what is going on. We're simply dividing the array into two halves, recursively sorting each half and then merging the two sorted halves. Here is my version of merge sort:

```cpp {numberLines: true}
#include <iostream>
#include <string>
#include <stdio.h>
#include <vector>

using namespace std;

void mergeSort(vector<int>&);
void merge(vector<int>&,vector<int>,vector<int>);

int main(){
    vector<int> A = {5,3,8,1,4,2,7,6};
    mergeSort(A);
    vector<int>::iterator itr = A.begin();
    cout << "Finally we get: " << endl;
    while (itr != A.end()){
        cout << *itr << " ";
        ++itr;
    }
    cout << endl;
}

void mergeSort(vector<int>& A){
    cout << "Array received in mergeSort function: " << endl;
    vector<int>::iterator itr = A.begin();
    while (itr != A.end()){
        cout << *itr << " ";
        ++itr;
    }
    cout << endl;
    
    if (A.size() == 1){
        return;
    }
    int mid = int(A.size()/2);
    vector<int> L;
    vector<int> R;
    for (int i = 0; i < mid; ++i){
        L.push_back(A[i]);
    }
    for (int i = mid; i < A.size(); ++i){
        R.push_back(A[i]);
    }
    mergeSort(L);
    mergeSort(R);
    merge(A,L,R);
}

void merge(vector<int>& A,vector<int> L ,vector<int> R){
    int lSize = int(L.size());
    int rSize = int(R.size());
    int a = 0;
    int l = 0;
    int r = 0;
    
    while (l < lSize && r < rSize){
        if (L[l] < R[r]){
            A[a] = L[l];
            a++;
            l++;
        } else {
            A[a] = R[r];
            a++;
            r++;
        }
    }
    
    if (l == lSize){
        while (r != rSize){
            A[a] = R[r];
            a++;
            r++;
        }
    } else {
        while (l != lSize){
            A[a] = L[l];
            a++;
            l++;
        }
    }
    
    cout << "Returning from merge function: " << endl;
    vector<int>::iterator itr = A.begin();
    while (itr != A.end()){
        cout << *itr << " ";
        ++itr;
    }
    cout << endl;
    
}
```

### Output

```
Array received in mergeSort function: 
5 3 8 1 4 2 7 6 
Array received in mergeSort function: 
5 3 8 1 
Array received in mergeSort function: 
5 3 
Array received in mergeSort function: 
5 
Array received in mergeSort function: 
3 
Returning from merge function: 
3 5 
Array received in mergeSort function: 
8 1 
Array received in mergeSort function: 
8 
Array received in mergeSort function: 
1 
Returning from merge function: 
1 8 
Returning from merge function: 
1 3 5 8 
Array received in mergeSort function: 
4 2 7 6 
Array received in mergeSort function: 
4 2 
Array received in mergeSort function: 
4 
Array received in mergeSort function: 
2 
Returning from merge function: 
2 4 
Array received in mergeSort function: 
7 6 
Array received in mergeSort function: 
7 
Array received in mergeSort function: 
6 
Returning from merge function: 
6 7 
Returning from merge function: 
2 4 6 7 
Returning from merge function: 
1 2 3 4 5 6 7 8 
Finally we get: 
1 2 3 4 5 6 7 8 
```

### Explanation

On lines 12-13:
```cpp{numberLines:12}
    vector<int> A = {5,3,8,1,4,2,7,6};
    mergeSort(A);
```
We start by declaring our test array and calling the `mergeSort()` function. This function takes our array by reference and will be called recursively as we look to **divde** our array recursively.

Let's look at the **merge()** function first since it is easier to understand and see what is going on there.

#### merge(): the conquering

The merge() function

`void merge(vector<int>& A,vector<int> L ,vector<int> R){`

accepts three vectors: A,L and R. In this function, the vectors L and R are assumed to be already sorted. We'll merge vectors L and R into A. We'll be overwriting the values in A because these values are already present in the vectors L and R so we're not losing any values in the process. 

In lines 50-54:
```cpp{numberLines:50}
    int lSize = int(L.size());
    int rSize = int(R.size());
    int a = 0;
    int l = 0;
    int r = 0;
```

we declare the variables we'll be using. As it is obvious, `lSize` holds the size of the vector `L` and `rSize` holds the size of vector `R`. We've got three more variables `a,l,r` all initialized to 0.

`a` is to keep a track of where we are in the vector `A`. `l` and `r` are to keep track of where we are in vectors `L` and `R` respectively.

The idea in this section is to merge two already sorted arrays. This is the **conquer** part of our algorithm. Say, for example, we've go these 3 vectors passed to our `merge()` function:

```
A: 5 3 8 1 4 2 7 6
L: 1 3 5 8
R: 2 4 6 7
```

When these three vectors are passed, `a l r` are all pointing to the start of each of `A L R` vectors repsectively. 

Next, we need to mege the `L` and `R` vectors back into `A` in sorted order. On line 56:

```cpp{numberLines:56}
    while (l < lSize && r < rSize){
```
we make sure that our `l` and `r` counters have not run out of bounds. As of now, this is what our vectors and variables look like:

```
A: 5 3 8 1 4 2 7 6
   a
L: 1 3 5 8
   l
R: 2 4 6 7
   r
```

Next:

```cpp{numberLines:57}
        if (L[l] < R[r]){
            A[a] = L[l];
            a++;
            l++;
        }
```

we check if the element being pointed to by `l` is less than `r` and if so, we write that element into the vector `A` at the position being pointed to by `a`. This is true in our case so we write `L[l]` to `A[a]` and increment `a` and `l`. After this step, our vectors looks like this:

```
A: 1 3 8 1 4 2 7 6
     a
L: 1 3 5 8
     l
R: 2 4 6 7
   r
```

We go back to line 56 and check to see whether the while loop's condition is true or not. Since the condition holds, we drop into the loop again and perform our checks. This time, our else statement is true:

```cpp{numberLines:61}
        } else {
            A[a] = R[r];
            a++;
            r++;
        }
```

Before we make the assignment in line 62, our vectors look like this:

```
A: 1 3 8 1 4 2 7 6
     a
L: 1 3 5 8
     l
R: 2 4 6 7
   r
```
After we update `A[a]` with `R[r]` and increment both `a` and `r`, this is what our vectors look like:

```
A: 1 2 8 1 4 2 7 6
       a
L: 1 3 5 8
     l
R: 2 4 6 7
     r
```

This process repeats until we either reach the end of vector L or vector R. The example I chose above was a nice clean case where both vectors, L and R, were of equal size. There might be some cases where either the two vectors are of different sizes (when the size of A is odd) or if the vectors L and R look like so:

```
L: 1 2 3 4
   l
R: 5 6 7 8
   r
```

It is obvious that in the above case, we'll reach `lSize` and we'd still have some elements in the vector `R`. To account for such cases we have the following logic in our merge function:

```cpp{numberLines:68}
    if (l == lSize){
        while (r != rSize){
            A[a] = R[r];
            a++;
            r++;
        }
    } else {
        while (l != lSize){
            A[a] = L[l];
            a++;
            l++;
        }
    }
```

On line 69 we check to see which element has reached the end (l or r). If `l` has reached its end, we insert the remaining elements from vector `R` into `A`:
```cpp{numberLines:68}
    if (l == lSize){
        while (r != rSize){
            A[a] = R[r];
            a++;
            r++;
        }
    }
```
If it is r that has reached the end of vector `R`, we insert all the remaining elements from vector `L` into `A`:
```cpp{numberLines:74}
} else {
        while (l != lSize){
            A[a] = L[l];
            a++;
            l++;
        }
    }
```

Finally, at the end of the merge function, we've merged two already sorted vectors into one vector A and have returned the control back to the calling mergeSort() function.

#### mergeSort(): the dividing

The mergeSort() function is called as we begin sorting the vector. The first thing we do, on line 32:

```cpp{numberLines:32}
    if (A.size() == 1){
        return;
    }
```

is to check if the array is of size 1. That is because an array with only one element is already sorted. Next, if the array is not of size 1, we divide the array into 2 parts: a left half and a right half and copy over elements from the original vector into our 2 halves:

```cpp{numberLines:35}
    int mid = int(A.size()/2);
    vector<int> L;
    vector<int> R;
    for (int i = 0; i < mid; ++i){
        L.push_back(A[i]);
    }
    for (int i = mid; i < A.size(); ++i){
        R.push_back(A[i]);
    }
```

At the end of the block above, we've created 2 new vectors. We then call the same function, `mergeSort()` with the left half of the array and again with the right half of the array. This recursive call continues until the size of the array is 1. At that point, since the array is already sorted, we return and fall into the merge function due to the call on line 46. 
