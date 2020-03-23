---
title: Binary Search 
date: 2019-09-01T15:42:34.101Z
thumbnail: /post-images/binary-search.png
draft: false
extract: Overview of how binary search works and its analysis
categories: 
    - Searching Algorithms
tags:
  - Searching Algorithms
  - Binary Search
---

### Introduction

In this post I'll talk about a searching algorithm called Binary Search. Like I've said in my previous post, there are plenty of implementations available on the internet but I, instead of looking at someone else's code, decided to understand the logic and implement it on my own. I like to do things this way so that I remember how it's done. Let's begin!

The idea behind binary search is to search whether a value, say `x`, exists in a sorted array. To do so, binary search performs the following tests:

(1) Maintain 3 pointers in an array: **low**, **mid** and **high**.

(2) Since the array is sorted, see what the value is of the low, mid and high pointers. If either of these contain the value we're searching for, return the **index** of the correct position and we're done. If none of these 3 have `x`, move to step (3).

(3) Check to see if 

`array[mid] > x` or

`array[mid] < x`.  

This is where we break our array in half and decide which half to search. If `array[mid] > x` it means that in our sorted array, we can discard all elements greater than `array[mid]`. Otherwise, we discard all elements less than `array[mid]`. In doing so we have halved the number of elements we need to search.

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

We realize that `array[mid] < x` so we can discard all elements to the left of `m` and make `m + 1` our new `l`. Our `h` remains unchanged. So, this is what our array looks like now:

```cpp
[2, 5, 6, 9, 11, 13, 21, 25, 31, 49]
                  l               h
```

To calculate `m`, we do: `5 + [(9 - 5)/2]` which equals 7. Therefore, now we have:

```cpp
[2, 5, 6, 9, 11, 13, 21, 25, 31, 49]
                  l      m        h
```

We then compare `array[mid]` with `x` and we find that `m` has the value `x` and we return the value `m` (which is the index 7).

### Illustration : Value not in array

Let's continue our operations and say that we're searching for `x = 39`. Steps up to this point from the previous section still hold for this case. So, as of now, this is what our array looks like:

```cpp
[2, 5, 6, 9, 11, 13, 21, 25, 31, 49]
                  l      m        h
```

We find that `array[mid] < x` so we make `m + 1` our new `l` and recalculate `m` to get this:

```cpp
[2, 5, 6, 9, 11, 13, 21, 25, 31, 49]
                             lm   h
```

We again compare `array[mid]` with `x` and find `array[mid] < x` so we make `m + 1` our new `l` and keep `h` as is. We now have our pointers in the following positions:

```cpp
[2, 5, 6, 9, 11, 13, 21, 25, 31, 49]
                                 lh
```

Now, to calculate `m` we do the following:

`low + [(high - low)/2]`

`9 + [(9 - 9)/2]` which makes `m = 9`. We see that `array[mid] > x` so we make `m - 1` our new `h` and keep `l` as is. This is the first time we've noticed that `h` has become less than `l` because this is what our array looks like now:

```cpp
[2, 5, 6, 9, 11, 13, 21, 25, 31, 49]
                              h   l
```

We've realized that we do not have the element in the array so we can break out. Therefore, our binary search algorithm ends either when we find the element or when `l` becomes greater than `h` and we return the value `-1` indicating that the value doesn't exist in the array.



### Code

You can copy and paste this implementation in your IDE and this should work without any issues but I'd rather you understand what is going on. Here is my version of binary search:

```cpp {numberLines: true}
#include <stdio.h>
#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <iostream>

using namespace std;

bool ReadFile(ifstream&, string);
void PopulateVector(vector<int>&, ifstream&);
int BinarySearch(vector<int>&, int, int, int);


int main(){
    
    cout << "Enter name of file: " << endl;
    string fileName;
    cin >> fileName;
    
    ifstream fileStream;
    if(ReadFile(fileStream, fileName)){
        vector<int> v;
        PopulateVector(v, fileStream);
        int find = 0;
        cout << "Enter number you want to search for or -1 to quit: " << endl;
        cin >> find;
        while (find != -1){
            auto start = high_resolution_clock::now();
            int index = BinarySearch(v, find, 0, (v.size() - 1));
            cout << "Index is: " << index << endl;
            cout << "Enter number you want to search for or -1 to quit: " << endl;
            cin >> find;
        }
    }
}

bool ReadFile(ifstream& fileStream, string fileName){
    fileStream.open(fileName);
    if (!fileStream.is_open()){
        cout << "Couldn't open file: " << fileName << endl;
        return false;
    }
    
    cout << "File opened successfully!" << endl;
    return true;
}

void PopulateVector(vector<int>& v, ifstream& fileStream){
    string line;
    while (true){
        int num = 0;
        fileStream >> num;
        if (fileStream.fail()){
            break;
        }
        v.push_back(num);
    }
}

int BinarySearch(vector<int>&v, int find, int low, int high){
    int mid = 0;
    while(low <= high){
        if (v[low] == find){
            return low;
        } else if (v[high] == find){
            return high;
        } else {
            mid = low + ((high - low)/2);
            if (v[mid] == find){
                return mid;
            } else if (v[mid] < find){
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
    }
    
    return -1;
}

```

### Output

```
Enter name of file: 
small_input.txt
File opened successfully!
Enter number you want to search for or -1 to quit: 
25
Index is: 7
Enter number you want to search for or -1 to quit:
39
Index is: -1
```

### Explanation

Functions `ReadFile() and PopulateVector()` are standard functions that do the obvious (array in our case is the vector). Once we've read from a file and populated our array, we call the `BinarySearch()` function. 

On line 30, we have the following call:

```cpp{numberLines:30}
    int index = BinarySearch(v, find, 0, (v.size() - 1));
```
We call the `BinarySearch` function with 4 arguments:

(1) Reference to our vector (to avoid making copies of our vector). This helps to improve our performance by preventing unnecessary work. Imagine copying a vector with a million sorted elements.

(2) The element we want to find.

(3) The value for `low` which will be `0` the first time we call the function.

(4) Finally, the value for `high` which will be one less than size of our array.

Insdide the `BinarySearch()` function on line 63 we check
```cpp{numberLines:63}
    while(low <= high)
```

to see if we've got a case where the value doesn't exist in our array. This would correspond to [value not in array](#illustration--value-not-in-array) section. If so, we skip the while loop and return `-1`. 

If the value is actually in the array and `low <= high`, we execute the statements inside the while loop. We check to see whether `low`, `high` or `mid` point to the value we're looking for. If not, we compare the value at `mid` with `find` and discard the appropriate half of our array and continue execution.

### Analysis

In almost every introductory CS class in the US, we're taught that binary search takes O(lg n) time to search. Instead of memorizing this run time, it is easy to see why that is the case:

On each iteration, we're approximately halving the number of elements we need to search. In the [value not in array](#illustration--value-not-in-array) section, we start out with 10 elements. Once we realize that `array[mid] < x`, we discard the left half and search the right half. In doing so, we've reduced our elements from 10 to 5. We could keep going until we only have one element left to inspect or when `low` becomes greater than `high`. 

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

Binary Search searches in $O(lgN)$ time where $N$ is the number elements in **sorted** array. This means that the search has to perform **1** more step when the input size increases by a power of 2. Which is why, it would take at most 20 operations for binary search to find an element in an array with $1,000,000$ (million) elements since $2$<sup>20</sup> is $1,048,576$.

However, this search method is only feasible if your data structure supports constant access time. For example, if your sorted data is, for some reason, in a linked-list, Binary Search won't be efficient since we lose the advantage of random-access.

In addition, if your data is not static (meaning you're constantly adding new data to your array), you'd have to make sure that it is inserted in sorted order to leverage binary search for searching.

In conclusion, Binary Search is an excellent choice to search a static, sorted array. Be sure to checkout my post on [binary search trees](/post/binary-search-trees).