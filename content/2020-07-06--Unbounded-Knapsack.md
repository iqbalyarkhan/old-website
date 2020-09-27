---
title: Unbounded Knapsack
date: 2020-07-06
thumbnail: /post-images/knapsack.png
draft: false
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
    * [Rod Cutting Recursive Solution](#rod-cutting-recursive-solution)
    * [Rod cutting bottom up](#rod-cutting-bottom-up)
6. [Coin change number of ways](#coin-change-number-of-ways)
    * [Coin number of ways recursive](#coin-number-of-ways-recursive)
    * [Coin number of ways bottom up](#coin-number-of-ways-bottom-up)
7. [Coin change minimum number of coins](#coin-change-minimum-number-of-coins)
    * [Min num of coins recursive](#min-num-of-coins-recursive)
    * [Min num of coins bottom up]

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

### Problems
Now let's have a look at a few problems that use unbounded knapsack. Before we do that, we also need to figure out whether the problem uses unbounded or 0-1 variation. How would we go about determining that?

Like I said earlier, if the problem allows you to choose multiple instances of the same value, weight, size or significance then it is an unbounded knapsack variation. You can have 1 box of fries and then have another box of fries if you're allowed, otherwise, you'll have to choose a bowl of lettuce.  

### Rod cutting Problem

**Given a rod of fixed length, and a price for each possible piece of the rod, determine the max profit that can be obtained by cutting the rod into pieces.**

Example: 
```cpp
Length(meters):     1   2   3   4   5   6   7   8 
Price(dollars):     1   5   8   9   10  17  17  20
```

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

Now let's solve this problem! 

### Rod Cutting Recursive Solution
Let's start with the first step:

### Base case:
This occurs for the smallest valid input: ie when the rod is of length 0 or when we've iterated over all the elements in our price and length array. In this case our profit is 0. I'll use the variable `target` to keep track of remaining length. We'll reduce the remaining length every time we make a choice:

```cpp
int maxProfit(vector<int>& len, vector<int>& price, int target, int n){
    if (target == 0 || n == 0)
        return 0;
}
```

### Recursive Case
Let's look at the cases and then we'll dive deeper to explain each case:

(1) Length of current element we're considering is <= length of the rod
    (a) We can choose current element
    (b) We can ignore current element
(2) Length of current element we're considering is > length of the rod: only option is to ignore

### 1a: Choose current element

Ok, so first let's check if current element is <= length of rod remaining:

```cpp
int maxProfit(vector<int>& len, vector<int>& price, int target, int n){
    if (target == 0 || n == 0)
        return 0;
    if (len[n-1] <= target){
        //choose or ignore
    }
}
```

Now, let's choose this element:

```cpp{numberLines: true}
int maxProfit(vector<int>& len, vector<int>& price, int target, int n){
    if (target == 0 || n == 0)
        return 0;
    if (len[n-1] <= target){
        //choose
        int profitChoose = price[n-1] + maxProfit(len, price, target - len[n-1], n);
    }
}
```

Notice on line 6 in the code above (the recursive call), we don't reduce the value of `n`. That, as we discussed, is because the current element of length is eligible to be chosen again!

### 1b: Ignore current element
Next, let's ignore the current element:

```cpp{numberLines: true}
int maxProfit(vector<int>& len, vector<int>& price, int target, int n){
    if (target == 0 || n == 0)
        return 0;
    if (len[n-1] <= target){
        //choose
        int profitChoose = price[n-1] + maxProfit(len, price, target - len[n-1], n);
        //ignore
        int profitIgnore = maxProfit(len, price, target - len[n-1], n-1);
    }
}
```

Finally, after we have our two profits, we want to return the max profit:

```cpp{numberLines: true}
int maxProfit(vector<int>& len, vector<int>& price, int target, int n){
    if (target == 0 || n == 0)
        return 0;
    if (len[n-1] <= target){
        //choose
        int profitChoose = price[n-1] + maxProfit(len, price, target - len[n-1], n);
        //ignore
        int profitIgnore = maxProfit(len, price, target - len[n-1], n-1);
        return max(profitChoose,profitIgnore);
    }
}
```

### Length of current element we're considering is > length of the rod
What if length of current element > rod length (ie target)? Here, the only option we have is to ignore the element:

```cpp{numberLines: true}
int maxProfit(vector<int>& len, vector<int>& price, int target, int n){
    if (target == 0 || n == 0)
        return 0;
    if (len[n-1] <= target){
        //choose
        int profitChoose = price[n-1] + maxProfit(len, price, target - len[n-1], n);
        //ignore
        int profitIgnore = maxProfit(len, price, target - len[n-1], n-1);
        return max(profitChoose,profitIgnore);
    }

    return maxProfit(len,price,target,n-1);
}
```

That's it! We're done. Running time is $O(N*2^N)$
     
### Rod cutting bottom up
We've seen that recursive solution is not the most efficient solution, so let's now discuss bottom-up tabular solution:

(1) Function signature stays the same:

```cpp
int rodMaxProfit(vector<int> lengthArr, vector<int> prices, int L, int N){}
```

(2) Let's create our 2D matrix and see how we initialize it. We'll have `i` represent the length of possible cuts array + 1 and `j` represent the length of the rod + 1. In our example, we're given allowed cuts from 1 till 8 so the size of `i` is 8 and the length of rod is 8 as well so we have the following matrix: (The Fs mean that we still need to fill these spots):
 
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
int rodMaxProfit(vector<int> lengthArr, vector<int> prices,int L, int N){
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
    int ans = rodMaxProfit(length, prices, 8, n);
    cout << "ans: " << ans << endl;
    return 0;
}
```

### Coin Change: Number of ways
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

Here we see that we've got the option to pick 1 or not pick 1. Then we've go the option to pick 2 or not pick 2. Then we've got the option to pick 3 or not pick 3 and so on. See the problem here? So it is clear that this is a knapsack type of problem.

Now, which knapsack do we use? 0-1 or unbounded? Well, in the options we listed above are we picking the same item more than once? Yes! we can pick all 1s (multiple occurrences of the same input), or we can pick 2 2s (multiple occurrences here again!) and so on, so we'll use unbounded knapsack! 

Let's look at the recursive approach:

### Coin number of ways recursive
Function signature:

```cpp
//Vals - with actual denominations
//target - sum we want to get to
// n - to keep track of current denomination we're on
int waysToMakeChange(vector<int>& vals, int target, int n){}
```

Let's start with the base case: this occurs when either the sum we want is 0 or when we have no more coins. If the sum we want is 0 (ie target = 0), then there's only 1 way to get to 0 which is by choosing nothing! If we have no coins, then no matter what the denomination is, we won't be able to get to it so the number of ways is 0:

```cpp
int waysToMakeChange(vector<int>& vals, int target, int n){
    if (target == 0)
        return 1;
    if (n == 0)
        return 0;
```

Now we'll handle the recursive cases:
(1) The coin we're on right now is <= target remaining:
    (a) We can choose the current coin
    (b) We can ignore the current coin
(2) The coin we're on right now is > target remaining: only choice is to ignore it.

### 1(a) Choose current coin

If we choose the current coin, we decrement the `target` BUT not `n`:
```cpp
int waysToMakeChange(vector<int>& vals, int target, int n){
    if (target == 0)
        return 1;
    if (n == 0)
        return 0;
    if (vals[n-1] <= target){
        int choose = waysToMakeChange(vals, target - vals[n-1], n);
```

### 1(b) Ignore current coin

```cpp
int waysToMakeChange(vector<int>& vals, int target, int n){
    if (target == 0)
        return 1;
    if (n == 0)
        return 0;
    if (vals[n-1] <= target){
        int choose = waysToMakeChange(vals, target - vals[n-1], n);
        int ignore = waysToMakeChange(vals, target, n-1);
```

### The coin we're on right now is > target remaining: only choice is to ignore it
```cpp
int waysToMakeChange(vector<int>& vals, int target, int n){
    if (target == 0)
        return 1;
    if (n == 0)
        return 0;
    if (vals[n-1] <= target){
        int choose = waysToMakeChange(vals, target - vals[n-1], n);
        int ignore = waysToMakeChange(vals, target, n-1);
        return choose + ignore;
    }
    
    return  waysToMakeChange(vals, target, n-1);
}
```
And that's it! Now, let's use bottom up approach to improve our running time:

### Coin number of ways bottom up

Once you have the recursive solution, it is quite simple to get the bottom up solution. All we need to do is replace the recursive calls with the process of looking up values from a 2D vector. We then setup 2 nested loops where outer loop runs till `n` and inner loop runs till `target`.

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

### Min num of coins recursive

Let's start with the function signature: 

```cpp
//vals: denominations array
//target: value we're trying to get to
//n: to iterate over the array
int minWays(vector<int>& vals, int target, int n){}
```

### Base case:
This occurs when the target is 0 or when we're out of coins. When the target is 0, there're 0 min number of ways to get to target! When `n` is 0, there's no way we can get to target so the number of ways are infinite:

```cpp
int minWays(vector<int>& vals, int target, int n){
    if (target == 0)
        return 0;
    if (n == 0)
        return numeric_limits<int>::max();
```

### Recursive case:
(1) The coin we're on right now is <= target remaining:
    (a) We can choose the current coin and add 1 to the total. That is because we've picked current coin so our num of coins goes up by 1
    (b) We can ignore the current coin
(2) The coin we're on right now is > target remaining: only choice is to ignore it.

### 1a: We can choose the current coin and add 1 to the total
```cpp
int minCoins(vector<int>& vals, int target, int n){
    if (target == 0)
        return 0;
    if (n == 0)
        return numeric_limits<int>::max();
    
    if (vals[n-1] <= target){
        int choose = 1 + minCoins(vals, target - vals[n-1], n);
```

### 1b: We can ignore the current coin

```cpp
int minCoins(vector<int>& vals, int target, int n){
    if (target == 0)
        return 0;
    if (n == 0)
        return numeric_limits<int>::max();
    
    if (vals[n-1] <= target){
        int choose = 1 + minCoins(vals, target - vals[n-1], n);
        int ignore = minCoins(vals, target, n-1);
    }
```

Finally we'll return the minimum of choosing or ignoring:

```cpp
int minCoins(vector<int>& vals, int target, int n){
    if (target == 0)
        return 0;
    if (n == 0)
        return numeric_limits<int>::max();
    
    if (vals[n-1] <= target){
        int choose = 1 + minCoins(vals, target - vals[n-1], n);
        int ignore = minCoins(vals, target, n-1);
        return min(choose,ignore);
    }
```

### 2: The coin we're on right now is > target remaining: only choice is to ignore it

```cpp
int minCoins(vector<int>& vals, int target, int n){
    if (target == 0)
        return 0;
    if (n == 0)
        return numeric_limits<int>::max();
    
    if (vals[n-1] <= target){
        int choose = 1 + minCoins(vals, target - vals[n-1], n);
        int ignore = minCoins(vals, target, n-1);
        return min(choose,ignore);
    }
    
    return minCoins(vals, target, n-1);   
}
```

Let's look at bottom up approach now:

### Min num of coins bottom up
Similar to other problems, it is quite easy to convert recursive solution to bottom up:

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