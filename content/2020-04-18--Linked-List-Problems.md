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
    * [Reverse a sublist](#reverse-a-sublist)
    * [Reverse a singly linked list](#reverse-a-singly-linked-list)
    * [Check if list is circular](#check-if-list-is-circular)
    * [Check if lists overlap](#check-if-lists-overlap)

2. [Conclusion](#conclusion)

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

### Reverse A sublist

**Given a pointer to the head of a list and two indices, reverse all elements within the sublist including the indices**. Example given list:
 ```text
    2              7 
11->4->5->6->7->8->9->2 and indices 2 and 7 reversed list would be:
    
    2              7     
11->9->8->7->6->5->4->2
```
 
 There are a few different approaches that we can take: we can create a new list, keep track of the indices and insert nodes into the new list in reverse order. This would be inefficient since it takes $O(N)$ extra space where $N$ is the number of vertices. 
 
 The best approach would be to realize that reversal is nothing but picking element at index 2, and placing it right after index 7:
 
 ```text
     2              7 
 11->4->5->6->7->8->9->2 
     
     2           7        
 11->5->6->7->8->9->4->2

then:
     2           7       
 11->5->6->7->8->9->4->2

     2        7           
 11->6->7->8->9->5->4->2

```

and continue until pointers 2 and 7 point to the same node. We cannot go in reverse direction because this is not a doubly linked list. So the easier method would be to move from left to right. We'd also have to keep track of `prev so that we can update its link to the next node that needs to be moved to the other end. 

Here's the function that performs the reversal:

```cpp{numberLines:true}
void ReverseGivenSublist(Node<int>* L, int start, int finish){
    start = start - 1;
    finish = finish-1;
    Node<int>* prev = L;
    Node<int>* a = L;
    Node<int>* b = L;
    for (int i = 0; i <= finish; i++){
        if (i == start - 1)
            prev = L;
        else if (i == start)
            a = L;
        else if (i == finish)
            b = L;
        
        L = L->next;
    }
    
    cout << "prev points to: " << prev->element << endl;
    cout << "a points to: " << a->element << endl;
    cout << "b points to: " << b->element << endl;
    
    while (a != b){
        prev->next = a->next;
        a->next = b->next;
        b->next = a;
        a = prev->next;
        cout << endl;
        cout << "prev points to: " << prev->element << endl;
        cout << "a points to: " << a->element << endl;
        cout << "b points to: " << b->element << endl;
    }
}
``` 

The loop on line 7 helps us position our pointers in the correct position. Here's the position of the pointers once the loop ends:


 ```text
prev a              b
 11->4->5->6->7->8->9->2 
```

- Now, the logic is to first make `prev` point to `a->next` (11 connects to 5)
- Next, make `a` point to `b->next` (4 connects to 2)
- Then, make `b->next` point to `a` (9 connects to 4)
- Update `a` to point to `prev->next` (new a is 5)

`b` stays with 9:

 ```text
prev a           b
 11->5->6->7->8->9->4->2 
```

Notice how `a` and `b` are getting closer. We continue this move and update until, on line 22, `a` and `b` point to the same node. At that point we'd be done with our reversal. 

The running time:

- We go from $0$ to $B$ to setup the pointers in the correct position which takes $O(B)$ time.
- We then iterate from $A$ till $B$ until $A == B$ which takes $O(A-B)$ time.

Adding up those we take overall $O(B)$ time where $B$ is the finish index.

### Reverse a singly linked list

**Given a singly linked list, reverse it**. Example: 1234 -> 4321

The idea here is similar to what we did while reversing sublist: Pick an element from the left end, place after right end. Continue until left and right pointers point to the same node:

```text
a              b
1 -> 2 -> 3 -> 4

Pick a, put after b:

a         b
2 -> 3 -> 4 -> 1

Pick a, put after b:

a    b
3 -> 4 -> 2 -> 1

Pick a, put after b:

ab
4 -> 3 -> 2 -> 1

Return!
```


Here's the code for this:

```cpp
Node<int>* ReverseASinglyLinkedList(Node<int>* L){
    Node<int>* a = L;
    Node<int>* b = L;
    while (L){
        b = L;
        L = L->next;
    }
    
    while (a != b){
        auto temp = a->next;
        a->next = b->next;
        b->next = a;
        a = temp;
    }
    return a;
}
```

The first while loop places our pointers with `a` at the beginning and `b` at the end of the list. Then, while `a != b`, pick `a` and put after `b`. Make old `a->next` the new `a`. Running time of this algorithm is:
 - $O(N)$ for placing a pointer at the end of the list (assuming there's no tail pointer present) where $N$ is the number of nodes. 
 - Then, choose and swap until `a == b` which is another $O(N)$.
 
 Total  = $O(2N)$ = $O(N)$   

### Check if list is circular

**Write a program that takes the head of a singly linked list and returns null if there does not exist a cycle, and the node at the start of the cycle, if a cycle is present. (You do not know the length of the list in advance.)**

There're again multiple solutions to this problem. The first thing that comes to mind is to create a set and keep inserting node addresses to the set. If you encounter an address that already exists in the set, then you have a cycle. This approach requires $O(N)$ space where $N$ is the number of nodes in the linked list. 

Another approach would be two have two iterators. The first iterator chooses a current node and then has a second iterator to go over all other nodes. If at any point the second iterator == first iterator, we have a cycle. This uses no extra space but running time $O(N^2)$.

However, there's another approach that uses $O(1)$ space and $O(N)$ time: Have two pointers: one fast pointer that goes ahead two nodes and a slow pointer that moves one node at a time. If slow pointer at any point becomes equal to the faster pointer (other than when it is null), we have a cycle. If not, we don't have a cycle. Let's see how this works. Say this is our circular list with no null pointers:

```text
 fast slow
    |
    1 -> 2 -> 3 -> 4 -> 5 -> 6
                        |    |
                       10    7
                        |    |
                        9 <- 8
                       
``` 

Our fast and slow pointers both start at 1. Fast and slow go through these nodes:

```text
                         FAST == SLOW
                             |
FAST 1   3   5   7   9   5   7   9
SLOW 1   2   3   4   5   6   7
```

Since fast == slow, we have a cycle.

Now, the question also asks us to find the node where the loop begins. To do so, we'll have to use a trick. As soon as slow and fast collide, we know we have a cycle. Keep the fast pointer at the collision point but move the slow pointer to the beginning of the list. Now, keep incrementing slow and fast by 1 until they meet again. This meeting point is the beginning of our loop.

That seems like magic! Why did this random approach work and how do we know that this was the starting of our loop? This is a common algorithm called **Floyd's Cycle detection algorithm** and there are plenty of explanations available which I won't repeat here.
Here's the code for this approach:

```cpp
bool isCircular(Node<int>* L){
    Node<int>* slow = L;
    Node<int>* fast = L->next->next;
    
    while (slow != fast && fast != nullptr){
        slow = slow->next;
        if (fast->next == nullptr){
            fast = nullptr;
            break;
        }
        else if (fast->next->next == nullptr){
            fast = nullptr;
            break;
        } else {
            fast = fast->next->next;
        }
    }
    if (fast == nullptr)
        return false;
    return true;
}
```

### Check if lists overlap

**Given two singly linked lists there may be list nodes that are common to both. (This may not be a bug—it may be desirable from the perspective of reducing memory footprint, as in the flyweight pattern, or maintaining a canonical form.)**

```text
list 1: 1->2->3->4
                 |
list 2: 5->6->7->8->9->10->NULL
```

Here's an approach: store addresses of each node in list 1 in a hash table and then iterate over list 2. While going over list 2, check the hash table if the address has been encountered: if so, they overlap, otherwise, they don't.This approach takes $O(M+N)$ time and space $O(M+N)$.

An observation above leads to a better space time complexity: if, they overlap, they'll both end up at the same last node (the node before null). For example, since 1 and 2 overlap, they end up at the same node address for node with value 10. If not, their last node would have a different address.

```cpp
bool doOverlap(Node<int>* L1, Node<int>* L2){
    while (L1->next != nullptr && L2->next != nullptr){
        L1 = L1->next;
        L2 = L2->next;
    }
    
    if (L1->next != nullptr){
        while (L1->next != nullptr){
            L1 = L1->next;
        }
    } else {
        while (L2->next != nullptr){
            L2 = L2->next;
        }
    }
        
    
    if (L1 == L2){
        return true;
    }
   
    return false;
}
``` 

### Conclusion

- If it is a singly linked list, go from left to right since it's the only method possible. For example, if you're moving nodes around, pick ones that are on the left and place after the ones on the right

- Remember to move to next node when iterating over the list!