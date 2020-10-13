---
title: String Problems
date: 2020-10-12
thumbnail: /post-images/string_problems.png
draft: false
extract: A look at some interesting string problems
categories: 
    - Strings
tags:
  - Data Structures
---

- [All anagrams](https://leetcode.com/problems/find-all-anagrams-in-a-string/)

**Given a string s and a non-empty string p, find all the start indices of p's anagrams in s. Strings consists of lowercase English letters only and the length of both strings s and p will not be larger than 20,100. The order of output does not matter.**

Example:

```cpp
Input:
s: "cbaebabacd" p: "abc"

Output:
[0, 6]
```

A naive approach would be to somehow keep track of number of characters in the pattern and start iterating over the text. On each iteration, keep a "window" size equal to the length of the pattern. Next, check to see if the frequency of characters in the text equal that of pattern. If so, store the starting index of this window in our answer vector.

A better approach would be to realize that an anagram is nothing but a rearrangement of characters in a string so the only requirement for 2 strings to be an anagram is that they both must have the same number and frequency of characters:

Example:
```cpp
"abc" and "cba" are anagarams
"abc" and "abd" are not
```

So, what we can do is this:

```cpp
pattern: a   b   c
make an unordered_map using the pattern

text: c   b   a   e   b   a   b   a   c   d
check the first 3 characters and make an unordered_map from these first 3 chars.

compare the map with that of the pattern using the == operator
If they're the same, store the index in answer vector  

To move along the text string, decrement count of previous character from map
and add new character to map. If previous character count decreases to 0, remove
it from the map.
```

This approach takes $O(N)$ time. Here's this logic converted to code:

```cpp
    vector<int> findAnagrams(string s, string p) {
        vector<int> ans;
        if (s.length() == 0 || p.length() == 0)
            return ans;

        unordered_map<char, int> txtMap, patMap;
        for (int i = 0; i < p.length(); i++){
            txtMap[s[i]] += 1;
            patMap[p[i]] += 1;
        }

        if (patMap == txtMap)
            ans.push_back(0);

        for (int i = 1, j = int(p.length()); j < s.length(); i++,j++){
            //Decrement removed char from map
            txtMap[s[i-1]] -= 1;
            //If count went down to 0,
            //erase from map
            if (txtMap[s[i-1]] == 0)
                txtMap.erase(s[i-1]);
            txtMap[s[j]] += 1;
            if (txtMap == patMap)
                ans.push_back(i);
        }
        return ans;
    }
```

- [Group Anagrams](https://leetcode.com/problems/group-anagrams/)

**Given an array of strings strs, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.**

Example:

```cpp
Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
```

Naive approach is to start with the first string in the input, `eat` and get the frequency of all characters in it. Push this string to a new vector and iterate over remaining input strings to see if any other strings have the same character count. If so, add this new string to the vector. Repeat until done with all strings. This approach takes $O(N)$ time to calculate character count for a single string and then iterate over all other strings. This comes out to exponential running time. 

Better approach is again to eliminate the need to repeatedly iterate over all the strings. To do so, we need a hash function that'll return a particular string for each anagram. The best hash function for the job would be one that returns the string in sorted order. For example, if we pass `eat` and `tea` to our hash function, we'll get back `aet`. Next, we'll store this sorted string as a key in our hash table and for the value we'll have each string that gets returned from the hash function. For example, given, `eat`, `tea` and `nat`, our hash table would look like this:

```cpp
aet -> {eat, tea}
ant -> {nat}
```

Once we have this hash table constructed, all we need to do is grab the values and return our vector of vectors. 

```cpp
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        vector<vector<string>> ans;
        unordered_map<string, vector<string>> hashMap;
        for (int i = 0; i < strs.size(); i++){
            string curr = strs[i];
            string temp = curr;
            sort(curr.begin(), curr.end());
            hashMap[curr].push_back(temp);
        }

        for (auto vec : hashMap)
            ans.push_back(vec.second);

        return ans;
    }
``` 


