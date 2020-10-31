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

1. [All Anagrams](#all-anagrams)
2. [Group Anagrams](#group-anagrams)
3. [Word Break](#word-break)
4. [Number of Good Ways to Split a String](#number-of-good-ways-to-split-a-string)

### All Anagrams
[All anagrams](https://leetcode.com/problems/find-all-anagrams-in-a-string/)
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

### Group Anagrams
[Group Anagrams](https://leetcode.com/problems/group-anagrams/)

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

### Word Break

[Word Break](https://leetcode.com/problems/word-break/)

**Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.**

Example:

```cpp
Input: s = "leetcode", wordDict = ["leet", "code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".

Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false
```

This is quite an interesting problem! Let's see how we can tackle it. Say we're using the 2nd example:

```cpp
Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false
```

So, for our input string, `catsanddog`, we want to see if there's a substring that is found in the word dict. The idea is to note that yes we can make `cat` and `sand` but not `og` from the dict no matter how we break the string. We could've also broken the string by seeing that we can make `cats` and `and` but again are left with `og`. 
 
 At the end of our algorithm, we'll return true if the last substring can also be formed from the dictionary, if not, we'll return false. To keep track of whether it's possible to break the string or not, we'll use an aux array, called `breakable` where each index will determine whether the word ending at that index is breakable or not. If we get to an index that is indeed breakable, we'll check the dictionary to see if we can find another word from it that would allow us to break our string further. 

The size of this aux array will be 1 + size of `s`. That's because our 0th index will always be true since an empty string is always breakable! 

```cpp
Initially, aux array is all false, except aux[0]
            _   c   a   t   s   a   n   d   o   g
aux arr:    1   0   0   0   0   0   0   0   0   0
``` 

Now, we'll start at index 1 of aux array and check whether the prev index is true. This will always be the case since we've set aux[0] to true. Now, since the word ending at one prev index IS breakable (represented by 1 in aux array), we'll see if we can break the current word by comparing it one by one against the elements in the dict.

To make the comparison, we'll pull a word from the dict, get its length and compare it against the same number of characters in the string:

```cpp
curr dict word: cats
                _____________
            _   c   a   t   s   a   n   d   o   g
aux arr:    1   0   0   0   0   0   0   0   0   0
                            |
                        end position

dict word == substr()
Put 1 at end position
``` 

Since the words match, our updated aux array will look like this:

```cpp
curr dict word: cats
                _____________
            _   c   a   t   s   a   n   d   o   g
aux arr:    1   0   0   0   1   0   0   0   0   0
                            |
                        end position

dict word == substr()
Put 1 at end position
``` 

Next, we continue looping until we are at an index where we found that the word was breakable:

```cpp
                               curr 
                                |
            _   c   a   t   s   a   n   d   o   g
aux arr:    1   0   0   0   1   0   0   0   0   0
```

Now, we'll again iterate over the word dict to see if any of the words match:

```cpp
curr dict word: and
                                _________
            _   c   a   t   s   a   n   d   o   g
aux arr:    1   0   0   0   1   0   0   1   0   0

dict word == substr()
Put 1 at end position
``` 

Finally, in the final iteration we find that there's no `og` in the dictionary. So, at the end we return `breakable[s.length()]`. 

Here's the code for this logic:

```cpp{numberLines: true}
bool wordBreak(string s, vector<string>& wordDict) {
    vector<bool> breakable (s.length()+1, false);
    breakable[0] = true;
    for(int i = 1; i < breakable.size(); i++){
        if (breakable[i-1]){
            for (auto word : wordDict){
                string currWord = s.substr(i-1,word.length());
                if (currWord == word){
                    breakable[i-1+word.length()] = true;
                }
            }
        }
    }
    return breakable[s.length()];
}
```

One quick note: we don't break out of the `if` on line 8 as soon as we get a match because maybe the first word does match but if we go with that first we don't get all the way to the end.

Running time:
- Iterate over the array: $O(S)$ size of the input string
- Iterate over wordDict: $O(D)$ size of dict

Running time: $O(SD)$ 

### Number of Good Ways to Split a String

**You are given a string s, a split is called good if you can split s into 2 non-empty strings p and q where its concatenation is equal to s and the number of distinct letters in p and q are the same. Return the number of good splits you can make in s.**

Example:
```cpp
Input: s = "aacaba"
Output: 2
Explanation: There are 5 ways to split "aacaba" and 2 of them are good. 
("a", "acaba") Left string and right string contains 1 and 3 different letters respectively.
("aa", "caba") Left string and right string contains 1 and 3 different letters respectively.
("aac", "aba") Left string and right string contains 2 and 2 different letters respectively (good split).
("aaca", "ba") Left string and right string contains 2 and 2 different letters respectively (good split).
("aacab", "a") Left string and right string contains 3 and 1 different letters respectively.
```

Ok, so the brute force approach that comes to mind is this: 
(1) Start with breaking down the string into left and right. Initially, left has s[0] and right has s[1:end]. 
(2) Now, iterate over the characters in left and right and count the number of unique characters. Match the count between left and right. If equal, increment answer counter. 
(3) Go back to step (1)

This approach is quite inefficient:  
- Building a string on each iteration takes $O(N)$ time.
- Iterating over each substring again to count unique characters takes $O(N)$ time. 
- To store the characters seen so far (to determine whether it's the first time we're seeing it or not) requires use of a set. Takes $O(N)$ space. 

We can improve this approach by observing that we don't need to recreate the left and right strings on each iteration. We can simply pick leftmost character in right and place in left string. Now we need to figure out how to keep track of unique characters efficiently. To do so, we'll use a map. We'll decrement the count of leftmost character in right substring from right map and add it to left map. Then all that's left is to compare the two maps' size and if they're equal, we have found a good split. 

Let's step through the above example again BUT this time with the leftMap and rightMap:

```cpp
Input: s = "aacaba"
Output: 2
("a", "acaba") Left string and right string contains 1 and 3 different letters respectively.
leftMap: a: 1
rightMap: a: 3, b: 1, c:1
leftMap.size() != rightMap.size()

("aa", "caba") Left string and right string contains 1 and 3 different letters respectively.
leftMap: a: 2
rightMap: a: 2, b: 1, c:1
leftMap.size() != rightMap.size()


("aac", "aba") Left string and right string contains 2 and 2 different letters respectively (good split).
leftMap: a: 2, c: 1
rightMap: a: 2, b: 1
leftMap.size() == rightMap.size()

("aaca", "ba") Left string and right string contains 2 and 2 different letters respectively (good split).
leftMap: a: 3, c: 1
rightMap: a: 1, b: 1
leftMap.size() == rightMap.size()

("aacab", "a") Left string and right string contains 3 and 1 different letters respectively.
leftMap: a: 3, b:1, c: 1
rightMap: a: 1
leftMap.size() != rightMap.size()
```

Here's this logic converted to code:

```cpp
int numSplits(string s) {
    int ans = 0;
    unordered_map<char,int> leftMap, rightMap;
    
    leftMap[s[0]] = 1;
    for (int i = 1; i < int(s.size()); i++){
        if (rightMap.find(s[i]) == rightMap.end())
            rightMap[s[i]] = 1;
        else
            rightMap[s[i]] += 1;
    }
    
    if (rightMap.size() == leftMap.size())
        ans++;
    
    for (int i = 1; i < int(s.size()); i++){
        char currChar = s[i];
        rightMap[currChar] -= 1;
        if (rightMap[currChar] == 0)
            rightMap.erase(rightMap.find(currChar));
        if (leftMap.find(currChar) == leftMap.end())
            leftMap[currChar] = 1;
        else
            leftMap[currChar] += 1;
        
        if (rightMap.size() == leftMap.size())
            ans++;
        
    }
    return ans;
}
```

Running time: 
- Create left map: $O(N)$ and right map: $O(N)$
- Iterate over string: $O(N)$
- Space for maps: $O(N)$ 


