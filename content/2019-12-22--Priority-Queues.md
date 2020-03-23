---
title: Priority Queues
date: 2019-12-22
thumbnail: /post-images/priority-queue.png
draft: false
extract: A brief overview showing the properties and usage of priority queue data structure

categories: 
    - Data Structures
tags:
  - Data Structures
  - C++
---

### Introduction

In this post I'll talk about a very common data structure called **priority queue**. A priority queue is similar in structure to a [queue](/queue) but with an added caveat of a **priority** associated with each item in the queue. The order in our priority queue is no longer determined by the order of insertion but by the priority of the item being inserted. Therefore, at the front are items that have a high priority while at the back are those with the lowest priority. To maintain this order by priority, we must insert items correctly as they're added to the queue.

Let's say, in our example, that the priority of our item is determined by an integer: the larger our integer, higher its priority. Therefore, largest integers must be at the front of our queue and smallest integers must be at the back.

### Code

```cpp{numberLines}
template <typename T>
class PriorityQueue{
private:
    template <typename NodeT>
    struct Node{
        Node<NodeT>* next;
        NodeT element;
    };
    Node<T>* head;
    int size;
    
public:
    PriorityQueue();
    ~PriorityQueue();
    void Insert(T elem);
    T Remove();
    int GetSize();
    void Print();
    
};

template <typename T>
PriorityQueue<T>::PriorityQueue(){
    size = 0;
    head = nullptr;
}

template <typename T>
void PriorityQueue<T>::Insert(T elem){
    Node<T>* newItem = new Node<T>;
    newItem->element = elem;
    newItem->next = nullptr;
    if (size == 0){
        head = newItem;
    } else if (size == 1){
      
        if (head->element > elem){
            head->next = newItem;
        } else {
            newItem->next = head;
            head = newItem;
        }
        
    } else {
        Node<T>* curr = head->next;
        Node<T>* prev = head;
        
        if (elem > prev->element){
            newItem->next = head;
            head = newItem;
        } else {
            while (curr->element > elem){
                curr = curr->next;
                prev = prev->next;
            }
            
            prev->next = newItem;
            newItem->next = curr;
        }
    }
    size++;
}

template <typename T>
T PriorityQueue<T>::Remove(){
    T poppedElement;
    if (size == 1){
        poppedElement = head->element;
        delete head;
    } else {
        Node<T>* curr = head;
        head = head->next;
        poppedElement = curr->element;
        delete curr;
    }
    size--;
    if (size == 0){
        head = nullptr;
    }
    return poppedElement;
}

template <typename T>
void PriorityQueue<T>::Print(){
    Node<T>* temp = head;
    while (temp != 0){
        cout << temp->element << " ";
        temp = temp->next;
    }
    cout << endl;
}

template <typename T>
PriorityQueue<T>::~PriorityQueue(){
    while (head != 0){
        Node<T>* temp = head;
        cout << "Deleting: " << temp->element << " ";
        head = head->next;
        delete temp;
    }
    
    cout << endl;
}

template <typename T>
int PriorityQueue<T>::GetSize(){
    return size;
}

```

The code is quite simple with the most interesting function being the `insert()` function: It creates a new node and searches where to insert it based on the priority assigned to the new node and the priorities of the present list.

### Analysis

Insertion takes $O(N)$ in worst case while removal takes $O(1)$