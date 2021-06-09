---
date: 2021-06-08
draft: false
thumbnail: /post-images/react.png
title: ReactJS Notes
extract: My notes as I learn ReactJS
categories:
    - General
tags:
    - blog
--- 

### Table of Contents

1. [Intro](#introduction)
    * [String variables](#string-variables)
    * [JS Object](#js-object)
    * [Lists in React](#lists-in-react)



### Introduction

Using, react-starter, go ahead and create a new project. Once done, you'll have a bunch of files generated for you. Let's start with what we see in App.js ( a simplified version):

```typescript jsx
import React from 'react';
function App() {
  return (
    <div>
      <h1>Hello World</h1>
</div> );
}
export default App;
``` 

First, this React component, called App component, is just a JavaScript function. It’s commonly called function component, because there are other variations of React components. The App component doesn't receive any parameters in its function signature yet. The App component returns code that resembles HTML which is called JSX.

### String variables

We can use string variables within our HTML like so:

```typescript jsx
import React from 'react';
const title = 'React';
function App() {
  return (
    <div>
      <h1>Hello World {title}</h1>
</div> );
}
export default App;
``` 

The rendered variable in browser, which should read: "Hello React".

### JS Object

Let's see how we can add js object:

```typescript jsx
import React from 'react';
const welcome = {
  greeting: 'Hey',
  title: 'React',
};
function App() {
  return (
<div> <h1>
        {welcome.greeting} {welcome.title}
</h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
); }
export default App;
```

Rendered object will be `Hey React`. Remember, everything in curly braces in JSX can be used for JavaScript expressions (e.g. function execution)

### Lists in React

So far we’ve rendered a few primitive variables in JSX; next we’ll render a list of items. First, let’s define the array as a variable. We can define a variable outside or inside the component. The following defines it outside:

```typescript jsx

import React from 'react';
const list = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    }, 
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    }, 
];

function App() {
  return (
    <div> 
        <h1>
            Hello React!
        </h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
); }
export default App;
```

Each item in the list has a title, a url, an author, an identifier (objectID), points – which indicate the popularity of an item – and a count of comments. Next, we’ll render the list within our JSX dynamically:

```typescript jsx

import React from 'react';
const list = [
    {
        title: 'React',
        url: 'https://reactjs.org/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
    }, 
    {
        title: 'Redux',
        url: 'https://redux.js.org/',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
    }, 
];

function App() {
  return (
    <div> 
        <h1>
            Hello React!
        </h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
); }
export default App;
```