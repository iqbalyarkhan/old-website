---
title: Knuth Morris Pratt Algorithm
date: 2020-04-05
thumbnail: /post-images/kmp.png
draft: false
extract: An analysis of KMP substring search algorithm
categories: 
    - Strings
tags:
  - Data Structures
---

### Table of Contents

1. [Introduction](#introduction)

2. [Logic](#logic)

3. [Finding Substring in text](#finding-substring-in-text)

4. [Rolling hash](#rolling-hash)

5. [Code](#code)



### Introduction

We've looked at why the [brute force algorithm](/substring-search) doesn't work. Let's talk about an algorithm that provides a substantial improvement over the naive approach: the KMP algorithm.

### Logic

The idea behind KMP is simple: every time there's a mismatch, there's no need to go all the way back to the next iteration in for loop. If you've matched a part of the substring, take advantage of that partial match and start at a later index. This way, we don't have to iterate over each and every non-matching character.

Let's start with the pattern we're searching for. Let's say this is the pattern:

```css
abababca
``` 

In order for us to take advantage of partial matches, we need something to help us know how many characters we've matched and where we should start searching again. To do so, we'll create an prefix/suffix array. The array, as you suspected, would be of the same length as the pattern. So, in our case here's the array (indices at the top and actual entries on the bottom):

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| -- | -- | -- | -- | -- | -- | -- | -- |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| a | b | a | b | a | b | c | a |
How do we go about filling in this array? To do so, we need to understand what a **proper prefix** and a **proper suffix** is:

Say you have a string `renner`. Its prefixes and suffixes are:

```css
prefix: r,re,ren,renn,renne (chop off the last character)
suffix: enner,nner,ner,er,r (chop off the first character)
```

Now, at a particular cell, we're only interested in the substring up till that point. So, if we're currently at index 3, we're only interested in finding the prefix and suffix of the substring formed up till that point. It only logical to do so since we haven't seen the remaining string. 

Ok, so if we're at index 3, our substring is: `abab`. Its prefixes and suffixes are:

```css
prefix: a,ab,aba
suffix: bab,ab,b
```

Now, what goes at index 3? The **length** of the longest string that is present in both prefix and suffix. Let's see what's present in both prefix and suffix: `ab`. What is the length of `ab`? 2. So at index 3, we'll have 2. It doesn't matter if we had more matches, we're only interested in the length of the longest substring. That is because the longest substring would capture the smaller ones in it. A completely filled prefix array would look like this for our pattern:

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| -- | -- | -- | -- | -- | -- | -- | -- |
| 0 | 0 | 1 | 2 | 3 | 4 | 0 | 1 |
| a | b | a | b | a | b | c | a |


How do we code this array building process?

We'll have 2 pointers, one that goes faster and looks at new characters while a slower pointer that would check if the two characters are the same.

```cpp{numberLines: true}
//the pattern string
string pat = "abababca"

//The array we'll be populating
vector<int> arr(m,-1);

//A single character has no matches
arr[0] = 0; 

//j is what we'll populate the vector with
//it will also serve as the slow pointer
int pre = 0;

//m is the length of pattern
for (int i = 1; i < m; i++){
    if (pat[i] == pat[pre]{
        pre++;
    } else{
        pre = 0;
    }

    arr[i] = pre;
}
```

Let's step through the for loop and see it populate our array:

```cpp
for (int i = 1; i < m; i++){
    if (pat[i] == pat[pre]{
        pre++;
    } else{
        pre = 0;
    }

    arr[i] = pre;
}
```

When pre = 0 and i = 1, pat[pre] and pat[i] are not the same, so we assign 0 to pre and place pre's value at index i

```css
pre = 0;
i = 1;
pat[i] != pat[pre]
```

| 0 -> pre | 1 -> i | 2 | 3 | 4 | 5 | 6 | 7 |
| -- | -- | -- | -- | -- | -- | -- | -- |
| 0 | 0 | -1 | -1 | -1 | -1 | -1 | -1 |
| a | b | a | b | a | b | c | a |


Now i increments to 2. So, pre = 0 and i = 2, pat[pre] and pat[i] are the same now, so we increment pre to 1 and place pre's value at arr[i]:

```css
pre = 0;
i = 1;
pat[i] != pat[pre]
```

 
| 0 -> pre | 1 | 2 -> i | 3 | 4 | 5 | 6 | 7 |
| -- | -- | -- | -- | -- | -- | -- | -- |
| 0 | 0 | 1 | -1 | -1 | -1 | -1 | -1 |
| a | b | a | b | a | b | c | a |


Now i increments to 3. So, pre = 1 and i = 3, pat[pre] and pat[i] are the same now, so we increment pre to 2 and place pre's value at arr[i]:

```css
pre = 0;
i = 1;
pat[i] != pat[pre]
```

 
| 0 -> pre | 1 | 2 | 3 -> i | 4 | 5 | 6 | 7 |
| -- | -- | -- | -- | -- | -- | -- | -- |
| 0 | 0 | 1 | 2 | -1 | -1 | -1 | -1 |
| a | b | a | b | a | b | c | a |


This process continues until we have stepped through the entire array. The time it takes to build this array is $O(M)$ where $M$ is the length of the pattern. 