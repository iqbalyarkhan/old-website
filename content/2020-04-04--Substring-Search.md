---
title: Substring Search
date: 2020-04-04
thumbnail: /post-images/substringsearch.png
draft: false
extract: An analysis of substring search algorithms
categories: 
    - Strings
tags:
  - Data Structures
  - Tries
---

### Table of Contents

1. [Introduction](#introduction)

2. [Brute Force Algorithm](#brute-force-algorithm)

3. [Analysis](#analysis)

4. [Conclusion](#conclusion)


### Introduction
There are plenty of applications where we need to search through strings. We've talked about a data structure called [tries](/tries) that arranges our string in a tree like data structure that allows us to perform various operations on the string. In this post, we'll introduce the problem of substring search and then lay the groundwork for advanced algorithms that operate on strings.

The problem of a substring search is simple: We've got two strings, one called **pattern** (what we're looking for) and one called the **text** (what we're looking in for the pattern). The text is relatively longer than the pattern. For example:

$$$

Pattern: lazy

Text: thequickbrownlazyfoxjumpsoverdog

$$$
  
A CMD + F on a mac does the same thing! Or you can substring search to scrape an html page and extract only the information contained in a particular tag. 

### Brute Force Algorithm

Let's start with a simple naive approach that is the brute force approach that allows us to search for a pattern within a text. The idea behind the brute force approach is this:

- Start at `text[0]`
- As soon as you find `text[index]` to be the same as `pattern[0]`, start comparing the two.
- Keep incrementing `text` and `pattern` counter until either one of the following two occurs:
    - If you reach all the way to the end of `pattern` and no mismatch has occurred, you've found a match
    - If, before reaching end of `pattern` you find a mismatch, continue incrementing `text` pointer
- If no match occurs until the end of `text`, then pattern is not present in the `text`

We'll denote $T$ for text length and $P$ for pattern length 

Here's this logic converted to code:

```cpp
    string pattern = "lazy";
    string text = "thequickbrownlazyfoxjumpsoverdog";
    int index = -1;
    bool found = true;
    for (int i = 0; i < text.size(); i++){
        if (text[i] == pattern[0]){
            index = i;
            int j = 0;
            for (; j < pattern.size(); j++){
                if (text[index] != pattern[j]){
                    found = false;
                    break;
                } else {
                    index++;
                }
            }
            if (found){
                break;
            }
        }
    }
    
    if (found){
        cout << "Found match at index: " << index << endl;
    } else {
        cout << pattern << " not in text " << endl;
    }
```

### Analysis

Let's say we've got this text and pattern:

```
Text:       AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP
Pattern:    AAAAAAAAAAAAAP
```

Notice how the pattern is similar to text except for last character. This is how the comparison would go:

```css

start at text[0]:
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP
AAAAAAAAAAAAAP -> mismatch on last character

move to text[1]:

AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP
 AAAAAAAAAAAAAP -> mismatch on last character

move to text[2]:

AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP
  AAAAAAAAAAAAAP -> mismatch on last character

```

Notice how on each iteration, where the outer for loop goes from $0$ to $T-1$ and in each iteration, we're going through another inner loop that goes from $O$ to $P-1$. Therefore, the overall running time is: 

$$$

(T - 1)(P - 1) = TP

$$$

What if our pattern is 100 characters long and the text a million characters long? This algorithm would take a very long time to finish!

### Conclusion

As noted above, brute force is not the way to go. We'll look at various algorithms that improve upon the brute force solution