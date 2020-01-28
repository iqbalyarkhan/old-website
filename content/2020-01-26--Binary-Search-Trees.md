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

#### Max

```cpp{numberLines: true}
template<typename T>
T BinaryTree<T>::FindMax(){
    Node* curr = root;
    while (curr->right != nullptr){
        curr = curr->right;
    }
    return curr->item;
}
```

The max value in the tree is the right-most node (it can be in the leaf position or an internal node with just the left child). For example, if you have this tree:

```
    10
   /  \
  4   21
     /
    20 

```

the max value is `21` even though it is not a leaf however it is the right-most node in the tree. A simpler example would be:

```

    10
   /  \
  4   21
     /  \
    20  32
``` 

Here, max is `32` which is the right-most node in the tree. Therefore, keep moving to the right child of current node until there is no right child to visit.

#### Min

```cpp{numberLines: true}
template<typename T>
T BinaryTree<T>::FindMin(){
    Node* curr = root;
    while (curr->left != nullptr){
        curr = curr->left;
    }
    return curr->item;
}
```

Here, the minimum element is the left-most node in the tree. Therefore, keep moving to the left child of current node until there is no left child to visit.

#### Delete

This is the hardest operation you can perform on a binary search tree. That is because once a node is removed, we still want the tree to maintain its binary search properties (values in left sub-tree must be less than the root and values in the right subtree must be greater than the root). 

Let's have a look at the possibilities when we're deleting a node from the tree: the node marked for deletion can:
- have no children
- have one child
- be root of a subtree (ie more than 1 children and grandchildren)

Before we dive into each of the scenarios above, there is one piece of logic that is common for each case: before we can delete the element, we need to find it first, which is similar to what we've got for our [find](/binary-search-trees#find) function:

```cpp{numberLines: true}
template<typename T>
void BinaryTree<T>::Delete(T itemToDelete){
    size--;
    Node* nodeToBeDeleted = root;
    Node* prev = nullptr;
    /*
     First find the node we need to delete
     while maintaining prev and curr pointers
     */
    while (nodeToBeDeleted != nullptr){
        if (itemToDelete < nodeToBeDeleted->item){
            //Item less than curr: look in left subtree
            prev = nodeToBeDeleted;
            nodeToBeDeleted = nodeToBeDeleted->left;
        } else if (itemToDelete > nodeToBeDeleted->item) {
            //Item greater than curr: look in right subtree
            prev = nodeToBeDeleted;
            nodeToBeDeleted = nodeToBeDeleted->right;
        } else {
            //We found the item
            break;
        }
    }
    
    //nodeToBeDeleted now is pointing to the node to be deleted
    //and prev is pointing either to null or parent of
    //nodeToBeDeleted
}
```

The code follows this logic: it starts with a pointer to root called `nodeToBeDeleted` and a `prev` pointer that'll follow `nodeToBeDeleted` but would be one step "slower" than `prev`. For example if we have this tree:

```
    10
   /  \
  4   21 ---> prev
     /  \
    20  32  ---> nodeToBeDeleted

```

and want to delete leaf node with value 32, we want a prev for some housekeeping duties such as making `prev->right` null. Additionally, having a prev pointer would allow us to move nodes if our tree was larger (which I'll demonstrate in the coming sections).

In short, once the code above executes, we'll have our 2 pointers `nodeToBeDeleted` (always pointing to node to be deleted) and `prev` (pointing either to the parent of the node to be deleted or nullptr if we're deleting the root).

Ok, so we've got the node we want to delete and a `prev` pointer, let's consider the 3 cases we outlined above 

##### Has no children

Here, we're simply deleting the leaf node. For example, we might be deleting node with value 32 from this tree:

```
    10
   /  \
  4   21 ---> prev
     /  \
    20  32  ---> nodeToBeDeleted

```

In this case, we need to delete 32 (to free up memory being used by that node) and set `prev`'s right pointer (could be left if we had a different example) to null. All we have to do is, convert this logic to code: (I've added to the block of code that we saw above):

```cpp{numberLines: true}
template<typename T>
void BinaryTree<T>::Delete(T itemToDelete){
    size--;
    Node* nodeToBeDeleted = root;
    Node* prev = nullptr;
    /*
     First find the node we need to delete
     while maintaining prev and curr pointers
     */
    while (nodeToBeDeleted != nullptr){
        if (itemToDelete < nodeToBeDeleted->item){
            //Item less than curr: look in left subtree
            prev = nodeToBeDeleted;
            nodeToBeDeleted = nodeToBeDeleted->left;
        } else if (itemToDelete > nodeToBeDeleted->item) {
            //Item greater than curr: look in right subtree
            prev = nodeToBeDeleted;
            nodeToBeDeleted = nodeToBeDeleted->right;
        } else {
            //We found the item
            break;
        }
    }
    
    //nodeToBeDeleted now is pointing to the node to be deleted
    //and prev is pointing either to null or parent of
    //nodeToBeDeleted

    /**
     Determine the type of node we're deleting:
     -leaf
     -node with 1 child
     -node with 2 children
     */
    if (nodeToBeDeleted->left == nullptr && nodeToBeDeleted->right == nullptr){
        //Deleting a leaf:
        if (prev->left == nodeToBeDeleted){
            prev->left = nullptr;
        } else {
            prev->right = nullptr;
        }
        delete nodeToBeDeleted;
        nodeToBeDeleted = nullptr;
    }
}
```

On line 35 we check to see if the left and right pointers for `nodeToBeDeleted` are `nullptr`s and if so we've got ourselves a leaf node. In that case, we check to see if the leaf `nodeToBeDeleted` is the left child or the right child. We then set the corresponding child to null and delete `nodeToBeDeleted` and set it to null as well. Now, our tree would look like this:

```
    10
   /  \
  4   21 ---> prev
     / 
    20  

```

##### Has one child

What if the node we want to delete has a child? For example, we have this:

```
          10
        /   \
      4      18  -----> prev
    /  \    /  \
   3   6   13  21 -----> nodeToBeDeleted
              /
             20
            /
           19  
```

In that case, all we need to do is stick the children of `nodeToBeDeleted` in the same direction as `nodeToBeDeleted`. For example, in the tree above, `nodeToBeDeleted` is the right child of `prev`, so the left child of `nodeToBeDeleted` must be placed as the new right child of `prev`:

```
          10
        /   \
      4      18  -----> prev
    /  \    /  \
   3   6   13  20
              /
             19
```
When converting this logic to code, we get:

```cpp{numberLines: true}
template<typename T>
void BinaryTree<T>::Delete(T itemToDelete){
    size--;
    Node* nodeToBeDeleted = root;
    Node* prev = nullptr;
    /*
     First find the node we need to delete
     while maintaining prev and curr pointers
     */
    while (nodeToBeDeleted != nullptr){
        if (itemToDelete < nodeToBeDeleted->item){
            //Item less than curr: look in left subtree
            prev = nodeToBeDeleted;
            nodeToBeDeleted = nodeToBeDeleted->left;
        } else if (itemToDelete > nodeToBeDeleted->item) {
            //Item greater than curr: look in right subtree
            prev = nodeToBeDeleted;
            nodeToBeDeleted = nodeToBeDeleted->right;
        } else {
            //We found the item
            break;
        }
    }
    
    //nodeToBeDeleted now is pointing to the node to be deleted
    //and prev is pointing either to null or parent of
    //nodeToBeDeleted

    /**
     Determine the type of node we're deleting:
     -leaf
     -node with 1 child
     -node with 2 children
     */
    if (nodeToBeDeleted->left == nullptr && nodeToBeDeleted->right == nullptr){
        //Deleting a leaf:
        if (prev->left == nodeToBeDeleted){
            prev->left = nullptr;
        } else {
            prev->right = nullptr;
        }
        delete nodeToBeDeleted;
        nodeToBeDeleted = nullptr;
    } else if (nodeToBeDeleted->left == nullptr || nodeToBeDeleted->right == nullptr){
        //Deleting node with just one child
        Node* temp = nullptr;
        nodeToBeDeleted->right == nullptr ? temp = nodeToBeDeleted->left : temp = nodeToBeDeleted->right;
          
        if (nodeToBeDeleted == prev->right){
            delete nodeToBeDeleted;
            nodeToBeDeleted = nullptr;
            prev->right = temp;
        } else {
            delete nodeToBeDeleted;
            nodeToBeDeleted = nullptr;
            prev->left = temp;
        }
    } 
}
```

On line 44 we check to see if either one of the children (left or right but not both) is a nullptr. If so, we first create a temporary pointer on line 45 called `temp` and check to see which child is not null. If right is null, we point `temp` to left child otherwise we point `temp` to right child. Next, we delete `nodeToBeDeleted` and stick temp in the right spot.

##### Is root of a subtree (ie more than 1 children and grandchildren)

Ok, so now what if we have a tree and want to delete the node marked:

```
          10  -----> prev
        /   \
      4      18  -----> nodeToBeDeleted
    /  \    /  \
   3   6   13  21 
              /
             20
            /
           19  
```

What node should replace the `nodeToBeDeleted`? The value there should still keep the binary search tree properties intact. To do so, we realize that the value that must go there should satisfy this inequality: 
$$$ 
18 <  X  < 21 
$$$

```
          10  -----> prev
        /   \
      4      X  -----> new node here
    /  \    /  \
   3   6   13  21 
              /
             20
            /
           19  
```

- $X$ must be greater than 18 because all values greater than 18 would keep the subtree with node 13 (and possibly other nodes in that subtree if present) in line with binary search tree properties. 

- $X$ must be less than 21 because 21 will be the right child of this new value and therefore must be greater than $X$. 

That leaves us with 2 options in our tree: nodes with value 19 and 20. Say we choose 20, our tree will look like this:



```
          10  -----> prev
        /   \
      4      20  -----> new node here
    /  \    /  \
   3   6   13  21 
              /
             19  
```

This tree breaks the binary search tree properties since 19, which is less than 20, is in the right subtree of 20. That couldn't be right. Let's try 19 and see what our tree looks like:


```
          10  -----> prev
        /   \
      4      19   -----> new node here
    /  \    /  \
   3   6   13  21 
              /
             20
```

That looks alright! We've got the binary search tree properties intact and all nodes are in the right subtrees. 

So, to summarize:

 **when we delete a node, we want the smallest value from the right subtree to replace the deleted node. This smallest value from the right subtree is the left most node in the right subtree**  
 
 From our original tree:

```
          10  -----> prev
        /   \
      4      18  -----> nodeToBeDeleted
    /  \    /  \
   3   6   13  21 
              /
             20
            /
           19 
          ~~~  
```  

19 is the value that is the smallest value from the right subtree of the node to be deleted:

```

       18  -----> nodeToBeDeleted
      /  \
     13  21 
        /
      20
     /
    19 
   ~~~  
```  

In the example we looked at above, the smallest value from the right subtree,19, had no right children. It could be that we might get a tree where the smallest value will have a right child. (Think about why it can't have a left child? That is because if it did, we'd be looking at that left child instead of its parent). If there is a right child of this left-most node, just make this right child the left child of the grandparent node:

 To demonstrate this, say this is what our tree looks like:
 
 ```
           10  ----> nodeToBeDeleted
         /   \
       4      20  
     /  \    /  \
    3   6   13  21 
           /   /
         11   19
          \
          12  
 ```

If we're deleting the root node, 10, we want the left-most node in the right sub-tree. We go down the tree and find that node with value 11 is the left-most node in the right subtree. But wait, 11 has a right child of value 12. If we remove 11, what would happen to 12:

 
 ```
           10  ----> nodeToBeDeleted
         /   \
       4      20  
     /  \    /  \
    3   6   13  21 
           /   /
11 gone->    19
          \
          12  -------> What to do with 12????
 ```

All you need to do is make 12 and any children it might have, the left child of 13, its grandparent:

 
 ```
           11  ----> 11 added here
         /   \
       4      20  
     /  \    /  \
    3   6   13  21 
           /   /
          12  19
 ```

Ok, so to summarize, if you're deleting a node with both children present:
 - go to the right subtree of the node to be deleted 
 - look for the left most child of this right subtree (you can also search for right most child in left subtree)
 - make any children in the right subtree of this left most child the left children of its grandparent
 - replace deleted node with this left most child
 
 Converting this logic to code, we get:
 
 ```cpp{numberLines: true}
 template<typename T>
 void BinaryTree<T>::Delete(T itemToDelete){
     size--;
     Node* nodeToBeDeleted = root;
     Node* prev = nullptr;
     /*
      First find the node we need to delete
      while maintaining prev and curr pointers
      */
     while (nodeToBeDeleted != nullptr){
         if (itemToDelete < nodeToBeDeleted->item){
             //Item less than curr: look in left subtree
             prev = nodeToBeDeleted;
             nodeToBeDeleted = nodeToBeDeleted->left;
         } else if (itemToDelete > nodeToBeDeleted->item) {
             //Item greater than curr: look in right subtree
             prev = nodeToBeDeleted;
             nodeToBeDeleted = nodeToBeDeleted->right;
         } else {
             //We found the item
             break;
         }
     }
     
     //nodeToBeDeleted now is pointing to the node to be deleted
     //and prev is pointing either to null or parent of
     //nodeToBeDeleted
 
     /**
      Determine the type of node we're deleting:
      -leaf
      -node with 1 child
      -node with 2 children
      */
     if (nodeToBeDeleted->left == nullptr && nodeToBeDeleted->right == nullptr){
         //Deleting a leaf:
         if (prev->left == nodeToBeDeleted){
             prev->left = nullptr;
         } else {
             prev->right = nullptr;
         }
         delete nodeToBeDeleted;
         nodeToBeDeleted = nullptr;
     } else if (nodeToBeDeleted->left == nullptr || nodeToBeDeleted->right == nullptr){
         //Deleting node with just one child
         Node* temp = nullptr;
         nodeToBeDeleted->right == nullptr ? temp = nodeToBeDeleted->left : temp = nodeToBeDeleted->right;
           
         if (nodeToBeDeleted == prev->right){
             delete nodeToBeDeleted;
             nodeToBeDeleted = nullptr;
             prev->right = temp;
         } else {
             delete nodeToBeDeleted;
             nodeToBeDeleted = nullptr;
             prev->left = temp;
         }
     } else {
       //Deleting node with 2 children
       Node* replaceWith = nodeToBeDeleted->right;
       Node* newPrev = nodeToBeDeleted->right;
       while (replaceWith->left != nullptr){
           newPrev = replaceWith;
           replaceWith = replaceWith->left;
       }
       
       if (replaceWith->right != nullptr){
           newPrev->left = replaceWith->right;
       } else {
           newPrev->left = nullptr;
       }
       replaceWith->left = nodeToBeDeleted->left;
       replaceWith->right = nodeToBeDeleted->right;
       if (prev != nullptr){
           if (nodeToBeDeleted == prev->right){
               prev->right = replaceWith;
           } else {
               prev->left = replaceWith;
           }
       } else {
           //We're deleting root
           root = replaceWith;
       }
       
       delete nodeToBeDeleted;
       nodeToBeDeleted = nullptr;
     }
 }
 ```
 
 