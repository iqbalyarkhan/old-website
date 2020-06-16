---
title: Binary Search Trees
date: 2020-01-26
thumbnail: /post-images/bst.png
draft: false
extract: An analysis of binary search trees in C++
categories: 
    - Data Structures
tags:
  - Data Structures
  - Binary Search Trees
---

### Table of Contents

1. [Introduction](#introduction)

2. [Setup](#setup)

3. [Constructor](#constructor)

4. [Insert](#insert)

5. [Recursive Insert](#recursive-insert)

6. [Traversal](#traversal)

7. [Find](#find)

8. [Max](#max)

9. [Min](#min)

10. [Delete](#delete)

11. [Destructor](#destructor)

12. [Running time analysis](#running-time-analysis)

13. [Trees as arrays](#trees-as-arrays)

14. [Conclusion](#conclusion)

15. [Problems](#problems)
    * [Test if a Binary Tree satisfies the Binary Search Tree Property](#test-if-a-bt-satisfies-the-bst-property)
    
### Introduction

In this post I'll talk about a data structure called Binary Search Tree. This post is related to my [binary search](/binary-search) post where we discussed the binary search algorithm. BSTs use a similar idea but allow us to store our data efficiently so that we don't have to iterate over an entire array to perform various operations on the data that we stored. We'll look at this in more detail as we go over the code.

### Setup

I've got 2 generic classes: A `BinaryTree` class that includes another private class called `Node`. The initial setup looks like so:

```cpp{numberLines: true}
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
    void PreOrderTraversal(Node* curr);
    void PostOrderTraversal(Node* curr);
    void PostOrderRemoval(Node* curr);
    void RecursiveInsert(Node*& curr, T newItem);
    void FindMin(Node*curr);
    Node* RecursiveDeletePrivate(Node*, T);
    
public:
    BinaryTree();
    ~BinaryTree();
    void Insert(T newItem);
    bool Find(T itemToFind);
    void InOrderTraversal();
    void PreOrderTraversal();
    void PostOrderTraversal();
    T FindMax();
    T FindMin();
    void RecursiveDelete(T itemToDelete);
    
};
```

We'll go in more detail as we implement each of the functions in this class. The initial setup declares a generic class called `BinaryTree`. Inside this class, as a private member, we've got another class called `Node` to represent each node of the tree. The `Node` class will hold a generic item.

### Constructor

For the `BinaryTree` constructor, all we do is initialize the root pointer and the size variable to 0. Therefore, when the class is created, we setup our root that'll be used to access the tree:

```cpp
template<typename T>
BinaryTree<T>::BinaryTree(){
    root = nullptr;
    size = 0;
}
```
### Insert

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

### Recursive Insert

You can insert a new node into the tree recursively as well since a tree can be considered a recursive structure. You can expose a public function that is called `RecursiveInsert(T newItem)` that takes in a new item that is to be inserted in the tree. This function can then in turn call a private function that has access to the root and can recursively insert items into the tree.

```cpp{numberLines:true}
template<typename T>
void BinaryTree<T>::RecursiveInsert(Node*& curr, T newItem){
    if (curr == nullptr){
        Node* newNode = new Node;
        newNode->item = newItem;
        newNode->left = nullptr;
        newNode->right = nullptr;
        curr = newNode;
        return;
    }
    if (newItem < curr->item)
        RecursiveInsert(curr->left, newItem);
    if (newItem > curr->item)
        RecursiveInsert(curr->right, newItem);
}
```

The function signature takes in a reference to a pointer. This reference is to the root of the tree since we're modifying the root. Now, once this function is called we've got 3 different cases to handle: 

- one where the tree is empty and we're inserting for the first time (lines 3-9)
- one where the item to be inserted is less than the current item we're on (line 12)
- one where item to be inserted is greater than the current item we're on (line 14)

In each case, we make a recursive call based on the value we received and the item we're on. So, if we've got these calls:

```cpp
    bt.Insert(10);
    bt.Insert(4);
    bt.Insert(3);
    bt.Insert(6);
    bt.Insert(18);
    bt.Insert(13);
    bt.Insert(11);
    bt.Insert(12);
    bt.Insert(21);
    bt.Insert(20);
```

we'll have the following recursive call stack:

```cpp
bt.Insert(root, 10) --> first item being inserted therefore we execute lines 3-9

bt.Insert(root, 4) --> root points to 10 so item to be inserted < curr->item so we call the function again with curr->left
   bt.Insert(root->left, 4) --> We're now at nullptr so we can execute lines 3-9 and return  
 
```

This check and insert continues for each new insert. 

### Traversal

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

### Find

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

### Max

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

### Min

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

### Delete:

[Credit for this section](https://www.youtube.com/watch?v=gcULXE7ViZw&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P&index=36)

Let's look at a recursive approach that deletes a node from a BST:
 
 This is the function that our client will be calling:
 ```cpp{numberLines: true}
 template <typename T>
 void BinaryTree<T>::RecursiveDelete(T itemToDelete){
     //Need to capture returned root because we might be
     //deleting the actual root during the delete operation
     root = RecursiveDeletePrivate(root, itemToDelete);
 } 
 ```

As was explained earlier, this function takes in the `itemToDelete` and calls another private function with the `root` since the client won't have access to the root. The returned value of that private function is again captured by the `root` variable since our delete operation might edit the root of the tree as well.

As mentioned, it takes in a pointer to the root of the tree and the value of the item to be deleted, due to which the private helper function signature looks like so: 

```cpp
template <typename T>
typename BinaryTree<T>::Node* BinaryTree<T>::RecursiveDeletePrivate(Node* root, T itemToDelete){
    //Do something....
}
```

 First thing we want to do inside this function is to check whether the `root` passed is null which would occur when the tree is empty. We do so by adding this check:
 
 ```cpp{numberLines: true}
 template <typename T>
 typename BinaryTree<T>::Node* BinaryTree<T>::RecursiveDeletePrivate(Node* root, T itemToDelete){
     if (root == nullptr){
         return nullptr;
     }
```

Next, if the root is not null, we want to check to see if the item to be deleted lies in left subtree (`if itemToDelete < root->item`) or in the right subtree (`if itemToDelete > root->item`). If it lies in the left sub-tree, we make a recursive call to the same function, `RecursiveDeletePrivate` but this time the root as `root->left`. If it lies in the right sub-tree, we make a recursive call with root as `root->right`. For each of these two calls, the returned value would be the modified sub-tree so we set the respective subtree (right or left) based on the case we have:

 ```cpp{numberLines: true}
template <typename T>
typename BinaryTree<T>::Node* BinaryTree<T>::RecursiveDeletePrivate(Node* root, T itemToDelete){
    if (root == nullptr){
        return nullptr;
    } else if (itemToDelete < root->item){
        root->left = RecursiveDeletePrivate(root->left, itemToDelete);
    } else if (itemToDelete > root->item){
        root->right = RecursiveDeletePrivate(root->right, itemToDelete);
    } 
```

If the value is not less than or greater than `root->item`, it means that `itemToDelete` == `root->item`. In this case, we need to check whether the node we're about to delete (pointed to by `root`) has:
 - no children 
 - a right only child
 - a left only child 
 - two children
 
 If the root has no children, we can simply delete `root` and return `nullptr`:
  ```cpp{numberLines: true}
 template <typename T>
 typename BinaryTree<T>::Node* BinaryTree<T>::RecursiveDeletePrivate(Node* root, T itemToDelete){
     if (root == nullptr){
         return nullptr;
     } else if (itemToDelete < root->item){
         root->left = RecursiveDeletePrivate(root->left, itemToDelete);
     } else if (itemToDelete > root->item){
         root->right = RecursiveDeletePrivate(root->right, itemToDelete);
     } else {
         //We found the item.
         if (root->left == nullptr && root->right == nullptr){
             //It is a leaf node
             delete root;
             root = nullptr;
             return root;
             
         }
     }
 }
```

If the root has a right only child, we can make root point to this right child and delete root's old value:

 ```cpp{numberLines: true}
template <typename T>
typename BinaryTree<T>::Node* BinaryTree<T>::RecursiveDeletePrivate(Node* root, T itemToDelete){
    if (root == nullptr){
        return nullptr;
    } else if (itemToDelete < root->item){
        root->left = RecursiveDeletePrivate(root->left, itemToDelete);
    } else if (itemToDelete > root->item){
        root->right = RecursiveDeletePrivate(root->right, itemToDelete);
    } else {
        //We found the item.
        if (root->left == nullptr && root->right == nullptr){
            //It is a leaf node
            delete root;
            root = nullptr;
            return root;
            
        } else if (root->left == nullptr){
            //Node to be deleted has right children
            Node* temp = root;
            root = root->right;
            delete temp;
            temp = nullptr;
            return root;
            
        }
    }
}
```

If the root has a left only child, we can make the root point to this left child and delete the old root node:
 
 ```cpp{numberLines: true}
template <typename T>
typename BinaryTree<T>::Node* BinaryTree<T>::RecursiveDeletePrivate(Node* root, T itemToDelete){
    if (root == nullptr){
        return nullptr;
    } else if (itemToDelete < root->item){
        root->left = RecursiveDeletePrivate(root->left, itemToDelete);
    } else if (itemToDelete > root->item){
        root->right = RecursiveDeletePrivate(root->right, itemToDelete);
    } else {
        //We found the item.
        if (root->left == nullptr && root->right == nullptr){
            //It is a leaf node
            delete root;
            root = nullptr;
            return root;
            
        } else if (root->left == nullptr){
            //Node to be deleted has right children
            Node* temp = root;
            root = root->right;
            delete temp;
            temp = nullptr;
            return root;
            
        } else if (root->right == nullptr){
            //Node to be deleted has left children
            Node* temp = root;
            root = root->left;
            delete temp;
            temp = nullptr;
            return root;
        }
    }
}
```

And finally, if none of those conditions hold, it means that the root points to a node that has 2 children. In this case, we need to search for the smallest value in the right subtree (or the largest value in the left subtree but the example below shows the former) and write to root this new value. We'd then have 2 nodes with the same value. To delete this smallest child in the right subtree, we'll again call our `RecursiveDeletePrivate()` function but this time with root's right child and the value we just copied over:
 
 ```cpp{numberLines: true}
template <typename T>
typename BinaryTree<T>::Node* BinaryTree<T>::RecursiveDeletePrivate(Node* root, T itemToDelete){
    if (root == nullptr){
        return nullptr;
    } else if (itemToDelete < root->item){
        root->left = RecursiveDeletePrivate(root->left, itemToDelete);
    } else if (itemToDelete > root->item){
        root->right = RecursiveDeletePrivate(root->right, itemToDelete);
    } else {
        //We found the item.
        if (root->left == nullptr && root->right == nullptr){
            //It is a leaf node
            delete root;
            root = nullptr;
            return root;
            
        } else if (root->left == nullptr){
            //Node to be deleted has right children
            Node* temp = root;
            root = root->right;
            delete temp;
            temp = nullptr;
            return root;
            
        } else if (root->right == nullptr){
            //Node to be deleted has left children
            Node* temp = root;
            root = root->left;
            delete temp;
            temp = nullptr;
            return root;
        } else{
            //Node to be deleted has 2 children - left and right
            //Find min in right subtree
            Node* temp = root->right;
            
            while (temp->left != nullptr){
                temp = temp->left;
            }
            
            root->item = temp->item;
            root->right = RecursiveDeletePrivate(root->right, temp->item);
            
        }
    }
    return root;
}
```

Finally, after all these operations are done, we can return `root`.

Let's run through an example to see what is going on. Say our tree looks like this:

```

    10
   /  \
  4   21
     /  \
    15  32
     \
     20
``` 

#### Delete leaf node 20:

We get this call from our client:

```cpp
    root = RecursiveDeletePrivate(root, 20);
```

Before we start executing `RecursiveDeletePrivate()`, here is what we've got now:

```

    10 ---> root
   /  \
  4   21
     /  \
    15  32
     \
     20
``` 

`root` is not `nullptr` and `itemToDelete > root->item` we fall to line 8:

```cpp{numberLines: 8}
       root->right = RecursiveDeletePrivate(root->right, itemToDelete);
```

At this point we halt execution of the current run and make a new recursive call:

```cpp
//Recursive call stack:
10->right = RecursiveDeletePrivate(10->right, 20)
```

where `10->right` is actually the node with value 21. So now, this new call has our root positioned like so:

```

    10 
   /  \
  4   21 ---> root
     /  \
    15  32
     \
     20
``` 

So, we've called this: `RecursiveDeletePrivate(10->right, 20)` so our root is at node with value `21`. This time we fall to line 6:

```cpp{numberLines: 6}
       root->left = RecursiveDeletePrivate(root->left, itemToDelete);
```

so now our recursive call stack would look like this:

```cpp
//Recursive call stack:
10->right = RecursiveDeletePrivate(10->right, 20) // root = 21
        21->left = RecursiveDeletePrivate(21->left, 20) // root = 15
```

With this new call, we pause this recursive call on the call stack and start another recursive call with root as 15:

```

            10 
           /  \
          4   21 
             /  \
    root-->15   32
            \
            20
```

Again, we go inside `RecursiveDeletePrivate(21->left, 20)` and find that `itemToDelete > root->item` so we fall to line 8:

```cpp{numberLines: 8}
       root->right = RecursiveDeletePrivate(root->right, itemToDelete);

```

so we pause this recursive call and make another call. Our recursive call stack looks like this:

```cpp
//Recursive call stack:
10->right = RecursiveDeletePrivate(10->right, 20) // root = 21
        21->left = RecursiveDeletePrivate(21->left, 20) // root = 15
            15->right = RecursiveDeletePrivate(15->right,20) // root = 20
```

Our tree now looks like this:

```

    10 
   /  \
  4   21 
     /  \
    15  32
     \
     20 ---> root
``` 


On this recursive call, we fall to line 9 since we've found the item we were looking to delete. Check on line 11 holds true since the node has no children. So what we do is delete this node, set it to `nullptr` and return this root. So our recursive call stack now starts to unwind:

 ```cpp
 //Recursive call stack:
 10->right = RecursiveDeletePrivate(10->right, 20) // root = 21
         21->left = RecursiveDeletePrivate(21->left, 20) // root = 15
             15->right = RecursiveDeletePrivate(15->right,20) // root = 20
                root = 20 -> delete and return nullptr
 ```

The returned nullptr is assigned to `15->right`:

 ```cpp
 //Recursive call stack:
 10->right = RecursiveDeletePrivate(10->right, 20) // root = 21
         21->left = RecursiveDeletePrivate(21->left, 20) // root = 15
             15->right = RecursiveDeletePrivate(15->right,20) = nullptr // root = 20
                root = 20 -> delete and return nullptr
 ```

So, `15-right = nullptr` so our mini returned tree looks like this:

```
    15
     \
    nullptr
```

After this returns, our call stack has these calls left:


 ```cpp
 //Recursive call stack:
 10->right = RecursiveDeletePrivate(10->right, 20) // root = 21
         21->left = RecursiveDeletePrivate(21->left, 20) // root = 15
 ```

This mini tree is then returned to the call `21->left = RecursiveDeletePrivate(21->left, 20)` when it resumes. So our mini tree is attached to `21->left`:

```
     21
     /
    15
     \
    nullptr
```

Now our call stack has this call left:

```cpp
 //Recursive call stack:
 10->right = RecursiveDeletePrivate(10->right, 20) // root = 21
 ```
So for `10->right` we attach the result of `RecursiveDeletePrivate(10->right, 20)` which results in:

```
    10
     \
     21
     /
    15
     \
    nullptr
```

Now our call stack is empty and we finally return the root on line 46. Since we didn't touch any other nodes, all other connections remain as is. Notice how we went up the tree after deleting the node we were interested in. 

#### Delete node with one child 15:
Let's assume our tree looks like this:

```

    10 ---> root
   /  \
  4   21
     /  \
    15  32
     \
     20
``` 

Here is what the call stack would look like after each call (I've abbreviated the steps so that we can get to the point):


```cpp
 //Recursive call stack:
 10->right = RecursiveDeletePrivate(10->right, 15) // root = 21
    21->left = RecursiveDeletePrivate(21->left, 15) // root = 15
        root->15 : found our element-> return something...
 ```

At this point, here is what the tree looks like:

```

            10 
           /  \
          4   21 
             /  \
    root-->15   32
            \
            20
```

After root is pointing to 15, we've found our node to delete and we fall into the else on line 9. Here, we find that the case is:
`else if (root->left == nullptr)` and we go into this else if statement. Next, we create a `temp` pointer that also points to node with value 15:

```

            10 
           /  \
          4   21 
             /  \
temp/root-->15   32
             \
             20
```

and `root` moves to `root->right`:

 ```
 
             10 
            /  \
           4   21 
              /  \
     temp-->15   32
             \
     root--> 20
 ```

Next, we delete `temp` and make `temp` point to `nullptr`:

 ```
 
             10 
            /  \
           4   21 
              /  \
    temp-->NULL  32
             \
     root--> 20
 ```

and we finally return `root`. Now remember, the recursive call stack uptill this point is still this:

```cpp
 //Recursive call stack:
 10->right = RecursiveDeletePrivate(10->right, 15) // root = 21
    21->left = RecursiveDeletePrivate(21->left, 15) // root = 15
        root->15 : found our element-> return something...
 ```

So, when we return root, we're returning the pointer pointing to node 20. Thus, our call stack starts to unwind like so:

We return 20:
```cpp
 //Recursive call stack:
 10->right = RecursiveDeletePrivate(10->right, 15) // root = 21
    21->left = RecursiveDeletePrivate(21->left, 15) // root = 15
        root->15 : found our element-> return something ie 20
 ```

Therefore, the `21->left` call now has a value that it can be assigned:

```cpp
 //Recursive call stack:
 10->right = RecursiveDeletePrivate(10->right, 15) // root = 21
    21->left = RecursiveDeletePrivate(21->left, 15) = 20
 ```

so our mini tree is:

```

     21
    /
  20 
```

and then that call returns back to give a value for `10->right`:

```cpp
 //Recursive call stack:
 10->right = RecursiveDeletePrivate(10->right, 15) = 21->left's result
 ```

so our mini tree now is:


```
   10
     \
     21
    /
  20 
```

at which point 10 returns by returning root on line 46 and our recursive call stack is empty. Notice how `15`'s old spot is now occupied by 20. The tree above only shows the links that we went through while we were going up our recursive call stack. All other nodes and their children remained untouched.  

#### Delete node with two children 21:

And finally the last case that could happen, delete node with 2 children, ie 21:

```

    10 ---> root
   /  \
  4   21
     /  \
    15  32
     \
     20
``` 

Again, let's go down the recursive call stack. Since 21 > 10, we go into the else if on line 7 and make the call to `Delete`:

```cpp
 //Recursive call stack:
 10->right = RecursiveDeletePrivate(10->right, 21) // root = 21
   we've found our element, do something....
 ```

Our tree looks like this now:

```

    10 
   /  \
  4   21 ---> root
     /  \
    15  32
     \
     20
``` 

Next, we find that our `root->item == itemToDelete` so we fall into the else on line 9. Here, we fall all the way down to line 32 since our `root` has 2 children. So, wwe create a `temp` pointer and point to `root->right`:

```

    10 
   /  \
  4   21 ---> root
     /  \
    15  32 ---> temp
     \
     20
``` 
Next, we keep moving to the left child of `temp` until `temp->left == nullptr` which occurs on the very first iteration so we break out of the `while` loop. Next, we assign `temp`'s value to `root`:

 ```
 
     10 
    /  \
   4   32 ---> root
      /  \
     15  32 ---> temp
      \
      20
 ``` 

Now notice, we've got 2 nodes with the same value. We need to delete the node that temp is pointing to. Before we do that, let's remind ourselves what the recursive call stack looks like:

```cpp
 //Recursive call stack:
 10->right = RecursiveDeletePrivate(10->right, 21) // root = 21
    we've found our element, do something....
 ```

Next, we make the following call: 

```cpp
root->right = RecursiveDeletePrivate(root->right, temp->item);
```

due to which our tree pointers look like this:


 ```
 
     10 
    /  \
   4   32 
      /  \
     15  32 ---> root
      \
      20
 ``` 


which adds this to our recursive call stack:

```cpp
 //Recursive call stack:
 10->right = RecursiveDeletePrivate(10->right, 32) // root = 21
   32->right = RecursiveDeletePrivate(32->right, 32)
 ```

Ok, so we call `RecursiveDeletePrivate(32->right, 32)`. Here, we find that root actually points to the value we want to delete and, as a result, we immediately fall all the way down to line 11 and find that the root, now pointing to 32, has no children. Here, we delete `root`, point `root` to `nullptr` and return `root`.

```cpp
 //Recursive call stack:
 10->right = RecursiveDeletePrivate(10->right, 32) // root = 21
   32->right = RecursiveDeletePrivate(32->right, 32) = nullptr
 ```  
So, our tree, due to this return looks like this:


 ```
    32
      \
     NULL 
 ``` 

and our call stack looks like this:

```cpp
 //Recursive call stack:
 10->right = RecursiveDeletePrivate(10->right, 32) = 32->right = nullptr
 ```  
at which point we add 32 and its `nullptr` right child back to 10->right:


 ```
   10
    \
     32
      \
      NULL 
 ``` 
We then return root.

That's it!

### Destructor

If you ran this code as is through a memory checker such as [valgrind](https://valgrind.org/), you'd find that your program is leaking memory. That is because when the destrcutor is called we do not properly free up all the nodes in our tree. Let's have a look at how you'd go about properly freeing up memory in your destructor.

To properly delete each node, you can't start at the root. If you delete root, you'd have no way to access all the other nodes. So, the best strategy is to start with a node that has no children and work your way up. What this means is before deleting a node, delete its children first. This sounds like something we've already seen: [post order traversal](/traversal). Although not described in that section, we can see that post order traversal means:

- delete left child
- delete right child
- delete parent


Say for example, you have this tree:

```

    10 ---> root
   /  \
  4   21
     /  \
    15  32
     \
     20
``` 

If you print the nodes in post-order, this is the output you'd get:

```cpp
4 20 15 32 21 10
```

Notice how 21 gets printed AFTER 20, 15 and 32 are deleted. Also notice how the root is printed at the end. Keeping this analogy in mind, we can, instead of printing each node, delete the node while visiting the nodes in post-order in our destructor:

```cpp{numberLines: true}
template <typename T>
BinaryTree<T>::~BinaryTree(){
    PostOrderRemoval(root);
}

template <typename T>
void BinaryTree<T>::PostOrderRemoval(Node *curr){
    if (curr == nullptr){
        return;
    }
    
    PostOrderRemoval(curr->left);
    PostOrderRemoval(curr->right);
    cout << "deleting: " << curr->item << " " << endl;
    delete curr;
    curr = nullptr;
}
```

Function on line 2 is the destructor that gets called which in turn passes the root to a private helper function we wrote called `PostOrderRemoval`. This function then checks to see if the pointer is a `nullptr` in which case it just returns (this is our base case). If not, the function is called again but with the left child of the current node. The recursive call stack keeps getting populated until we reach a leaf node and its left and right child calls start returning. Once that happens, we then move to the `cout` statement and then delete the pointer being pointed to by `curr`. 

If you ran the above code with our example tree, you'd see this output:

```
deleting: 4
deleting: 20 
deleting: 15 
deleting: 32 
deleting: 21 
deleting: 10 
Program ended with exit code: 0
```

Running time is $O(N)$ where $N$ is the number of nodes in the tree.

### Running Time Analysis:

In order to analyze the running time of any binary search tree related operation, you need to consider how many nodes we'd have to vists. If $N$ is the number of nodes in the tree and $L$ is the number of levels, then:

$$$
N = 2^{L} - 1
$$$

$$$
N + 1 = 2^{L}
$$$

$$$
log_{2}(N + 1) = L
$$$

This holds true when the tree is full.

### Trees as arrays

A tree may also be represented as an array. It may not be too efficient if you have a sparse tree (where each level is not completely filled) since that may leave too many empty entries in the array. But if your tree is almost full at each level and you're mostly concerned with finds (deletes would require us to move entries in the array which would be time consuming), an array representation would be beneficial. 

Pros:
- Faster lookup
- Less memory taken as compared to nodes with left and right pointers

Cons:
- Wasted space if tree is not full
- Deletions can be burdensome

A sample representation of a tree as an array:


![Tree-As_Array](./images/trees/tree-as-array.png)

If the node's position is represented by `index`, then:
 
to get a node's left child:

$$$
2*index + 1
$$$

to get a node's right child:

$$$
2*index + 2
$$$

and to get its parent:

$$$
(index-1) / 2
$$$

### Conclusion

Binary search trees work well with randomized data where a node can have both left and right children. However, if our data is partially sorted, our tree may degenerate to a linked list. Think about what would happen if we insert numbers from 0 till 7 in a tree. Each node added would be the right child of its parent node. This would defeat the purpose of a binary search tree. In cases like these, we need to rebalance our tree so that we can take advantage of the $lgN$ properties of a tree. I'll talk more about balanced trees in my AVL tree post and red-black tree post. 

### Problems

BST is a workhorse of data structures and can be used to solve almost any problem efficiently. BSTs allow us to efficiently search for a key as well as find the `min` and `max` elements, find successor or predecessor of a key (where the key itself might be absent from the tree) and enumerate the keys in a range in sorted order.

Key lookup, insertion and deletion take time proportional to $O(h)$ where $h$ is the height of our tree which in the worst case can be $O(N)$ if insertions and deletions are naively implemented. 

**Searching** os the single most fundamental application of BSTs. Unlike hash tables, you can find min, max, next largest, smallest element using BSTs. These operations, along with lookup and delete take $O(logN)$ time for library implementations (due to balanced trees). 

C++ STL offers two BST based containers: `set` and `map`:
- sets store keys only
- maps store key value pairs


### Test if a BT satisfies the BST property