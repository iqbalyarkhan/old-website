---
title: Merge Sort 
date: 2019-08-18
draft: false
extract: Explanation and implementation of merge sort algorithm
categories: 
    - Sorting Algorithms
tags:
  - Sorting Algorithms
  - Merge Sort
---

### Introduction

In this post I'll talk about a sorting algorithm called Merge Sort. The idea behind merge sort is to start with breaking down an array into smaller pieces and then merging those smaller pieces back together in sorted order. This approach is commonly called **divide and conquer** where we divide our array into smaller chunks (via recursion) and perform the conquer operation of merging those smaller chunks back together. 

### Conquer

Before we dive into the algorithm, let's break it down into its different components and start with the **conquer** part which is easier to understand. Say you've got 2 sorted arrays (that can be of the same size or different sizes). How would you merge the two sorted arrays (Let's call the 2 arrays A and B)? The logic is quite simple: 

- Create a new array
- Have 2 pointers at the beginning of each sorted array (let's call them pointers a for array A and b for array B)
- If `A[a] < B[b]` : take `A[a]` and push to new array you created and increment `a`. 
- If `B[b] < A[a]` : take `B[b]` and push to new array you created and increment `b`.
- If `a` reaches `A.size()` first, copy over all remaining elements in `B` to the new array.
- If `b` reaches `B.size()` first, copy over all remaining elements in `A` to the new array.

This is what the code would look like:

```cpp{numberLines}
vector<int> mergeVecs(vector<int>& A, vector<int>& B){
    vector<int> ans;
    int a = 0;
    int b = 0;
    
    while (true){
        if (A[a] < B[b] && a < A.size()){
            //If `A[a] < B[b]` : take `A[a]` and push to new array you 
            //created and increment `a`.
            ans.push_back(A[a]);
            a++;
        } else if (B[b] < A[a] && b < B.size()){
            //If `B[b] < A[a]` : take `B[b]` and push to new array you 
            //created and increment `b`.
            ans.push_back(B[b]);
            b++;
        } else if (a == A.size()){
            //If `a` reaches `A.size()` first, copy over all remaining 
            //elements in `B` to the new array.
            while (b != B.size()){
                ans.push_back(B[b]);
                b++;
            }
            break;
        } else {
            while (a != A.size()){
                //If `b` reaches `B.size()` first, copy over all remaining 
                //elements in `A` to the new array.
                ans.push_back(A[a]);
                a++;
            }
            break;
        }
    }
    
    return ans;
}
```

