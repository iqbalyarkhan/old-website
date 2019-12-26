---
title: Selection Sort
date: 2019-11-11
categories: 
    - Sorting Algorithms
tags:
  - Sorting Algorithms
  - Selection Sort
---

Yet another selection sort implementation!
<!-- end -->


### Introduction

In this post I'll talk about one of the most common sorting algorithms called Selection Sort.The idea behind selection sort is to start with an array that has two sections: a sorted section and an unsorted section. We'll **select** the smallest element from the unsorted section and place it in the sorted section. So, we'd first find the samllest element in the unsorted section and insert it at arr[0]. Then we'll find the second smallest element from the array and insert it at arr[1] and so on.

### Code

```cpp{numberLines}
int main(){
    vector<int> a = {2,4,1,6,8,5,3,7};

    //Outer loop to keep track of current
    //position we're finding minimum for
    for (int out = 0; out < a.size(); ++out){
        int min = out;
        //Inner loop to find minimum element
        //in the unsorted section
        for (int in = out + 1; in < a.size(); ++in){
            if (a[in] < a[min])
                min = in;
        }
        //Now that we've got the min,
        //swapping it with element at
        //a[out]
        int temp = a[out];
        a[out] = a[min];
        a[min] = temp;
        
        cout << "Array as of now: " << endl;
        for (int i= 0; i < a.size(); i++){
            cout << a[i] << " ";
        }
        cout << endl;   
    }
}
```

And the output is:

```{numberLines}
Array as of now: 
1 4 2 6 8 5 3 7 
Array as of now: 
1 2 4 6 8 5 3 7 
Array as of now: 
1 2 3 6 8 5 4 7 
Array as of now: 
1 2 3 4 8 5 6 7 
Array as of now: 
1 2 3 4 5 8 6 7 
Array as of now: 
1 2 3 4 5 6 8 7 
Array as of now: 
1 2 3 4 5 6 7 8 
Array as of now: 
1 2 3 4 5 6 7 8 
Program ended with exit code: 0
```

### Explanation

We've got two loops that run: outer loop to keep track of position we're currently filling with the smallest element and the inner loop to actually find the minimum element from the unsorted section. Once we've reached the end of the inner loop, `min` contains the index of the smallest element. We then proceed to swap `a[out]` and `a[min]`.

Therefore, the [invariant](/bubbble-sort#invariant) for this algorithm is:

$$$
values <= out
$$$

$a + b = c$

$a^2 + b^2 = c^2$

are always in sorted order. That is because in every iteration, we look for the smallest element and place it at `a[out]` and increment `out`. 


### Analysis

It is clear to see that the running time of selection sort is **O(N<sup>2</sup>)**. That is because we've got two nested loops where the outer loop (going from $0$ to $N - 1$ determines the position where our selection would be inserted and the inner loop also going till $N$ would look for the item to be inserted. Another drawback for selection sort is that no matter what the order of inputs is, it'll always take **O(N<sup>2</sup>)** time for the algorithm to run. The algorithm is constructed such that it has to iterate over all the elements before it can exit. However, as compared to [bubble sort](/post/bubble-sort), selection sort is faster because selection sort has to perform fewer swaps. The number of swaps are $O(N)$ times while for bubble sort, we'd have to roughly swap $O(N^2)$ times.