---
title: Binary Search Trees
date: 2019-11-11
extract: An analysis of binary search trees in C++
categories: 
    - Data Structures
tags:
  - Data Structures
  - Binary Search Trees
---

### Introduction

In this post I'll talk about a data structure called Binary Search Tree. This post is related to my [binary search](/binary-search) post where we discussed the binary search algorithm. BSTs use a similar idea but allow us to store our data efficiently so that we don't have to iterate over an entire array to find the correct position of the element we're looking to insert. We'll look at this in more detail as we go over the code.

### Code

I've got two separate classes: one to represent our binary search tree and I've named this class BST. The other is to represent a node in our tree and I've called this class Node. Both are generic classes.

Node Class:

```cpp{numberLines}
#ifndef Node_h
#define Node_h
template <typename T>
struct Node{
    Node<T>* next;
    T element;
};

#endif /* Node_h */
```