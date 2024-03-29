---
title: Greedy Algorithms
date: 2020-08-16
thumbnail: /post-images/greedy.png
draft: true
extract: A deep dive into greedy algorithms
categories: 
    - DS&A
tags:
    - Greedy Algorithms
---

- [Introduction](#introduction)
- [Max water between vertical lines](#max-water-between-vertical-lines)
- [Task Scheduler](#task-scheduler)
- [Re-arrange String](#re-arrange-string)


### Introduction
In this post, we'll discuss the greedy technique to solving various problems. Let's start with what it means to be greedy while designing an algorithm to solve a problem. A greedy algorithm is an algorithm that that computes a solution in steps and at each step this algorithm makes a **locally optimum** decision. Once that decision is made, the algorithm DOES NOT return to the step in question and undoes the decision.

Let's see what greedy approach is all about:

**Given a target change that needs to be made and possible coins, find the fewest number of coins needed to make that change**

Say our target is \$48 and possible coins are \$30, \$24, \$12, \$6 and \$3. Greedy approach would make the locally optimum choice by picking the **largest denomination** available less than the change that needs to be made:

```cpp
target 48
pick: 30

target: 18
pick 12

target: 6
pick 6

total of 3 coins
``` 

It is clear that greedy approach won't work here since fewest coins are \$24 and \$24 (total of 2 coins). Having said that, there're problems where greedy approach DOES indeed result in a globally optimum solution. Let's have a look at a few such examples.

### Max water between vertical lines

**An array of integers naturally defines a set of lines parallel to the Y-axis, starting from x = 0 as illustrated in Figure 18.4(a). The goal of this problem is to find the pair of lines that together with the X-axis "trap" the most water.**

Example:

```cpp

            |       |               |
    |       |       |       |       |       
    |   |   |   |   |   |   |   |   |   |   |
    0   1   2   3   4   5   6   7   8   9   10
    i                                       j
```

The diagram above shows an example. Each vertical bar is the height and the X-axis shows the position of each line. The max area is when we choose the lines at 2,8 giving us a total area of (8-2) * 3 = 18. 

How do we go about solving this?

Approach 1: First thing that comes to mind is that we can use 2 nested loops where we start at X = 0 and keep incrementing the ending line from 1 till 10. In the process we keep track of the max area. We then move to X = 1 and keep incrementing the ending line from 2 till 10. Once we're done, we would've looked at all possible combinations and in the process calculated our max. This approach obviously takes $O(N^2)$ time. Let's see what other problem solving technique we can use to tackle this problem:

Approach 2: Let's be greedy! We'll use 2 pointers: one at X = 0 (call this `i`) and the other at X = 10 (call this `j`). We'll initialize a max variable to minimum integer. Next, we calculate the area enclosed by the two lines we chose:

```cpp
int area = (i-j)*(min(A[i],A[j]));
```

If this calculated area is greater than the current max, update the max and move on. This is where things get interesting. How do we **move on**? We're interested in the tallest and farthest lines to maximize our area. So, we'll move `i` if height of `i` is less than `j` or we'll move `j` if height of `j` is less than `i`. That is because we know that the smaller height line will not give us the max area. In the example above, 0's height is greater than 10's height, so we'll move `j` inward:

```cpp

            |       |               |
    |       |       |       |       |       
    |   |   |   |   |   |   |   |   |   |   |
    0   1   2   3   4   5   6   7   8   9   10
    i                                   j
``` 

We then perform the following calculations:

```cpp
            |       |               |
    |       |       |       |       |       
    |   |   |   |   |   |   |   |   |   |   |
    0   1   2   3   4   5   6   7   8   9   10
    i                                   j

maxArea = max (maxArea,(9-0)*(min(1,2)));
```

We continue to move inward until `i == j`. At that point we would've found the max area. Here's the code for this approach:

```cpp
int maxArea(vector<int>& A){
    int i = 0, j = int(A.size()) - 1, maxArea = numeric_limits<int>::min();
    
    while (i != j){
        int currArea = (j-i)*min(A[i],A[j]);
        maxArea = max(maxArea, currArea);
        if (A[i] < A[j])
            i++;
        else
            j--;
    }
    return maxArea;
}

int main(int argc, const char * argv[]) {
    // insert code here...
    vector<int> A = {2,1,3,1,3,1,2,1,3,1,1};
    int ans = maxArea(A);
    cout << ans << endl;
    return 0;
}
```

Running time: $O(N)$

### Task Scheduler

**[This](https://leetcode.com/problems/task-scheduler/) problem is defined as: Given a characters array tasks, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle. However, there is a non-negative integer n that represents the cooldown period between two same tasks (the same letter in the array), that is that there must be at least n units of time between any two same tasks. Return the least number of units of times that the CPU will take to finish all the given tasks.**

```cpp
n=2 and tasks are:
AAAAA
BBB
CC
```
n=2 means that between two similar characters, there need to be 2 other characters before we can pick the first character again. Example:

```cpp
allowed:
 B  A   C   B 
not allowed
 B  A   B   C  
```

How do we go about arranging our tasks so that we can reduce the total time? Let's pick randomly and process Bs first, then Cs and then As. 

```cpp
//I represents idle state
BCIBCIBAIIAIIAIIAIIAIIA
length = 23
```
That took too long! Notice how the As at the end wrecked our running time. That's because there're a lot of As so for each remaining A at the end, we have to count for the cool of period. That should give us a hint. What if we start with A, add some Bs in there and then process Cs?

```cpp
ABCABCABIAIIA
length = 13
```
Ok, so that was faster than our previous approaches. That's because we minimized the use of `I` by knocking out tasks in decreasing order of frequency: ie A first (since A = 5), B next (since B = 3) and C last (since C = 2) as we cycle through the available characters. And as we process A, we can add next most frequent character for A's cool down period. For example, if we've processed all elements and only As are left, we'd have A LOT of idle states toward the end as shown earlier. This algorithm uses greedy approach since we're always going to process most frequently occurring tasks first.

How would we go about converting this logic to code? Let's see the steps we have to perform:
- Create a max heap out of the characters provided. This would help us process characters that occur more frequently first. Every time you choose a character from this heap, decrement its count for future iterations
- While there're elements on the heap to process:
    - Start at 0 and go up till cool down period. On each iteration:
        - Remove a character from max heap, decrement its count and push to a temp storage
    - Insert characters from temp storage back in the heap if count for that character is not 0

Here's this logic converted to code:

```cpp
string leastInterval(vector<char>& tasks, int n) {
    priority_queue<charCountPair, vector<charCountPair>, maxComp> charHeap;
    
    charHeap.push({'A',3});
    charHeap.push({'B',3});
//    charHeap.push({'D',1});
    string ans = string();
    while (!charHeap.empty()){
        vector<charCountPair> temp;
        for (int i = 0; i <= n; i++){
            if (charHeap.empty() || charHeap.top().second == 0)
                ans += 'I';
            else{
                temp.push_back({charHeap.top().first, charHeap.top().second - 1});
                ans += charHeap.top().first;
                cout << ans << endl;
                charHeap.pop();
            }
        }
        
        for (auto i : temp){
            if (i.second != 0)
                charHeap.push(i);
        }
        
    }
    
    int lengthAns = int(ans.size());
    int i = int(ans.size()) - 1;
    while (ans[i] == 'I'){
        lengthAns--;
        i--;
    }

    
    cout << lengthAns << endl;
    return ans;
    
    
}
```     

### Re-arrange String

**Given a string S, check if the letters can be rearranged so that two characters that are adjacent to each other are not the same. If possible, output any possible result.  If not possible, return the empty string.**

Let's see how we can re-arrange a specific string:

```cpp
given:       "aaabbb"
re-arranged: "ababab"

OR

given:       "aaaabcd"
re-arranged: "abacada"
in-correct:  "bcadaaa"
```

The key insight from the above is that we need to somehow insert the more frequently occurring characters first and in-between, add those that occur less frequently. This is a greedy approach since we want to be done with the more frequent ones first. This problem is the same as the task scheduler where the only difference is that the cool down period for this question is 1! That's it!

Therefore, we begin by defining the comparator and struct for our max heap:

```cpp
typedef pair<char,int> charFreq;

struct maxComp {
     bool operator()(
        pair<char, int> const& a,
        pair<char, int> const& b)
    {
        return a.second < b.second;
    }
};
```

Next, we'll create a hashtable with each character and its frequency and populate our maxHeap from the hash table. We'll then use a max heap with the most frequently occurring character at the top of our heap: 

```cpp
string reorganizeString(string S) {
    char prevChar = char();
    string ans = "";
    unordered_map<char, int> h;
    for (int i = 0; i < S.size(); i++){
        if (h.find(S[i]) != h.end())
            h[S[i]] += 1;
        else
            h[S[i]] = 1;
    }
    if (h.size() == 1)
        return ans;
    priority_queue<charFreq,vector<charFreq>, maxComp> maxHeap;
    
    int i = 0;
    while (!h.empty()){
        if (h.find(S[i]) != h.end()){
            maxHeap.push({S[i],h[S[i]]});
            h.erase(S[i]);
        }
        i++;
    }
```

Next, we'll start our process of picking the most frequent character, adding to our string, picking the 2nd most frequent character and adding that to the string too. In the process we decrement the count of the two chosen characters and push back to the heap. We continue this process until we either encounter two consecutive characters or when there're no more items to process on the heap:
```cpp
    while (!maxHeap.empty()){
        vector<charFreq> temp;
        for (int i = 0; i < 2; i++){
            if (maxHeap.empty())
                break;
            auto curr = maxHeap.top();
            maxHeap.pop();
            if (curr.first == prevChar)
                return "";
            prevChar = curr.first;
            ans += curr.first;
            curr.second -= 1;
            temp.push_back(curr);
        }
        
        for (auto i : temp)
            if (i.second != 0)
                maxHeap.push(i);
        
    }
    return ans;
}
```