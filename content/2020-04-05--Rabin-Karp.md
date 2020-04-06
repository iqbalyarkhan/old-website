---
title: Rabin Karp Algorithm
date: 2020-04-05
thumbnail: /post-images/kmp.png
draft: false
extract: An analysis of Rabin Karp substring search algorithm
categories: 
    - Strings
tags:
  - Data Structures
---

### Table of Contents

1. [Introduction](#introduction)

2. [Logic](#logic)

3. [Conclusion](#conclusion)


### Introduction

We've looked at why the [brute force algorithm](/substring-search) doesn't work. Let's talk about an algorithm that provides a substantial improvement over the naive approach: the Rabin-Karp algorithm.

### Logic

The idea behind Rabin Karp is simple: take the hash value of the pattern you're looking for. Let's say we're searching for the pattern `hello` in the text `fromthehellootherside`. We'll first call a hash function to calculate the hash value of our string `hello`. Say this comes to 237. Next, here's what we do:

Start at index 0 and grab number of characters that equal the pattern's length. In our case, length of pattern equals 5, so we'll grab `fromt` from the text. We'll then call the hash function on this substring and see if the hash value returned is equal to the hash value of the pattern. If so, we've found a match and we can return the index of the matched character. If not, we continue with the next substring:
 
```css
f r o m t h e h e l l o o t h e r s i d e 
--------- Hash value 345 : not a match

f r o m t h e h e l l o o t h e r s i d e 
  --------- Hash value 235 : not a match

f r o m t h e h e l l o o t h e r s i d e 
    --------- Hash value 971 : not a match

f r o m t h e h e l l o o t h e r s i d e 
      --------- Hash value 829 : not a match

f r o m t h e h e l l o o t h e r s i d e 
        --------- Hash value 157 : not a match

f r o m t h e h e l l o o t h e r s i d e 
          --------- Hash value 230 : not a match

f r o m t h e h e l l o o t h e r s i d e 
            --------- Hash value 910 : not a match

f r o m t h e h e l l o o t h e r s i d e 
              --------- Hash value 237 : WE HAVE A MATCH!

``` 
