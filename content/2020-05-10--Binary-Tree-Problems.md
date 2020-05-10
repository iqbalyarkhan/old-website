---
title: Binary Tree Problems
date: 2020-05-10
thumbnail: /post-images/tree.png
draft: false
extract: Binary tree problems
categories: 
    - Problems
tags:
    - Binary Tree Problems
---

### Table of Contents
1. [Intro](#intro)

2. Problems

    * [Traversal](#traversal)
    * [Check if balanced](#check-if-balanced)

### Intro

A binary tree is a data structure that is useful for representing hierarchy. Formally a binary tree is either empty or a root node r together with a left binary tree and a right binary tree.

The depth of a node n is the number of nodes on the search path from the root to n, not including n itself. The height of a binary tree is the maximum depth of any node in that tree. A level of a tree is all nodes at the same depth.

A full binary tree is a binary tree in which every node other than the leaves has two children. 

A perfect binary tree is a full binary tree in which all leaves are at the same depth, and in which every parent has two children. 

A complete binary tree is a binary tree in which every level, except possibly the last, is completely filled, and all nodes are as far left as possible.  

3 main types of traversals are: preorder, inorder and postorder.

Basic data structure to represent a node in our tree would be:

```cpp
template <typename T>
struct Node{
    T data;
    Node<T>* left = nullptr;
    Node<T>* right = nullptr;
};
```

### Traversal

**Given a binary tree, traverse the tree in pre-, in- and post-orders.**

Recursively this is quite simple:

```cpp
void PreOrder(Node<int>* root){
    if (root == nullptr)
        return;
    
    cout << root->data << " ";
    PreOrder(root->left);
    PreOrder(root->right);
}

void InOrder(Node<int>* root){
    if (root == nullptr)
        return;
    
    InOrder(root->left);
    cout << root->data << " ";
    InOrder(root->right);
}

void Postorder(Node<int>* root){
    if (root == nullptr)
        return;
    
    Postorder(root->left);
    Postorder(root->right);
    cout << root->data << " ";
}
```

Running time is $O(N)$ and space complexity is the call stack used to traverse the tree which at most uses $O(h)$ space where $h$ is the height of our tree. 

### Check if balanced

**Write a program that takes as input the root of a binary tree and checks whether the tree is height-balanced.
A binary tree is said to be height-balanced if for each node in the tree, the difference in the height of its left and right subtrees is at most one.**

A brute force approach would be to start at root, look at left subtree and then right subtree and compared. Then move to left subtree and then look at its left subtree and right subtree and compare. Continue until you either find imbalance or you're out of nodes to consider. The running time is approximately $O(h^2)$ where $h$ is the height of the tree. This seems complicated and time consuming. 

Another approach would be to recursively go down the tree and once at the leaf, start coming back up and storing the heights in a data structure which can be accessed later to compare the heights for each node. This is better time wise than brute force but requires more space for that external data structure. 

Best approach makes use of this insight: we're only interested in seeing if the heights differ by more than 1, we do not need to store the heights. After processing each node's left and right subtrees, we can look at the heights returned and determine whether the tree is balanced. As soon as we find a subtree that is unbalanced, we can return. 

So here's how this approach works. Say we have this tree:

```cpp
    
            12
           /  \
         11   10
        /  \   
       9    8 
      /  
     7
    /
   6   
``` 

this tree is unbalanced because node `9` has left subtree that has height 2 and right subtree that has height 0. We'll make our way down the tree using one of the tree traversal methods we discussed in the previous question: post-order traversal. That is because we need to process the left subtree of a node, then right subtree of a node and then compare those heights at the node which fits well with how post order works. 

Having said that, this is how we'll go down the tree:

```cpp

    12
     |_ 11
         |_ 9
            |_ 7
               |_ 6

6 has no children, return 1

    12
     |_ 11
         |_ 9
            |_ 7

7 has no right children return 0.

So now that we've processed both the left and right subtree of 7, we're ready to compare:
7->left height = 1
7->right height = 0

|left - right| <= 1 so we're good. Now for 7's parent, return max(left, right) + 1.

    12
     |_ 11
         |_ 9
            |_ 7 returned 2
            |_ NULL returned 0

Now look at 9->right: has no children, so return 0

We're done processing left and right subtrees for 9:
9->left = 2
9->right = 0
 
|left - right| > 1 so we found imbalance! No need to process any further, we know the tree is unbalanced
```  

Converting this to code is simple:
- If our node is null, return 0
- If our node has left and right child as null but is not itself null, return 1
- If neither left nor right is null, call the function again on the left subtree and the right subtree
    - Once you have the results from left and right subtrees, take the max of returned values, add 1 (for current level) and return

This is would translate to:

```cpp
template <typename T>
struct Node{
    T data;
    Node<T>* left = nullptr;
    Node<T>* right = nullptr;
};
   
int getH(Node<int>* node){
    if (node == null){
        return 0;
    }
    if (node->left == nullptr && node->right == nullptr){
        return 1;
    }
        
    int leftHeight = RecursiveFunction(node->left);
    int rightHeight = RecursiveFunction(node->right);
    //Now that we have the two heights, compare and assign max + 1 to current height:
    int currH = max(leftHeight,rightHeight) + 1;
    
    return currH;
}
``` 

In our code, we need to keep track of whether we've encountered any unbalanced nodes. To check if we've got any unbalanced nodes, we need to compare whether the left and right heights differ by more than 1. To keep track of this, we need a global variable. As soon as it turns false, we can start unwinding our recursive call stack. 

An observation: we're using two pieces of related information: the height and isBalanced boolean variable. We can combine the two into one struct called `statusAndHeight` and use that to keep track of the height we found and whether the node was unbalanced:

```cpp
struct statusAndHeight{
    int height;
    bool status;
};


statusAndHeight getH(Node<int>* root){
    if (root == nullptr){
        return {0,true};
    }
    
    if (root->left == nullptr && root->right == nullptr){
        return {1,true};
    }
    
    
    auto left = getH(root->left);
    if (!left.status){
        return {-1,false};
    }
    
    auto right = getH(root->right);
    if (!right.status){
        return {-1,false};
    }
    
    int currH = max(left.height, right.height);
    bool isBal = abs(left.height - right.height) <= 1;
    if (!isBal){
        cout << "Balance not right for node: " << root->data << endl;
    }
    return {currH+1, isBal};
}
```

Notice, we also immediately return if left is unbalanced or right is unbalanced in our checks by returning -1 and false for our return struct. That way we don't have to unnecessarily continue processing remaining nodes. Running time of this algorithm is $O(N)$ where $N$ is the number of nodes and since we recurse through the tree, space complexity is the call stack that we use: $O(h)$ where $h$ is the height of our tree. 



