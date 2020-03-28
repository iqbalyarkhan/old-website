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

2. [Approach](#approach)

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

### Approach

To satisfy our goal in the previous section, we can make use of two arrays: 

- an `edgeTo` array (which we've already seen being used with DFS and BFS) to find the paths from source to a vertex
- a `distanceTo` array which will hold the weight from one vertex to another