---
title: Knapsack Problem
date: 2020-06-26
thumbnail: /post-images/knapsack.png
draft: false
extract: Detailed look at knapsack problem
categories: 
    - Dynamic Programming
tags:
    - Dynamic programming
---

1. [Introduction](#introduction)
2. [DP and Recursion](#dp-and-recursion)
3. [0-1 Knapsack](#0-1-knapsack-problem)
    * [Memoization](#memoization)
    * [Tabulation](#tabulation)
    * [Summary](#summary)
12. [Conclusion](#conclusion) 


### Introduction

DP is a general technique for solving optimization, search, and counting problems that can be decomposed into sub-problems. You should consider using DP whenever you have to make choices to arrive at the solution, specifically, when the solution relates to sub-problems.

Like divide-and-conquer, DP solves the problem by combining the solutions of multiple smaller problems, but what makes DP different is that the same sub-problem may reoccur. Therefore, a key to making DP efficient is caching the results of inter- mediate computations. 

The key to solving a DP problem efficiently is finding a way to break the problem into sub-problems such that

- the original problem can be solved relatively easily once solutions to the sub¬ problems are available, and
- these sub-problem solutions are cached. (Usually, but not always, the sub-problems are easy to identify) 

DP can be used to find the total number of ways to do something (for example making a change) and if you optimize how you determine each "way", you'd get the optimal solution. Thus, DP can be used to find all combinations AND the optimal solution.

From the discussion above, it is clear to see that DP is nothing but optimized recursion. Therefore, before jumping into dynamic programming, be sure to go over my [recursion](/recursion) post. 

As the title suggests, in this post, we'll be talking about a famous problem called the knapsack problem. This problem has 3 flavors:

(1) **Fractional Knapsack**: Fractional items allowed (items need not be whole numbers)
(2) **0 - 1 Knapsack**: Items need to be included as whole or not included. No fractional items allowed
(3) **Unbounded Knapsack**: Unlimited supply of items.

In this post, we'll concern ourselves with 0-1 Knapsack.

### DP and recursion

I said earlier that DP is optimized recursion. What does that mean? It means that while we're recursing to solve a problem, we might run into instances where we're redoing work that was previously done in another recursive call. As a result we're performing work that has already been done which is obviously inefficient. To get rid of this redundancy, we can trade space for time where we use extra space to store results we've already calculated. This technique of storing results is known as dynamic programming. 

While trying to understand the DP, I found various sources on the internet that used the table creation technique. Our aim should not be to create the said table but to understand WHY that table is created. DP doesn't require the creation of a table for every problem! 

So how do we know that DP is required to solve a given problem:
 
- If DP is optimized recursion, any recursive problem is also a DP problem!
    - There'll be a **choice** (include or exclude something etc) to make and the subproblems overlap. If there are more than one calls being made in each recursive call, ie the recursive functions is calling itself more than once, there is a good chance that it can be optimized using DP.
    
- DP also deals with optimization as in find the least number of steps, or the most profitable method etc
    - There might be keywords such as minimum, maximum, etc. Where you're looking to either find the max or the min or the least or the most!
    
Therefore, to summarize if there's recursion and there are more than 1 calls being made to the recursive function in each recursive call:

```cpp
    return Fib(n-1) + Fib(n-2)
```

then we can use DP to cache the results. Secondly, if it is an optimization problem, then using DP is required. Without a recursive solution, creating a table would result in errors. 

Better approach is to:
- Write a recursive solution
- Perform memoization (storing results)
- Create the table if needed to better visualize the algorithm

### 0-1 Knapsack Problem
**The knapsack problem is a problem in combinatorial optimization: Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible. It derives its name from the problem faced by someone who is constrained by a fixed-size knapsack and must fill it with the most valuable items. The problem often arises in resource allocation where the decision makers have to choose from a set of non-divisible projects or tasks under a fixed budget or time constraint, respectively.**

W hy is this a DP problem? because we're being asked to optimize our profit. ie **total value is as large as possible**. In addition, we're also given a bunch of choices: ie **Given a set of items, each with a weight and a value, determine the number of each item to include in a collection**

Let's see what our input will be:

```text
                    Item1   Item2   Item3   Item14
wt[] in pounds        1       3       4        5    
val[] in dollars      1       4       5        7
Capacity: 7       
```
We'll be given two arrays: a weight array that'll hold the weight of each item and a value array that holds the value of each item in dollars. We'll also be given the capacity of our sack and a value `n` denoting the number of elements in the arrays. 

Let's start writing the recursive solution to this problem:

Let's say this is our function signature. 
- It'll return an integer to denote the `max` profit
- It'll accept the relevant arrays, the capacity and the size of the arrays 

```cpp
int knapSack(vector<int> wt, vector<int> val, int c, int n){
}
```

Ok, now that we have the signature, let's think about the base case: Remember, the **base case** is nothing but the **smallest valid input**. In our case, the smallest valid input is when `c` (or capacity) = 0 (ie we don't have any more space in the bag) or when there're no more items to consider ie n = 0. Let's add this to our function:

```cpp
int knapSack(vector<int> wt, vector<int> val, int c, int n){

    if (c == 0 || n == 0){
        //Base case: there's no more space or no more items
        return 0;
    }
}
```

Now, let's think about what we can do. To do so, let's see the choices that we have by looking at our arrays:


```text         
                                               n 
                                               |
                    Item1   Item2   Item3   Item4
wt[] in pounds        1       3       4        5    
val[] in dollars      1       4       5        7
Capacity: 7       
```

Say `n` is at the last element. Here, we have a few choices that we can make:

(1) The nth element's weight > capacity. In this case we cannot choose this element
(2) The nth element's weight <= capacity. In this case we can choose (if we want) this element:
    - Weight is less so we might choose it
    - Weight is less so we might ignore it

Here's the decision tree:

```text
                            itemN
                       /             \   
                    wt[n] <= c      wt[n] > c
                   /        \           |
                add to bag  don't add   cannot add
```

We can either choose itemN or we can ignore it. BUT how do we decide, at the end of the day, which item goes in the bag? The item that goes in the bag needs to maximize our profit. So, we'll choose the max of taking the item and not taking the item:

```cpp
       
max ( 
        (val[n-1] + knapSack(wt, val, c - w[n-1], n-1), //choosing the item, so decrease capacity left by weight of item  
        knapsack(wt, val, c, n-1) );  //Not choosing the item so just move to the next item
``` 

Let's see the code for the case where wt[n] <= c:

```cpp
int knapSack(vector<int> wt, vector<int> val, int c, int n){
    if (n == 0 || c == 0)
        return 0;

    //Weight can either be <= c or > c
    if (wt[n] <= c){
        //Choice 1: choose this item
        //Since we're choosing this item, we add the current item's value to whatever we get from next recursive call
        int profitWithChoosing = val[n] + knapSack(wt, val, c - wt[n], n-1);

        //Choice 2: Don't choose this item
        //Since we don't choose this item, we simply ignore its value and move to the next item
        int profitWithNotChoosing = knapSack(wt, val, c, n-1);

        //Need to return max profit
        //Finally, based on the two decisions above, we choose the max of the two and return that value
        return max (profitWithChoosing, profitWithNotChoosing);

    } else {
        //weight is > capacity, just continue recursing...
        return knapSack(wt, val, c, n-1);
    }
}
```

If you trace the recursive call stack above, you'll notice that there are multiple values being re-calculated. How do I know this? Well, as I said earlier, if a recursive function is making multiple calls to itself, it is guaranteed to have overlapping computations. As a result, the running time of this algorithm is $2^N$. We can do much better! 


### Memoization 

We can actually save values once calculated by either recursive call. As mentioned earlier, this process of saving already calculated values is called **memoization**. To save these results, we need to create a 2D vector. This vector will then hold our intermediate results for us. **This intermediate result is nothing but the max profit up till that point**.

How do we determine the size of our 2D vector? What would be n and what would be m? To determine that, we need to find out the elements we need to keep track of. For example, in the recursive solution above, there's no point in keeping track of the arrays themselves, they're constant. The only two things changing in the algorithm above are:
- `c` capacity that decreases with every addition of element
- `n` that moves down the arrays. 

Therefore, our 2D vector would be of size c+1 and n+1 to prevent overflow. We'll call this 2D vector dp: 

```cpp
vector<vector<int>> dp(c+1, vector<int> (n+1, -1));
```

This vector will be initialized with the value -1 indicating that we're yet to calculate this value. Otherwise, we'll  go ahead and calculate the value and store it in our dp vector. We gave up space to reduce our running time. Therefore, we want to save EACH recursive call's value in the 2D vector (notice how we save before each recursive call) so that we're not going to perform calculations that have already been done. 

**Each recursive call is going to return the maximum profit for us which we'll save in the 2D vector.** For example, dp[3][2] would tell us that if our capacity is 3 and we've only looked at the first two elements, then our max profit would be in the entry dp[3][2]. The 2D vector, in essence, is saving our intermediate results or **sub-problems** for us. In this example, I've chosen the first element to represent our capacity and the second element to represent our items. It is not required to have this setup. You can switch it around as well. All you have to be mindful of is which is which.


Let's add this dp vector as a global variable to our program:


```cpp

vector<vector<int>> dp(c+1, vector<int> (n+1, -1));

int knapSack(vector<int> wt, vector<int> val, int c, int n){
    if (n == 0 || c == 0)
        return 0;
        
    //Check if value is aleady saved:
    if (dp[c][n] != -1)
        return dp[c][n];

    //Weight can either be <= c or > c
    if (wt[n] <= c){
        //Choice 1: choose this item
        //Since we're choosing this item, we add the current item's value to whatever we get from next recursive call
        int profitWithChoosing = val[n] + knapSack(wt, val, c - wt[n], n-1);

        //Choice 2: Don't choose this item
        //Since we don't choose this item, we simply ignore its value and move to the next item
        int profitWithNotChoosing = knapSack(wt, val, c, n-1);

        //Need to return max profit
        //Finally, based on the two decisions above, we choose the max of the two and return that value
        //Store the max before returning:
        return dp[c][n] = max (profitWithChoosing, profitWithNotChoosing);

    } else {
        //weight is > capacity, just continue recursing...
        //Store in dp before returning:
        return dp[c][n] = knapSack(wt, val, c, n-1);
    }
}
```
Running time for the memoized version is $O(CN)$ where $C$ is the capacity of the sack and $N$ is the number of items we're asked to process. 

Ok, so we've seen how we can use recursion and memoization to reduce our running time. We're always asking ourselves, can we do better? What is the one glaring thing in the solution above that we can improve? We can try and get rid of the recursive calls that we have in this solution since a recursive call stack can get pretty large for larger inputs. 

If we think along these lines a little more, we'll realize that if we remove the recursive calls, we can derive our solution using just the 2D array that we created in the recursive solution. So, the next question we should ask ourselves is how do we create that table without using recursion? 

Before we answer that, let's just summarize what we've done so far:
- Started with a $2^N$ recursive solution
- Then added a memoized solution that cached calculated results
- Now, we're looking to omit the recursive calls altogether

### Tabulation
Ok, so we've decided we're going to get rid of the recursive calls and directly use a matrix. So, if we're directly starting from the matrix, what would be its dimensions? We said earlier, in the memoized solution that our matrix would be used to keep track of only those values that are changing: `c` ie current capacity and `n` which is the current item we're considering. So, our tabular method will also need a matrix of size c+1 * n+1. 

Ok, we've decided that we're removing the recursive call and using the matrix. Let's see this matrix first (notice how I've switched `n` and `c`):

|  | **0** | **1** | **2** | **3** | **4** | **5** | **6** | **7** |
| -- | -- | -- | -- | -- | -- | -- | -- | -- |
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 
| **1** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **2** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 
| **3** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 
| **4** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 

So I've got the capacity, which is 7 going from 0 to 7 and the number of items going top to bottom from 0 to 4. These dimensions are `c + 1` and `n + 1` respectively since we want the answer to be in `dp[c][n]` which is only possible if we have one extra slot in each array.


Next thing we need to do with the matrix is initialize it with 0s:

```cpp
vector<vector<int>> dp(c+1, vector<int> (n+1, 0));
``` 

Now why 0s and not -1 like we did earlier? Let's think about it: We've decided to convert our recursive function to an iterative solution. Let's start with the base condition:

```cpp
//Recursive:

int knapSack(vector<int> wt, vector<int> val, int c, int n){
    if (n == 0 || c == 0)
        return 0;
```

The recursive solution had the base condition where it said that if there are no items or there is no capacity, return 0. Since we'll be using the 2D matrix to solve this iteratively, we need to somehow capture this information in that 2D matrix. Recursive solution said, if n is 0 or c is 0, we'll return 0. So, in the matrix, where n is 0 or c is 0, we'll save 0:

```cpp
void init(){
    for (int i = 0; i < dp.size(); i++){
        if (i == 0){ // row where n == 0 save all 0s
            for (int j = 0; j < dp[i].size(); j++){
                dp[i][j] = 0;
            }
        } else {
            dp[i][0] = 0;
        }
    }
}
``` 

Secondly, since there are no more recursive calls, we're going to use iterative calls to then populate the table. So, let's have another look at the recursive solution:

```cpp
int knapSack(vector<int> wt, vector<int> val, int c, int n){
    //******* This part is done *******
    if (n == 0 || c == 0)
        return 0;

    //Weight can either be <= c or > c
    if (wt[n] <= c){
        //Choice 1: choose this item
        //Since we're choosing this item, we add the current item's value to whatever we get from next recursive call
        //OK: This needs to be edited..... EDIT 1
        int profitWithChoosing = val[n] + knapSack(wt, val, c - wt[n], n-1);

        //Choice 2: Don't choose this item
        //Since we don't choose this item, we simply ignore its value and move to the next item
        //OK: This needs to be edited..... EDIT 2
        int profitWithNotChoosing = knapSack(wt, val, c, n-1);

        //Need to return max profit
        //Finally, based on the two decisions above, we choose the max of the two and return that value
        //Store the max before returning:
        //OK: This needs to be edited..... EDIT 3
        return max (profitWithChoosing, profitWithNotChoosing);

    } else {
        //weight is > capacity, just continue recursing...
        //Store in dp before returning:
        //OK: This needs to be edited..... EDIT 4
        return knapSack(wt, val, c, n-1);
    }
}
```

**Edit 1**

```cpp
        //OK: This needs to be edited..... EDIT 1
        int profitWithChoosing = val[n] + knapSack(wt, val, c - wt[n], n-1);
```

This part gets the profit for us if we actually choose the current element. Therefore, we need to remove the recursive call from here. All the information that we need is in the table:

```cpp
        int profitWithChoosing = val[n] + dp[n-1][c - wt[n]];
```

So, instead of recursing, we grab the value from our 2D matrix. Notice how we grab from `n-1` and `c - wt[n]`. That is because we've already calculated these values. Since the table is `dp[n][c]`, any edits we made in the recursive calls to these values, should be kept in that order. If we had `dp[c][n]`, then this same translation would've been:

`dp[c- wt[n]][n-1];`

Ok, so we've made edit 1. Let's make the remaining edits:

**Edit 2**

```cpp
        //OK: This needs to be edited..... EDIT 2
        int profitWithNotChoosing = knapSack(wt, val, c, n-1);
```

This part deals with the decision where we choose NOT to include the current element. 

```cpp
        int profitWithNotChoosing = dp[n-1][c];
```

Similar to how we made edit 1, we grab the value from previously calculated values.

**Edit 3**

```cpp
        //OK: This needs to be edited..... EDIT 3
        return max (profitWithChoosing, profitWithNotChoosing);
```

Here, we're returning the max of our two choices. There's nothing to return since our function will only return once at the end with the max profit. We do, however, need to update our max profits for current cell which is done here, replacing the return call:

```cpp
    dp[n][c] = max (profitWithChoosing, profitWithNotChoosing);

```

**Edit 4**
This call deals with handling the case where the current weight is > capacity, where we just ignore the current item:

```cpp
        //OK: This needs to be edited..... EDIT 4
        return knapSack(wt, val, c, n-1);
```

As was the case with edit 3, we'll simply update the current cell and return nothing:

```cpp
    dp[n][c] = dp[n-1][c];
```

One thing we've done above is used `n` and `c` to populate our 2D matrix. However, `n` and `c` already represent some values in our solution ie the number of elements and capacity of our sack. So, we need new variables so that we can iterate over all `n` and `c` values. To do so, we'll use `i` in lieu of `n` and `j` in lieu of `c`. 

Also, remember we had already initialized the first row and first column with our base condition, so we'll start at index (1,1). This is where `i` and `j` will start. So, replace `n` and `c` with `i` and `j` and start `i` and `j` at (1,1) and then fill out your table to get the final solution at the end:

```cpp {numberLines: true}
vector<vector<int>> dp(5, vector<int>(8,0));

int knapSack(vector<int> wt, vector<int> val, int c, int n){
    //Weight can either be <= c or > c
    for (int i = 1; i <= n; i++){
        for (int j = 1; j <= c; j++){
            if (wt[i-1] <= j){
                //Choice 1: choose this item
                //Since we're choosing this item, we add the current item's value to whatever we get from next recursive call
        //        int profitWithChoosing = val[n] + knapSack(wt, val, c - wt[n], n-1);
                int profitWithChoosing = val[i-1] + dp[i-1][j-wt[i-1]];
                
                //Choice 2: Don't choose this item
                //Since we don't choose this item, we simply ignore its value and move to the next item
        //        int profitWithNotChoosing = knapSack(wt, val, c, n-1);
                int profitWithNotChoosing = dp[i-1][j];
                //Need to return max profit
                //Finally, based on the two decisions above, we choose the max of the two and return that value
        //        return = max (profitWithChoosing, profitWithNotChoosing);
                dp[i][j] = max (profitWithChoosing, profitWithNotChoosing);
            } else {
                //weight is > capacity, just continue recursing...
        //        return knapSack(wt, val, c, n-1);
                dp[i][j] = dp[i-1][j];
            }
        }
    }
    return dp[n][c];
}


int main(int argc, const char * argv[]) {
    // insert code here...
    vector<int> wt = {1,3,4,5};
    vector<int> val = {1,4,5,7};
    int maxProfit = knapSack(wt, val, 7, 4);
    cout << "Max profit: " << maxProfit << endl;
    return 0;
}
```

On line 7, we're checking `wt[i-1]` because say `i` is 1 (our smallest possible start value), we're actually interested in the weight of 0th element since that is our starting point. Also, `j` is actually the capacity starting from 0, all the way up till actual capacity so there's no capacity array we're indexing into. 

Running time: $O(cn)$

So, in this problem, we were given a list of items (with weights and values associated) and we had a bag that had a capacity. We were asked to fill our bag while maximizing profits. To do so, we had choices that could be made based on each item. There are plenty of problems where this type of pattern can be re-applied.  
### Summary
In the tabular approach: 
- We first created a 2D matrix of size dp[n+1][c+1]
- We then initialized the 2D matrix to whatever the base case was in the recursive solution
- We then replaced each recursive call with a call to the 2D matrix and retrieved already calculated values
- We then iterated over the entire 2D matrix until we go to the last cell, dp[n][c] which then held the final profit for us!

### Conclusion

- DP is applied usually when you need to iterate or find something from ALL combinations of a sequence
- DP can be used when you're looking for a combination out of possible scenarios. These are questions where you need to make decisions based on where you are in the algorithm