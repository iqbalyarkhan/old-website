---
title: Binary Search 
date: 2019-09-01
thumbnail: /post-images/binary-search.png
draft: false
extract: Overview of how binary search works and its analysis
categories: 
    - Algorithms
tags:
  - Searching Algorithms
  - Binary Search
---

1. [Introduction](#introduction)
2. [Illustration: Value exists in array](#illustration--value-exists-in-array)
3. [Illustration: Value not in array](#illustration--value-not-in-array)
4. [Code](#code)
6. [Explanation](#explanation)
7. [Analysis](#analysis)
8. [Conclusion](#conclusion)
9. [Problems](#problems)
    * [Search sorted array for first occurrence of key](#search-sorted-array-for-first-occurrence-of-key)
    * [Find first occurrence of element greater than key](#find-first-occurrence-of-element-greater-than-key)

### Introduction

In this post I'll talk about a searching algorithm called Binary Search. The idea behind binary search is to search whether a value, say `k`, exists in a sorted array. To do so, binary search performs the following tests:

(1) Maintain 3 pointers in an array: `lo`, `mid` and `hi`.

(2) Initially, assign `lo` to 0, `hi` to `A.size() - 1` and calculate mid via this formula:

$$$

mid = lo + ((hi - lo)/2)

$$$

(3) Check what the value of `mid` is:
 
 - If `A[mid] < k` then our value lies somewhere between `mid + 1` and `hi`. We know this for a fact because the array is sorted.
 - If `A[mid] == k` then we've found our value, we can return the index.
 - If `A[mid] > k` then our value lies somewhere between `lo` and `mid - 1`. We know this for a fact because the array is sorted.

(4) We then recalculate the value for `mid` after each search operation and perform the checks in (3) again. We continue this process until we either find the element or until we realize that the array doesn't have the element we're looking for.

### Illustration : Value exists in array
Let's say that this is what our sorted array looks like initially:

```cpp
[2,5,6,9,11,13,21,25,31,49]
```



and we're searching for the element `25` (x = 25) in this array. Initially, our variables (I've substituted `l` for low, `m` for mid and `h` for high) would be calculated like this: (keep in mind that these variables are array indices): 

`low` would be 0 

`high` would be one less than size of array

`mid` would be `low + [(high - low)/2]`

```cpp
[2, 5, 6, 9, 11, 13, 21, 25, 31, 49]
 l           m                    h
```

We realize that `A[mid] < x` so we can discard all elements to the left of `m` and make `m + 1` our new `l`. Our `h` remains unchanged. So, this is what our array looks like now:

```cpp
[2, 5, 6, 9, 11, 13, 21, 25, 31, 49]
                  l               h
```

To calculate `m`, we do: `5 + [(9 - 5)/2]` which equals 7. Therefore, now we have:

```cpp
[2, 5, 6, 9, 11, 13, 21, 25, 31, 49]
                  l      m        h
```

We then compare `A[mid]` with `k` and we find that `m` has the value `k` and we return the value `m` (which is the index 7).

### Illustration : Value not in array

Let's continue our operations and say that we're searching for `x = 39`. Steps up to this point from the previous section still hold for this case. So, as of now, this is what our array looks like:

```cpp
[2, 5, 6, 9, 11, 13, 21, 25, 31, 49]
                  l      m        h
```

We find that `A[mid] < k` so we make `m + 1` our new `l` and recalculate `m` to get this:

```cpp
[2, 5, 6, 9, 11, 13, 21, 25, 31, 49]
                             lm   h
```

We again compare `A[mid]` with `k` and find `A[mid] < k` so we make `m + 1` our new `l` and keep `h` as is. We now have our pointers in the following positions:

```cpp
[2, 5, 6, 9, 11, 13, 21, 25, 31, 49]
                                 lh
```

Now, to calculate `m` we do the following:

`low + [(high - low)/2]`

`9 + [(9 - 9)/2]` which makes `m = 9`. We see that `A[mid] > k` so we make `m - 1` our new `h` and keep `l` as is. This is the first time we've noticed that `h` has become less than `l` because this is what our array looks like now:

```cpp
[2, 5, 6, 9, 11, 13, 21, 25, 31, 49]
                              h   l
```

We've realized that we do not have the element in the array so we can break out. Therefore, our binary search algorithm ends either when we find the element or when `l` becomes greater than `h` and we return the value `-1` indicating that the value doesn't exist in the array.



### Code

You can copy and paste this implementation in your IDE and this should work without any issues but I'd rather you understand what is going on. Here is my version of binary search:

```cpp {numberLines: true}
int BinarySearch(vector<int>& A, int k){
    int lo = 0, hi = int(A.size()) - 1, ans = -1;
    
    while (lo <= hi){
        int mid = lo + ((hi - lo)/2);
        if (A[mid] < k){
            //A[mid] < k so ans lies between mid+1 and hi so move lo up
            lo = mid + 1;
        } else if (A[mid] == k){
            ans = mid;
            break;
        } else {
            //ans lies between lo and mid so move hi down
            hi = mid - 1;
        }
    }
    
    return ans;
}

```

### Explanation

Inside the function we start with initializing the values for `lo`, `hi` and `ans` where `ans` would ultimately hold the value for the index where we found the element or -1 if element not found. 

Next, while `lo <= hi`, we process what's inside the loop:

- calculate mid for each iteration based on where lo and hi are
- compare value in mid and determine what to move: lo up or hi down
- if mid has the value, break and return the index
- continue until the while loop condition holds or value is found

### Analysis

Binary search takes $O(logN)$ time to search. Instead of memorizing this run time, it is easy to see why that is the case:

On each iteration, we're approximately halving the number of elements we need to search. In the [value not in array](#illustration--value-not-in-array) section, we start out with 10 elements. Once we realize that `array[mid] < k`, we discard the left half and search the right half. In doing so, we've reduced our elements from 10 to 5. We could keep going until we only have one element left to inspect or when `low` becomes greater than `high`. 

For better illustration, here is how we reduce our array's size:

```cpp
[2, 5, 6, 9, 11, 13, 21, 25, 31, 49]
 l           m                    h
```

```cpp
[.............., 13, 21, 25, 31, 49]
                  l      m        h
```

```cpp
[.........................., 31, 49]
                             lm   h
```

```cpp
[.............................., 49]
                                 lh
```

So for 10 elements, we halved our array 3 times. We can extrapolate this to see how our halving would pan out with say `n = 32` elements and our elements are numbers 1 till 32 in increasing order. Also assume we're searching for the element 3, then this is how our search would proceed: (asterisks are elements that we've NOT discarded yet)

```cpp
[l,***************,m,****************,h]    32
```

```cpp
[l,******,m,*********,h,...............]    32/2
```

```cpp
[l,****,m,****,h,......................]    16/2
```

```cpp
[l,**,m,**,h,..........................]   8/2
```

```cpp
[l,*,m,*,h,............................]   4/2
```

```cpp
[.,l,m,h,..............................]   2/2
```

Our search is guaranteed to return a result (of either -1 if element not found or index of element if found when we're down to just 1 element). 

Mathematically, we're asking, how many times would we have to halve an array with 32 elements to be guaranteed a result (when the array has only 1 element under consideration)?

$
32 * (1/2)^K = 1 
$

$
32 * 1/2^K = 1
$

$
32 = 2^K
$

Using the following log rule:

$
b = a^n
$


$lg$<sub>$a$</sub>$b = n$

we can conclude:

$lg$<sub>$2$</sub>$32 = K$ thus $K = 5$ 

This means that we'd have to break down our 32 element array at most 5 times to get to an answer. 

Therefore, we can generalize 

$lg$<sub>$2$</sub>$32 = K$ thus $K = 5$ 

to:

$lg$<sub>$2$</sub>$N = K$ where $N$ is the number of elements in our array. 

We can finally conclude that at most, our binary search algorithm would have to run 

$lg$<sub>$2$</sub>$N$ times depending on the number of elements in our array.

### Conclusion

Binary Search searches in $O(lgN)$ time where $N$ is the number elements in **sorted** array. This means that the search has to perform **1** more step when the input size increases by a power of 2. Which is why, it would take at most 20 operations for binary search to find an element in an array with $1,000,000$ (million) elements since $2^{20}$ is $1,048,576$.

However, this search method is only feasible if your data structure supports constant access time. For example, if your sorted data is, for some reason, in a linked-list, Binary Search won't be efficient since we lose the advantage of random-access.

In addition, if your data is not static (meaning you're constantly adding new data to your array), you'd have to make sure that it is inserted in sorted order to leverage binary search for searching.

In conclusion, Binary Search is an excellent choice to search a static, sorted array. Be sure to checkout my post on [binary search trees](/post/binary-search-trees) that uses the ideas behind binary search for storing and searching data efficiently.

### Problems

Before we begin, let's understand the C++ STL implementation and usage for binary search. If allowed, use these functions to perform binary search instead of using your own. (You need to import `algorithm` header)

- Find if element is present: 
```cpp
binary_search(A.begin(), A.end(), target) 
```
returns true if target present, false otherwise

- Find first element >= target:

```cpp
lower_bound(A.begin(), A.end(), target) 
``` 

- Find first element > target:

```cpp
upper_bound(A.begin(), A.end(), target)
```

### Search sorted array for first occurrence of key

**Write a method that takes a sorted array and a key and returns the index of the first occurrence of that key in the array. For example, when applied to the array in figure below your algorithm should return 3 if the given key is 108; if it is 285, your algorithm should return 6.**

```cpp

-14     -10     2       108     108     243     285     285     285     401
A[0]    A[1]    A[2]    A[3]    A[4]    A[5]    A[6]    A[7]    A[8]    A[9]
```

Naive approach: start at index 0 and iterate over the array until you find the element. This takes $O(N)$ time and doesn't make use of the fact that the array is sorted. 

Better but still not perfect: Use binary search until you find an element with the value you're searching for. Once you've found that element, keep moving back until you've found the first occurrence. This again takes $O(N)$ time if the entire array is made up of the same element. In both approaches, naive and this approach, we're not making use of the fact that we can go all the way to just a single element by repeatedly making use of binary search's break array in half property.

Best approach: Let's say you're searching for 285 in the array above. Here are the pointers before we begin processing the array:


```cpp
ans = -1
lo                              mid                                     hi
-14     -10     2       108     108     243     285     285     285     401
A[0]    A[1]    A[2]    A[3]    A[4]    A[5]    A[6]    A[7]    A[8]    A[9]
```

we notice that `A[mid] < k` so make `lo = mid + 1` and recalculate mid:

```cpp
ans = 7
                                        lo              mid              hi
-14     -10     2       108     108     243     285     285     285     401
A[0]    A[1]    A[2]    A[3]    A[4]    A[5]    A[6]    A[7]    A[8]    A[9]
```

in the diagram above, it is clear that we've found the element, BUT, we're searching for the first occurrence. As far as we know, this might be the first occurrence. At this point, we're ONLY concerned with looking for 285 to the LEFT of `mid` because that is where 285's first occurrence would be if there were any. 

So, for now, we record where we found k in the variable ans (`ans = mid`). This is where this better approach differs from approach 2 above. The approach above said, as soon as you find the element, break and keep moving left one element at a time. This better approach says, no, instead of moving one element at a time, keep going down as if you're still searching for `k`.
 
 Therefore, we move `hi` down so that we can search elements preceding `mid` for the first occurrence of `k`. So now, our new pointers would be:
 
 ```cpp
 ans = 7
                                         lo       hi
 -14     -10     2       108     108     243     285     285     285     401
 A[0]    A[1]    A[2]    A[3]    A[4]    A[5]    A[6]    A[7]    A[8]    A[9]
 ```
 
Again we recalculate mid which now equals 5:

 ```cpp
 ans = 7
                                         mid
                                         lo       hi
 -14     -10     2       108     108     243     285     285     285     401
 A[0]    A[1]    A[2]    A[3]    A[4]    A[5]    A[6]    A[7]    A[8]    A[9]
 ```

Now, `A[mid] < k` so we make `lo = mid + 1`:
 ```cpp
 ans = 7
                                                  lo  
                                         mid      hi
 -14     -10     2       108     108     243     285     285     285     401
 A[0]    A[1]    A[2]    A[3]    A[4]    A[5]    A[6]    A[7]    A[8]    A[9]
 ```

We recalculate mid which now equals: 6. At this point our pointers look like so:

 ```cpp
 ans = 7                                          mid
                                                  lo  
                                                  hi
 -14     -10     2       108     108     243     285     285     285     401
 A[0]    A[1]    A[2]    A[3]    A[4]    A[5]    A[6]    A[7]    A[8]    A[9]
 ```

Our logic sees that `A[mid] == k` so we update `ans = mid`. Now, again, our logic is that when a match is found and we're looking for the first occurrence, make `hi = mid - 1`. So, we update `hi` while `mid` and `lo` stay as is:

 ```cpp
 ans = 6                                          mid
                                          hi      lo  
 -14     -10     2       108     108     243     285     285     285     401
 A[0]    A[1]    A[2]    A[3]    A[4]    A[5]    A[6]    A[7]    A[8]    A[9]
 ```

This is the first time `hi` becomes less than `lo` which invalidates the while loop condition. So we exit the loop and return the updated `ans` value. 

Notice that the number of times we had to operate in the loop equals 4 which is on the order of $O(logN)$ where $N$ is the number of elements. This means, if there were a 1000 sorted elements and we were looking to find the first of a random number in that sorted sequence, at MOST it would take us 10 iterations because $2^{10}$ = $1024$

Here's the implementation:  

```cpp
int FindFirstOfK(vector<int>& A, int k){
    int lo = 0, hi = int(A.size()) - 1, ans = -1;
    
    while (lo <= hi){
        int mid = lo + ((hi - lo)/2);
        if (A[mid] > k){
            //ans lies between lo and mid
            hi = mid - 1;
        } else if (A[mid] == k){
            ans = mid;
            hi = mid - 1;
        } else {
            //A[mid] < k so ans lies between mid+1 and hi
            lo = mid + 1;
        }
    }
    
    return ans;
}
```

Running time: $O(logN)$

### Find first occurrence of element greater than key

**Design an efficient algorithm that takes a sorted array and a key, and finds the index of the first occurrence of an element greater than that key.For example, when applied to the array shown below, your algorithm should return 9 if the key is 285; if it is -13, your algorithm should return 1.**

```cpp

-14     -10     2       108     108     243     285     285     285     401
A[0]    A[1]    A[2]    A[3]    A[4]    A[5]    A[6]    A[7]    A[8]    A[9]
```

This problem seems similar to the previous problem but start solving on paper and you'd realize how wrong you are! First notice that this problem states that if the key is -13 (not present in the array), you should return 1. That is because the first element > -13 is 10 which is at `A[1]`. This means that returning a -1 is not an option. Also, the problem says that if key is 285, it should return 9 since 401 is the next largest in the array.

- Naive approach: same as what we had for previous problem. Inefficient
- Better approach: same as what we had for prev problem. We can do better
- Keep halving and searching until lo and hi cross over. Let's look at this in more detail

Let's say we're searching for next largest after 285. The solution is very similar to what we had for the previous problem:

```cpp
int FindFirstOfGreaterThanK(vector<int>& A, int k){
    int lo = 0, hi = int(A.size()) - 1, ans = -1;
    
    while (lo <= hi){
        int mid = lo + ((hi - lo)/2);
        if (A[mid] > k){
            //ans lies between lo and mid
            hi = mid - 1;
        } else if (A[mid] == k){
            ans = mid + 1; //---->CHANGE
            lo = mid + 1; //---->CHANGE
        } else {
            //A[mid] < k so ans lies between mid+1 and hi
            lo = mid + 1;
        }
    }
    
    return ans;
}
```

Notice the change in logic if we find a match. Let's see why that is. Say we're going about looking for `k = 285`. We find that `A[mid] == k` at say index 6. Now, at this point, we're not sure if this is the only 285 present in the array. So, we mark our answer as `mid + 1`. 

Now, we want to search in the half to the RIGHT of mid to see if we can find any more 285s. We're not concerned with the left half because we're looking for the first element GREATER than `k` not less than. If we were looking for less than `k`, we would've looked in the left half. Once we move up our `lo` to `mid + 1` we continue processing. 

Another scenario we haven't considered is the one where the key is not present in the array. For example, k = -13. In that case, the algorithm that we have right now would return -1 which is incorrect. To correct for that, we make a simple observation: when `hi` and `lo` cross over, `lo` would point to the next largest element if the element is not present in the array. You can play around with it on a piece of paper to make sure that is the case! 

Having said that, this is what our final algorithm would look like:

```cpp
int FindFirstOfGreaterThanK(vector<int>& A, int k){
    int lo = 0, hi = int(A.size()) - 1, ans = -1;
    
    while (lo <= hi){
        int mid = lo + ((hi - lo)/2);
        if (A[mid] < k){
            lo = mid + 1;
        } else if (A[mid] == k){
            ans = mid + 1;
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    if (ans == -1)
        return lo;
    
    return ans;
}
```

Running time is the same as that of binary search: $O(logN)$
 
