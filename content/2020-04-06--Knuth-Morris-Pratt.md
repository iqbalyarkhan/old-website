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

2. [Prefix Array](#prefix-array)

3. [Logic](#logic)

4. [Code](#code)

5. [Analysis](#analysis)

6. [Problems](#problems)



### Introduction

We've looked at why the [brute force algorithm](/substring-search) doesn't work. Let's talk about an algorithm that provides a substantial improvement over the naive approach: the KMP algorithm.

### Prefix Array

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


This process continues until we have stepped through the entire array. Finally, we'll have this array:
 
 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
 | -- | -- | -- | -- | -- | -- | -- | -- |
 | 0 | 0 | 1 | 2 | 3 | 4 | 0 | 1 |
 | a | b | a | b | a | b | c | a |
 
 The time it takes to build this array is $O(M)$ where $M$ is the length of the pattern. 

### Logic

Ok, so we've built our prefix array, now how do we use this? Let's say, this is what we have for our text and pattern:

```css
Text:       dddababcabababcaab
Pattern:            abababca
```

and we've already built this prefix array for ourselves:

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| -- | -- | -- | -- | -- | -- | -- | -- |
| 0 | 0 | 1 | 2 | 3 | 4 | 0 | 1 |
| a | b | a | b | a | b | c | a |

### Logic

What use is the prefix array for matching? **We use the prefix array to determine how far forward we can move the pattern string while comparing against the text when we get a mismatch.** Let's look at our text and pattern and see how this works:

We start with comparing `text[0]` with `pattern[0]` and continue doing so until we reach text[4]. The first 3 indices don't match: no character in `ddd` matches `a`. So, when we get to `text[4]`, things get interesting:

```css
      | 
d d d a b a b c a b a b a b c a a b
      a b a b a b c a

```

at `text[4]` we have a match, moving on, we see that there's a match up till `text[6]` and `text[7]` is a mismatch.


```css
      | | | | x --> a partial match 
d d d a b a b c a b a b a b c a a b
      a b a b a b c a

```

We notice that from our pattern string, we were able to match 4 (let's call this `numMatches`) characters: `a b a b` and the mismatch was on the 5th character. Here's our prefix array again:

| 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| -- | -- | -- | -- | -- | -- | -- | -- |
| 0 | 0 | 1 | 2 | 3 | 4 | 0 | 1 |
| a | b | a | b | a | b | c | a |


So, we go to `prefixArr[numMatches]` and see the value = `3`. We then perform this calculation: 

```cpp
shiftAmount = numMatches - value + 1 //shiftAmount = 2
```
The plus 1 is required so that we move to the correct new position. It is because of this `+ 1` that some implementations begin the `prefixArr` at 1 and have `prefixArr[0] = -1`. Ok, so now we've got our shift amount as 2. So we move the pattern 2 positions down based on where we started getting the matches. Notice how the characters now align. The `ab` match which is why we couldn't move down more:

```css
          | | --> Prevented us from moving down more 
d d d a b a b c a b a b a b c a a b
          a b a b a b c a
```

Anyway, we're now at index 5, and we begin matching again:

```css
          | | x --> Mismatch, we only matched 2 
d d d a b a b c a b a b a b c a a b
          a b a b a b c a
```

Now, we only matched 2 characters: `a b`. So, we go to `prefixArr[2]` and get 1. 2 - 1 + 1 = 2. So we can set our pattern at the position: 5 + 2 = 7:

```css
              | -> new position
d d d a b a b c a b a b a b c a a b
              a b a b a b c a
```

We immediately have a mismatch so we move to the next position:

```css
                | -> new position
d d d a b a b c a b a b a b c a a b
                a b a b a b c a
```

Now, we have a match, let's keep matching:

```css
                | | | | | | | |-> all matched
d d d a b a b c a b a b a b c a a b
                a b a b a b c a
```

Now, we matched 8 so we go to `prefixArr[8]` which doesn't exist! Which means we matched our pattern. In this case, you can keep going to find all possible matches by moving down the length of the pattern. So, we're at position 8 and the pattern is of length 8 so 8 + 8 = 16 which would be our new start position:


```css
                                | -> new start position
d d d a b a b c a b a b a b c a a b
                a b a b a b c a
```

And that is how KMP works!


### Code

```cpp{numberLines: true}
class KMP{
private:
    vector<int> prefixArr;
    void buildPrefixArr(string);
    int patternLength;
    
public:
    vector<int> GetIndex(string,string);
};

vector<int> KMP::GetIndex(string text, string pat){
    patternLength = int(pat.size());
    buildPrefixArr(pat);
    vector<int> ans;
    for (int i = 0; i < int(text.size()); i++){
        //pattern iterator
        int patItr = 0;
        int txtItr = i;
        if (text[i] == pat[patItr]){
            int numMatched = 0;
            while (text[txtItr] == pat[patItr]){
                txtItr++;
                patItr++;
                numMatched++;
            }
            
            if (numMatched == patternLength){
                //We've got a full match!
                ans.push_back(i);
                i += patternLength;
            } else{
                //Partial match, figure out how much to move
                i = numMatched - prefixArr[numMatched] + 1;
            }
        }
    }
    
    return ans;
}

void KMP::buildPrefixArr(string pat){
    prefixArr.resize(patternLength);
    int pre = 0;
    for (int i = 1; i < patternLength; i++){
        if (pat[i] == pat[pre])
            pre++;
        else
            pre = 0;
        prefixArr[i] = pre;
    }
}
```

The code above is exactly the same as the logic we discussed. We create a new `prefixArr` for each new request that we get from the client. And our `GetIndex()` function returns a vector with all the starting indices in the text for each match.

### Analysis

So, we precompute the `prefixArr` for each search. This is simply of length $O(M)$ where $M$ is the length of the pattern. Next, we begin our search that would, in the worst case scenario, would run for $O(N)$ where $N$ is the length of the text. Therefore, the total work that we do is $O(M)$ and then we do $O(N)$ amount of work for a total of $O(M + N)$.


### Problems
- [All anagrams](https://leetcode.com/problems/find-all-anagrams-in-a-string/) 