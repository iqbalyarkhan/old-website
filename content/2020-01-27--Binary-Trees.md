---
title: Binary Trees
date: 2020-01-27
thumbnail: /post-images/tree.png
draft: false
extract: Binary tree data structure
categories: 
    - Data Structures
tags:
    - Binary Tree
    - Data Structures
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
    * [Are they cousins](#are-they-cousins)
    * [LCA](#lca)
    * [LCA with parent](#lca-with-parent)
    * [Binary sum from root to leaf](#binary-sum-from-root-to-leaf)
    * [Path to leaf with sum](#path-to-leaf-with-sum)
    * [In-order without recursion](#in-order-without-recursion)
    * [Pre-order without recursion](#pre-order-without-recursion)
    * [Find in-order successor](#find-in-order-successor)
    * [Form list from leaves](#form-list-from-leaves)
    * [Vertical Order Traversal](#vertical-order-traversal)
    * [Remove leaf nodes with given value](#remove-leaf-nodes-with-given-value)
    * [Diameter of a tree](#diameter-of-a-tree)
    * [Level order traversal](#level-order-traversal)
    
3. [Conclusion](#conclusion)

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

### Are they cousins?

**In a binary tree, the root node is at depth 0, and children of each depth k node are at depth k+1.Two nodes of a binary tree are cousins if they have the same depth, but have different parents.We are given the root of a binary tree with unique values, and the values x and y of two different nodes in the tree.Return true if and only if the nodes corresponding to the values x and y are cousins.**

Method signature:

We need to satisfy two conditions: the depth of each node and the parent. Naive approach would be to first iterate through the tree, get the depths for each node and store in an external data structure such as a hash map. Then find the two nodes you're looking for and see if they satisfy the conditions for them to be considered cousins. This approach takes $O(N)$ time and $O(N)$ space.

Better approach is to calculate the depth and the parent as we iterate over the nodes in our tree. We're only interested in the parent and depth of the node if its value matches that of the two nodes (x and y) we're looking for. So, we can use 4 global variables: 
- x depth
- x parent
- y depth
- y parent



```cpp

Node<int>* xp;
Node<int>* yp;
int xd;
int yd;

void process(Node<int>* root, Node<int>* parent, int depth,int x, int y){
    if (!root)
        return;

    if (root->data == x){
        xp = parent;
        xd = depth;
        return;
    }
    if (root->data == y){
        yp = parent;
        yd = depth;
        return;
    }
    depth += 1;
    process(root->left, root, depth, x, y);
    process(root->right, root, depth, x, y);
}
```

The code above shows that we start traversing the tree at the root. Our base condition would be when the root is null at which point we simply return. If the value we found is that of either x or y, we assign the parent and depth for our respective node and return. In other cases, we increment the depth and parent pointer and move to the left subtree and then the right subtree. 

Finally, we check if the conditions hold and return result accordingly.
```
bool isCousins(Node<int>* root, int x, int y) {
    if (root->data == x || root->data == y)
        return false;
    process(root, nullptr, 0, x, y);
    return ((xp != yp) && (xd == yd));
    
}
```

### LCA

**Find the least common ancestor for two given nodes.**

Example:

```cpp
LCA of 6 and 8 is 11
            12
           /  \
         11   10
        /  \   
       9    8 
      / \    \
     7  3     1
    / \ 
   6   4
```

Naive approach would be to go through the tree and determine the path for each node that we're interested in and save the path in an external data structure. Once done, we can then compare the path to find the first node that is common in both paths. This requires extra space.

Better approach would be to traverse the tree and if the current node is one of those that we're interested in, we can return true. As soon as we get to a node that has both the left and right returned values as true, we've found our ancestor. The trick here is to push up the tree what we found.
 
 So, in the example above, when 6 is found, it returns to 7 with the value `true`. Therefore, `7->left = true`. 7 checks its right and finds a false so 7 returns back to 9 as a true. Now, 9's left is true and its right is checked and a false is  returned. BUT, when 9 returns to 11, it returns a true. This means that 11's left is true. 11 then checks its right subtree to find that 8 is present. Then 11 sees that its left was also true so in this case, we've found our LCA. 11 is the first node that has a true return value from both its left and right subtrees. 

```cpp
bool helper(Node<int>* root, int x, int y){
    if (!root)
        return false;
    if (root->data == x || root->data == y)
        return true;
    auto L = helper(root->left, x, y);
    auto R = helper(root->right, x, y);
    if (L&&R){
        cout << "Found LCA! " << root->data << endl;
    }
    return (L || R);
}
```

Running time $O(N)$, space $O(h)$.

### LCA with parent

**Given a tree with parent pointers for each node, find the LCA for two given nodes**.

Naive approach: Chart the path all the way up to the root for the first node and save in an external data structure (such as a hash table). Then start at the second node and at each node in its path, check if the hash-table has this value. If so, return this node as the LCA. Otherwise, move node2 pointer up one level. This approach requires extra space.

Better approach: Find the height for each node. If they're the same keep moving both in tandem up the tree until either nullpointer is encountered or both point to the same node. If the height for each node is not the same, move the one that is at a greater depth to the other node's depth and then move both pointers in tandem.



### Binary sum from root to leaf

**Given a binary tree, each node has value 0 or 1.  Each root-to-leaf path represents a binary number starting with the most significant bit.  For example, if the path is 0 -> 1 -> 1 -> 0 -> 1, then this could represent 01101 in binary, which is 13.For all leaves in the tree, consider the numbers represented by the path from the root to that leaf.Return the sum of these numbers.**

Brute force approach would be to take each path and store it as a string. Then once you have all the paths, convert each string to its integer representation and sum those values. This requires extra space and the string to int conversion might lead to overflow. 

A better approach would be to calculate the sum as we traverse the tree. This approach will make use of the fact that the paths to leaves share nodes. For example, for paths 1-1-0 and 1-1-1, the first two bits are shared so we don't need to get the values for that path again.
 
 We'll choose to traverse the tree in pre-order fashion since we need to capture the value of the current node first and then move to its left and right children. Also, as we've traversing, we need to keep track of the sum. To do so, we'll use this formula:

- OldValue * Base + ReadValue = NewValue

Explanation can be found [here](/primitive-types#converting-binary-to-decimal). Then, as soon as we reach a node that has no children, we can update a global sum variable with the current path's sum and return.


```cpp
int sum = 0;

void getSum(Node<int>* root, int curr){
    curr = (curr * 2) + root->data;
    if (!root->left && !root->right){
        sum += curr;
        return;
    }
    getSum(root->left, curr);
    getSum(root->right, curr);
}

int sumRootToLeaf(Node<int>* root) {
    getSum(root, 0);
    return sum;
}
```

Running time is $O(N)$ and space is $O(h)$.

### Path to leaf with sum

**Given a root to a tree, find the path that has sum equal to the given sum**

This is a simple problem. All we need to do is traverse the tree and keep track of the path taken and the sum. When we reach a leaf node, we need to check the path's sum and see if it equals the passed value. If so, print the path, if not, continue.

```cpp
void helper(Node<int>* root, int w, int currw, string currPath){
    if (!root){
        return;
    }
    cout << "curr weight: " << currw << " and path so far: " << currPath << endl;
    currw += root->data;
    stringstream ss;
    ss << root->data;
    string temp;
    ss >> temp;
    currPath += temp;
    if (currw == w){
        cout << "Found path: " << currPath;
        path = currPath;
        return;
    }
    helper(root->left, w,currw,currPath);
    helper(root->right, w, currw, currPath);
}

void sumPath(Node<int>* root, int w){
    helper(root, w, 0, "");
}
```

### In-order without recursion

**Given root to a binary tree, save in-order traversal to a vector and return the vector. Do so, without using recursion.**

The first thing that comes to mind is that we need to somehow replicate the call stack. To do so, we'll use the stack! In-order traversal is left, node and then right. So, we'll store the left subtree on a stack, then pop off the stack, push the element to answer vector and then process the right half.
 
 Start inside out: worry first about how you're going to process each node (that is the inside while call) and then take care of when to end (outside while call). We exit once we realize that the stack is empty:

```cpp
vector<int> ans;
stack<Node<int>*> s;

void Inorder(Node<int>* root){
    //Stack to keep track of elements
    stack<Node<int>*> s;
    //Keep running until explicitly broken
    while (true){
        while (root){
            //Keep adding left children to the stack
            s.push(root);
            root = root->left;
        }
        
        if (s.empty()){
            return;
        }
        //Remove from top of stack,
        root = s.top();
        s.pop();
        ans.push_back(root->data);
        //move to right subtree and continue processing
        root = root->right;
    }
}
```

Running time: $O(N)$ and space is also $O(N)$ where $N$ is the number of nodes in the tree.

### Pre-order without recursion

**Return a vector with a tree's nodes ordered in pre-order fashion without using recursion**

Pre-order is node, left right. Again, move inside out. Concern yourself first with how you'd move in the tree. Ok, so you're at the root of say this tree:

```cpp
            12
           /  \
         11   10
        /  \   
       9    8 
      / \    \
     7  3     1
    / \ 
   6   4
```

So if you're at 12, you can again keep moving left until there are no more nodes to process. This time, what are you going to save on the stack? You must save the right child of the current node. That is because by moving down left node by node, you're already processing the node and the left subtree. All that is left to process are the right subtrees as we encounter them. We do so by saving those right subtree nodes on the stack.

We continue processing until the stack is empty:

```cpp
void PreOrder(Node<int>* root){
    stack<Node<int>*> s;
    
    while (true){
        while (root){
            ans.push_back(root->data);
            if (root->right)
                s.push(root->right);
            root = root->left;
        }
        
        if (s.empty())
            return;
        
        root = s.top();
        s.pop();
    }
}
```


### Find in-order successor

**The successor of a node in a binary tree is the node that appears immediately after the given node in an inorder traversal. Design an algorithm that computes the successor of a node in a binary tree. Assume that each node stores its parent.**

Example:

```cpp
Inorder (LNR) for tree below:

6 7 4 9 3 11 8 2 1 12 10

            12
           /  \
         11   10
        /  \   
       9    8 
      / \    \
     7  3     1
    / \      /
   6   4    2
```

The naive approach would be to ignore that there's a parent pointer and keep traversing in in-order fashion and when you get to the node you were interested in, you'd record the next node and return. However, this requires $O(N)$ time. 

A better approach is to break this down into possible combinations and then figure out the successor. Here are the possible scenarios:

1. The node is a leaf, it has no left or right children. This can have 2 cases:
    a. The leaf is a left-child: in this case the successor is the parent. Example: node 6
    b. The leaf is a right-child: in this case the successor is the parent after we move up from a left child. Example: node 3. Move to node 3's parent 9. Does 9 have a parent? Yes: 11. Is 9 the left child of 11? Yes. Then the successor to 3 is 11.
2. The node is not a leaf and has right child: Move to the right-subtree and find the node that has no left children, that node is the successor. Example: 11. 
3. The node is not a leaf and has no right child: Similar to 1b. Example: node 1, parent is 12. 

From the logic above, the code is pretty self explanatory. I've pulled out case 1b into its separate function for reuse in case 3:

```cpp
Node<int>* leftUpToParent(Node<int>* node){
    Node<int>* parent = node->parent;
    Node<int>* successor = nullptr;
    node = parent;
    parent = parent->parent;
    if (!parent)
        return nullptr;
    while(true){
        if (!parent){
            successor = nullptr;
        } else if (parent->left == node){
            successor = parent;
            break;
        } else {
            node = parent;
            parent = parent->parent;
        }
    }
    return successor;
}

Node<int>* getInOrderSuccessor(Node<int>* node){
    Node<int>* parent = node->parent;
    Node<int>* successor = nullptr;
    if (!parent)
        successor = node;
    else if (!node->left && !node->right && parent->left == node){
        //Is leaf and left child of parent
        successor = parent;
    } else if (!node->left && !node->right && parent->right == node){
        //Is leaf and right child of parent
        successor = leftUpToParent(node);
    } else if (node->right){
        //Node is not leaf and has a right subtree
        node = node->right;
        while (node->left)
            node = node->left;
        successor = node;
    } else if (node->left){
        //Node not leaf and has no righ child
        successor = leftUpToParent(node);
    }
    return successor;
}
```

Running time is $O(h)$ because at worst, we'd get a case where we're one level above leaf and the successor is the root. Space complexity is $O(1)$

### Form list from leaves

**Form a list from the leaves of a tree in left to right fashion**

Example:

```cpp
            12
           /  \
         11   10
        /  \   
       9    8 
      / \    \
     7  3     1
    / \      /
   6   4    2

Should return: 6 4 3 2 10

```

```cpp
vector<Node<int>*> allLeaves;

void generateList(Node<int>* root){
    if (!root->left && !root->right){
        cout << "Adding: " << root->data << endl;
        allLeaves.push_back(root);
        return;
    }
    generateList(root->left);
    generateList(root->right);
}
```

Running time $O(N)$, space, $O(h)$ + $O(l)$ where $l$ is the number of leaves. 

### Vertical Order Traversal

**Given a tree, return vertical order traversal for the tree**.

Example:

```cpp
            3
          /   \
        9     20
             /  \           
            15  7
```

If you go from left to right, you can see that 9 is by itself vertically. Nodes 3 and 15 align vertically and finally 20 and 7 are by themselves:

```cpp
Input: [3,9,20,null,null,15,7]
Output: [[9],[3,15],[20],[7]]
```

It is clear that we need to traverse the tree in some order and keep track of the position relative to the root. Let's start with this step. How do we keep track of how far to the right or the left a node is with respect to the root? We can assign integers to each position. How do we go about deciding which integer gets assigned where. An insight that we can derive is that if we go left, we can perform one arithmetic operation and if we go right we can perform a complementary operation. For example:

```cpp

    0   
     \
      1
     /
    0    
```

Notice how the two nodes that align have the same value! We got that by adding 1 if we go to the right child and subtracting one if we go to the left child. Let's label our tree and see if this scheme works (the labels are in parenthesis):

```cpp
            3 (0)
          /   \
    (-1) 9    20 (+1)
             /  \           
        (0) 15  7 (+2)
```

Notice how 3 and 15 have the same label, while all other labels are different. 

Let's look at the piece of code that assigns labels to each node and stores this information in a multi-map (multi-map because multiple nodes can have the same label):
```cpp
void verticalOrderTraversal(TreeNode* root, multimap<int,int>& info, int pos){
    if (!root)
        return;
    cout << "Pushing to map: " << pos << " -> " << root->val << endl;
    info.insert({pos,root->val});
    verticalOrderTraversal(root->left, info, pos-1);
    verticalOrderTraversal(root->right, info, pos+1);
}
```

Once completed, our multi-map (which is in sorted order) will look like this for the tree above:
```cpp
Pushing to map: 0 -> 3
Pushing to map: -1 -> 9
Pushing to map: 1 -> 20
Pushing to map: 0 -> 15
Pushing to map: 2 -> 7
```

Finally, we populate our vector of vectors to return vertical order traversal information:

```cpp

vector<vector<int>> verticalOrderTraversal(TreeNode* root){
    vector<vector<int>> ans;
    multimap<int,int> info;
    verticalOrderTraversal(root, info, 0);
    
    multimap<int,int>::iterator itr = info.begin();
    int prev = numeric_limits<int>::min();
    while (itr != info.end()){
        vector<int> curr;
        curr.push_back(itr->second);
        prev = itr->first;
        itr++;
        while (itr->first == prev){
            curr.push_back(itr->second);
            itr++;
        }
        ans.push_back(curr);
    }
    
    return ans;
}
```

### Remove leaf nodes with given value

**Given a binary tree root and an integer target, delete all the leaf nodes with value target. Note that once you delete a leaf node with value target, if it's parent node becomes a leaf node and has the value target, it should also be deleted (you need to continue doing that until you can't).**

This is an interesting problem. We're to keep deleting nodes until leaf nodes do not have target value. Here, we'll use a recursive approach. We'll keep recursing until we get to a leaf node and find that the leaf node has target value. If so, we'll delete it and return null. In the process, we'll automatically update inner nodes' left and right children and then check again to see if the newly created leaf nodes have target value. 

Example:

```cpp

        1
     /     \
   3       4 
  /      /  \   
 4     3    3 --> Interesting node
           /
          3 --> Child node
```
Say we're at the child node and find that it's a leaf (by checking if child->left and child->right is null). If so, we make child node null and return. At this point, our tree looks like this:

```cpp

        1
     /     \
   3       4 
  /      /  \   
 4     3    3 --> Interesting node
           /
         NULL --> Child node
```

Now, once we return back to interesting node, we find that the interesting node has both children as null and has the target value as well, so we make interesting node null and return:

```cpp

        1
     /     \
   3       4 
  /      /  \   
 4     3    NULL --> Interesting node
           /
         NULL --> Child node
```

Using this approach, we'll recursively make inner nodes null if they match target.

Here's the code for this logic:

```cpp
TreeNode* removeLeafNodes(TreeNode* root, int target) {
    if(!root)
        return nullptr;
    root->left = removeLeafNodes(root->left, target);
    root->right = removeLeafNodes(root->right, target);

    if(!root->left && !root->right && root->val == target)
        return nullptr;
    return root;
}
```

### Diameter of a tree
**Given a binary tree, you need to compute the length of the diameter of the tree. The diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the root.**

Example:

```cpp
      1
    /   \
  4     11 
 / \     \
13  20    7
   /
  21
```

If we have the tree above, our diameter would comprise of the following nodes: 21-2-4-1-11-7 for a length of 5. In order to determine the diameter, what information do we need to store for each node? According to the definition, diameter is the length of the longest path, so for each node we need to keep track of longest path encountered in left subtree and right subtree. When we're returning from a node, we'll then return the max of the two lengths. During the process, we'll also keep track of the longest length encountered so far in a passed-by-reference variable:

```cpp
int diameterOfBinaryTreeHelper(TreeNode* root, int& maxLen){
    if (!root)
        return 0;
    int left = diameterOfBinaryTreeHelper(root->left, maxLen);
    int right = diameterOfBinaryTreeHelper(root->right, maxLen);
    if (left + right > maxLen)
        maxLen = left+right;
    return (1 + max(left,right));
}

int diameterOfBinaryTree(TreeNode* root) {
    int maxLen = 0;
    diameterOfBinaryTreeHelper(root, maxLen);
    return maxLen;
}
```

We'll start with calling `diameterOfBinaryTree()` that initializes our reference variable `maxLen` to 0. It then calls the helper function that performs the steps that we discussed earlier. Running time: $O(N)$ where $N$ is the number of nodes and space complexity $O(h)$ where $h$ is the height of the tree.


### Level order traversal
**[Problem]:(https://leetcode.com/problems/binary-tree-level-order-traversal/) Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).**

Example: 
```cpp
    3
   / \
  9  20
    /  \
   15   7
```

Would return:

```cpp
[
  [3],
  [9,20],
  [15,7]
]
```

Ok, so we're to start at the root and keep track of the nodes at each level. We must then add all nodes at this level to the final answer. In order to keep track of the level info, we need to pass level number down from parent to child nodes. For example, `3`'s level is 0, and when we go to process `9` and `20`, we'll pass level as `root + 1`. 

Can we use one of our conventional order traversal to solve this? Let's see: we want to process the node first and then its left and right children. That is because we'll have to process the current node's level and transfer that information to the child nodes. It sounds like node, then left, then right. That is nothing but pre-order traversal! That takes care of the levels. At the end of this piece of logic, we'll have the information for each node and its level. Next, all we need to do is push each node and its level to a vector and push that vector to the final answer.

What is the best way to store our levels so that we have it in sorted order AND can iterate over it quickly? A map! A map uses balanced tree behind the scenes so it'll take $O(logN)$ for each lookup. Here's this logic converted to code:

```cpp
void levelOrderHelper(TreeNode* root, int level, map<int, vector<int>>& m){
    if(!root)
        return;
    //Process current node by pushing
    //current level and node to the map
    m[level].push_back(root->val);
    //Pass current level + 1 to left
    //and right children
    levelOrderHelper(root->left, level+1, m);
    levelOrderHelper(root->right, level+1, m);
}

vector<vector<int>> levelOrder(TreeNode* root){
    map<int, vector<int>> m;
    levelOrderHelper(root, 0, m);
    vector<vector<int>> ans;
    //populate the final vector:
    for (auto i: m){
        ans.push_back(i.second);
    }
    
    return ans;
}
```

We can also use BFS to get level order traversal. For this section we'll use the problem where we need to return level order in a vector of vectors BUT from bottom up. For example:

```cpp
    3
   / \
  9  20
    /  \
   15   7
```

should return:

```cpp
[
  [15,7],
  [9,20],
  [3]
]
```

In this approach, we push each node to a queue. Why queue? Because we need to process the nodes as we encounter them since the problem wants us to return nodes close together in the same vector. Ok, so we'll start with root: 

```cpp
queue: [3]
vector: <>
deque: [<>]
```

Now what? We'll process `3` by saving to a deque (double ended queue) of vectors where each vector is a collection of nodes on that level in left to right order (since the question asks for that order). This will help us save time when we need to return at the end in reverse order. We'll save time by placing elements correctly as we process them by using deque's `push_front()` call.

Ok, so we have `3` in the queue, we keep iterating until the current queue is empty (ie 1 iteration). On each iteration we'll push the value to our vector:

```cpp
queue: []
vector: <3>
deque: [<>]
``` 

Since we have no more elements in the queue, we can push_front the vector to our deque:

```cpp
queue: []
vector: <3>
deque: [<3>]
```

Before we move on, we'll also push 3's left and right child to the queue:

```cpp
queue: [9,20]
vector: <3>
deque: [<3>]
```

At the end of this iteration, we'll have the following:

```cpp
queue: [15,7]
vector: <9,20>
deque: [<9,20>,<3>]
```

Notice how 9,20 is at the front. We'll continue building our deque and at the end we'll just copy over vectors from deque to our vector of vectors and return. The key insight here is that we empty the queue on each level so that we know the correct number of nodes on each level. Here's the logic for this code:

```cpp
vector<vector<int>> test(TreeNode* root){
    vector<vector<int>> ans;
    deque<vector<int>> deck;
    queue<TreeNode*> q;
    if (!root)
        return ans;
    q.push(root);
    while (!q.empty()){
        int size = int(q.size());
        vector<int> levelVals;
        while (size != 0){
            TreeNode* curr = q.front();
            q.pop();
            if (curr->left){
                q.push(curr->left);
            }
            
            if (curr->right){
                q.push(curr->right);
            }
            levelVals.push_back(curr->val);
            size--;
        }
        
        deck.push_front(levelVals);
    }
    
    for (int i = 0; i < deck.size(); i++){
        ans.push_back(deck[i]);
    }
    return ans;
}
``` 

`size` keeps track of current level nodes while we continue to push elements to the queue!
 

### Conclusion

- Best solutions have running time $O(N)$ and space complexity as $O(h)$ (when using recursion).
- If you're required to keep track of more than one condition (such the height at that node and if it is balanced), consider returning a struct instead of just height or just a boolean (for isBalanced) to encapsulate both pieces of information as shown [here](/binary-tree-problems#check-if-balanced)
- Always start at the base case when working with trees. For example, what do we do when the node is null? Next, handle the case where the node has no more children. Next choose a middle node and decide what to return based on the problem you're trying to solve, then finally add the missing steps. 
- Whenever you recurse and go down a subtree, make sure you capture the result and return if there's a return condition that needs to hold. That way you prevent yourself from going through the entire tree when the first subtree already breaks the condition you're trying to check for.
- If you need to transmit some information to parent from child, return a value AFTER you've processed everything in the recursive call. Look at [lca](#lca) for an example. Notice how we return L if L is not null and R if R is not null, otherwise we return nullptr.
