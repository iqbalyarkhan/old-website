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

3. [Finding Substring in text](#finding-substring-in-text)

3. [Rolling hash](#rolling-hash)

3. [Code](#code)



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

### Finding substring in text

Ok, so in the explanations above we said that we need to construct a substring of length $M$ (where $M$ is the length of the pattern) on each iteration of the text (of length $N$) and then pass that constructed substring to the hash function and see if the returned hash value matches that of the pattern. To construct this substring, here's some code that we might come up with:

```cpp{numberLines: true}
    int M = pattern.size();
    int N = text.size();
    for (int i = 0; i < N; i++){
        string curr = string();
        int end = i + M;
        if (end <= N){
            //j goes starts at i and looks at next M characters
            int j = i;
            while (j < end){
                //while loop runs for length M
                curr+= text[j];
                j++;
            }
            long textHash = HashFunction(curr, N);
            if (textHash == patternHash){
                cout << "Match found!" << endl;
            }
        }
    }
```

So the outer for loop on line 1 runs until from $[0,N)$. The inner while loop starts at the current `i` value and runs until it is less than `end` where `end = i + M`. So, i runs for `M` iterations. Therefore, we run `M` loops inside `N` loops therefore our runtime is $O(MN)$ which is the same as our brute force solution. It is clear that this approach of string generation won't work. We need to be able to find a method to get the substring from text of size $M$. 

### Rolling Hash

Ok, so let's talk about hashing. Similar to the **find substring** section, if we are to iterate over each character of the substring we're processing every time we want to calculate its hash value, we're back to the brute force running time. We want to be able to calculate the hash once and then update it in $O(1)$ time every time we move the "window" down by $M$. 

This is where the concept of **rolling hash** comes into the picture: it takes in the hash of the previous window and adjusts it accommodate the pushed out character and the newly inserted character.

Let's have a look at how this works. Let's say our alphabet is encoded like so:

```css
a = 1
b = 2
c = 3
d = 4
e = 5
f = 6
...
z = 26
```

and we calculate the hash to be just the sum of characters' encoding. So if our pattern is `cdef`, then `hash(cdef) = 18`.

Let's say we're looking for our pattern `cdef` in this text: `abcdefghi`. Here's how we'd go about rolling our hash function:

`hash(abcd)` = $10$
$$$
$$$
`hash(bcde)` = $10 - 1 + 5 = 14$
$$$
$$$ 
`hash(cdef)` = $14 - 2 + 6 = 18$ //FOUND A MATCH!
$$$
$$$

Notice how we only calculated the hash function for the first window and then we just reused that hash value, made some modifications to subtract the removed characters' encoding and added the added characters' encoding to compute the new hash value. This calculation is done in $O(1)$ time. Due to this, our algorithm will run in $O(M + N)$ time but if there're collisions, our algorithm will run in $O(MN)$ time. We'll discuss this more in the conclusion section.

Now, the hashing function we used simply added the encoding of our individual characters which is a horrible way to do things. This is because we'd have plenty of collisions where we'd get false positives. For example, `cdef` and `fcde` will hash to the same value. We need to make sure our function also takes into account the order of our characters (position of characters in the string) as well. We can do that by multiplying the character by **some constant** raised to the power that corresponds to the character's position.

How do we choose that **some constant**? For our example, I have chosen: 

$$$
 10^{M-1}
$$$

where $M$ is the length of the window (which is also equal to the length of our pattern). So, going back to our example earlier with this encoding:

```css
a = 1
b = 2
c = 3
d = 4
e = 5
f = 6
...
z = 26
```

our hash calculations would then be:

For pattern: hash(cdef) = $((3 * 10^{3}) + (4 * 10^{2}) + (5 * 10^{1}) + (6 * 10^{0})) = 3456$ 


`hash(abcd)` = $(1 * 10^{3} + 2 * 10^{2} + 3 * {10^1} + 4 * 10^{0}) = 1234$
$$$
$$$
`hash(bcde)` = $((1234 - (1 * 10^3)) * 10 + 5) = 2345$
$$$
$$$
`hash(cdef)` = $((2345 - (3 * 10^3)) * 10 + 6) = 3456$ `//WE HAVE A MATCH!`
$$$
$$$


Why does this work? Well if you're at 1234 and want to go to 2345, you need to remove the 1 and add the 5. To remove the 1, you subtract $10^{M-1}$ where $M$ is the length of the string. This brings you to 1234 - 1000 = 234. Next, you need to append the 5 to convert 234 to 2345. To do so, you multiply 234 by 10 and add the 5 to go to 2345. 

You can compare hash for `abcd` with hash for `dcba` and see that the two hash values won't match!

Now, this is all well and good but what if your pattern is 100 characters long and you need to raise the left most character to the 99th power:

`hash(zbcd)` = $(26 * 10^{99}).....$

This would definitely cause an overflow. What should we do about this? We need to make this value smaller so that we can work with it. When we do that, we're doing so at the expense of increased collisions. We can reduce the number by taking the hash value's modulus of a large prime. Randomly I could choose this prime: `5672869`. Doing so would make sure that the number of collisions $ < 1/5672869 $ and that the hash value would never overflow. The hash value would always be in this range: $[0,5672869]$

With the introduction of this modulo operator, this is how we'd go about calculating next windows' hash values: (for the examples below I'm choosing 997 as my prime)

Pattern hash:
`hash(cdef)` =  $((3 * 10^{3}) + (4 * 10^{2}) + (5 * 10^{1}) + (6 * 10^{0})) mod 997 = 465$
$$$
$$$
`hash(abcd)` = $(1 * 10^{3} + 2 * 10^{2} + 3 * {10^1} + 4 * 10^{0}) mod 997 = 237$
$$$
$$$
`hash(bcde)` = $((237 - (1 * 10^3) mod 997) * 10 mod 997 + 5) mod 997 = 351$
$$$
$$$
`hash(cdef)` = $((351 - (2 * 10^3) mod 997) * 10 mod 997  + 6) mod 997 = 465$ `//WE HAVE A MATCH!`
$$$
$$$

Notice that we've got a 10^3 mod 997 in each calculation. Instead of calculating this each time, we can calculate this once and then store it. This would help us reduce the number of calculations when we're removing the leading characters. This would equal: $(R^{M-1}) mod (Prime)$

One final observation and then we're ready to code this! Notice for the rolling hash part, we've gotten rid of any large calculations (there are no large 10^num numbers) but our pattern hash still has $10^3$ and $10^2$. How do we make this calculation easier? To do so, we'll use Horner's method:

Horner's method makes use of this property of modulo operations:

 ```css
(A * B) mod C = ( (A mod C) * (B mod C) ) mod C
```

Converting that to a function we get:

```cpp{numberLines: true}
long RK::HashFunction(string key, int m){
    long h = 1;
    for (int i = 0; i < m; i++){
        char c = key[i];
        int key = int(c);
        h = (BASE * h + key) % PRIME;
    }
    
    return h;
}
```

Since this method is only called once when we're computing the hash of our pattern, we're only going through this loop once. 