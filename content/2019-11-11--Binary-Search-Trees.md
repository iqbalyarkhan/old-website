---
title: Binary Search Trees
date: 2020-01-26
draft: true
extract: An analysis of binary search trees in C++
categories: 
    - Data Structures
tags:
  - Data Structures
  - Binary Search Trees
---

### Introduction

In this post I'll talk about a data structure called Binary Search Tree. This post is related to my [binary search](/binary-search) post where we discussed the binary search algorithm. BSTs use a similar idea but allow us to store our data efficiently so that we don't have to iterate over an entire array to perform various operations on the data that we stored. We'll look at this in more detail as we go over the code.

### Code

I've got 2 generic classes: A `BinaryTree` class that includes another private class called `Node`. The initial setup looks like so:

Node Class:

```cpp{numberLines: true}
#ifndef BinaryTree_h
#define BinaryTree_h

template<typename T>
class BinaryTree{
private:
    class Node{
    public:
        Node* left;
        Node* right;
        T item;
    };
    Node* root;
    int size;
    void InOrderTraversal(Node* curr);
public:
    BinaryTree();
    void Insert(T newItem);
    bool Find(T itemToFind);
    void InOrderTraversal();
    void PreOrderTraversal();
    void PostOrderTraversal();
    T FindMax();
    T FindMin();
    
};
#endif /* BinaryTree_h */
```

We'll go in more detail as we implement each of the functions in this class. The initial setup declares a generic class called `BinaryTree` (line 5). Inside this class, as a private member, we've got another class called `Node` (line 8) to represent each node of the tree. The `Node` class will hold an item of type T.

#### Constructor

```cpp
template<typename T>
BinaryTree<T>::BinaryTree(){
    root = nullptr;
    size = 0;
}
```

For the `BinaryTree` constructor, all we do is initialize the root pointer and the size variable to 0. Therefore, when the class is created, we setup our root that'll be used to access the tree.

#### Insert

```cpp{numberLines: true}
template<typename T>
void BinaryTree<T>::Insert(T newItem){
    size++;
    Node* newNode = new Node;
    newNode->item = newItem;
    newNode->left = nullptr;
    newNode->right = nullptr;
    if (root == nullptr){
        root = newNode;
    } else {
        Node* curr = root;
        Node* prev = root;
        while (curr != nullptr){
            prev = curr;
            if (newItem < curr->item){
                curr = curr->left;
            } else {
                curr = curr->right;
            }
        }
        
        if (newItem < prev->item)
            prev->left = newNode;
        else
            prev->right = newNode;
    }
}
```

Line 3 increments the size variable because we're about to add a new node to our tree. Then, lines 4-7 create the new node, populate the data field (called `item` in our example) and set the `left` and `right` pointers to `nullptr`. 

We then check to see if the root points to `nullptr`. This would happen when our tree is empty and we're adding a new node to it. If that is the case, all we do is make `root` point to this newly created node. We then increment the size variable and exit the function.

If root is not null, we have to traverse down the tree to find the correct position to add this new node. To do so, we maintain 2 pointers: `prev` and `curr`. The `prev` pointer is to keep track of the parent of this newly created node. We continue going down the tree until `curr` is null at which point `prev` would be pointing to the parent node. At this point, we can add our new node in the leaf position as either a left child (if less than parent) or right child (if greater than parent).


#### Traversal

```cpp{numberLines: true}
template<typename T>
void BinaryTree<T>::InOrderTraversal(){
    BinaryTree<T>::InOrderTraversal(root);
}

template<typename T>
void BinaryTree<T>::InOrderTraversal(Node* curr){
    if (curr == nullptr){
        return;
    }
    InOrderTraversal(curr->left);
    cout << curr->item << " ";
    InOrderTraversal(curr->right);
}
```

To traverse the tree, we've got 2 functions: the one on line 2 is exposed to the client. This function, in turn calls another private function that'll have access to the `root` and will be able to recursively call itself to print the tree. Inorder traversal is done in the following sequence:
- Print the left-subtree
- Print the current node
- Print the right sub-tree

(Left,curr,right)

Similarly, we can have pre-order traversal (curr,left,right) and post-order traversal (left,right,curr). The only thing that changes for these two methods is the order of the recursive and `cout` calls on lines 11-13.

#### Find

```cpp{numberLines: true}
template<typename T>
bool BinaryTree<T>::Find(T itemToFind) {
    Node* curr = root;
    while (curr != nullptr){
        if (itemToFind < curr->item)
            curr = curr->left;
        else if (itemToFind > curr->item)
            curr = curr->right;
        else
            return true;
    }
    
    return false;
}
```

The `Find` function, as the name suggests, checks to see if value exists in the tree. If so, we return `true` otherwise `false` is returned. The logic is that we start at the root and keep moving in the right direction: search in the left subtree if `itemToFind` is less than `curr` or right subtree if `itemToFind` is greater than `curr`. If we reach all the way to the end and find that `curr` is null, we return false. Otherwise we return true as soon as the value is found. 