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
    * [Compute spread sheet column encoding](#spread-sheet-column-encoding)
    * [Check Palindromicity](#check-palindromicity)
    * [Reverse words in a string](#reverse-words-in-a-string)

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