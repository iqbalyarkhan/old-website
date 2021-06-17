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

**My notes as I walk through the great book on React - [Road To React by Robin Weiruch](https://www.roadtoreact.com/)**

### Table of Contents

1. [Intro](#introduction)
* [String variables](#string-variables)
* [JS Object](#js-object)
* [Lists in React](#lists-in-react)
* [Components](#components)
* [Arrow functions](#arrow-functions)
* [Handler Functions](#handler-functions)
* [React Props](#react-props)
* [React State](#react-state)
    


At its very core, React basically maintains a HTML tree for you. This tree is able to do efficient diff computations on the nodes.

Think of your HTML code as a tree. In fact, that is exactly how the browser treats your DOM (your rendered HTML on the browser). React allows you to effectively re-construct your DOM in JavaScript and push only those changes to the DOM which have actually occurred. There's nothing like JSX - neither to JavaScript, nor to the browser. JSX is simply syntactic sugar for creating very specific JavaScript objects.

When you write something like:

```jsx 
const tag = <h1>Hello</h1>
```

what you're essentially doing is this:

```jsx
const tag = React.createElement("h1", {}, "Hello")
```

Later down the road, we'll see the `<App />` tag in `index.js` which parses all our components and creates the completed DOM for us. This means that when `<App />` has done parsing, there's just a huge object of React elements. 

Then how is React able to construct actual divs and p tags out of it?  Meet ReactDOM which recursively creates nodes depending on their 'type' property and appends them finally to the DOM. For more details, checkout [this](https://www.freecodecamp.org/news/react-under-the-hood/) great write-up

Let's dive deep into various aspects of React:

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

```jsx
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

```jsx

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

```jsx

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
        <ul>
            {list.map(function(item) {
                return <div>{item.title}</div>;
            })}
        </ul>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
); }
export default App;
```

React will display each item now, but you can still improve your code so React handles advanced dynamic lists more gracefully. By assigning a key attribute to each list item’s element, React can identify modified items if the list changes (e.g. re-ordering). For our example, we can use the `objectID` as our `key` attribute:

```jsx

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
        <ul>
            {list.map(function(item) {
                return <div key={item.objectID}>{item.title}</div>;
            })}
        </ul>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" />
    </div>
); }
export default App;
```

We avoid using the index of the item in the array to make sure the key attribute is a stable identifier.

Let's flesh out our example a little more and start printing out more information from our object:

```jsx
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
            <ul>
                {list.map(function(item) {
                    return (
                        <div key={item.objectID}>
                            <a href={item.url}>{item.title}</a>
                            <br></br>
                            <span>Author: {item.author}</span>
                            <br></br>
                            <span>Comments: {item.num_comments}</span>
                            <br></br>
                            <span>Points: {item.points}</span>
                            <br></br>
                            <br></br>
                        </div>
                    );
                })}
            </ul>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" />
        </div>
    ); }
export default App;
```
The map function is in-lined concisely in your JSX. Within the map function, we have access to each item and its properties. The url property of each item is used as dynamic href attribute for the anchor tag. Not only can JavaScript in JSX be used to display items, but also to assign HTML attributes dynamically.

Code block above would print:

```text
React
Author: Jordan Walke
Comments: 3
Points: 4

Redux
Author: Dan Abramov, Andrew Clark
Comments: 2
Points: 5

Search: 
```

### Components

In the example above, notice how our list generation logic became quite complicated. It seems cluttered sitting alongside our main logic. To make things simpler (and for the sake of separation of concerns), let's define the list as a separate component:

```jsx
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

/*Creating our List component :*/
function List() {
    return list.map(function(item) {
        return (
            <div key={item.objectID}>
                <a href={item.url}>{item.title}</a>
                <br></br>
                <span>Author: {item.author}</span>
                <br></br>
                <span>Comments: {item.num_comments}</span>
                <br></br>
                <span>Points: {item.points}</span>
                <br></br>
                <br></br>
            </div> );
    });
}


function App() {
    return (
        <div>
            <ul>
                {/*Adding our generated List as a tag:*/}
                <List/>
            </ul>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" />
        </div>
    ); }
export default App;
```

Once we’ve defined a component, we can use it like an HTML element anywhere in our JSX. The element produces an component instance of your component, or in other words, the component gets instantiated. You can create as many component instances as you want. It’s not much different from a JavaScript class definition and usage.

Larger React applications have component hierarchies (also called component trees). There is usually one uppermost entry point component (e.g. App) that spans a tree of components below it. The App is the parent component of the List, so the List is a child component of the App. In a component tree, the App is the root component, and the components that don’t render any other components are called leaf components (e.g. List). The App can have multiple children, as can the List. If the App has another child component, the additional child component is called a sibling component of the List.

Similar to how we have components inside App.js, our `App` itself is a component that resides in the `App.js` file. This component is used in our `src/index.js` file like so:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

Next to React in the snippet above, there is another imported library called react-dom, in which a ReactDOM.render() function uses an HTML node to replace it with JSX. The process integrates React into HTML. ReactDOM.render() expects two arguments; the first is to render the JSX. It creates an instance of your App component, though it can also pass simple JSX without any component instantiation. The second argument specifies where the React application enters your HTML. It expects an element with an id='root', found in the public/index.html file. This is a basic HTML file.

### Arrow Functions
JavaScript has multiple ways to declare functions. So far, we have used the function statement, though arrow functions can be used more concisely:

```jsx
// allowed
const item => { ... } 
// allowed
const (item) => { ... } 
// not allowed
const item, index => { ... } 
// allowed
const (item, index) => { ... }
```

Converting our class to use arrow functions, we'll get this:

```jsx
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

/*Creating our List component :*/
const List = () => {
    return list.map(function(item) {
        return (
            <div key={item.objectID}>
                <a href={item.url}>{item.title}</a>
                <br></br>
                <span>Author: {item.author}</span>
                <br></br>
                <span>Comments: {item.num_comments}</span>
                <br></br>
                <span>Points: {item.points}</span>
                <br></br>
                <br></br>
            </div> );
    });
};


const App = () => {
    return (
        <div>
            <ul>
                {/*Adding our generated List as a tag:*/}
                <List/>
            </ul>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" />
        </div>
    );
};
export default App;
```

If an arrow function doesn't do anything in between, but only returns something, – in other words, if an arrow function doesn't perform any task, but only returns information –, you can remove the block body (curly braces) of the function. In a concise body, an implicit return statement is attached, so you can remove the return statement:

```jsx
// with block body
count => {
  // perform any task in between
return count + 1; }
// with concise body
count =>
  count + 1;
```

Our `App` and `List` components are eligible for concise body returns:

```jsx
/*Creating our List component :*/
const List = () => {
    return list.map(function(item) {
        return (
            <div key={item.objectID}>
                <a href={item.url}>{item.title}</a>
                <br></br>
                <span>Author: {item.author}</span>
                <br></br>
                <span>Comments: {item.num_comments}</span>
                <br></br>
                <span>Points: {item.points}</span>
                <br></br>
                <br></br>
            </div> );
    });
};


const App = () => {
    return (
        <div>
            <ul>
                {/*Adding our generated List as a tag:*/}
                <List/>
            </ul>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" />
        </div>
    );
};
export default App;
```

### Handler Functions
The App component still has the input field and label, which we haven’t used. In HTML outside of JSX, input fields have an onchange handler50. We’re going to discover how to use onchange handlers with a React component’s JSX. We'll define a function – which can be normal or arrow – for the change event of the input field. In React, this function is called an (event) handler. Now the function can be passed to the `onChange` attribute (JSX named attribute) of the input field:

```jsx
const App = () => {
  const handleChange = event => {
    console.log(event);
};
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
```

Now, when you type, say a `?`, in the search box, and inspect the console in chrome, you'll see this (notice the data field on line 2 below):

```jsx
SyntheticBaseEvent {_reactName: "onChange", _targetInst: null, type: "change", nativeEvent: InputEvent, target: input#search, …}
nativeEvent: InputEvent {isTrusted: true, data: "?", isComposing: false, inputType: "insertText", dataTransfer: null, …}
```

This is called a synthetic event defined by a JavaScript object. To just get the value typed by the user, you can use `event.target.value`:

```jsx
const App = () => {
    const handleChange = event => {
        console.log(event.target.value);
    };

    return (
        <div>
            <ul>
                {/*Adding our generated List as a tag:*/}
                <List/>
            </ul>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={handleChange} />
        </div>
    );
};
export default App;
```


The synthetic event is essentially a wrapper around the browser’s native event51, with more functions that are useful to prevent native browser behavior (e.g. refreshing a page after the user clicks a form’s submit button). This is how we give HTML elements in JSX handler functions to respond to user interaction. Always pass functions to these handlers, not the return value of the function, except when the return value is a function:

```jsx
{/*don't do this*/}
<input
    id="search"
    type="text" onChange={handleChange()}
/>

{/*do this instead*/}
<input
    id="search"
    type="text"
    onChange={handleChange}
/>
```

### React Props

We are currently using the list variable as a global variable in the current application. We used it directly from the global scope in the App component, and again in the List component. This could work if you only had one variable, but it doesn't scale with multiple variables across multiple components from many different files:

```jsx
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
];

/*Creating our List component :*/
const List = () => {
    return list.map(function(item) {
        return (
            <div key={item.objectID}>
                <a href={item.url}>{item.title}</a>
                <br></br>
                <span>Author: {item.author}</span>
                <br></br>
                <span>Comments: {item.num_comments}</span>
                <br></br>
                <span>Points: {item.points}</span>
                <br></br>
                <br></br>
            </div> );
    });
};


const App = () => {
    const handleChange = event => {
        console.log(event.target.value);
    };

    return (
        <div>
            <ul>
                {/*Adding our generated List as a tag:*/}
                <List/>
            </ul>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={handleChange} />
        </div>
    );
};
export default App;
```

Using so called **props**, we can pass variables as information from one component to another component. Before using props, we’ll move the list from the global scope into the App component and rename it to its actual domain:

```jsx
import React from 'react';
const App = () => {
    const stories = [
        {
            title: 'React',
            url: 'https://reactjs.org/',
            author: 'Jordan Walke',
            num_comments: 3,
            points: 4,
            objectID: 0,
        },
    ];
...
};
export default App;
```

Next, we’ll use React props to pass the array to the List component:

```jsx
const App = () => {
    const stories = [
        {
            title: 'React',
            url: 'https://reactjs.org/',
            author: 'Jordan Walke',
            num_comments: 3,
            points: 4,
            objectID: 0,
        },
    ];

    const handleChange = event => {
        console.log(event.target.value);
    };

    return (
        <div>
            <ul>
                {/*List tag being passed the array as props:*/}
                <List list={stories}/>
            </ul>
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={handleChange} />
        </div>
    );
};
export default App;
```

Remember our `List` component? It'll now accept the **props**, iterate over the props and add create our object:

```jsx
/*Creating our List component that accepts props :*/
const List = props => {
    return props.list.map(function(item) {
        return (
            <div key={item.objectID}>
                <a href={item.url}>{item.title}</a>
                <br></br>
                <span>Author: {item.author}</span>
                <br></br>
                <span>Comments: {item.num_comments}</span>
                <br></br>
                <span>Points: {item.points}</span>
                <br></br>
                <br></br>
            </div> );
    });
};
```

Using this operation, we’ve prevented the list/stories variable from polluting the global scope in the App component. Since stories is not used in the App component directly, but in one of its child components, we passed them as props to the List component. There, we can access it through the first function signature’s argument, called props.

### React State
React Props are used to pass information down the component tree; React state is used to make applications interactive. We’ll be able to change the application’s appearance by interacting with it.
First, there is a utility function called useState that we take from React for managing state. The `useState` function is called a hook. There are many more hooks in React but we'll first focus on `useState` hook:

```jsx
const App = () => {
  const stories = [ ... ];
  const [searchTerm, setSearchTerm] = React.useState('');
... };
```

We get the `useState` hook by making the `React.useState('')` call. The `.useState()` call takes an initial state as argument, which in the case above, is an empty string. The `useState()` function will return an array with two values. The first value, `searchTerm` represents the current state. The second value is a function to update this state `setSearchTerm`. This function is also referred to as state updater function. This return type is called array destructuring as seen in this java script example:

```jsx
// basic array definition
const list = ['a', 'b'];
// no array destructuring
const itemOne = list[0]; const itemTwo = list[1];
// array destructuring
const [firstItem, secondItem] = list;
```

Array destructuring is just a shorthand version of accessing each item one by one. If you express it without the array destructuring in React, it becomes less readable. After we initialize the state and have access to the current state and the state updater function, use them to display the current state and update it within the App component’s event handler:


```jsx
const App = () => {
  const stories = [ ... ];

  {/*Setting and getting state using hook*/}
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChange = event => {
    setSearchTerm(event.target.value);
};
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
      <p>
        Searching for <strong>{searchTerm}</strong>.
</p>
<hr />
      <List list={stories} />
    </div>
); };
```

When the user types into the input field, the input field’s change event is captured by the handler with its current internal value. The handler’s logic uses the state updater function to set the new state. After the new state is set in a component, the component renders again, meaning the component function runs again. The new state becomes the current state and can be displayed in the component’s JSX.

  
