---
title: Union Find
date: 2020-03-06
draft: true
extract: Analysis of the Union Find algorithm
categories: 
    - General Algorithms
    - C++
tags:
  - C++
  - General Algorithms
---

### Table of Contents

1. [Introduction](#introduction)

2. [Setup](#setup)

3. [Pointer to Pointer](#pointer-to-pointer)

4. [Heap](#heap)


### Introduction

In this post I'll talk about an alogrithm called the union find algorithm. Union find can be used to figure out whether two elements belong to the same set. This set could represent a network of connected computers and you want to know whether two components in this network are connected. Before we dive in, let's define what it means to be connected. **Connected** can be thought of as an equivalence relation:

- Reflexive: $A$ is connected to itself.
- Symmetric: If $A$ is connected to $B$, it also means that $B$ is connected to $A$.
- Transitive: If $A$ is connected to $B$, and $B$ is connected to $C$ then $A$ is connected to $C$.
 

### Setup

Before we begin, we need to create a bijection (or a one to one mapping) that translates a computer name to an integer value. This integer will be in the range $[0, N)$ where $N$ is the total number of computers in the network. Once we have this mapping, we can represent these computers using the assigned integer values. Now, we're ready to manipulate these integers. Before we can do that, we need to store our integers in an array since we need some sort of association among the objects themselves. Remember our aim is to figure out whether two objects are connected. Initially, each of our components is disconnected from every other component. So this is what our array looks like with say 10 components:

```

0 1 2 3 4 5 6 7 8 9

```
We want to manipulate our array in such a way that we'd be able to answer questions such as:

- Is the information represented in the structure correctly depict the connections?
- Can we `union()` items - ie connect two components?
- Can we `find()` the component number for the given component?
- Can we tell if two components are `connected()`?
- Finally, can we get the `count()` of the number of components present? 

### Union

Ok, so we've got our array setup where each element is disconnected fom every other component. So, initially, the number of components in our structures equals the number of ojects (10 in our example). Let's say we want to union 2 objects by calling the`union(int p, int q)` function. Say, we call union like so: 
```cpp
union(4, 3)
```

In doing so, we make one element the child (or parent) of the other. The choice I made is arbitrary so I chose this convention: 
```cpp
union(p,q)
``` 
would mean make `q` the child of `p`. So, if we perform $union(4,3)$, we make $3$ the child of $4$:

```
0 1 2 4 5 6 7 8 9
      |
      3
```
 
Now, to represent this in our array, we'll replace `array[q]` with the value `p` because `p` is 4. Once we do this, our array looks like this:

```
     arr[3]'s parent is 4
      |
0 1 2 4 4 5 6 7 8 9
```