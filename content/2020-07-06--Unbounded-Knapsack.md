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

In unbounded scenario, until and unless I COMPLETELY reject an item, I won't count it as processed. For example, if say I have a blindfold on and pick an item from my unlimited supply and find that the item I picked was lettuce. I'll reject it since I know there's an unlimited supply and I can get my favorite item. This means, I've processed lettuce, made a decision on it that I WILL NOT eat it no matter how many times you put it in front of me. 
