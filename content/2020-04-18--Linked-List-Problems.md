---
title: Linked List Problems
date: 2020-04-25
thumbnail: /post-images/links.png
draft: false
extract: Linked List sample problems
categories: 
    - Problems
tags:
    - Linked List Problems
---

### Table of Contents
1. [Intro](#intro)
    * [Search](#search)
    * [Merge Two Sorted Lists](#merge-two-sorted-lists)

### Intro

Before we look at the problems, let's have a look at the node struct we'd be using:
```cpp
template <typename T>
struct ListNode{
    T data;
    shared_ptr<ListNode<T>> next;
};
```

It is a template node that has two fields: `data` that stores the actual value and `next` which is of type `shared_ptr<ListNode<T>>` . This next field points to the next node in the list.

### Search
**Search for an element in the list**

```cpp

shared_ptr<ListNode<int>> Search(shared_ptr<ListNode<int>> l, int key){
   shared_ptr<ListNode<int>> ptr = l;
    while (l && l->data != key){
        l = l->next;
    }
    
    return l;
}

```

### Merge two sorted lists

**Merge two sorted singly linked lists. You must not use extra space but use of extra constant space is allowed**. 

Without the limitations, this problem is easy. You can create a new list and then iterate over existing lists and keep adding elements by comparing them. You can also append the two lists and then sort them. Both methods are inefficient. Here's a look at an efficient method. Say, here are our two lists:

 ```text

    2 -> 3 -> 7
    -1 -> 6 -> 13
```

First you can create a **dummy head** that'll be the starting point of the merged lists. Intuitively, you'd assign the smaller of the two lists' head as the new head but that requires more checks (if else statements). Dummy heads allow us to write cleaner and more generic code that generalizes well. We'll place any value we like in the dummy head (we'll see later why this won't matter). Say our dummy head has value -1 in it. We'll also have a tail pointer that points to the dummy head initially:

 ```text
dummy head
     |
    -1 - tail
    
   l1
    2 -> 3 -> 7
    -1 -> 6 -> 13
    l2
```

Next, we keep iterating both lists until both pointers are NOT null ie `while (l1 && l2)` where `l1` is the head pointer for list 1 and `l2` is the head pointer for list 2. Next, we compare which pointer has the lesser value and make `tail->next` point to that value and increment the lesser pointer (ie increment `l1` or `l2`.) So, in our example above, `l2` < `l1` so we make `tail->next` point to `l2`, move `l2` down and move tail to this new node:


```text
 dummy head
    -1
   l1
    2 -> 3 -> 7
    -1 -> 6 -> 13
    tail  l2
```

We repeat this process until either `l1` or `l2` is out of elements to iterate over. We may have a case where one list is done earlier than the other, where we'd simply take the remaining elements and append to tail until we're done.

Finally, when it's time to return this, is what our final list would look like:

  
```text
 dummy head                         tail
    -1 -> -1 -> 2 -> 3 -> 6 -> 7 -> 13
```

```cpp
Node<int>* mergeTwoLists(Node<int>* l1, Node<int>* l2){
    Node<int>* dummyHead = new Node<int>;
    dummyHead->element = -1;
    auto tail = dummyHead;
    
    while (l1 && l2){
        if (l1->element < l2->element){
            tail->next = l1;
            l1 = l1->next;
            tail = tail->next;
        } else {
            tail->next = l2;
            l2 = l2->next;
            tail = tail->next;
        }
    }
    if (l1 == nullptr){
        //remainders are l2:
        while (l2){
            tail->next = l2;
            tail = tail->next;
            l2 = l2->next;
        }
    } else {
        while (l1){
            //remainders are l1:
            tail->next = l1;
            tail = tail->next;
            l1 = l1->next;
        }
    }
    return dummyHead->next;
}

```

Remember that `-1` value we added, when we return we'll simply return `dummyHead->next` as our answer. The running time of this algorithm is $O(M + N)$ where $M$ and $N$ are the number of nodes in list 1 and list 2 respectively. The space used is constant because we reuse the existing nodes. The only extra node we created was the value in the dummy head node. Other than that, we were just manipulating next pointer for the smallest node we found.

**Variant: What if the list is doubly linked?** The approach would remain the same except that now you'd also have to handle the `prev` link.

