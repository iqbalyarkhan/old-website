---
date: 2020-01-03
title: Primitive Types
thumbnail: /post-images/bits.png
draft: false
extract: Common methods on primitive types in C++
categories: 
    - General
tags:
    - C++
    - Bits
---

### Table of Contents

1. [Bits, bytes and words](#bits-bytes-and-words)

2. [Converting binary to decimal](#converting-binary-to-decimal)

3. [AND](#and)

4. [OR](#or)

5. [XOR](#xor)

6. [Left shift](#left-shift-)

7. [Right shift](#right-shift-)

8. [Bit masking](#bit-masking)

9. [Count number of bits set to 1](#parity-count-number-of-bits-set-to-1)

10. [Check if number i power of 2 in constant time](#check-if-number-is-power-of-2-in-constant-time)

11. [Conclusion](#conclusion)

### Introduction
In this post, I'll talk about a few methods to manipulate binary numbers to perform various operations. In the process
we'll solve a few interesting problems as well.

### Bits bytes and words

The primary language used by a computer comprises of bits: 0s and 1s. A bit can only be used to store boolean values. For example, this will print `a` is false.

```cpp
bool a = 0;
bool b = 1;
if (a == true){
    cout << "a is true!" << endl;
} else {
    cout << "a is false!" << endl;
}
```

8 bits together and you have a byte. Since there are 8 bits in a byte and there are two possibilities for each bit (either a 1 or a 0), you can store $2^8$ different patterns. This means you can have all the way from 

$$$
00000000

to 

11111111
$$$

different combinations which means you can store 256 different combinations. 

One byte is used to store one character where each character occupies one of 256 patterns. For example, `a` in binary is:

```cpp

0   1   1   0   0   0   0   1
```

In C++, you can use a bitset to store a character as its binary representation. For example, lower case `a` in ascii is 97 decimal. 97 decimal in binary is `01100001`:

```cpp
bitset<8> temp('a');
cout << temp << endl; //prints 01100001
```

Due to this, a **byte** is considered a unit of information storage. As you increase the number of bytes, you can store even more information:

$$$
1KB = 1 * 10^3 bytes
1MB = 1 * 10^6 bytes
1GB = 1 * 10^9 bytes
1TB = 1 * 10^12 bytes
$$$

Have 2 bytes together and you have a `word`: therefore, a word has 16 bits. 

### Converting binary to decimal

Binary numbers can be converted to decimal using two simple techniques. Say for example we've got this binary number:
`10110`. The first method involves conversion starting with the LSB. Since this is a binary number, each bit represents a value that is multiplied by a power of 2: starting at $2^0$ and going up till $2^{N-1}$ where $N$ is the number of bits. 

A more interesting problem arises when you're asked to convert from binary to decimal where your problem is structures in such a way that you'd have to start reading from the most significant bit (MSB) as described by [this](https://github.com/iqbalyarkhan/Practice-Problems/blob/master/1290.h) problem. Here we're reading in our binary number from a linked list. To do so, we have to start from the MSB. There is a simple formula that allows you to do so:

$ (Total * Base) + BitRead = Total$  

So, if we're to convert our example binary number: $10110$, we'd start with initializing $Total$ to $0$ and then perform the following steps:


| Bit Read | Computation | Total |
| --------- | ----------- | ----------- |
| 1 | (0 * 2) + 1 | 1 |
| 0 | (1 * 2) + 0 | 2 |
| 1 |(2 * 2) + 1 | 5 |
| 1 | (5 * 2) + 1 | 11 |
| 0 | (11 * 2) + 0 | 22 |

Therefore, our binary `10110` is `22` in base 10.

### AND

| A | B | A AND B |
| --------- | ----------- | ----------- |
| 0 | 0 | 0 |
| 0 | 1 | 0 |
| 1 | 0 | 0 |
| 1 | 1 | 1 |

```cpp
cout << (9 & 1) << endl; //Prints 1
/*

    1001
  & 0001
----------
    0001
*/
```

### OR

| A | B | A OR B |
| --------- | ----------- | ----------- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 1 |

```cpp
cout << (9 | 1) << endl; //Prints 9
/*

    1001
  | 0001
----------
    1001
*/
```

### XOR

XOR truth table:

| A | B | A XOR B |
| --------- | ----------- | ----------- |
| 0 | 0 | 0 |
| 0 | 1 | 1 |
| 1 | 0 | 1 |
| 1 | 1 | 0 |

```cpp
int x = 1;
int y = 2;

cout << (x ^ y) << endl; //prints 3
```

### Left Shift <<

Left shift is equivalent to multiplying the bit pattern with $2^k$ ( if we are shifting k bits ). This is also the same as adding the same number of zeros to least significant bit as the shit amount.

$$$
num * 2^{shift amount}
$$$

For example, if we have the integer 3 and left shift it by 2 means:

$$$
3 * 2^2 = 12
$$$

In binary this means:

```cpp
    added 2 zeroes because shift amount is 2 
             ||
0011 ->  001100 = 12 in decimal

```

Corresponding C++ syntax:
```cpp
x = 3;
x = x << 2; 
cout << x << endl; //prints 12
```

### Right shift >>

Opposite of what left shift was, right shift is:

$$$

number/2^{shiftAmount}

$$$

This also means drop the same number of LSBs equal to the shift amount 

For example, if we had 12 >> 2: this would mean:

$$$

12 / 2^2 = 3

$$$

In binary this would be:

```cpp
Drop these because shift amount is 2
  || 
1100 -> 0011 = 3 in decimal

```

### Bit masking

Bit masks are used to access specific bits in a binary number. Masking can also be used to suppress certain bits. To mask, one can use:

- AND to extract a subset of bits
- OR to set a subset of bits
- XOR to toggle a subset of bits.

**AND** to extract a subset of bits

Say you're asked to get the last 4 bits of a number. You can use the AND operator to grab these:

```cpp
                        |   |   |   |
        1   0   0   1   1   1   0   1
AND     0   0   0   0   1   1   1   1
      ----------------------------------
        0   0   0   0   1   1   0   1

Notice how the result shows the exact values in the original binary number
```

**OR** to set a subset of bits

Say you're asked to set the 5th, 6th and 7th bits to 1 of a number. You can use OR operator to do so:

```cpp
        |   |   |   
        1   0   0   1   1   1   0   1
OR      1   1   1   1   0   0   0   0
      ----------------------------------
        1   1   1   1   1   1   0   1

Notice how the result changed the two zeroes and the 1 to 1.
```

**XOR** to flip the bits

Say you're asked to flip the 3rd and 4th bits in a number, you can use XOR to do so:


```cpp
                    |   |  
        1   0   0   1   0   1   0   1
XOR     0   0   0   1   1   0   0   0
      ----------------------------------
        1   0   0   0   1   1   0   1

Notice how the 3rd and 4th bits are flipped. 
```



### Parity: Count number of bits set to 1 

Using the rules above, how would we go about figuring out the number of bits set to 1? Say we have this binary number:

$$$
10011_b = 19_d
$$$

Now to count the number of bits set to 1, we can AND the binary number with `1` and then shift to right by 1 bit and keep a count of 
```css
10011
00001
-----
00001 (count = 1)

Shift by 1:

01001
00001
-----
00001 (count = 2)

Shift by 1:

00100
00001
-----
00000 (count = 2)

Shift by 1:

00010
00001
-----
00000 (count = 2)

Shift by 1:
00001
00001
-----
00001 (count = 3)
```
As you can see from the algorithm above, the running time is $O(N)$ where $N$ is the number of bits in the number that we're inspecting. If the number of 1s in the binary representation are odd, we say that the parity is 1, otherwise the parity is 0.

A C++ program for the above:

```cpp
void getParity(int num){
    int ans = 0;
    while (num != 0){
        ans += num & 1;
        num = num >> 1;
    }
    
     if (ans % 2 == 0)
         cout << "Even parity: " << ans << endl;
     else
         cout << "Odd parity: " << ans << endl;
}
```

Now, $O(N)$ is too slow for a large binary number, can we improve this running time? Sure! To do so, we'll use a trick:

$$$
x \text{\&} (x - 1) = x \textrm{ with its lowest set bit erased} 
$$$ 

Let's see how this works. Say we're to find how many ones in this number:  

```cpp
        1   0   1   0   1
```

Using the formula above, we do: $x \text{\&} (x - 1)$. $x - 1$ is: `10100`, so:

```cpp
Calculation 1:

        1   0   1   0   1
AND     1   0   1   0   0
--------------------------
        1   0   1   0   0
```

Repeat for `10100`:


```cpp
Calculation 2:

        1   0   1   0   0
AND     1   0   0   1   1
--------------------------
        1   0   0   0   0
```

```cpp
Calculation 3:

        1   0   0   0   0
AND     0   1   1   1   1
--------------------------
        0   0   0   0   0
```

We're done! We only performed 3 calculations. Therefore, using this formula, we were able to reduce the running time from $O(N)$ where $N$ is the number of digits in the binary representation to $O(K)$ where $K$ is the number of 1s! This is called **Brian Kernighan's algorithm**. 

C++ implementation for the above:

```cpp
void BKAlgo(int num){
    int ans = 0;
    int count = 0;
    while (num != 0){
        count++;
        num = (num & (num - 1));
        ans++;
    }
    if (ans % 2 == 0)
        cout << "Even parity: " << ans << " with "<< count << " iterations." <<endl;
    else
        cout << "Odd parity: " << ans << " with "<< count << " iterations." <<endl;
}
```

#### Look up table

This is still not great! We are computing parity for very large numbers are we're performing the `&` operation and subtracting 1 from very large numbers. This would still take some time. To improve performance on very large binary numbers, we need to:

- Process multiple bits at a time
- Cache results in a lookup table

Processing multiple bits at a time is simple: instead of looking at each bit a time, we can look up 4 bits. In addition, we can save the number of 1s in a group of 4 bits in a table. That table would look like this:

```cpp
0000: 0
0001: 1
0010: 1
0011: 2
....
1111: 4
```

This table can be an array. So, if we need to get the number of bits set for `0111` which is equal to 7 decimal, we go to `table[7]` and grab the number. 

Now, the question remains, how do we isolate 4 bits at a time from the number we're asked to find the parity for?

Say this is our binary number:

```css

    0111    1110    1010    1111    0001

```

We need to AND the number with `1111`, grab the result from lookup table, add to running total, then right shift by 4:

```css

    0111    1110    1010    1111    0001
AND                                 1111
-----------------------------------------
                                    0001 

0001 in lookup table = 1
Right shift.
```

Next,

```css

            0111    1110    1010    1111
AND                                 1111
-----------------------------------------
                                    1111 

1111 in lookup table = 4
Right shift.
```
Keep doing so until the original number becomes 0. As a side note, instead of using `int x = 15` (the 1111) for `AND`, you can also use hex F. In C++, you'd do:

```cpp
cout << (3 & 0XF) << endl; //F is same as 1111 binary = 15 decimal
```

This algorithm runs in $O((\textrm{ number of bits in input})/ \textrm{number of bits in look up table group} )$. For the example above, we had 16 bits in the input and the number of bits in lookup table were 4 so the time is:

$O(16/4)$. Also, this algorithm uses extra space of $O(\textrm{lookup table size})$.

### Check if number is power of 2 in constant time

To do so, we'll use the trick we used above:

$$$
x \text{\&} (x - 1) = x \textrm{ with its lowest set bit erased} 
$$$ 

A number that is a power of 2 has only one bit set:

$$$
2^0 = 1 = 0001
2^1 = 2 = 0010
2^2 = 4 = 0100
2^3 = 8 = 1000
$$$

Say, we're checking if 8 is a power of 2:

$$$
x \text{\&} (x - 1) = x 
$$$

Then:

```css

    1   0   0   0
AND 0   1   1   1
-----------------
    0   0   0   0
```

So if number bitwise and with the formula above is a 0, then the number is a power of 2, otherwise it is not.

### Conclusion

- Remember these formulae:

  $$$
  x \text{\&} (x - 1) = x \textrm{ with its lowest set bit erased} 
  $$$ 
    
  $$$
  x \text{\&} \neg(x - 1) = \textrm{ isolates } x's \textrm{ lowest set bit} 
  $$$
  
  Usually a combination of the two with the bitwise operators on an input would take you closer to a solution. 
  
- Remember, for any kind of bit manipulation, the key to good performance is to [process multiple bits at a time and caching results in an array based lookup table](/primitive-types#look-up-table)    

- Use right shifting to iterate through right shifted amount of bits at a time.

- Use left shift to target a specific bit position by shifting left by the concerned bit's position. 