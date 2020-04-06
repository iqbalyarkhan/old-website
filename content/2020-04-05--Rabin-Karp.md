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

3. [Code](#code)

3. [Hash Function](#hash-function)


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

### Code

```cpp{numberLines: true}
class RK{
public:
    long HashFunction(string key, int m);
    int GetIndex(string,string);
    
};

int RK::GetIndex(string text, string pat){
    long patternHash = HashFunction(pat, int(pat.size()));
    
    //Iterating over text to grab substrings that're equal
    //in length to the pattern string.
    int index = -1;
    for (int i = 0; i < text.size(); i++){
        string curr = string();
        int end = i + int(pat.size());
        if (end <= text.size()){
            int j = i;
            while (j < end){
                curr+= text[j];
                j++;
            }
            long textHash = HashFunction(curr, int(pat.size()));
            if (textHash == patternHash){
                index = i;
                return index;
            }
        }
    }
    
    return index;
}

long RK::HashFunction(string key, int m){
    long h = 1;
    for (int i = 0; i < m; i++){
        char c = key[i];
        int key = int(c);
        h = (26 * h + key) % 997;
    }
    
    return h;
}
```

In the code above, we've got the `GetIndex` function that takes in our text and our pattern. It then iterates calculates the hash value by calling the hash function. It then iterates over the text by taking chunks of substring from the text based off the length of the pattern string. It then continues to search for the instance where the two hash values match 

### Hash Function

We need to efficiently take the hash of our pattern and each substring of the text. To do so, we'll use Horner's method and a modular hash function:

```cpp{numberLines: true}
long RK::HashFunction(string key, int m){
    long h = 1;
    for (int i = 0; i < m; i++){
        char c = key[i];
        int key = int(c);
        h = (26 * h + key) % 997;
    }
    
    return h;
}
```

The function uses a large prime, such as 997 and a value of 26 (number of possible characters) to calculate the hash value.
