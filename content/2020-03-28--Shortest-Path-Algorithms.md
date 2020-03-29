---
title: Shortest Path Algorithms
date: 2020-03-28
thumbnail: /post-images/spa.png
draft: false
extract: Analysis of shortest path algorithms
categories: 
    - General Algorithms
tags:
  - Graphs
  - General Algorithms
---

### Table of Contents

1. [Motivation](#motivation)

2. [Dijkstra's Algorithm](#dikjstras-algorithm--single-source)

3. [Analysis](#analysis)

In this post, I'll assume you have sufficient [digraph](/directed-graphs) knowledge

### Motivation

The motivation behind studying SPAs is to help us figure out, as the name suggests, the shortest paths between two vertices in a graph. SPAs can be used to answer questions such as:

- What is the shortest path from A to B? (Called **source sink**)
- What is the shortest path from A to every other vertex? (Called **single source**)
- What is the shortest path between all pairs? (Called **all pairs**)

To answer the questions above, need to be mindful of the edge weights:

- Are there negative weights allowed?
- Are cycles allowed?
- Are negative cycles allowed?

**Goal**: Once the above questions are answered, we need to be able to come up with a data structure that gives us the shortest paths from a source vertex `s` to every other vertex in the graph. 

### Dikjstra's Algorithm : Single Source 

Let's start with an algorithm that'll help us answer the question: **What is the shortest path from A to every other vertex?** This algorithm was introduced by Dijkstra:  

The algorithm makes use of two arrays: 

- an `edgeTo` array (which we've already seen being used with DFS and BFS) to find the paths from source to a vertex. It keeps track of the last edge that takes us to `edgeTo[index]`.
- a `distanceTo` array which will hold the weight from one vertex to another

The information above is nothing new. What is new is how we'd change the entries in the two arrays. Let's walk through this graph and and see how we'd go about filling out the two arrays:

![Directed-Graph](images/spa/spa1.png) [Image Credit - Directed Graph](https://graphonline.ru/en/)

Let's say we're asked for the shortest path from 0 to every other vertex. Initially our `edgeTo`, `distanceTo` and `visited` arrays look like this:

|  | distanceTo | edgeTo | visited |
| :--: | :--: | :--: | :--: |
| **0** | $\infty$ | 0 | F | 
| **1** | $\infty$ | 0 | F |
| **2** | $\infty$ | 0 | F |
| **3** | $\infty$ | 0 | F |
| **4** | $\infty$ | 0 | F |
| **5** | $\infty$ | 0 | F |
| **6** | $\infty$ | 0 | F |
| **7** | $\infty$ | 0 | F |

Initially, all distances are infinity, edge to is all 0s by default and visited is set to false. Alright, so we start at 0, so we set:
 
 - `distanceTo[0] = 0`
 - `edgeTo[0] = 0`
 - `visited[0] = true`
 
 and inspect each adjacent edge to 0:
 
 ![Directed-Graph](images/spa/spa2.png) [Image Credit - Directed Graph](https://graphonline.ru/en/)


We go to vertex 1, so `distanceTo[1]` is set to 5 since that is the weight of the edge and and it is less than the weight currently shown in `distanceTo[1]`. `edgeTo[1]` is set to 0 since we came from 0.

We go to vertex 7, so `distanceTo[7]` is set to 8 since that is the weight of the edge and and it is less than the weight currently shown in `distanceTo[7]`. `edgeTo[7]` is set to 0 since we came from 0.

We go to vertex 4, so `distanceTo[4]` is set to 9 since that is the weight of the edge and and it is less than the weight currently shown in `distanceTo[4]`. `edgeTo[4]` is set to 0 since we came from 0.

In the above three statements we update the `distanceTo` array because the relevant distance to array shows a value which is higher than the current value we came in with. Since our aim is to find the shortest path, we update the distance and the edge that gave us this shortest distance seen so far:

|  | distanceTo | edgeTo | visited |
| :--: | :--: | :--: | :--: |
| **0** | 0 | 0 | T | 
| **1** | 5 | 0 | F |
| **2** | $\infty$ | 0 | F |
| **3** | $\infty$ | 0 | F |
| **4** | 9 | 0 | F |
| **5** | $\infty$ | 0 | F |
| **6** | $\infty$ | 0 | F |
| **7** | 8 | 0 | F |

Notice, `visited[1]`, `visited[7]` and `visited[4]` are still false. That is because we consider a vertex visited once we've processed its neighbors. 

Now, we search for the least weight edge in `distanceTo` which is not yet visited. This is `distanceTo[1]` so we'll next visit vertex 1. We can mark `visited[1]` as true:

|  | distanceTo | edgeTo | visited |
| :--: | :--: | :--: | :--: |
| **0** | 0 | 0 | T | 
| **1** | 5 | 0 | T |
| **2** | $\infty$ | 0 | F |
| **3** | $\infty$ | 0 | F |
| **4** | 9 | 0 | F |
| **5** | $\infty$ | 0 | F |
| **6** | $\infty$ | 0 | F |
| **7** | 8 | 0 | F |

Now we consider 1's neighbors:

![Directed-Graph](images/spa/spa3.png) [Image Credit - Directed Graph](https://graphonline.ru/en/)

We go to vertex 3, so `distanceTo[3]` is set to 20 (5 from 0 to 1 and 15 from 1 to 3) since that is the weight of the edge and and it is less than the weight currently shown in `distanceTo[3]`. `edgeTo[1]` is set to 1 since we came from 1.

We go to vertex 2, so `distanceTo[2]` is set to 17 (5 from 0 to 1 and 12 from 1 to 2) since that is the weight of the edge and and it is less than the weight currently shown in `distanceTo[2]`. `edgeTo[7]` is set to 1 since we came from 1.

We go to vertex 7, so `distanceTo[7]` can be set to 9 (5 from 0 to 1 and 4 from 1 to 7) since that is the weight of the edge BUT it is NOT less than the weight currently shown in `distanceTo[7] = 8`. Therefore, we can leave `distanceTo[7]` and `edgeTo[7]` as is:

|  | distanceTo | edgeTo | visited |
| :--: | :--: | :--: | :--: |
| **0** | 0 | 0 | T | 
| **1** | 5 | 0 | T |
| **2** | 17 | 1 | F |
| **3** | 20 | 1 | F |
| **4** | 9 | 0 | F |
| **5** | $\infty$ | 0 | F |
| **6** | $\infty$ | 0 | F |
| **7** | 8 | 0 | F |


Now, we search for the least weight edge in `distanceTo` which is not yet visited. This is `distanceTo[7]` so we'll next visit vertex 7. We can mark `visited[7]` as true:

|  | distanceTo | edgeTo | visited |
| :--: | :--: | :--: | :--: |
| **0** | 0 | 0 | T | 
| **1** | 5 | 0 | T |
| **2** | 17 | 1 | F |
| **3** | 20 | 1 | F |
| **4** | 9 | 0 | F |
| **5** | $\infty$ | 0 | F |
| **6** | $\infty$ | 0 | F |
| **7** | 8 | 0 | T |

Now, we consider 7's neighbors:

We go to vertex 2, so `distanceTo[2]` is set to 15 (8 from 0 to 7 and 7 from 7 to 2) since that is the weight of the edge and and it is less than the weight currently shown in `distanceTo[2]`. `edgeTo[2]` is set to 7 since we came from 7.

We go to vertex 5, so `distanceTo[5]` is set to 14 (8 from 0 to 7 and 6 from 7 to 5) since that is the weight of the edge and and it is less than the weight currently shown in `distanceTo[5]`. `edgeTo[5]` is set to 7 since we came from 7.


|  | distanceTo | edgeTo | visited |
| :--: | :--: | :--: | :--: |
| **0** | 0 | 0 | T | 
| **1** | 5 | 0 | T |
| **2** | 15 | 7 | F |
| **3** | 20 | 1 | F |
| **4** | 9 | 0 | F |
| **5** | 14 | 7 | F |
| **6** | $\infty$ | 0 | F |
| **7** | 8 | 0 | T |

We're done with 7's neighbors. We need to again find the unvisited vertex with the least weight which is now 4. We continue updating our edgeTo and distanceTo arrays until we've visited every vertex. At the end this is what our arrays would look like:

|  | distanceTo | edgeTo | visited |
| :--: | :--: | :--: | :--: |
| **0** | 0 | 0 | T | 
| **1** | 5 | 0 | T |
| **2** | 15 | 7 | T |
| **3** | 18 | 2 | T |
| **4** | 9 | 0 | T |
| **5** | 13 | 4 | T |
| **6** | 25 | 2 | T |
| **7** | 8 | 0 | T |

Notice now we can answer questions such as what is the shortest path from 0 to any other vertex? The distanceTo array holds the least weight from 0 to any other vertex. The edgeTo array can be processed and each element put on a stack to determine the shortest path. 

Let's look at how we can get the shortest path from 0 to 6:

```cpp
Start at 6 push 6 to stack: 

6
_____
stack
```

Look at edgeTo[6] = 2. 

```cpp
Push 2 on the stack:

2
6
_____
stack
```

Look at edgeTo[2] = 7

```cpp
Push 7 on the stack:

7
2
6
_____
stack
```

Look at edgeTo[7] = 0

```cpp
Push 0 on the stack:

0
7
2
6
_____
stack
```

We're done since we've reached 0. Now popping off stack we get:

0 - 7 - 2 - 6 

### Code

Let's start with the client code:

```cpp{numberLines: true}
int main(int argc, const char * argv[]) {
    // insert code here...
    Digraph dg(6);
    dg.Insert(0, 1, 2);
    dg.Insert(0, 2, 4);
    dg.Insert(1, 2, 1);
    dg.Insert(1, 3, 7);
    dg.Insert(2, 4, 3);
    dg.Insert(3, 5, 1);
    dg.Insert(4, 3, 2);
    dg.Insert(4, 5, 5);
    dg.Print();
    dg.SPADijkstra(0);
    dg.PrintArrays();
    return 0;
}
```

The client above creates this graph:

![Directed-Graph](images/spa/spa8.png) [Image Credit - Directed Graph](https://graphonline.ru/en/)

We'll look to find the shortest path from vertex 0 to every other vertex. We start by inserting each edge into the digraph where each insert operation populates the adjacency list of pairs and then calls the `SPADijkstra(0)` function with our source vertex 0. 

Here's `SPADijkstra(0)` function:

```cpp
void Digraph::SPADijkstra(int s){
    edge.resize(numberOfVertices);
    for (int i = 0; i < numberOfVertices; i++){
        //Setting the distance to infinity for each vertex initially
        int a = numeric_limits<int>::max();
        dist.push_back(a);
    }
    
    //Changing the source's distance to 0.0
    dist[s] = 0;
    AddToSortedEdges(0, 0);
    while (!sortedEdges.empty()){
        int s = sortedEdges[0].second;
        sortedEdges.erase(sortedEdges.begin());
        Relax(s);
    }
    PrintAllSingleSourceShortestPaths();
}
```

This function sets up our arrays `egde` and `dist` and initializes `dist` to infinity which signifies that as of now, we cannot reach any edge from source `s`. Next, we change `dist[s]` to 0 which means that we're currently at `s`. Next, we maintain an array called `sortedEdges` that, as the name suggests keeps all our edges in sorted order based on the weight. For example, once we've visited 0's neighbors, the `sortedEdges` array would look like this:

```css
[<2,1> , <4,2>]
```
Notice how the order of the pair is <weight,edge> which allows us to sort based on weight instead of edge. The weight is the minimum weight seen so far to get to the corresponding edge. The function `AddToSortedEdges` allows us to add an edge to the array. This function sorts the array for us using `std::sort` call. Next, while we have edges in the array, we get the edge using 
```cpp
int s = sortedEdges[0].second;
```

and remove it from the array (like popping from a min priority queue). Next, we call the `Relax()` function which updates the `dist` and `edge` arrays based on the logic we discussed eariler:

```cpp
void Digraph::Relax(int s){
    //Get all adjacent vertices to passed in vertex
    for (int i = 0; i < adjList[s].size(); i++){
        //w is the adjacent vertex
        int w = adjList[s][i].first;
        //weight is the weight of that edge
        int weight = adjList[s][i].second + dist[s];
        //If this weight is less than what dist stores
        if (dist[w] > weight){
            //update the weights for that edge and the edge array
            dist[w] = weight;
            edge[w] = s;
            //Next update the edge weights in the sortedEdges array
            bool found = false;
            for (int i = 0; i < sortedEdges.size(); i++){
                if (sortedEdges[i].second == w){
                    sortedEdges[i].first = weight;
                    found = true;
                    sort(sortedEdges.begin(),sortedEdges.end());
                    break;
                }
            }
            
            if (!found){
                AddToSortedEdges(w, weight);
            }
        }
    }
}
```
Complete code:

```cpp{numberLines: true}
class Digraph{
  
private:
    int numberOfVertices;
    vector<vector<pair<int,int>>> adjList;
    vector<int> dist;
    vector<int> edge;
    vector<pair<int,int>> sortedEdges;
    /**
     Method name: Relax
     Description: Function to relax edges ie update dist and edge arrays
     Parameters: s - the source vertex
     */
    void Relax(int);
    
    /**
     Method name: AddToSortedEdges
     Description: Function to add vertex and weight to sortedEdges vector
     Parameters: s - vertex, weight - the weight
     */
    void AddToSortedEdges(int s, int weight);
    
    /**
     Method name: PrintAllSingleSourceShortestPaths
     Description: Function to print all paths from source
     */
    void PrintAllSingleSourceShortestPaths();
    
public:
    /**
       * Method name: PrintDPrintArraysist
       * Description: Method to print the edge and dist arrays
       * Parameters: None
       */
    void PrintArrays();
    
    /**
      * Method name: Digraph
      * Description: Constructor
      * Parameters: Takes in number of vertices
      */
    Digraph(int v);
    
    /**
      * Method name: GetNumberOfVertices
      * Description: Returns number of vertices in the graph
      * Parameters: none
      */
    int GetNumberOfVertices();
    
    /**
      * Method name: Insert
      * Description: Inserts a new pair to adjList with weight
      * Parameters: from edge, to edge, weight of edge
      */
    void Insert(int,int, int);
    
    /**
      * Method name: Print
      * Description: Prints graph
      * Parameters: none
      */
    void Print();
    
    /**
     Method name: SPADijkstra
     Description: Client function to find single source shortest paths from s
     Parameters: s - the source vertex
     */
    void SPADijkstra(int s);
    
};

void Digraph::PrintAllSingleSourceShortestPaths(){
    for (int i = 0; i <= numberOfVertices - 1; i++){
        cout << "Path from 0 to " << i << ": ";
        int curr = i;
        stack<int> s;
        s.push(curr);
        while (curr != 0){
            curr = edge[curr];
            s.push(curr);
        }
        while (!s.empty()){
            cout << s.top() << " ";
            s.pop();
        }
        cout << " has weight: " << dist[i];
        cout << endl;
        
    }
}

void Digraph::PrintArrays(){
    cout << "Index" << " " << "dist[]" << " " << "edge[]" << endl;
    for (int i = 0; i < dist.size(); i++){
        cout << i << " " << dist[i] << " " <<edge[i]<< endl;
    }
}

void Digraph::AddToSortedEdges(int s, int weight){
    sortedEdges.push_back(make_pair(weight, s));
    sort(sortedEdges.begin(), sortedEdges.end());
}

void Digraph::SPADijkstra(int s){
    edge.resize(numberOfVertices);
    for (int i = 0; i < numberOfVertices; i++){
        //Setting the distance to infinity for each vertex initially
        int a = numeric_limits<int>::max();
        dist.push_back(a);
    }
    
    //Changing the source's distance to 0.0
    dist[s] = 0.0;
    AddToSortedEdges(0, 0);
    while (!sortedEdges.empty()){
        int s = sortedEdges[0].second;
        sortedEdges.erase(sortedEdges.begin());
        Relax(s);
    }
    PrintAllSingleSourceShortestPaths();
}

void Digraph::Relax(int s){
    //Get all adjacent vertices to passed in vertex
    for (int i = 0; i < adjList[s].size(); i++){
        //w is the adjacent vertex
        int w = adjList[s][i].first;
        //weight is the weight of that edge
        int weight = adjList[s][i].second + dist[s];
        //If this weight is less than what dist stores
        if (dist[w] > weight){
            //update the weights for that edge and the edge array
            dist[w] = weight;
            edge[w] = s;
            //Next update the edge weights in the sortedEdges array
            bool found = false;
            for (int i = 0; i < sortedEdges.size(); i++){
                if (sortedEdges[i].second == w){
                    sortedEdges[i].first = weight;
                    found = true;
                    sort(sortedEdges.begin(),sortedEdges.end());
                    break;
                }
            }
            
            if (!found){
                AddToSortedEdges(w, weight);
            }
        }
    }
}

void Digraph::Insert(int from, int to, int weight){
    //Create pair for vertex.
    pair<int,double> edge(to, weight);
    //Push the edge on from's adjacency list
    adjList[from].push_back(edge);
}

void Digraph::Print(){
    cout << endl;
    for (int i = 0; i < adjList.size(); i++){
        cout << i;
        for (int j = 0; j < adjList[i].size(); j++){
            cout << " -> ";
            cout << "(" << adjList[i][j].first << ", ";
            cout << adjList[i][j].second << ")";
        }
        cout << endl;
    }
    cout << endl;
}

/// Constructor to initialize our vector of vector of pairs
/// @param v the number of vertices
Digraph::Digraph(int v) : numberOfVertices(v){
    adjList.resize(numberOfVertices);
}

int Digraph::GetNumberOfVertices(){
    return numberOfVertices;
}
```

### Analysis

Running time for Dijkstra's with min priority queue is $O(V + E Log V)$