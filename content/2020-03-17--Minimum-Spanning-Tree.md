---
title: Minimum Spanning Tree
date: 2020-03-17
draft: true
extract: Analysis of minimum spanning trees
categories: 
    - General Algorithms
tags:
  - Graphs
  - General Algorithms
---

### Table of Contents

1. [Motivation](#motivation)

2. [Logic](#logic)

3. [Depth First Orders](#depth-first-orders)

4. [Code](#code)

5. [Explanation](#explanation)

5. [Conclusion](#conclusion)

6. [Digraphs, Cycles and Topological Sort](#digraphs-cycles-and-topological-sort)

In this post, I'll assume you have sufficient directed graph knowledge. If not, feel free to browse through my post on [undirected graphs](/undirected-graphs).

### Motivation

Before we begin talking about minimal spanning trees,we need to introduce the idea of edge-weighted graphs. In these graphs, each edge has a weight associated with it. For example, if the vertices are cities then edges could be the ticket price for a flight between the two cities. We'd obviously be interested in finding the cheapest flight that go through multiple cities. 

To find such a flight we'd have to make use of minimal spanning tree. We'd be able to answer the question: given an undirected edge weighted graph, find a minimum spanning tree for that graph

A **spanning tree** of a graph is a connected subgraph with no cycles that connects all the vertices. Finding a minimum spanning tree for an edge weighted graph would mean finding a spanning tree where the sum of this tree's edges is as small as possible (when you consider all possible paths through the graph). 

Therefore, the requirements are:
- The tree needs to be connected
- The tree needs to be acyclic
- The tree needs to have the minimum weight