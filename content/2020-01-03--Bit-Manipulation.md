---
date: 2020-01-03
title: Bit Manipulation
draft: true
extract: Common methods to perform operations using bit manipulation
categories: 
    - C++
tags:
    - C++
    - Bits
---

### Introduction
In this post, I'll talk about a few methods to manipulate binary numbers to perform various operations. In the process
we'll solve a few interesting problems as well.

#### Converting binary to decimal

Binary numbers can be converted to decimal using two simple techniques. Say for example we've got this binary number:
`10110`. The first method involves conversion starting with the LSB. Since this is a binary number, each bit represents a value that is multiplied by a power of 2: starting at $2^0$ and going up till $2^{N-1}$ where $N$ is the number of bits. 

A more interesting problem arises when you're asked to convert from binary to decimal where your problem is structures in such a way that you'd have to start reading from the most significant bit (MSB) as described by [this](https://github.com/iqbalyarkhan/Practice-Problems/blob/master/1290.h) problem. Here we're reading in our binary number from a linked list. To do so, we have to start from the MSB. There is a simple formula that allows you to do so:

$ (Total * Base) + Bit_Read = Total$  

So, if we're to convert our example binary number: $10110$, we'd start with initializing $Total$ to $0$ and then perform the following steps:


| Bit Read | Computation | Total |
| --------- | ----------- | ----------- |
| 1 | (0 * 2) + 1 | 1 |
| 0 | (1 * 2) + 0 | 2 |
| 1 |(2 * 2) + 1 | 5 |
| 1 | (5 * 2) + 1 | 11 |
| 0 | (11 * 2) + 0 | 22 |

Therefore, our binary `10110` is `22` in base 10.
