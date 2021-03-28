---
title: DP Discussion Updated
date: 2021-03-27
thumbnail: /post-images/dynamic-programming.png
draft: false
extract: A deep dive into DP problems
categories: 
    - Dynamic Programming
tags:
    - Dynamic programming
---

1. [Introduction](#introduction)
2. [Fibonacci](#fibonacci)
3. [Factorial](#factorial)
3. [Climbing Stairs](#climbing-stairs)
4. [0-1 Knapsack](#0-1-knapsack)
5. [Unbounded Knapsack](#unbounded-knapsack)
4. [Minimum Path Sum](#minimum-path-sum)
5. [Combination Sum](#combination-sum)
6. [Coin change](#coin-change)

100. [Conclusion](#conclusion)


### Introduction
Some categories of problems have recursive solutions where we're asked to build upon smaller instances of problems to answer the original problem. These recursive solutions sometimes re-calculate values that were already calculated in previous steps which makes the recursive solution an exponential time solution. This is where DP comes into play: DP follows the same principles of a recursive solution except that DP stores previously calculated values so that we don't have to perform the same calculations again and again. These values are store in an array, or a 2D array and used to arrive at the final solution.

Most of DP problems belong to one of 3 categories:
(1) Minimize or maximize certain values
(2) Yes/No find subsets etc (Can also be greedy)
(3) Count the number of ways to do something (Can also be greedy)

### Fibonacci

One of the most common examples is Fibonacci series where f(0) = 0 and f(1) = 1 and f(n) = f(n-1) + f(n-2). A recursive function can solve this BUT if you look at the recursion tree you'll realize that a bunch of values are being recalculated. You can avoid that by using DP:

```cpp

int fib(int n){
    if (n <= 1)
        return n;
    int onePrev = 1, twoPrev = 0, curr = 0;
    for (int i = 2; i <= n; i++){
        curr = onePrev + twoPrev;
        twoPrev = onePrev;
        onePrev = curr;
    }

    return curr;
}
```

### Factorial

Same as before, factorial can be solved using DP in better running time than that of a recursive solution:

```cpp
int fact(int n){

    if (n == 1){
        return 1;
    }

    int prev = 1, curr = 1;
    for (int i = 2; i < n; i++){
        curr = i * prev;
        prev = curr;
    }
    return curr;
}
```

### Climbing stairs
**Find the distinct number of ways in which you can get to the top of an N-stairs staircase. You can take 1 or 2 steps at a time.**

Let's think in terms of state and transition. Our state would be the current position we're in. say, we're at the 2nd step in a 4 step stair case. In terms of our dp array, this is what `i` would represent in dp[i]. Meaning, position 2 in our dp array. Now the VALUE at this state would be the number of ways to get to position i. Therfore dp[i] should tell me how many ways there are to get to step i. Had the problem asked us about the minimum number of ways to get to position i, then dp[i] would have the minimum value to get to i. Had the problem asked us whether it is possible to get to position i, then dp[i] would've been a boolean value (T or F). Had the problem asked us the maximum for something, then dp[i] would've been the max of that value.

Ok, now let's talk about the **transition: ie HOW did you get here?** how many ways there're to get to i. That would be our transition. Now, we could've reached i by either just coming from the previous step or 2 steps behind the current step. Therefore:

```cpp
dp[i] = dp[i-1] + dp[i-2];
``` 

Let's now look at the base case:

 ```cpp
Number of ways to get to step 0: 1 (do nothing!)
Number of ways to get to step 1: 1 (take 1 step - the only way)
Number of ways to get to step 2: 2 (take two 1 steps or take 1 2 steps)
```

### 0-1 Knapsack
**The 0-1 knapsack pattern deals with problems where we have the option of choosing or ignoring items or elements to derive our solution. Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible**

Example:

```cpp
 wt = {1,3,4,5}; // weight of each item in pounds
 val = {2,4,6,8}; //value of each item in dollars
 c = 7; //capacity in pounds
```

(1) We know we'll be creating a 2D matrix of size n+1 * c + 1. Why those dimensions? Because we need to keep track of the changing values. Therefore, our rows are the items we're considering and each column represents the capacity of our knapsack

(2) Next, we need to initialize the 2D matrix. If there are no items given to us, ie row 0, then no matter what the capacity of our sack is, our max profit will ALWAYS be 0. Therefore row 0 is all 0s. Next, if our knapsack has no capacity, then no matter how many items I'm given, my max profit will always be 0. Therefore column 0 is all 0s. Remaining 0s need to be filled with correct values.

This will be the only time in our solution where we've manually assigned values. Most tutorials focus on going through the process of filling in the table by hand and then these tutorials drop the recursive formula and expect one to memorize it. Here, we'll see how we can reach a conclusion logically!
 
|  | **0** | **1** | **2** | **3** | **4** | **5** | **6** | **7** |
| -- | -- | -- | -- | -- | -- | -- |
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** (1) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **2** (1,3) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **3** (1,3,4) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 
| **4** (1,3,4,5) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

(3) We'll keep track of rows using `i` and columns using `j`. Let's start with i = 1 and j = 1 (the first unfilled position). ie (1,1). This means, we've been given the first item with weight 1 and our capacity is also 1. At this point, we've got 2 choices:

- chose item with weight 1 
- ignore item with weight 1.

**Choose**:

Say I chose this item, then my new capacity is 1 - 1 = 0. And since I've chosen this item, I cannot pick this item again so my available items to be picked falls from 1 to 0. In essence, we've reduced our problem from finding the max profit from 1 item and capacity of 1 to no item and capacity of 0. Now, remember we said that we want to get current value from previously calculated values? Do I know what the max profit is if my items are 0 and capacity is 0? ie do I know what dp[0][0] is? YES! It is 0! But wait, we're not done. Since we've chosen this item, we need to add its value to the value we got from the sub-problem. 

Therefore:
$$$
 \textrm{choose} = \textrm{value of current item} + \textrm{max profit from remaining capacity and from remaining items} 
$$$

Converting this to code, we have:

```cpp
int choose = val[i-1] + dp[i-1][j - wt[i-1]];
```

This comes out to $2 + 0 = 2$

**Ignore**:

If I ignore the current item, I need the max profit from not picking this item. Do I have the information for the max profit I get if my capacity is 1 and my items are everything BUT the current item? Yes! It is in dp[0][1] = 0. We won't add the value for the current item since we're ignoring it. 

Converting this to code, we have:

```cpp
int ignore = dp[i-1][j];
```


Now, that I have the values for the profit if I choose the item and the value if I ignore the item, my max profit would obviously be the **max** of these two vales. Therefore,

```cpp
dp[i][j] = max(choose, ignore);
```

We continue using this logic to fill out our first row. max of 2 and 0 is 2:

|  | **0** | **1** | **2** | **3** | **4** | **5** | **6** | **7** |
| -- | -- | -- | -- | -- | -- | -- |
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** (1) | 0 | 2 | 2 | 2 | 2 | 2 | 2 | 2 |
| **2** (1,3) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **3** (1,3,4) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 
| **4** (1,3,4,5) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

Once we're done filling the table, our final answer will be in the position dp[n][capacity].

Running time is $O(N * Target)$

### Unbounded Knapsack
We've already seen what [0-1 Knapsack](/0-1-knapsack) looks like and what it entails. Let's compare and contrast 0-1 Knapsack with unbounded knapsack. The word unbounded means **having no limits**. In our scenario, unbounded would apply to the items that we consider as we look to fill our knapsack. Let's look at a scenario:

Say I've got a box and in that box are a few food items. These items are listed in the order of how much I like them (I like fries the most and lettuce the least) along with the amount of each item I have

(1) 1 box of Fries

(2) 1 Cheese burger

(3) 1 bowl of ice cream

(4) 1 bowl of lettuce

Now, say I'm given a knapsack that can hold 4 items and I'm to depart on a long journey and would need 4 items to survive. I'll start to fill my knapsack with the one box of fries. Since I don't have fries any more, I'll move to burger. I'll pick burger and put it in my knapsack. Next, I'll pick ice-cream and finally to fill my knapsack, I'll put in the bowl of lettuce. This was basically the idea behind 0-1 Knapsack: maximize the amount of items (or profit) until a certain limit (size of the knapsack in this case) is reached. 

Let's modify this example a little, say I still like the foods in that order but this time I have unlimited supply of each and my knapsack can still only hold 4 items:

(1) $\infty$ box of Fries

(2) $\infty$ Cheese burger

(3) $\infty$ bowl of ice cream

(4) $\infty$ bowl of lettuce

So, for my trip, I'll this time pick all 4 items as fries: this is **unbounded knapsack** where I can have a single input repeated many times. 


### Processed vs Unprocessed 
Before we move on, let's talk about what it means to label an item as processed vs unprocessed. In 0-1 Knapsack problem, we processed an item only once. Processed in 0-1 Knapsack scenario meant picking up an item and placing in our sack. Once we processed an item, we NEVER returned back and re-processed, or re-chose, the same item. Using our analogy from above, if I picked a box of fries once, I don't have the fries any more so I had to move on to the next item. 

In unbounded scenario, until and unless I COMPLETELY reject an item, I won't count it as processed. For example, if say I have a blindfold on and pick an item from my unlimited supply and find that the item I picked was lettuce, I'll reject it since I know there's an unlimited supply and I can get my favorite item. This means, I've processed lettuce, made a decision on it that I WILL NOT eat it no matter how many times you put it in front of me.  

So use unbounded when you know you can re-use a previously used item. For example, if you're going up a flight of stairs and can go up in 1,2 or 3 steps, if you go up 3 in the first try, you won't say that I've already tried 3 so I can't go up 3 again!

### Code Difference
So we've seen the two flavors of knapsack problem: one where the item is processed as soon as you receive it (0-1 knapsack) and one where an item is not processed until you've vehemently rejected it (unbounded knapsack) ie items are re-usable.

Let's start with 0-1 Knapsack's recursive code that should be familiar. We'll only look at the choose portion of the code:   

```cpp{numberLines: true}
int zeroOneKnapSack(vector<int> val, vector<int> wt, int c, int n){
    //....
    //Choose: reduce capacity and add value    
    int choose = val[n-1] + zeroOneKnapSack(val, wt, c - wt[n-1], n-1);
    //....
}
```

**Choose**:

In 0-1 knapsack, when I choose an item, I cannot pick it again, so I decrement `n` on line 4 (the very last parameter) to represent the fact. However, in unbounded knapsack, I'm allowed to pick the same item multiple times. To denote the same in my recursive solution, I'll do the following:

```cpp{numberLines: true}
int unboundedKnapSack(vector<int> val, vector<int> wt, int c, int n){
    //....
    //Choose: reduce capacity and add value    
    int choose = val[n-1] + unboundedKnapSack(val, wt, c - wt[n-1], n);
    //....
}
```

Converting the same to bottom up approach, I'll get this for unbounded knapsack:

```cpp
                int profitWithChoosing = val[i-1] + dp[i][j-wt[i-1]]; //Not reducing i 
                                                       |
//0-1 had this: int profitWithChoosing = val[i-1] + dp[i-1][j-wt[i-1]];
```


That is the only difference between 0-1 and unbounded where a chosen item can be chosen again. This has far-reaching implications. It implies that:
- Unbounded is to be used where the number of items available are infinite. ie the number of options you have can be used again and again
- Same item can be included in our knapsack multiple times
### Minimum Path Sum

**Given a grid, find a path from the top-left to the bottom-right corner that minimizes the sum of numbers along the path. You can only move down or to the right.**

Let's see an example:

```cpp
3   2   1   3
1   9   2   3
9   1   5   4
```
The minimum path is from 3-2-1-2-3-4

Now you can use a greedy approach but you soon realize that the greedy approach goes down to 1 from 3 and then would have to choose a 9! Greedy won't work, we need DP.

Now, let's start with our state. Since we're asked for the sum, we'll have our dp setup like so:

```cpp
int dp[row][col] = minimumSumSoFar;
``` 

For the **transition, think about HOW you got here?** You could've come from the cell above our current cell or the cell to the left of our current cell. Now, let's start with our base case. Since we can only get to a cell from the cell above OR from cell to the left, our first row and first column in the dp array would be the sum of all the values so far. I've shown the original matrix as well for clarity:

```cpp
3   2   1   3
1   9   2   3
9   1   5   4



3   5   6   9
4  1,1
13
```

Let's look at cell 1,1. Now the cost to get to 1,1 is the minimum of top and left in dp array plus the current value at 1,1 in original matrix. This is min(4,5) + 9 = 13:

```cpp
3   2   1   3
1   9   2   3
9   1   5   4



3   5   6   9
4  13
13
```

We continue, until we get to the last cell where we'll have our answer:

```cpp
3   2   1   3
1   9   2   3
9   1   5   4



3   5   6   9
4   13  8   11
13  14  13  14
```
We can see that the minimum cost is 14!

Let's see this logic converted to code:

```cpp
int minPathSum (vector<vector<int>>& mat){
    vector<vector<int>> dp(mat.size(), vector<int>(mat[0].size(), 0));
    dp[0][0] = mat[0][0];
    
    //base case:
    for (int i = 1; i < mat[0].size(); i++){
        dp[0][i] = mat[0][i-1] + mat[0][i];
    }
    
    for (int i = 1; i < mat.size(); i++){
        dp[i][0] = mat[i-1][0] + mat[i][0];
    }
    
    for (int i = 0; i < mat.size(); i++){
        for (int j = 0; j < mat[i].size(); j++){
            dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + mat[i][j];
        }
    }
    
    return dp[mat.size()-1][mat[0].size()-1];
}
```

Time and space complexity is $O(row*col)$
 
### Combination Sum
**Given target value N and an array of allowed numbers, count ways to write N as the sum of those numbers (order matters)**

Example:

```cpp
nums = {1,2,3}
N = 4

1+1+1+1
1+1+2
1+2+1
1+3
2+1+1
2+2
3+1
ans = 7
```

Let's see our state: our state at some position is the sum so far, ie whether we're below target, at target or above target. Since we care about the current sum, dp[i] will have the number of ways we got to `i` and `i` itself denotes the sum. For example, dp[2] = 2 (for example), meaning that we can get to a sum of 2 (ie value of i) in 2 ways (ie the value on the other side of the equal sign). The base case would be where dp[0] = 1 meaning that the number of ways to get to a sum of 0 is by picking no value from the array, therefore 1 way. Here's what our array will look like initially. The size of the array is 1 greater than the sum we're targeting:

```cpp
dp = 1  0   0   0   0
sum  0  1   2   3   4
``` 
Let's step through each position and count:

Now, how many ways can we get to 1 using the coins {1,2,3}
```cpp
dp = 1  0   0   0   0
sum  0  1   2   3   4
```
We can get to 1 from just position 0, or sum 0 by using the $1 coin, ie 1 way. using $2 and $3 doesn't make sense since we'll be going into negative integers. Let's update our array:
```cpp
dp = 1  1   0   0   0
sum  0  1   2   3   4
```


Now, how many ways can we get to 2 using the coins {1,2,3}
```cpp
dp = 1  1   0   0   0
sum  0  1   2   3   4
```
We can get to sum 2 from sum 1 by using $1 coin or from sum 0 by using $2 coin, ie 2 ways. Using $3 doesn't make sense since we'll be going into negative integers. Let's update our array:
```cpp
dp = 1  1   2   0   0
sum  0  1   2   3   4
```


Now, how many ways can we get to 3 using the coins {1,2,3}
```cpp
dp = 1  1   2   0   0
sum  0  1   2   3   4
```
We can get to sum 3:
- from sum 2 by using $1 coin 
- or from sum 1 by using $2 coin 
- or from sum 0 by using $3 coin, 

BUT there're already 2 ways to get to sum 2 and then 1 more way to get to sum 3! So add 1 to already existing number of ways to get to sum 2.
ie 4 ways. Let's update our array:
```cpp
dp = 1  1   2   4   0
sum  0  1   2   3   4
```

Notice the patter here? We're doing this:

```cpp
for (int j = 0; j < nums.size(); j++){
    if (i - nums[j] >= 0)
        dp[i] = dp[i] + dp[i-nums[j]];
}
```

Here's this logic converted to code:

```cpp
int comboSum(int n, vector<int>& change){
    vector<int> dp (n+1,0);
    //Base case
    dp[0] = 1;
    for (int i = 1; i < dp.size(); i++){
        for (int j = 0; j < change.size(); j++){
            if (i - change[j] >= 0)
                dp[i] = dp[i] + dp[i-change[j]];
        }  
    }    
}
```

### Coin change

**Given denominations and target amount N, what is the minimum number of coins used to get to N**?

Again, you can try and use greedy but it would fail if you had this scenario:

```cpp
coins = {1,3,4}
target = 6
```

Greedy would pick 4,1,1 = 3 coins while the correct solution is 3,3 = 2 coins! Let's start with our dp array where our state at dp[i] represents the minimum number of coins needed to get to `i`. Initially, all our values will be infinity and dp[0] would be 0 as our base case.

```cpp
dp = 0  inf inf inf inf inf inf
    0   1   2   3   4   5   6
```

Now, let's say we're at i = 1. Here, what's the minimum number of coins? iterating over each coin value, minimum number of coins would be the number of ways to get to i - currentDenomination plus 1 (plus 1 for the current coin)

```cpp
int minCoins(int n, vector<int>& change){
    vector<int> dp (n+1,numeric_limits<int>::max());
    //Base case
    dp[0] = 0;
    for (int i = 1; i < dp.size(); i++){
        for (int j = 0; j < change.size(); j++){
            if (i - change[j] >= 0)
                dp[i] = min(dp[i] , dp[i-change[j]] + 1);
        }  
    }    
}
```