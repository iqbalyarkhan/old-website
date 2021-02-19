---
title: Undirected Graphs Breadth First Search
date: 2020-02-16
thumbnail: /post-images/bfs.png
draft: false
extract: An analysis of Breadth First Search on undirected graphs
categories: 
    - Graphs
tags:
  - Algorithms
  - Graphs
---

### Table of Contents

1. [Introduction](#introduction)

2. [BFS vs DFS](#bfs-vs-dfs)

3. [Conclusion](#conclusion)

4. Problems
    * [Paint Boolean Matrix](#paint-boolean-matrix)
    - [Number of islands](#number-of-islands)

### Introduction
Breadth first search, as the name suggests, is concerned with looking at vertices that are closest to the current vertex. It gradually moves away from the starting vertex. BFS, therefore, can help find the shortest path to vertices from a given vertex. BFS does so by first exploring all vertices 1 edge away from the source, then exploring all vertices 2 edges away from the source and so on. 

In contrast, depth first search took a long route to find a path. That is because DFS is not designed to find the shortest route. It is used to find **a** route. Therefore, DFS helped us answer whether a path existed, BFS will help us find the shortest path from the starting node. 

In breadth first search, we start the search from elements closest to the starting node. The only difference between the code for depth first and breadth first is that breadth first uses `queue` instead of `stack`. 

The algorithm has 3 main steps:
- Remove a vertex from the queue
- Mark all vertices adjacent to current vertex and push them onto the queue
- Repeat until queue is empty

```cpp{numberLines: true}
void AdjList::BFS(int v){
    vector<int> visited(vectorSize);
    queue<int> q;
    visited[v] = true;
    q.push(v);
    while (!q.empty()){
        int curr = q.front();
        cout << curr << " ";
        q.pop();
        for (int i = 0; i < adjList[curr].size(); i++){
            int neighbor = adjList[curr][i];
            if (!visited[neighbor]){
                edgeTo[neighbor] = curr;
                visited[neighbor] = true;
                q.push(neighbor);
            }
        }
    }
    cout << endl;
}
```
 The code above first creates a boolean vector to keep track of visited elements called `visited`.
 
 We also create a queue to push elements so that we can visit them later. We want first in first out for breadth first search because we want to explore all the nodes closest to the starting node first. 

 Next we push the passed element, `v`, onto the queue and mark it. Then we enter a while loop until the queue is empty. 

 We pop an element off the queue, call it `curr`, and start to visit and mark all the elements that are adjacent to `curr`. In the process, we also go ahead and mark these adjacent vertices. This is because we're **visiting** them at this time and this is because BFS is interested in the vertices closest to the passed in vertex. At this point we also populate the `edgeTo` array to record how we got to the current vertex. 
 
We then push each one of these visited vertices onto the queue.

Let's walk through an example again. Here is the graph we're using:

![Undirected-Graph-1](images/graphs/path1.png) [Image Credit - Undirected Graph 1](https://graphonline.ru/en/)

Let's say we start at vertex 0 and our queue is empty and the visited array has each entry as false and edgeTo array is empty:

```
queue:             

visited[0] =        
visited[1] = 
visited[2] = 
visited[3] = 
visited[4] =
visited[5] =  

edgeTo[0] =        
edgeTo[1] = 
edgeTo[2] = 
edgeTo[3] = 
edgeTo[4] = 
edgeTo[5] = 
```
Since we start at 0, we push and mark it:


```
                   current Vertex: 0
queue:                  0

visited[0] =             T
visited[1] = 
visited[2] = 
visited[3] = 
visited[4] =
visited[5] =  

edgeTo[0] =             0
edgeTo[1] = 
edgeTo[2] = 
edgeTo[3] = 
edgeTo[4] = 
edgeTo[5] = 
```

We then go inside the `while` loop, pop 0 from queue, visit all its neighbors, mark them and push them on queue:

```cpp
                   current Vertex: 0
queue:                 2,1,5

visited[0] =             T
visited[1] =             T
visited[2] =             T
visited[3] = 
visited[4] =
visited[5] =             T

edgeTo[0] =             0
edgeTo[1] =             0
edgeTo[2] =             0
edgeTo[3] =     
edgeTo[4] = 
edgeTo[5] =             0
```

Next, we go back to the top of the while loop and pop another element off the queue which is 2:
```cpp
                   current Vertex: 2
queue:                 1,5

visited[0] =             T
visited[1] =             T
visited[2] =             T
visited[3] = 
visited[4] =
visited[5] =             T

edgeTo[0] =             0
edgeTo[1] =             0
edgeTo[2] =             0
edgeTo[3] =     
edgeTo[4] = 
edgeTo[5] =             0
```
We then move through the adjacency list for 2 and mark each vertex and push each to the queue as well:

```cpp
                   current Vertex: 2
queue:                 1,5

visited[0] =             T
visited[1] =             T
visited[2] =             T
visited[3] =             T
visited[4] =             T
visited[5] =             T

edgeTo[0] =             0
edgeTo[1] =             0
edgeTo[2] =             0
edgeTo[3] =             2
edgeTo[4] =             2
edgeTo[5] =             0
```

Although the marking is done and our `edgeTo` array is fully created, the algorithm keeps running until all the elements from the queue are popped off. Notice how the `edgeTo` list now notes that we got to 1,2 and 5 from 0 and we got to 3 and 4 from 2. So if you were to call the `FindPath()` function, it'll provide you with the shortest path from any vertex to any other vertex. 

You can create a tree using the `edgeTo` array (look at [DFS](/undirected-graphs-depth-first-search) to see how I did it). The tree in BFS's case would look like this:

```css

        0
      / | \
     1  2  5
       / \
      3   4
``` 

**Notice in DFS we mark a vertex not as soon as we visit it while go through another vertex's adjacency list but it is marked when it is its turn to be processed. However, in BFS, we mark the element as soon as we visit it while exploring another vertex's adjacency list.** BFS says: as soon as you get to a vertex, mark it and push it to the queue. 

Similar to DFS, the running time for BFS is also $O(V + E)$.

### BFS vs DFS
When do we choose one over the other? 

**BFS**
Helps us find all the vertices that are one edge away from the starting position, then 2 edges away and so on. BFS, therefore, is to be used when you're looking to find the shortest path to a vertex. 

**DFS**
Helps us actually answer the question whether a path exists between the vertices we're interested in. 

### Conclusion

Relationship between objects can be represented using undirected graphs and a lot of questions can be answered about the said objects using the BFS as we've discussed in this section.

### Paint Boolean Matrix
**Given a matrix and an index into the matrix, continue flipping all adjacent pixels with the same color until no more pixels can be flipped. ie if the indexed pixel is white, flip the pixel and all its white neighbors to black. Neighbors here are pixels above, below, to the left and to the right of the indexed pixel.**

Example:
Given the following matrix:

|  | 0 | 1 | 2 | 3 |
| -- | -- | -- | -- | -- |
| **0** | T | F | F | T | 
| **1** | F | T | T | F | 
| **2** | F | T | **T** | T | 
| **3** | F | F | T | F | 
| **4** | F | F | F | F | 

and index (2,2) which is a True, we'll continue flipping all its adjacent pixels to False first. Adjacent meaning pixel above, below, to the left and to the right of the given pixel. So, we'll start with (2,2), flip the pixel at 2,2 and then flip any neighbors that have the value true to false: 


|  | 0 | 1 | 2 | 3 |
| -- | -- | -- | -- | -- |
| **0** | T | F | F | T | 
| **1** | F | T | **T** | F | 
| **2** | F | **T** | **T** | **T** | 
| **3** | F | F | **T** | F | 
| **4** | F | F | F | F | 

After we're done flipping 2,2 and its neighbors, we'll have this:

|  | 0 | 1 | 2 | 3 |
| -- | -- | -- | -- | -- |
| **0** | T | F | F | T | 
| **1** | F | T | **F** | F | 
| **2** | F | **F** | **F** | **F** | 
| **3** | F | F | **F** | F | 
| **4** | F | F | F | F | 

Now, we'll want to flip the true neighbors of any of the pixels we just flipped. There's only 1 pixel that falls in this category: 1,1. Once, we're done, we'll have this matrix:

|  | 0 | 1 | 2 | 3 |
| -- | -- | -- | -- | -- |
| **0** | T | F | F | T | 
| **1** | F | F | F | F | 
| **2** | F | F | F | F | 
| **3** | F | F | F | F | 
| **4** | F | F | F | F | 

Ok, so which approach should we use here? BFS or DFS? DFS goes depth first. Applied to this problem, it'll pick the given pixel, flip it and then start going to all possible neighbors and will try to go as far as possible from x,y. This doesn't seem the most efficient approach. We'd rather flip x,y and all its neighbors first and then move to the next set of neighbors. This sounds like a job for our BFS algorithm! 

The problem now has translated to this:
- Start with x,y and push to queue
- Pop coordinates from queue
- Flip current coordinates
- Check to see if up/down/left/right indices are in-bound (ie >= 0 && < vector size etc)
- If in-bound check if any of these neighbors is a candidate to be flipped
- If neighbor is eligible for flipping, add to queue
- Continue until queue is empty

Here's this logic converted to code:

```cpp{numberLines: true}
void BFS(int x, int y, vector<vector<bool>>& image){
    int rowLimit = int(image.size()), colLimit = int(image[0].size());
    queue<pair<int, int>> q;
    q.push(make_pair(x, y));
    bool flipIf = image[x][y];
    while (!q.empty()){
        int row = q.front().first, col = q.front().second;
        //Flip image
        image[row][col] = !flipIf;
        q.pop();
        //Check up
        if (row - 1 >= 0 && row - 1 < rowLimit && col >= 0 && col < colLimit && image[row-1][col] == flipIf)
            q.push(make_pair(row-1, col));
        //Check down
        if (row + 1 >= 0 && row + 1 < rowLimit && col >= 0 && col < colLimit && image[row+1][col] == flipIf)
            q.push(make_pair(row+1, col));
        //Check left
        if (row >= 0 && row < rowLimit && col - 1 >= 0 && col - 1 < colLimit && image[row][col-1] == flipIf)
            q.push(make_pair(row, col-1));
        //Check right
        if (row >= 0 && row < rowLimit && col + 1 >= 0 && col + 1 < colLimit && image[row][col+1] == flipIf)
            q.push(make_pair(row, col+1));
    }
}
```

Running time: $O(VE)$ ie size of the 2D matrix since the algorithm visits each and every cell in the worst case.

### Number of islands

**Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.**

Let's see an example:

```cpp
        {1,1,1,1,0},
        {1,1,0,1,0},
        {0,0,0,0,0},
        {1,1,0,1,1}
```

In the diagram above, we can see that we have 3 islands. Let's start with the basics: 
- We'll have to start somewhere and iterate over each cell therefore we'll setup nested for loops
- If the current integer is `0`, we can ignore it and move to next cell
- If the current character is `1`, we need to process more:
    - We can start queuing up all the neighbors that are 1 and are not yet visited
    - While our queue is not empty, pop from queue, and proceed to enqueue **unvisited** neighbors

We'll start at 0,0 and have a visited array that is filled with false since we haven't processed any of our elements. Next, we'll enqueue 0,0, mark 0,0 as visited and explore its neighbors (up, down, left, right). If any of the neighbors has a value of `1` and we haven't visited that neighbor, we mark visited[neighbor coordinates] as true and push the neighbor to our queue. 

We'll continue the process until our queue is empty. Why does this work? In our first iteration, we'll increment the islands count from 0 to 1 and then proceed to process all the neighbors 0,0 until our queue is empty. This means we'll process:

```cpp
0,0 0,1 0,2 0,3 1,0 1,1 1,3
```

These are all the connected neighbors that have a value of 1. After we've processed them all, we'll have no more elements on the queue so we'll return and continue exploring our 2d grid until we find another `1`. This would be at 3,0. At this point, we'll increment our count from 1 to 2 and start pushing all neighbors that are 1 to the queue:

```cpp
3,1
```

Once we're done with this, our queue will be empty and we'll continue processing until we get to 3,3 and we'll increment the count for islands one last time! This question is asking about nothing but the number of [connected components](/undirected-graphs-depth-first-search#connected-components)! 

Notice in the approach above, we're using an extra visited array. That array can be removed if we're allowed to modify the original array in which case we'll simply change the `1` to a `0`.

Here's this logic converted to code:


```cpp
void BFS(vector<vector<int>>& islands,vector<vector<bool>>& visited, int i, int j){
    int rowLimit = int(islands.size()), colLimit = int(islands[0].size());
    queue<pair<int, int>> q;
    q.push({i,j});
    while (!q.empty()){
        int row = q.front().first, col = q.front().second;
        cout << "Current element: " << row << "," << col << endl;
        q.pop();
        visited[row][col] = true;
        //Check up
        if (row - 1 >= 0 && row - 1 < rowLimit && col >= 0 && col < colLimit && islands[row-1][col] == 1 && !visited[row-1][col]){
            q.push(make_pair(row-1, col));
        }
        //Check down
        if (row + 1 >= 0 && row + 1 < rowLimit && col >= 0 && col < colLimit && islands[row+1][col] == 1 && !visited[row+1][col]){
            q.push(make_pair(row+1, col));
        }
        //Check left
        if (row >= 0 && row < rowLimit && col - 1 >= 0 && col - 1 < colLimit && islands[row][col-1] == 1 && !visited[row][col-1]){
            q.push(make_pair(row, col-1));
        }
        //Check right
        if (row >= 0 && row < rowLimit && col + 1 >= 0 && col + 1 < colLimit && islands[row][col+1] == 1&& !visited[row][col+1]){
            q.push(make_pair(row, col+1));
        }
    }
}

int numIslands(vector<vector<int>>& islands){
    vector<vector<bool>> visited (islands.size(), vector<bool>(islands[0].size(), false));
    int numComps = 0;
    for (int i = 0; i < visited.size(); i++){
        for (int j = 0; j < visited[i].size(); j++){
            if (!visited[i][j] && islands[i][j] == 1){
                numComps++;
                BFS(islands, visited, i, j);
            }
        }
    }
    
    return numComps;
}
```

Running time is $O(mn)$ where `m` is the number of rows and `n` is the number of columns ie the number of cells in the grid. 

- [Problem 2](https://leetcode.com/problems/walls-and-gates/) 
- [Problem 3](https://leetcode.com/problems/rotting-oranges/)
- [Problem 4](https://leetcode.com/problems/accounts-merge/)



