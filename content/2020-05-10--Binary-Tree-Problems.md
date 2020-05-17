---
title: Binary Tree Problems
date: 2020-05-10
thumbnail: /post-images/tree.png
draft: true
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
    * [Find height](#find-height)
    * [Check if balanced](#check-if-balanced)
    * [Check if tree is symmetric](#check-if-tree-is-symmetric)
    * [Merge two trees](#merge-two-trees)
    * [Invert a binary tree](#invert-a-binary-tree)
    
3. [Conclusion](#conclusion)

### TODO
LCA
Previous chapter (stack and queue) problems related to binary tree

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

### Find Height

**Given a binary tree, find the height of the tree**

Example:

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
Height is the longest path from root to leaf: 12-11-9-7-6 = 4 (I'm counting root as level 0)   
``` 

Let's think through it logically: 
- If the node is null, its height is 0
- If the node is not null BUT has both left and right pointers as null, then the height is 1.
- Otherwise, the height is equal to the max height of left subtree and right subtree plus 1 (for the current node).

Translated to code:

```cpp
int FindHeight(Node<int>* root){
    if (root == nullptr)
        return -1;
    if (root->left == nullptr && root->right == nullptr)
        return 0;
    
    int lH = FindHeight(root->left);
    int rH = FindHeight(root->right);
    int currH = max(lH,rH);
    currH++;
    
    return currH;
}
``` 

Running time is $O(N)$ where $N$ is the number of nodes in the tree. Space complexity is $O(h)$ because the max number of recursive calls at a given time on the call stack are equal to the max height of the tree. $h$ is the height of the tree

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

### Check if tree is symmetric

**Write a program that checks whether a binary tree is symmetric. Symmetric tree is where a vertical line can be drawn from the root dividing the tree into mirror images (values of the nodes and positions match in each half)**

Example:

```cpp
Is symmetric:
            314
           /   \
          6     6
         /       \   
        2         2
         \       /
         4      4
        /        \
       1          1   

Not symmetric:
            314
           /   \
          6     6
         /       \   
        2         5
         \       /
         4      4
        /        \
       1          1   


Not symmetric:
            314
           /   \
          6     6
         /       \   
        2         2
         \         \
         4          4
        /          / 
       1          1        
```

Brute force approach is to start with root's left subtree and copy the values to an external data structure, say an array. Then iterate over the right subtree and match the values as you iterate. If there's a mismatch, it is not symmetric, otherwise the tree is symmetric. Running time is $O(N)$ where $N$ is the number of nodes. Space is approx $O(N)$ for the array. 

Can we do this without saving half the tree in an array? We can try to go down each half of the tree simultaneously. One pointer goes down root's left subtree and the other goes down root's right subtree. However, the order of traversal shouldn't be the same. That is because for the tree to be symmetric, the left pointer's left child is right pointers right child. So, the order of traversal should be mirrored as well: left pointer's left child must equal right pointer's right child. Therefore left pointer can traverse in `node left right` while right pointer can traverse in `node right left` fashion. Let's have a look at the symmetric tree again and see the output for the left and right pointers:

```cpp
Is symmetric:
            314
           /   \
          6     6
         /       \   
        2         2
         \       /
         4      4
        /        \
       1          1   

left:   6 2 null 4 1 null null
right:  6 2 null 4 1 null null
```

Now, if during traversal, at any point the two pointers do not point to the same data, we can return false. If the two pointers traverse their way back up to the root, then we have a symmetric tree.

```cpp
template <typename T>
struct Node{
    T data;
    Node<T>* left = nullptr;
    Node<T>* right = nullptr;
};

bool isSymmetric(Node<int>* left, Node<int>* right){
    if (!left && !right)
        return true;
    if (left && !right)
        return false;
    if (!left && right)
        return false;
    
    if (left->data != right->data)
        return false;
    
    bool move1 = isSymmetric(left->left, right->right);
    bool move2 = isSymmetric(left->right, right->left);
    
    if (move1 && move2)
        return true;
    
    else
        return false;
}
```

The running time of the code is $O(N)$ where $N$ is the number of nodes in our tree. Space complexity is $O(h)$ where $h$ is the height of our tree. This space complexity comes from our call stack. At most, we'd have to save $h$ recursive calls.

### Merge two trees

**Merge two trees, if both nodes present add sum. If one of them is null, only add the non-null node**

Example:

```cpp

tree1   tree2
    1   2
   /     \
  9       4  

merged:

    3
  /   \
 9     4 

```

Approach 1: We can store nodes and their values (including null nodes) for each tree in their respective arrays. We can then iterate over the arrays and pick the non-null values and add ones that need to be added. Finally, we can construct a tree from our answer array and return. Not a good approach since it takes extra space.

Better approach: Can we do it in place? How about we save the final result in `t1` pointer that was passed to us. Let's step through the logic and see if we can:

- If both tree pointers are null, return null
- If t1 is null and t2 is not null, return t2
- If t1 is not null and t2 is null, return t1.
- If both are not null, we need to do more work:
    -  Problem statement says add the values if both present
    - Next, we need to repeat the steps above for current nodes' left and right subtrees.
- Finally, return t1:

```cpp
Node<int>* mergeTrees(Node<int>* t1, Node<int>* t2){
    if (!t1 && !t2)
        return nullptr;
    if (!t1 && t2)
        return t2;
    if (t1 && !t2)
        return t1;
    
    //both present, sum the two:
    t1->data += t2->data;
    
    t1->left = mergeTrees(t1->left, t2->left);
    t1->right = mergeTrees(t1->right, t2->right);
    
    return t1;
}
```

This approach uses no extra space (except for the recursive call stack). Running time: $O(N)$ where $N$ is the max of the number of nodes in tree 1 and tree 2. And space complexity is $O(h)$ of the tree with the larger height.

### Invert a binary tree

Example:

```cpp

        1           1
       / \         / \
      2   3       3   2
     / \ / \     / \ / \
    4  5 6  7   7  6 5  4 
     
```

The idea here is to make a mirror image of the tree. Now as you go about swapping elements, you don't want to swap the parents until the children are done. You want to start at the bottom. To do so, what type of traversal would you use? The one that comes to mind that does the node AFTER the children is post-order (Left,right, node). So, here's what we'll do:

- Swap children of 4 (there aren't any so the null pointers stay where they are)
- Swap children of 5 (there aren't any so the null pointers stay where they are)
- Swap children of 2 : Swap 4 and 5.
- We're up to `1` now BUT we're only done with its left subtree, we move to the right subtree
- Swap children of 6 and 7 (aren't any)
- Swap children of 3 : Swap 6 and 7
- Now swap children of 1 : swap 2 and 3

```cpp
Node<int>* invert(Node<int>* root){
    if (!root)
        return nullptr;
    invert(root->left);
    invert(root->right);
    Node<int>* temp = root->left;
    root->left = root->right;
    root->right = temp;
    
    return root;
}
```

Running time is $O(N)$ and space is $O(h)$

### Conclusion

- Best solutions have running time $O(N)$ and space complexity as $O(h)$ (when using recursion).
- Always start at the base case when working with trees. For example, what do we do when the node is null? Next, handle the case where the node has no more children. Next choose a middle node and decide what to return based on the problem you're trying to solve, then finally add the missing steps. 
- Whenever you recurse and go down a subtree, make sure you capture the result and return if there's a return condition that needs to hold. That way you prevent yourself from going through the entire tree when the first subtree already breaks the condition you're trying to check for.
