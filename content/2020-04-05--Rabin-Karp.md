---
title: Rabin Karp Algorithm
date: 2020-04-05
thumbnail: /post-images/kmp.png
draft: true
extract: An analysis of Rabin Karp substring search algorithm
categories: 
    - DS&A
tags:
  - Data Structures
---

### Table of Contents

1. [Introduction](#introduction)

2. [Logic](#logic)

3. [Finding Substring in text](#finding-substring-in-text)

4. [Rolling hash](#rolling-hash)

5. [Code](#code)

6. [Analysis](#analysis)



### Introduction

We've looked at why the [brute force algorithm](/substring-search) doesn't work. Let's talk about an algorithm that provides a substantial improvement over the naive approach: the Rabin-Karp algorithm. [Credit](https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/) for this post. 

### Logic

The idea behind Rabin Karp is simple: take the hash value of the pattern you're looking for then take a string from within the text that equals the length of the pattern and calculate its hash. If the hash of the extracted string is the same as your pattern, you've got a match. If not, check the next substring from the text.
 
 Let's say we're searching for the pattern `hello` in the text `fromthehellootherside`. We'll first call a hash function to calculate the hash value of our string `hello`. Say this comes to 237. Next, here's what we do:

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

### Finding substring in text

Ok, so in the explanations above we said that we need to construct a substring of length $M$ (where $M$ is the length of the pattern) on each iteration of the text (of length $N$) and then pass that constructed substring to the hash function and see if the returned hash value matches that of the pattern. To construct this substring, we might follow what we did in the brute force algorithm by iterating over the substring. It is clear that this approach of string generation won't work since we'd be stuck with $O(MN)$ running time. We need to be able to find a method to get the substring from text of size $M$ in constant time. To do so, we'll use the **window technique** where we'll keep removing one character from the beginning of our substring and keep adding a new character to the end. Say we're searching for `oot` in the text `hellootherfriendside`:

```cpp
h   e   l   l   o   o   t   h   e   r   f   r   i   e   n   d   s   i   d   e   
---------
```

To move to the next substring, we'll remove `h` and add the `l`:

```cpp
h   e   l   l   o   o   t   h   e   r   f   r   i   e   n   d   s   i   d   e   
    ---------
```

This way, we keep sliding down in constant time.

### Rolling Hash

Ok, so let's talk about hashing. Similar to the **find substring** section, if we are to iterate over each character of the substring we're processing every time we want to calculate its hash value, we're back to the brute force running time. We want to be able to calculate the hash once and then update it in $O(1)$ time every time we move the "window" down by $M$. In short:

**the hash for new substring must be calculated in $O(1)$ time from the current hash value and the next added character** 

This is where the concept of **rolling hash** comes into the picture: it takes in the hash of the previous window and adjusts it accommodate the pushed out character and the newly inserted character.

Here's the formula for this:

$$$
H_{new} = (\textrm{Radix} * (H_{old} - (\textrm{RemovedChar}) * Q) + \textrm{AddedChar}) \% Prime
$$$

- **$H_{new}$** is the hash value of the current window

- **$Radix$** is the number of characters in our alphabet

- **$H_{old}$** is the hash value of the previous window

- **$RemovedChar$** is the character we removed to get to the new window

- **$Q$** is $Radix^{\textrm{PatternLength} - 1}\% Prime$

- **$AddedChar$** is the character we added to get to the new window

- **$Prime$** is the prime number we chose

To better understand why the above formula works, you can also check out [this](https://www.youtube.com/watch?v=BfUejqd07yo) video.

Therefore, to calculate the value for $Q$, we'd use this loop and once we have this value, we'd reuse it in each subsequent hash calculation. This would save us time.

```cpp
for (i = 0; i < M - 1; i++) 
		Q = (Q * Radix) % Prime; 
```

Therefore, we only need to calculate the hash value of the pattern and the first characters of the text that are equal in length to the pattern and then we use the formula above to update the hash in constant time. 

### Code

Here's the code for Rabin Karp:

```cpp{numberLines: true}
#define Radix 256

void search(string txt, string pat)
{
    int M = int(pat.size());
    int N = int(txt.size());
    int i = 0;
    int pHash = 0; // hash value for pattern
    int tHash = 0; // hash value for txt
    int Q = 1; //Q = Radix^{M-1}
    int prime = 997; //Choose a large prime

    // The value of Q would be "pow(d, M-1)%q"
    for (i = 0; i < M - 1; i++)
        Q = (Q * Radix) % prime;

    // Calculate the hash value of pattern and first
    // window of text
    for (i = 0; i < M; i++)
    {
        pHash = (Radix * pHash + pat[i]) % prime;
        tHash = (Radix * tHash + txt[i]) % prime;
    }

    // Slide the pattern over text one by one
    for (i = 0; i <= N - M; i++)
    {

        // Check the hash values of current window of text
        // and pattern. If the hash values match then
        //print index
        if ( pHash == tHash )
        {
            cout<<"Pattern found at index "<< i <<endl;
        }

        // Calculate hash value for next window of text: Remove
        // leading digit, add trailing digit
        if ( i < N-M )
        {
            tHash = (Radix*(tHash - txt[i]*Q) + txt[i+M])%prime;

            // We might get negative value of t, converting it
            // to positive
            if (tHash < 0){
                tHash = (tHash + prime);
            }
        }
    }
}
```

### Analysis

The running time for RK algorithm is $O(M + N)$ but if there are collisions (and you add a check to compare once you have a match for a hash), the running time goes up to $O(MN)$.