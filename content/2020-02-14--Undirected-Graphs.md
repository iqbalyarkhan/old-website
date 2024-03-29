---
title: Undirected Graphs
date: 2020-02-14
thumbnail: /post-images/undirected-graph.png
draft: true
extract: An analysis of undirected graphs
categories: 
    - DS&A
tags:
  - Data Structures
  - Graphs
---

### Table of Contents

1. [Introduction](#introduction)

2. [Definitions](#definitions)

3. [Adjacency Matrix](#adjacency-matrix)
    
    * [Adjacency Matrix code](#adjacency-matrix-code)

    * [Pros and Cons of Adjacency Matrix](#pros-and-cons-of-adjacency-matrix)

4. [Adjacency List](#adjacency-list)

    * [Adjacency List code](#adjacency-list-code)

    * [Add vertex](#add-vertex)
    
    * [Delete Vertex](#delete-vertex)

    * [Pros and Cons of Adjacency List](#pros-and-cons-of-adjacency-list)

10. [Conclusion](#conclusion)

### Introduction

In this post I'll talk about a type of data structure called graph (particularly undirected graphs). Graphs can be used to model your data depending on the type of problem you have. Graphs do not have a rigid, well defined shape (unlike trees) and can be created to solve the problem at hand.

Here is what an undirected graph looks like:

![Undirected-Graph](images/graphs/undirectedgraph.png) [Image Credit - Undirected Graph](http://www.algolist.net/Data_structures/Graph/Internal_representation)

A graph is nothing but a set of vertices that are connected by edges. Formally, a directed graph is a set V of vertices and a set of edges. Given an edge e = (u,v), the vertex u is its source, and v is its sink. Graphs can represent more than just edges between vertices for, e.g., by adding lengths to edges, weights to vertices, a start vertex, etc.

### Definitions

- **Vertices**: Similar to nodes in a tree, a vertex could represent a city in our graph.
- **Edges**: Edges connect 2 vertices together. An edge could represent a highway connecting cities.
- **Directed**: A directed graph is one that is represented by arrow heads showing the allowed direction that can be travelled.
- **Undirected**: Undirected graph allows you to travel in any direction (A to B or B to A) as long as the two vertices are connected.
- **Adjacent**: Two vertices are said to be adjacent if they're connected (ie one edge away from one another)
- **Degree**: Degree of a vertex is the number of edges going into or out of (ie touch) a vertex
- **Path**: A path in a graph (directed and undirected) for vertex u to v is a sequence of vertices and edges that connect u to v

How would we go about representing a graph in our code? As you can notice for the undirected graph above, there is no defined structure. It is hard to determine what our left and right child is going to be for each node. To represent an undirected graph in memory, we've got 2 options:



### Adjacency Matrix

A matrix is nothing but a 2D array where the size of each array is equal to the number of vertices in our graph. A value of 1 at a particular index would mean that the vertex is connected to another vertex. A value of 0 would signify that no connection is present. So, for the above graph, a 1 at $(2,4)$ and $(4,2)$ would signify that 2 is connected to 4 and 4 is connected to 2. Here's the adjacency matrix for the undirected graph above:

|  | 1 | 2 | 3 | 4 | 5 |
| -- | -- | -- | -- | -- | -- |
| **1** | 0 | 0 | 0 | 1 | 0 | 
| **2** | 0 | 0 | 0 | 1 | 1 | 
| **3** | 0 | 0 | 0 | 0 | 1 | 
| **4** | 1 | 1 | 0 | 0 | 1 | 
| **5** | 0 | 1 | 1 | 1 | 0 | 

### Adjacency Matrix code

```cpp{numberLines: true}
class AdjMatrix{
private:
    vector<vector<bool>> matrix;
    int vertices = 5;
    void InitAdjMatrix();
    
public:
    AdjMatrix();
    AdjMatrix(int);
    void AddEdge(int,int);
    void Print();
    
};

void AdjMatrix::Print(){
    for (int row = 0; row < vertices; row++){
        for (int col = 0; col < vertices; col++){
            cout << matrix[row][col] << " ";
        }
        cout << endl;
    }
    cout << endl;
}

AdjMatrix::AdjMatrix(int numVertices) : vertices(numVertices){
    InitAdjMatrix();
}

AdjMatrix::AdjMatrix(){
    InitAdjMatrix();
}



void AdjMatrix::InitAdjMatrix(){
    matrix.resize(vertices);
    for (int row = 0; row < vertices; row++){
        matrix[row].resize(vertices);
    }
}

void AdjMatrix::AddEdge(int i, int j){
    matrix[i][j] = true;
    matrix[j][i] = true;
}
```

On lines 3 and 4:

```cpp{numberLines: 3}
    vector<vector<bool>> matrix;
    int vertices = 5;
```

we're declaring our matrix of type `bool` and the number of vertices in the graph. In the constructor, we call the `InitAdjMatrix` helper function. If number of vertices is not passed in by the user, we default to 5 vertices, otherwise we set it to whatever value was passed. 

```cpp{numberLines: 35}
void AdjMatrix::InitAdjMatrix(){
    matrix.resize(vertices);
    for (int row = 0; row < vertices; row++){
        matrix[row].resize(vertices);
    }
}
```
In this function, we are initializing our vector of vectors. First, we initialize the outer vector using the `matrix.resize(vertices)` call that takes in the number of vertices passed. The `resize()` function is used to resize the matrix once it has been declared. After this call on line 36, we've created our outer vector. Each element of this outer vector is also a vector so we need to initialize this inner vector as well. To do so, we loop through this outer vector and at each index, we call `resize()` again so that we initialize the inner vector. By default, a vector of booleans will be initialized to false. Once our initialization is complete, we've created a 2D vector of booleans. The client can then initialize the adjacency matrix and add edges as needed.

### Pros and Cons of Adjacency Matrix

**The good**
- Insertion and deletion is fast due to the fact that we can access any edge in $O(1)$ time. 
- Checking if two vertices are connected is also fast, $O(1)$ thanks to fast lookup using array indices.

**Tha bad**
- Notice in the matrix above, more than half the entries are $0$. Our matrix is a sparse matrix and requires $O(V^2)$ space where $V$ is the number of vertices. Therefore, if we have a large graph, a matrix would take up a lot of space  

**Due to these cons, I'll be using an adjacency list for this and upcoming posts on graphs**.

### Adjacency List

An adjacency list also tells us what vertices are connected. As the name suggests, it is a linked list of connected items. For our image above, this is what the adjacency list would look like:

```
1 -> 4
2 -> 4 -> 5
3 -> 5
4 -> 1 -> 2 -> 5
5 -> 2 -> 3 -> 4

```

### Adjacency List code

Let's see the code for constructing this undirected graph:

![Undirected-Graph](images/graphs/undirectedgraph.png) [Image Credit - Undirected Graph](http://www.algolist.net/Data_structures/Graph/Internal_representation)

```cpp{numberLines: true}
class AdjList{
private:
    int vectorSize;
    vector<vector<int>> adjList;
    vector<bool> visited;
    
public:
    AdjList();
    AdjList(int);
    void AddEdge(int,int);
    void Print();
    void AddVertex(int);
    void DeleteVertex(int);
    void DFS();
    void RecursiveDFS();
    void RecursiveDFS(int v);
    void MST();
};

void AdjList::RecursiveDFS(){
    for (int i = 0; i < visited.size(); i++){
        if (!visited[i]){
            RecursiveDFS(i);
        }
    }
}

void AdjList::RecursiveDFS(int v){
    visited[v] = true;
    cout << v << " ";
    for (int i = 0; i < adjList[v].size(); i++){
        int curr = adjList[v][i];
        if (!visited[curr]){
            RecursiveDFS(curr);
        }
    }
}

//Function that takes in the additional
//number of vertices that you want
void AdjList::AddVertex(int num){
    vectorSize+= num;
    adjList.resize(vectorSize);
}

//Function to delete vertex passed
void AdjList::DeleteVertex(int v){
    if (v > vectorSize)
        return;
    //Empties vertex v's adjacency list
    adjList[v].clear();
    //Looks through other adjacency lists and removes
    //v from those lists.
    for (int i = 0; i < vectorSize; i++){
        auto itr = adjList[i].begin();
        while (itr != adjList[i].end()){
            if (*itr == v){
                itr = adjList[i].erase(itr);
            } else {
                itr++;
            }
        }
    }
}

AdjList::AdjList(int vecSize) : vectorSize(vecSize + 1){
    cout << "Number of vertices was passed as: " << vectorSize << endl;
    adjList.resize(vectorSize);
    visited.resize(vectorSize);
}
AdjList::AdjList(){
    cout << "Number of vertices defaults to 5..." << endl;
    vectorSize = 6;
    adjList.resize(vectorSize);
    visited.resize(vectorSize);
}

void AdjList::Print(){
    for (int i = 0; i < vectorSize; i++){
        cout << i;
        for (auto j : adjList[i]){
            cout << " -> ";
            cout << j;
        }
        cout << endl;
    }
    cout << endl;
}

void AdjList::AddEdge(int i, int j){
    adjList[i].push_back(j);
    adjList[j].push_back(i);
}
```
To create our list, we're using a vector of vectors declared on line 4. This is because using a vector allows us to: 

- Add edges in constant time by using `push_back()`
- Given a vertex, we can access its edges in constant time by using `adjList[v]` syntax where `v` is the vertex.

If you're using the default constructor, the number of vertices default to 5. So, if the default constructor is called, we'd have this:

```
0 -> <empty vector>
1 -> <empty vector>
2 -> <empty vector>
3 -> <empty vector>
4 -> <empty vector>
5 -> <empty vector>
```

Where 0-5 is one vector and each element in that vector is also a vector at that position. Note the use of `adjList.resize(vectorSize)` which is used to set the size of a vector after it is declared. 

Since arrays and vectors start at 0 index, to keep consistent with the graph shown above, we'll add the 0th vector as well but will start adding at index 1. Next, when we call the `AddEdge()` function, we pass in the edge that needs to be created. So, when `AddEdge()` is called with 1 and 4, it performs the following actions:
```cpp{numberLines: 39}
void AdjList::AddEdge(int i, int j){
    adjList[i].push_back(j);
    adjList[j].push_back(i);
}
```

The function goes to the `adjList[1]` and pushes back 4 and conversely, goes to `adjList[4]` and pushes a 1. Since our graph is undirected, it means that if 1 is connected to 4, then 4 is also connected to 1. If it is a directed graph, we'd only add one edge instead of two. If it is a directed weighted graph, we can use `std::pair`. Once the connection is made, our vectors would look like this:

```
0 -> <empty vector>
1 -> <4>
2 -> <empty vector>
3 -> <empty vector>
4 -> <1>
5 -> <empty vector>
```

The process repeats until no more edges are to be added. We do not have a check in our `addEdge()` function to see if an edge already exists because we assume that the client will always pass in distinct edges. Notice how the vectors are only populated as needed ie there is no wasted space. 
 
Client code for this class:

```cpp{numberLines: true}
int main(int argc, const char * argv[]) {
    AdjList l;
    l.AddEdge(1,4);
    l.AddEdge(4,2);
    l.AddEdge(5,4);
    l.AddEdge(5,2);
    l.AddEdge(5,3);
    l.Print();
    return 0;
}

```
### Add Vertex

What if, after initialization, we realize we need to add more vertices to the graph? We want to add more vectors to the outer vector:

```cpp{numberLines: 18}
//Function that takes in the additional
//number of vertices that you want
void AdjList::AddVertex(int num){
    vectorSize+= num;
    adjList.resize(vectorSize);
}
```

In this function, we're first incrementing the private local variable `vectorSize` to the new size. It is expected the client will pass in the additional number of vertices to be added to our graph. For example, if our graph currently has 4 vertices and this function is called like so:`g.AddVertex(2)`,  we're to increase the graph size to 6. Therefore, we call the `resize()` function with this new updated size. Here is the sample client code and the corresponding output for the above calls:

```cpp
    AdjList l(4);
    l.AddEdge(0, 1);
    l.AddEdge(0, 2);
    l.AddEdge(0, 3);
    l.AddEdge(1, 2);
    l.AddEdge(2, 4);
    l.Print();
    l.AddVertex(3);
    cout << "After adding 3 more vertices: " << endl;
    l.Print();
```
output:
```
Number of vertices was passed as: 5
0 -> 1 -> 2 -> 3
1 -> 0 -> 2
2 -> 0 -> 1 -> 4
3 -> 0
4 -> 2

After adding 3 more vertices: 
0 -> 1 -> 2 -> 3
1 -> 0 -> 2
2 -> 0 -> 1 -> 4
3 -> 0
4 -> 2
5
6
7
``` 
### Delete Vertex

This function is a bit more complicated: we first need to remove the vertex from the outer vector and then we need to loop through each adjacency list for each other vector and remove that vertex from that adjacency list:

```cpp{numberLines: 19}
//Function to delete vertex passed
void AdjList::DeleteVertex(int v){
    if (v > vectorSize)
        return;
    //Empties vertex v's adjacency list
    adjList[v].clear();
    //Looks through other adjacency lists and removes
    //v from those lists.
    for (int i = 0; i < vectorSize; i++){
        auto itr = adjList[i].begin();
        while (itr != adjList[i].end()){
            if (*itr == v){
                itr = adjList[i].erase(itr);
            } else {
                itr++;
            }
        }
    }
}
```

Here, we first call the `.clear()` function that completely removes the adjacency list for 2. This is the before and after results when `.clear()` is called for say, vertex 2:

Before
```
0 -> 1 -> 2 -> 3
1 -> 0 -> 2
2 -> 0 -> 1 -> 4
3 -> 0
4 -> 2
```
After
```
0 -> 1 -> 2 -> 3
1 -> 0 -> 2
2 
3 -> 0
4 -> 2
```

Notice how 2 still exists in adjacency lists for 0,1 and 4. To remove those, we need to iterate through each vertex's list and find the item and remove it from that list. To do so, we use the following logic:

```cpp
    //Looks through other adjacency lists and removes
    //v from those lists.
    for (int i = 0; i < vectorSize; i++){
        auto itr = adjList[i].begin();
        while (itr != adjList[i].end()){
            if (*itr == v){
                itr = adjList[i].erase(itr);
            } else {
                itr++;
            }
        }
    }
```

Here we need to use the `erase()` call to delete the matched element in the vector and re-capture the iterator. Therefore, once this function returns, 2's adjacency list is empty (it is not technically removed but is good enough for our purposes) and no other vertex has the deleted item in its adjacency list.


### Pros and Cons of Adjacency List

**The good**
- Takes only as much space as needed: $O(E + V)$ where $E$ is the number of edges and $V$ is the number of vertices
- Allows for faster traversal: you only visit edges that exist.
- Time proportional to degree of a vertex to iterate through vertices adjacent to the said vertex
- Adding an edge takes $O(1)$ time
- Checking whether B is adjacent to A takes time $O(degree(A))$
- Time it takes to iterate through vertices adjacent to A = $O(degree(A))$

**The bad**
- Takes time to check whether two vertices are connected.
- Edge insertion and deletion also takes more time.

### Conclusion

Relationship between objects that can be represented using undirected graphs and a lot of questions can be answered about the said objects. Explore the graphs section to see howw this implementation can be put to use to answer interesting questions. 
