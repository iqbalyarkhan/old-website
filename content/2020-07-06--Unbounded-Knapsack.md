---
title: Unbounded Knapsack
date: 2020-07-06
thumbnail: /post-images/knapsack.png
draft: true
extract: Detailed look at Unbounded Knapsack
categories: 
    - Dynamic Programming
tags:
    - Dynamic programming
---

1. [Introduction](#introduction)
2. [Processed vs Unprocessed](#processed-vs-unprocessed)
3. [Code Difference](#code-difference)
4. [Problems](#problems)
5. [Rod cutting](#rod-cutting-problem)
6. [Coin change max number of ways](#coin-change-max-number-of-ways)
7. [Coin change minimum number of coins](#coin-change-minimum-number-of-coins)

### Introduction

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

Let's start with 0-1 Knapsack's recursive code that should be familiar:   

```cpp
int zeroOneKnapSack(vector<int> val, vector<int> wt, int c, int n){
    //base case
    if (n == 0 || c == 0)
        return 0;
    //weight > capacity, ignore and move on
    if (wt[n-1] > c){
        return zeroOneKnapSack(val,wt,c,n-1);
    }
    
    //Choose so reduce capacity and add value    
    int choose = val[n-1] + zeroOneKnapSack(val, wt, c - wt[n-1], n-1);
    //Ignore so just move one 
    int ignore = zeroOneKnapSack(val, wt, c, n-1);
    return max(choose, ignore);
}
```

This recursive code converted to tabular code would look like this:

```cpp
int zeroOneKnapSack(vector<int> wt, vector<int> val, int c, int n){
    //i = n, j = c
    //Weight can either be <= c or > c
    for (int i = 1; i <= n; i++){
        for (int j = 1; j <= c; j++){
            if (wt[i-1] <= j){
                //Choice 1: choose this item
                //Since we're choosing this item, we add the current item's value to whatever we get from next recursive call
                int profitWithChoosing = val[i-1] + dp[i-1][j-wt[i-1]];
                
                //Choice 2: Don't choose this item
                //Since we don't choose this item, we simply ignore its value and move to the next item
                int profitWithNotChoosing = dp[i-1][j];
                //Need to return max profit
                //Finally, based on the two decisions above, we choose the max of the two and return that value
                dp[i][j] = max (profitWithChoosing, profitWithNotChoosing);
            } else {
                //weight is > capacity, just continue recursing...
                dp[i][j] = dp[i-1][j];
            }
        }
    }
    return dp[n][c];
}
```

Let's look at a concrete example to drive home the point:

```cpp
 wt = {1,3,4,5}; // weight of each item in pounds
 val = {2,4,6,8}; //value of each item in dollars
 c = 7; //capacity in pounds
```

Here's my initial table for this scenario:

|  | **0** | **1** | **2** | **3** | **4** | **5** | **6** | **7** |
| -- | -- | -- | -- | -- | -- | -- |
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** (1) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **2** (1,3) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **3** (1,3,4) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 
| **4** (1,3,4,5) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |


We've already initialized row 0 and column 0 so we'll start at (1,1). At this position, we have the option of either choosing this item or not choosing this item.

**Choose**:

Say I chose this item, then my new capacity is 1 - 1 = 0. Unlike 0-1 knapsack, in unbounded knapsack, I CAN pick this item again so my available items to be picked stays at 1. In essence, we've reduced our problem from finding the max profit from 1 item and capacity of 1 to item 1 and capacity of 0. Now, remember we said that we want to get current value from previously calculated values? Do I know what the profit is if my items are 1 and capacity is 0? ie do I know what dp[1][0] is? YES! It is 0! But wait, we're not done. Since we've chosen this item, we need to add its value to the value we got from the sub-problem. 

Therefore, unbounded knapsack's choose would look like this (I've given 0-1 knapsack choose for comparison as well):

```cpp{numberLines: 4}
                int profitWithChoosing = val[i-1] + dp[i][j-wt[i-1]]; //Not reducing i 
                                                       |
//0-1 had this: int profitWithChoosing = val[i-1] + dp[i-1][j-wt[i-1]];
```
Everything else stays the same! That's it! Therefore, bottom up for unbounded would look like this:

```cpp
int unBoundedKnapsack(vector<int> wt, vector<int> val, int c, int n){
    //i = n, j = c
    //Weight can either be <= c or > c
    for (int i = 1; i <= n; i++){
        for (int j = 1; j <= c; j++){
            if (wt[i-1] <= j){
                //Choice 1: choose this item
                //                                     | not reducing this i since it can be chosen again
                int profitWithChoosing = val[i-1] + dp[i][j-wt[i-1]]; //Not reducing i here since we can choose ith item again!
                
                //Choice 2: Don't choose this item
                //Since we don't choose this item, we simply ignore its value and move to the next item
                int profitWithNotChoosing = dp[i-1][j];
                //Need to return max profit
                dp[i][j] = max (profitWithChoosing, profitWithNotChoosing);
            } else {
                //weight is > capacity, just continue recursing...
                dp[i][j] = dp[i-1][j];
            }
        }
    }
    return dp[n][c];
}
```

To summarize, here's the only line we changed:
```cpp
//0-1knapsack
int profitWithChoosing = val[i-1] + dp[i-1][j-wt[i-1]];
//unbounded                            |
int profitWithChoosing = val[i-1] + dp[i][j-wt[i-1]]; //Not reducing i here since we can choose ith item again!
```

That is the only difference between 0-1 and unbounded where a chosen item can be chosen again. This has far-reaching implications. It implies that:
- Unbounded is to be used where the number of items available are infinite. ie the number of options you have can be used again and again
- Same item can be included in our knapsack multiple times

### Problems
Now let's have a look at a few problems that use unbounded knapsack. Before we do that, we also need to figure out whether the problem uses unbounded or 0-1 variation. How would we go about determining that?

Like I said earlier, if the problem allows you to choose multiple instances of the same value, weight, size or significance then it is an unbounded knapsack variation. You can have 1 box of fries and then have another box of fries if you're allowed, otherwise, you'll have to choose a bowl of lettuce.  

### Rod cutting Problem

**Given a rod of fixed length, and a price for each possible piece of the rod, determine the max profit that can be obtained by cutting the rod into pieces.**

Example: 

Length(meters):     1   2   3   4   5   6   7   8 
Price(dollars):     1   5   8   9   10  17  17  20

So, if I cut the 8 meter rod into 2 and 6 meters and sell it, my profit would be: 5 + 17 = \$22.

If I cut the 8 meter rod in 3 + 3 + 2 meter cuts, my profit would be: 8 + 8 + 5 = \$21

Therefore, our input is: 
- length of the rod: $N$
- length array
- price array 

Let's first discuss why this is a general knapsack problem:

- We've got a price that's being paid to us and we're to make decisions whether to choose a piece or not to choose a piece. We can then repeat this for each possible piece. It is clear that if we do this naively, our running time would be $O(2^N)$ where $N$ is the length of the rod. Therefore, it is clear that we need to use DP to get a better running time solution.

Now, why is this unbounded knapsack? 
- It is unbounded knapsack because we can cut the 8m rod into eight 1m pieces: I've got more than one instance of the same length! If I choose, I can have four 2m pieces and so on. The main observation is that once I've chosen a piece of a particular length, I can come back and choose it again. Therefore this is unbounded knapsack.

Now let's solve this problem! We've already seen that recursive solution is not the most efficient solution, so let's start directly with our bottom-up tabular solution:

(1) Function signature stays the same:

```cpp
int rodMaxProfit(vector<int> lengthArr, vector<int> prices, int N){}
```

(2) Let's create our 2D matrix and see how we initialize it. We'll have `i` represent the length of possible cuts array + 1 and `j` represent the length of the rod + 1. In our example, we're given allowed cuts from 1 till 8 so the size of `i` is 8 and the length of rod is 8 as well so we have a square matrix: (The Fs mean that we still need to fill these spots):
 
 |  | **0** | **1** | **2** | **3** | **4** | **5** | **6** | **7** | **8** |
 | -- | -- | -- | -- | -- | -- | -- | -- | -- |
 | **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 
 | **1** | 0 | F | F | F | F | F | F | F |
 | **2** | 0 | F | F | F | F | F | F | F | 
 | **3** | 0 | F | F | F | F | F | F | F | 
 | **4** | 0 | F | F | F | F | F | F | F | 
 | **5** | 0 | F | F | F | F | F | F | F | 
 | **6** | 0 | F | F | F | F | F | F | F |
 | **7** | 0 | F | F | F | F | F | F | F |
 | **8** | 0 | F | F | F | F | F | F | F |   
 
 
 Now, if I have no pieces to sell, my profit would be 0. Also, if I have no length of rod, I can't sell anything so my profit is 0. That is why the 0th row and the 0th columns are all 0s. Now, we just use the logic that was explained for 0-1 knapsack with the only difference being that we'll not decrement `i` if we choose the current element.
 
Let's start with 1,1. This means that the piece I cut is  1 meter in length and the rod is also of size 1. So the max profit here would be based on the 2 choices that I have:

- **Choose this 1m piece**

If I choose this 1m piece, then the max profit is value of this 1m piece plus whatever the max profit was from remaining cuts:
```cpp
int choose = prices[i-1] + dp[i][j - lengthArr[i-1]]; 
```

- **Ignore this 1m piece** 
If I ignore this 1m piece, I've processed it, so I simply ignore the price value of this piece and move on:

```cpp
int ignore = dp[i-1][j];
``` 

Now that I have the two pieces of information, what do I put in for dp[i][j]? Simple: it'll be the max of the two choices that I made:

```cpp
int choose = prices[i-1] + dp[i][j - lengthArr[i-1]]; 
int ignore = dp[i-1][j];
dp[i][j] = max(choose,ignore);
```

If you notice, this is quite similar to the unbounded knapsack problem we saw earlier in this post. The only thing we did was change the input arrays because obviously, our input is different: we changed weight array to length array and value array was changed to price array for rod cutting problem!

Putting it all together, here's the complete code:

```cpp
int rodMaxProfit(vector<int> lengthArr, vector<int> prices, int N){
    int L = int(lengthArr.size() + 1);
    vector<vector<int>> dp(L, vector<int>(N+1, 0));
    
    for (int i = 1; i <= N; i++){
        for (int j = 1; j <= L; j++){
            if (lengthArr[i-1] > N)
                dp[i][j] = dp[i-1][j];
            else {
                int choose = prices[i-1] + dp[i][j - lengthArr[i-1]];
                int ignore = dp[i-1][j];
                dp[i][j] = max(choose,ignore);
            }
        }
    }
    
    return dp[N][L];
    
}

int main(int argc, const char * argv[]) {
    // insert code here...
    vector<int> length = {1,2,3,4,5,6,7,8};
    vector<int> prices = {1,5,8,9,10,17,17,28};
    int n = 8;
    int ans = rodMaxProfit(length, prices, n);
    cout << "ans: " << ans << endl;
    return 0;
}
```

### Coin Change: Max number of ways
**Given a value N, if we want to make change for N cents, and we have infinite supply of each of S = { S1, S2, .. , Sm} valued coins, how many ways can we make the change?**

Let's see why this is a knapsack problem: Say we're given this input:

```cpp
vector<int> coins = {1,2,3,5};
int changeToBeMade = 5;
``` 

So we're asked to make change for \$5 with only bills that are of the denomination 1,2,3 and 5. Ok, so what are my options? 
- pick 1 and keep picking 1 until I get to 5 and ignore others
- pick 2 and keep picking 2 and then pick 1 again and ignore others
- pick 3 and pick 2 and ignore others
- pick 5 and ignore others
etc..

Here we see that we've got the option to pick 1 or not pick 1. Then we've go the option to pick 2 or not pick 2. Then we've got the option t pick 3 or not pick 3 and so on. See the problem here? If we go down the recursion rabbit hole, we'd end up with $O2^N$ running time. So, we better use knapsack to solve this problem! 

Now, which knapsack do we use? 0-1 or unbounded? Well, in the options we listed above are we picking the same item more than once? Yes! we can pick all 1s (multiple occurrences of the same input), or we can pick 2 2s (multiple occurrences here again!) and so on, so we'll use unbounded knapsack!

Let's start with the table:

|  | **0** | **1** | **2** | **3** | **4** | **5** |
| -- | -- | -- | -- | -- | -- | -- |
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** (1) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **2** (1,2) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **3** (1,2,3) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 
| **4** (1,2,3,5) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

I've created the initial table with all 0s. Now let's recall:
- What the rows mean: Each row is the coin that we have available for selection
- What the columns mean: Each column is the change we need to get to

Alright, so row 0 means that we have no coins. In that case, we can only make the sum 0 and no other sum. Therefore, (0,0) would equal 1 while every other entry in row 0 stays 0.

Next, column 0: This means that our target sum is 0. In this case we can get to the sum of 0 by picking nothing no matter how many bills are given to us! Therefore, we have exactly 1 way to to get to target 0. So all entries in column 0 would be 1:

|  | **0** | **1** | **2** | **3** | **4** | **5** |
| -- | -- | -- | -- | -- | -- | -- |
| **0** | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** (1) | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **2** (1,2) | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **3** (1,2,3) | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 
| **4** (1,2,3,5) | 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

So, we're done with row 0 and column 0. Let's start with (1,1). We'll use `i` to keep track of the rows and `j` for columns. 

(1) (1,1) i = 1, j = 1.

Here, it means that we want to get to sum of 1 (because j = 1) and we only have the first element available for selection (since i = 1). This element that is available for selection is a bill for \$1.

We've got two options with this \$1 bill:

- **Choose**:
We decide to choose this bill. If we choose this bill, our new target becomes: 

```cpp
 = j - coins[i - 1]
 = 1 - coins[1 - 1]
 = 1 - coins[0]
 = 1 - 1
 = 0
``` 

Now remember, this is unbounded knapsack, so I can pick \$1 as many times as I want. Since I've already picked it, I cannot discard it since it may be picked again. Keeping that in mind, how many ways do I have to get to the target of 0 considering the only bills I can use are \$1? That information would be in dp[i][j] where i = 1 and j = 0. Do I have that information? Do I know what dp[1][0] is? Yes! It is 1. Converting this logic to code, if I'm choosing an element, I need to grab the possible ways using:

```cpp
int choose = dp[i][j - coins[i-1]];
```

Therefore, if I choose the \$1 bill I have 1 way to get to the target of 1. This makes sense right, because there's only one way to get to the sum of 1 if all I have is the \$1 bill which is by choosing the bill I have. 

- **Ignore**:
If I ignore this \$1 bill, how many ways do I have to get to the sum of 1? Well, I've decided I won't pick the \$1 bill, so the only things I can pick are the set of all elements seen so far except 1. This is the empty set, or where i = 0. Now, if I have nothing and I want to get to 1, ie my i = 0 and j = 1, how many ways are there to get to the target of 1. Do I have this information? It would be in  dp[0][1]. Yes! It is 0. Converting this logic to code, if I'm ignoring an element, I need to grab the possible ways to get to the current target **using only elements other than the current element** which is in the table: stay in the same column but go back one row:

```cpp
int ignored = dp[i-1][j];
```  

**Decision**:

What do I do now that I have my values for choosing and ignoring the current bill? Well, I want all possible ways right? So I'll go ahead and add the two values and assign to dp[i][j]. That is because dp[i][j] represents all possible ways to get to the current sum:

```cpp
dp[i][j] = choose + ignored; 
```

The example above was one where the sum we need to get to is atleast as large as the denomination but what if we want to create the sum of 2 and the only denomination bill we have is 5, then no matter what we cannot get to the sum 2 with \$5 bill. In this case we'll just ignore the current denomination and copy over the running total from the previous denomination:

```cpp
if (coins[i - 1] > j)// If the coin I'm looking at is > target
    dp[i][j] = dp[i-1][j];
```  

And that's it! We let the code run and get the max number of ways to get to a target. This is nothing but unbounded knapsack code without the values array. We substituted the weights array with the coins array. Other than that, the logic stayed the same:

```cpp

int coinChangeMaxWays(vector<int> coins, int s, int n){
    vector<vector<int>>dp (n+1, vector<int>(s+1, 0));
    for (int i = 0; i < dp.size(); i++){
        dp[i][0] = 1;
    }
    
    for (int i = 1; i <= n; i++){
        for (int j = 1; j <= s; j++){
            //coin > sum, ignore
            if (coins[i-1] > j){
                dp[i][j] = dp[i-1][j];
            } else {
                //choose:
                int choose =  dp[i][j - coins[i-1]];
                int ignored = dp[i-1][j];
                dp[i][j] = choose + ignored;
            }
        }
    }
    return dp[n][s];
}
```

Sample output for our example array where we had coins {1,2,3,5} and wanted to get to 5:

```text
1 0 0 0 0 0 
1 1 1 1 1 1 
1 1 2 2 3 3 
1 1 2 3 4 5 
1 1 2 3 4 6 
```
So there're a total of 6 ways:
- 1 + 1 + 1 + 1 + 1 = 5
- 1 + 1 + 1 + 2 = 5
- 1 + 1 + 3 = 5
- 2 + 2 + 1 = 5
- 2 + 3 = 5
- 5 = 5

### Coin change minimum number of coins
**Given a set of coins and a target sum, find the minimum number of coins needed to get to the target**

Example:
```cpp
input: 1,2,3,4
target: 5

return 2: 1 + 4 = 5 or 2 + 3 = 5
```

Why is this unbounded knapsack? Because the minimum number of coins might have repeated coins of the same denomination! We might use the same item more than once. 

### Initialization
This is quite an interesting problem. Let's start with initializing our table. Our inputs are:

- coins: <1,2,3,4>
- target: 5

|  | **0** | **1** | **2** | **3** | **4** | **5** |
| -- | -- | -- | -- | -- | -- | -- |
| **0** | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **1** (1) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **2** (1,2) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **3** (1,2,3) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 
| **4** (1,2,3,4) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

Ok, so what does (0,0) mean? (0,0) means that if the target is 0 and the number of coins we're given is 0, what is the minimum number of coins needed to get to 0? Well, if we pick nothing, we'll get to 0! So, minimum coins is 0! Same is true of (1,0) where target is 0 and the number of coins we're given is 1: ie the first coin of value 1. In this case as well, if we pick nothing, we'll get to the sum of 0. Therefore, all values in column 0 are 0!

Now, what about (0,1)? We need to get to sum 1 and we're given nothing! In this case, there's no number of 0c coins that would satisfy this! So, we'll put $\infty$. In our code, we'll use int's numeric limit to denote infinity. Same goes for all targets with coin 0:

|  | **0** | **1** | **2** | **3** | **4** | **5** |
| -- | -- | -- | -- | -- | -- | -- |
| **0** | 0 | $\infty$ | $\infty$ | $\infty$ | $\infty$ | $\infty$ | $\infty$ | $\infty$ |
| **1** (1) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **2** (1,2) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| **3** (1,2,3) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 
| **4** (1,2,3,4) | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

### Logic

Ok, let's start with position, (1,1): this means that we need to get to 1 given a coin of denomination 1c. Say, we pick this coin, now our target sum becomes 1 - 1 = 0 BUT we stay in the same row, ie we don't go to (0,1). Why? Because this is unbounded knapsack and we can pick the item we're on multiple times. Alright, so we're now at: dp[1][0]. Do I know the minimum number of coins needed to make change for 0 if I'm given only 1c coin? YES! It is 0 which was decided during initialization. Ok, so we know that the minimum number of coins for the sum 0 was 0, but we're solving the problem for the target of 1. Remember, we had already picked the 1c coin, so all we need to do is add 1 to the minimum we got because we've picked the current coin and we'll have the minimum number of coins for current position! 

Now, so far we've seen that for each item, we had a choice, we either pick it, or ignore it, you can solve this problem using that logic as well but since we're only interested in the minimum, and we've already determined what the minimum is for each denomination and target preceding current target, all we need to do is grab the previous minimum and add 1 to it! 


If the denomination we're looking at is greater than the sum, all we do is ignore current denomination and bring the minimum from the previous denominations similar to how we've been doing!

### Code

```cpp
int minimumNumberOfCoins(vector<int> coins, int target, int n){
    int maxInt = numeric_limits<int>::max();
    vector<vector<int>> dp (n+1, vector<int>(target + 1, maxInt));
    
    for (int i = 0; i <= n; i++){
        dp[i][0] = 0;
    }
    
    for (int i = 1; i <= n; i++){
        for (int j = 1; j <= target; j++){
            if (coins[i-1] > j)
                dp[i][j] = dp[i-1][j];
            else {
                int prevMin = dp[i][j - coins[i-1]];
                if (prevMin < maxInt){
                    dp[i][j] = prevMin + 1;
                } else {
                    dp[i][j] = maxInt;
                }
            }
        }
    }
    return dp[n][target];
}
```

If you run the above on our input of <1,2,3,4> and target 5, you'll get the following table:

```text
0 2147483647 2147483647 2147483647 2147483647 2147483647 
0 1 2 3 4 5 
0 1 1 2 2 3 
0 1 1 1 2 2 
0 1 1 1 1 2 
```
Notice:
- If you're given only coin 1, then minimum number of coins needed to get to 5 are 5: all 1s. This is denoted by cell (1,5) 
- If you're given coins 1 and 2, then minimum number of coins needed to get to 5 are 3: 2 + 2 + 1 = 3. This is denoted by cell (2,5)
- If you're given coins 1, 2 and 3, then minimum number of coins needed to get to 5 are 2: 3 + 2 = 2. This is denoted by cell (3,5)

Running time: $O(N * Target)$