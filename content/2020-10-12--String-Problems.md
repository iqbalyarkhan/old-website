---
title: String Problems
date: 2020-10-12
thumbnail: /post-images/string_problems.png
draft: false
extract: A look at some interesting string problems
categories: 
    - DS&A
tags:
  - Data Structures
---

- [All Anagrams](#all-anagrams)
- [Group Anagrams](#group-anagrams)
- [Word Break](#word-break)
- [Number of Good Ways to Split a String](#number-of-good-ways-to-split-a-string)
- [Generate all valid parens](#generate-all-valid-parens)
- [Is Palindrome](#is-palindrome)
- [String to int without libraries](#string-to-int-without-libraries)
- [Int to string without libraries](#int-to-string-without-libraries)
- [Change base of string](#change-base-of-string)
- [Spread Sheet column encoding](#spread-sheet-column-encoding)
- [Check Palindromicity](#check-palindromicity)
- [Reverse words in a string](#reverse-words-in-a-string)

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

### Generate all valid parens
**Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.**

```cpp
Input: n = 1
Output: ["()"]

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
```

The most obvious solution is to use recursion: ie start with an open parenthesis and keep going until you've hit the base case. At the base case, check to see if the formed string is valid. If so, push to answer vector, if not, ignore. This would take exponential time! Here's the tree for the case where n = 2. Left branch will pick opening parenthesis and right branch will pick closing:

```cpp
            (
         /     \ 
       ((       ()  
    /     \   /     \
   (((   (() ()(    ())
  
Finally: ((((   ((()   (()(   (())   ()((   ()()    ())(   ()))
```

The tree above shows ALL POSSIBLE combinations! It is very easy to determine where we can improve the running time. To do so, we'll set up some obvious rules so that we don't have to go down a path that'll yield an invalid combination. Let's start with `n` where `n` is the number of parens. Let's say again, that our `n` is 2. This means, we can have 2 open and 2 close braces denoted in the diagram below by (open,close). Next to the count, we have the string we've generated so far. We start with 2,2 and an empty string:

```cpp

                    2,2 ""

```

Each time we pick a type of paren, we'll decrement the remaining count. Again, left branch is pick open, right branch is pick close:

```cpp

                    2,2 ""
                  /       \     
            1,2 "("       2,1 ")"  
```

Straight away we can tell that no matter what we do with the remaining characters, the right branch will ALWAYS yield an invalid combo. Therefore, we can conclude that if:
- Open == close: ALWAYS CHOOSE OPEN. 

With that rule in mind, we edit our diagram to this:

```cpp

                    2,2 ""
                  /       \     
            1,2 "("        X
           /      \
       0,2 "(("    1,1 "()"
```

Next, we see we can have valid combos from both branches. One more observation we can make is that if:

- open == 0, append remaining close to the string and return. You're GUARANTEED to have a valid string. Therefore, in our left most branch we see open = 0 and closed = 2 so we append 2 closed to the string so far and get: `(())` which is a valid combo. At this point, we're done with that branch.

 
```cpp

                    2,2 ""
                  /       \     
            1,2 "("        X
           /      \
       0,2 "(("    1,1 "()"
       /                \
append close            FOLLOW RULE 1
and return 
```

As for the right branch we notice open == close which takes us back to rule 1: always choose open:

```cpp

                    2,2 ""
                  /       \     
            1,2 "("        X
           /      \
       0,2 "(("    1,1 "()"
       /                \
append close            0,1 "()(" FOLLOW RULE 1
and return 
```

Now, as you can see above, we have 0 open. Follow rule 2 to append ALL remaining close and return:


```cpp

                    2,2 ""
                  /       \     
            1,2 "("        X
           /      \
       0,2 "(("    1,1 "()"
       /                \
append close            0,1 "()(" FOLLOW RULE 1
and return                  \
                            append close 
                            and return: "()()" 
```

And we're done! Here's this logic converted to code:


```cpp
    void addAllClosing(int close, string soFar, vector<string>& ans){
        while (close != 0){
            soFar += ')';
            close--;
        }
        ans.push_back(soFar);
    }

    void createParens(int open, int close, string soFar, vector<string>& ans){
        if (open == 0){
            addAllClosing(close, soFar, ans);
            return;
        }

        createParens(open-1, close, soFar + '(', ans);
        if (open != close)
            createParens(open, close - 1, soFar + ')', ans);

    }

    vector<string> generateParenthesis(int n) {
        vector<string> ans;
        createParens(n, n, "", ans);
        return ans;
    }
```

### Is Palindrome

**Check if a string is a palindrome**

Quite a simple solution: Have two pointers: one at position 0 and the other at last position of the string. Then, keep checking if string[i] == string[j]. If so, increment i and decrement j. If not return false. Also, make sure to handle strings that are even length and those that are odd:

```cpp
bool isPalindrome(string A){
    int i = 0;
    int j = int(A.size()) - 1;
//If odd length, we can ignore the middle character
    for (; i < j; i++,j--){
        if (! (A[i] == A[j]))
            return false;
    }
    return true;
}
```
Even though we look at $O(N/2)$ elements, the time complexity is $O(N)$. Space complexity is $O(1)$

### String to int without libraries

**Given a string, return its integer representation. Also, be able to handle negative inputs** Example: "-214" -> -214 

```cpp
int ConvertStringToInt(string s){
    bool isNegative = false;
    int tot = 0;
    for (int i = 0; i < s.size(); i++){
        if (s[i] == '-')
            isNegative = true;
        else {
            tot = (tot*10) + (s[i] - '0');
        }
    }
    
    if (isNegative)
        tot *= -1;
    return tot;
}
```

The idea is simple: take the current character, subtract from it `'0'` which would convert the difference to an integer. That is because `'1' - '0'` is equal to `1`.  Next, multiply the running total by 10 and add the current value to this running total. Then return the total multiplied by negative 1 if the first character read was `-`.


### Int to string without libraries
**Given an int, return its string representation. Also, be able to handle negative inputs** Example: -214 -> "-214"

```cpp
string ConvertIntToString(int i){
    string ans = "";
    bool isNegative = false;
    if (i < 0){
        isNegative = true;
        i *= (-1);
    }
    
    do {
        ans += '0' + (i % 10);
        i = i/10;
    } while (i);
    
    if (isNegative){
        ans += '-';
    }
    
    string finalAns = "";
    int size = int(ans.size()) - 1;
    for (int i = size; i >= 0; i--){
        finalAns += ans[i];
    }
    
    return finalAns;
}
```

In this method, we first determine whether the element is negative or not. If so, we convert it to positive and then start converting it to a string. The string we create starts at the LSB so our string would be reversed. So, we start again at the end of the generated string and reverse the reversed string to get our answer.  

Notice, this part:

```cpp
ans += `0` + (i % 10) 
```

This helps convert the integer, i % 10, to string by converting it to its ascii value and adding it to the string.
Going either way (from string to int or int to string) you'd need to do this:
- From int to string: 

```cpp
string ans = "";
int a = 7;
ans += '0' + a //ans = "7" 
```

- From string to int:

```cpp
int ans = 0;
string a = "7";
ans += a - '0';
```

That is because in the ascii tabe, `0` = 48, `1` = 49 and so on. So if you do character 9 minus character 0, you get an integer 9 (string to int). We are subtracting 48 from 57 and saving it to an integer which obviously would be an integer.

Also, if you do character 0 plus int 7, you get string 7 (int to string). We are adding 8 to the ascii value of `0` which takes us 55 and save it to a string, we get the string 7. 

### Change base of string

**Given a string s and the base that string is in (called b1), convert the string to its string representation in base b2.**

First, convert from base b1 to base 10. Say, you have s as `615` and `b1` as 7. Then, to convert this to base 10 you'd do this:

```cpp

(5 * 7^0) + (1 * 7^1) + (6 * 7^2) = 306 base 10 

```

Next, you then convert 306 to base b2 by dividing and appending the remainder to a string. Then, return the reversed string as your final answer.

```cpp
string conversion(string s, int b1, int b2){
    //Convert from b1 to base 10:
    int size = int(s.size()) - 1;
    int power = pow(b1,0);
    int tot = 0;
    for (int i = size; i >= 0; i--){
        int curr = s[i] - '0';
        curr *= power;
        tot += curr;
        power *= b1;
    }
    
    //So tot now contains s in base 10
    //Now need to convert from base 10 to base b2.
    string revAns = "";
    do{
        int rem = tot % b2;
        if (rem >= 10){
            //converting those greater than 9 to A through F
            //say rem is 11, then it should be B. A = 65
            revAns += 65 + 10 - rem;
        } else {
            revAns += '0' + rem;
        }
        tot /= b2;
    }while (tot);
    
    string finalAns = "";
    for (int i = int(revAns.size()) - 1; i >= 0; i--){
        finalAns += revAns[i];
    }
    return finalAns;
}
```

### Spread Sheet column encoding

**Implement a function that converts a spreadsheet column id to the corresponding integer, with "A" corresponding to 1. For example, you should return 4 for "D", 27 for "AA", 702 for "ZZ", etc. How would you test your code?** 

The idea is to take an example: AA = 27. How do I get a 27 from AA? Well, there are total of 26 alphabets so cell with value A is 1, B is 2, C is 3 and so on until Z = 26. Now when you reach Z and get to AA, you realize that this can be represented like so:

```cpp
    1*26^0
A   A
1*26^1
```

and BD can be represented by:

```cpp
    4*26^0
B   D
2*26^1
```

and so on. How do we convert a `B` to the value of integer `2`?

```cpp
int charAsInt = 'B' - 'A' + 1
```

which takes the ASCII value of B, subtracts the ascii value of A from it and adds 1. The add 1 is because we've decided A is 1. Then the conversion becomes simple:

```cpp
long encoding(string s){
    long power = pow(26,0);
    long ans = 0;
    for (int i = int(s.size()) - 1; i >= 0; i--){
        long curr = s[i] - 'A' + 1;
        ans += (curr * power);
        power *= 26;
    }
    
    return ans;
}
```


### Check Palindromicity

**For the purpose of this problem, define a palindromic string to be a string which when all the nonalphanumeric are removed it reads the same front to back ignoring case. For example, "A man, a plan, a canal, Panama." and "Able was I, ere I saw Elba!" are palindromic, but "Ray a Ray" is not.
  Implement a function which takes as input a string s and returns true if s is a palindromic string.**

```cpp
bool isPalindrome(string s) {
    int i = 0;
    int j = int(s.size()) - 1;
    while (i < j){
        char iChar = s[i];
        char jChar = s[j];
        if (!isalpha(iChar)){
            while (!isalpha(iChar)){
                i++;
                iChar = s[i];
            }
        }
        if (!isalpha(jChar)){
            while (!isalpha(jChar)){
                j--;
                jChar = s[j];
            }
        }
        iChar = tolower(iChar);
        jChar = tolower(jChar);
        if(iChar != jChar)
            return false;
        i++;
        j--;
    }
    
    return true;
}
```

New stuff in this solution: 

```cpp
char c = '.';
isalpha(c); //Checks if character is an alphabet
char a = 'A';
a = tolower(a); //Converts char to lower case and this results needs to be saved to a variable
```

### Reverse words in a string

**Given a string containing a set of words separated by whitespace, we would like to transform it to a string in which the words appear in the reverse order. For example, "Alice likes Bob" transforms to "Bob likes Alice". We do not need to keep the original string.
  Implement a function for reversing the words in a string s.**
  
 ```cpp
string reverseAllWords(string s){
    reverse(s.begin(), s.end());
    string ans = "";
    for (int i = 0; i < int(s.size()) - 1 ; i++){
        string curr = "";
        while (s[i] != ' ' && i < int(s.size())){
            curr += s[i];
            i++;
        }
        
        for (int j = int(curr.size()) - 1; j >= 0; j--){
            ans += curr[j];
        }
        if (i < int(s.size()))
            ans += ' ';
    }
    
    return ans;
}
```

Notice the use of the `reverse` call (present in the algorithm header) that allows us to reverse the string in place. We can do it manually as well but why not use the library!! 
