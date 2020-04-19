---
title: Strings Problems
date: 2020-04-18
thumbnail: /post-images/string.png
draft: false
extract: String sample problems
categories: 
    - Problems
tags:
    - String Problems
---

### Table of Contents
1. [Problems](#problems)

    * [Is Palindrome](#is-palindrome)
    * [String to int without libraries](#string-to-int-without-libraries)
    * [Int to string without libraries](#int-to-string-without-libraries)
    * [Change base of string](#change-base-of-string)

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