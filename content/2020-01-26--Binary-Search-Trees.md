---
title: Binary Search Trees
date: 2020-01-26
draft: false
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

#### Recursive Insert

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

#### Delete: [Credit for this section](https://www.youtube.com/user/PaulProgramming/search?query=Binary+Search+Trees)

This is the hardest operation you can perform on a binary search tree. That is because once a node is removed, we still want the tree to maintain its binary search properties (values in left sub-tree must be less than the root and values in the right subtree must be greater than the root).
Let's have a look at the possibilities when we're deleting a node from the tree: the node marked for deletion can:
- have no children
- have one child
- be root of a subtree (ie more than 1 children and grandchildren)

Let's start with the main function that drives the delete operation:

```cpp{numberLines: true}
template<typename T>
void BinaryTree<T>::RemoveNode(T itemToDelete){
    RemoveNodePrivate(root, itemToDelete);
}
```

This function takes in one argument: `itemToDelete` and calls the private helper function `RemoveNodePrivate(root,itemToDelete)` by passing in 2 arguments: 
- root of the tree
- the item to be deleted

This helper function is used because our client (other programs or users) using our class do not have access to our private `root` variable which points to the root of the tree. Let's have a look at the `RemoveNodePrivate` function:

```cpp{numberLines: true}
template<typename T>
void BinaryTree<T>::RemoveNodePrivate(Node* curr, T itemToDelete){
    if (curr->item == itemToDelete){
        //We've found the item in root.
        RemoveRootMatch();
    } else {
        //Item not in root
        if (itemToDelete < curr->item && curr->left != nullptr){
            //Look in left subtree
            //RemoveNode takes in curr, the child of curr and bool to tell if left child is being passed
            curr->left->item == itemToDelete ? RemoveMatch(curr,curr->left,true) : RemoveNodePrivate(curr->left, itemToDelete);
            
        } else if (itemToDelete > curr->item && curr->right != nullptr){
            //Look in right subtree
            curr->right->item == itemToDelete ? RemoveMatch(curr, curr->right, false) : RemoveNodePrivate(curr->right, itemToDelete);
            
        } else {
            //Key not present
            cout << "Key: " << itemToDelete << " not present in tree" << endl;
        }
        
    }
}
```

We've passed in the `root` to this function so the first time it is called, `curr` would be pointing to `root`. Line 3 checks if the value is in `curr` (ie checks if the value is in the `root` node) and if so, we call another helper function called `RemoveRootMatch()`. We'll have a look at this function later. 

Let's assume the value we're looking for is NOT in the root of the tree but is infact in one of the leaf nodes:

```
    10 ---> curr / root
   /  \
  4   21
     /
    20 ---> itemToDelete

```

Next up, we determine whether to go down the left subtree or the right subtree to find `itemToDelete`. While doing so we also want to make sure that the left and right subtrees are actaully present (which is why we also check whether the left and right pointers are null or not). To do so, we've got this if else condition on lines 8 and 13 resepectively: 

```cpp{numberLines: 8}
  if (itemToDelete < curr->item && curr->left != nullptr){
            //Look in left subtree
            //RemoveNode takes in curr, the child of curr and bool to tell if left child is being passed
            curr->left->item == itemToDelete ? RemoveMatch(curr,curr->left,true) : RemoveNodePrivate(curr->left, itemToDelete);
            
  } else if (itemToDelete > curr->item && curr->right != nullptr){
            //Look in right subtree
            curr->right->item == itemToDelete ? RemoveMatch(curr, curr->right, false) : RemoveNodePrivate(curr->right, itemToDelete);
            
  }
```

In our case, our `itemToDelete` > `curr->item` && `curr->right != nullptr` so we'll fall into the `else if` on line 13. Here, we've got 2 things that can be true: either `curr->right` might have the value we're looking for or it might not:

 ```
     10 ---> curr / root
    /  \
   4   21 ---> curr->right
      /
     20 ---> itemToDelete
 
 ```
SIDENOTE: C++ Ternary operator:

`statement == condition ? (do this if true) : (do this if false)`

So the ternary check on line 15 compares `curr->right->item` (which is 21) with `itemToDelete` which is 20. The equality operator (`==`) would return false so we'll go to the code to the right of our colon. Here, we find a recursive call to this same function but this time with `curr->right` as `curr`:

```cpp{numberLines: 15}
....  : RemoveNodePrivate(curr->right, itemToDelete);
```

When we call `RemoveNodePrivate(curr->right, itemToDelete)` again, here is what our pointer situation looks like:

 ```
     10 
    /  \
   4   21 ---> curr
      /
     20 ---> itemToDelete
 
 ```
Now notice that the `itemToDelete` is the left child of our `curr` pointer. We then fall to line 8 and the if condition holds true so we move to line 11. This time, we notice that the condition  

```cpp
curr->left->item == itemToDelete
```

is true so we go to the statement to the left of our colon:

```cpp
RemoveMatch(curr,curr->left,true)
```

This is another call to the function called `RemoveMatch().` Let's have a look at the function `RemoveMatch()`:

```cpp{numberLines: true}
template <typename T>
void BinaryTree<T>::RemoveMatch(Node* prev, Node* curr, bool left){
    //curr is node to be deleted
    //prev is parent of curr
    //left is to tell relationship b/w prev and curr
    if (curr->left == nullptr && curr->right == nullptr){
        if (left){
            delete prev->left;
            prev->left = nullptr;
        } else {
            delete prev->right;
            prev->right = nullptr;
        }
    } else if (curr->left != nullptr && curr->right == nullptr){
        if (left){
            prev->left = curr->left;
        } else {
            prev->right = curr->left;
        }
        delete curr;
        curr = nullptr;
    } else if (curr->left == nullptr && curr->right != nullptr){
        if (left){
            prev->left = curr->right;
        } else {
            prev->right = curr->right;
        }
        delete curr;
        curr = nullptr;
    } else {
        Node* temp = curr->right;
        while (temp->left != nullptr){
            temp = temp->left;
        }
        
        curr->item = temp->item;
        RemoveNodePrivate(curr->right, curr->item);
        
    }
}
```

This function takes in 3 variables: 
- `prev`: pointer to the parent of the node to be deleted
- `curr`: pointer to the node to be deleted
- `left`: bool to check whether curr is the left child of prev or not.

Next we go through the 3 cases where we check whether the node to be deleted is a leaf node, has one child or has 2 children. If it is the first 2 cases, it is simple to delete the node based on the relationship between the parent and the child. If the node to be deleted has 2 children, then we need to find the smallest value from the right-subtree of the node to be deleted, copy that value to the node to be deleted and then delete the smalles value we found in the right subtree. That way, we've reduced the node with 2 child case to a more manageable node with one or no children case. Then we call the `RemoveNodePrivate()` function again but this time we pass `curr->right` pointer (because we want to search for the value in the right subtree) and the `curr->item` value (which is the value that needs to be deleted).

Finally, let's have a look at `RemoveRootMatch()`

```cpp{numberLines: true}

template<typename T>
void BinaryTree<T>::RemoveRootMatch(){
    if (root != nullptr){
        Node* temp = root;
        //If root has no children
        if (temp->left == nullptr && temp->right == nullptr){
            delete root;
            root = nullptr;
            temp = nullptr;
            return;
        } else if (temp->left != nullptr && temp->right == nullptr ){
            //Root has only left children
            temp = temp->left;
            delete root;
            root = temp;
        } else if (temp->left == nullptr && temp->right != nullptr) {
            //Root has only right children
            temp = temp->right;
            delete root;
            root = temp;
        } else {
            //Root has 2 children
            temp = temp->right;
            while (temp->left != nullptr){
                temp = temp->left;
            }
            RemoveNodePrivate(root, temp->item);
            root->item = temp->item;
        }
    } else {
        cout << "Tree is empty" << endl;
    }
}
```

Again, we check for the 3 cases. The first 2 being root has no children or root has only 1 child. If it is the 3rd case (root with 2 children) we call `RemoveNodePrivate()` with the root and the item we need deleted after replacing root with the smallest value from the right subtree. 

#### Delete: Another Approach [Credit](https://www.youtube.com/watch?v=gcULXE7ViZw&list=PL2_aWCzGMAwI3W_JlcBbtYTwiQSsOTa6P&index=36)

That was a lot of code! There were various different scenarios that we had to keep in mind and be mindful of whether the child is the right or the left sub-child etc. We can use a recursive approach with the same logic we used above to delete a node that falls into either one of the 3 categories we discussed above 
 
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