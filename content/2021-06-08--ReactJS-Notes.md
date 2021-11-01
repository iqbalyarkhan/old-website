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
    - React
--- 

**My notes as I walk through the great book on React - [Road To React by Robin Weiruch](https://www.roadtoreact.com/)**

### Table of Contents

- [Table of Contents](#table-of-contents)
- [Introduction](#introduction)
- [React and JS](#react-and-js)
  - [Classes](#classes)
  - [Arrow Functions](#arrow-functions)
  - [Functional Programming](#functional-programming)
  - [Template Literals](#template-literals)
  - [var, let and const](#var-let-and-const)
  - [Ternary operator](#ternary-operator)
  - [Import and Export](#import-and-export)
- [Getting Started](#getting-started)
- [String variables](#string-variables)
- [JS Object](#js-object)
- [Lists in React](#lists-in-react)
- [Components](#components)
- [Arrow Functions Continued](#arrow-functions-continued)
- [Handler Functions](#handler-functions)
- [React Props](#react-props)
- [React State](#react-state)
  - [Hooks](#hooks)
- [useEffect Hook](#useeffect-hook)
- [GraphQL Basics](#graphql-basics)
- [Updates with Mutations](#updates-with-mutations)
- [Queries and Aliases](#queries-and-aliases)
- [Queries and Fragments](#queries-and-fragments)

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

If you look up more info on React, you'll find some flavor of the following:

*React is a free and open-source front-end JavaScript library for building user interfaces or UI components.*

React is a Javascript library. It only makes sense to start with understanding JS before diving into React. Let's look at a few basic concepts in JS that are a part of React as well

### React and JS

#### Classes

In pure JS, a simple class would look like this:

```jsx
class Person {
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = firstName;
    }

    getName(){
        return this.lastName + ',' this.firstName;
    }
}
var newPerson = new Person('John', 'Doe');
console.log(newPerson.getName());
```

This is quite a simple class with a constructor that expects two strings and a `getName()` method that returns concatenated strings. In addition, the `extends` keyword can be used to inherit from another class. The more specialized class (ie more specific class), inherits from the more general class. For example, if there's a specific type of person represnted by a class, say a soccer player, then it can `extend` the `Person` class like so:

```jsx
class Person {
    constructor(firstName, lastName){
        this.firstName = firstName;
        this.lastName = firstName;
    }

    getName(){
        return this.lastName + ',' this.firstName;
    }
}
class SoccerPlayer extends Person{
    getPosition(){
        return 'attacker';
    }
}

var newPlayer = new SoccerPlayer('John', 'Doe');
console.log(newPlayer.getName()); //Prints John Doe
console.log(newPlayer.getPosition()); //Prints attacker
```

Similarly, here's a class in React:

```jsx
import React, { Component } from 'react';
 
class App extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to React</h1>
      </div>
    );
  }
}
export default App;
```

We've defined a class called `App` that's a more specific version of class `Component` which is imported from the `react` package (the import statement). Similar to how we were able to use `getName()` for our player above, the `App` component can use methods exposed by `Component` class such as `componentDidMount()`, `setState()` etc.

You can also define your own classes:

```jsx
import React, { Component } from 'react';
 
class App extends Component {
  getGreeting() {
    return 'Welcome!';
  }
 
  render() {
    return (
      <div>
        <h1>{this.getGreeting()}</h1>
      </div>
    );
  }
}
export default App;
```

As your classes grow, they may have multiple properties. For example, say we add age, location, height and weight to our person class:

```jsx
import React, { Component } from "react";

class Person extends Component {
  constructor(props) {
    super(props);
    this.firstName = 'John';
    this.lastName = 'Doe';
    this.age = 22; 
    this.location = 'UK';
    this.height = '6 feet';
    this.weight = 160;
  }

  render() {
    return (
      <div>
        <h1>{this.firstName}</h1>
        <h1>{this.lastName}</h1>
      </div>
    );
  }
}
export default Person;
```

Managing all these properties becomes a hassle. Fortunately, we can use `state` and `arrowFunctions` to bind our class variables. We get rid of the constructor and simply store our variables in the state:

```jsx
class App extends Component {
  state = {
    message: "Hi",
    firstName: "John",
    lastName: "Doe",
    age: 22,
    location: "UK,",
    height: "6 feet",
    weight: 160
  };

  render() {
    return (
      <div>
        <h1>{this.state.height}</h1>
      </div>
    );
  }
}
export default App;
```

Notice how we access the variable using `this.state.<name>`.

Obviously, you also need a way to manipulate the variables. For that we can use `this.setState`. Say, for one button click, we call a function called `increaseWeight` and `decreaseWeight` on another click. We'll increase and decrease weight for each click:

```jsx
class App extends Component{
    state = {/*...*/}
    increaseWeight = () => {
        this.setState((state) => ({ weight: this.state.weight + 1 }));
    };

    decreaseWeight = () => {
        this.setState((state) => ({ weight: this.state.weight - 1 }));
    };

    render() {
        return (
        <div>
            <button onClick={this.increaseWeight} type="button">
            Increase weight
            </button>
            <button onClick={this.decreaseWeight} type="button">
            Decrease weight
            </button>
            <h2>{this.state.weight}</h2>
        </div>
        );
  }
}
```

Notice how we call `increaseWeight` on click. Inside that function (more on the weird syntax in the next section), we use the `setState` function call that's extended via the `Component`. Here, we take the state called `weight` and assign it the value of 1 + current weight. Notice the use of `this.state.weight` instead of `this.weight`.

By using JavaScript arrow functions, you can auto-bind class methods without having to bind them in the constructor. Also the constructor can be left out, when not using the props, by defining the state directly as a class property.

#### Arrow Functions

In JS ES5 version, here's how you'd define a function:

```jsx
function sayHello(){
    return 'Hello!' 
}; 
```

In ES6, you can use an arrow function with body:

```jsx
const sayHello = () => {
  return 'Hello!';
}
```

or you can have a function without body and with an implicit return:

```jsx
const sayHello = () => 
    'Hello';
```

JavaScript arrow functions are often used in React applications for keeping the code concise and readable.

#### Functional Programming

In React, you can use a function to define a component:

```jsx
const sayHello = (props) =>
  <h1>{props.greeting}</h1>;
```

If there's computation in between, you can't use the implicit return. Instead add the return statement:

```jsx
const sayHello = (props) =>
  return <h1>{props.greeting}</h1>;
```

#### Template Literals

Template literals are literals delimited with backticks (`), allowing embedded expressions called substitutions.
Untagged template literals result in strings, which makes them useful for string interpolation (and multiline strings, since unescaped newlines are allowed).

Tagged template literals call a function (the tag function) with an array of any text segments from the literal followed by arguments with the values of any substitutions.

An example:

```jsx
function getGreeting(what) {
  return `Welcome to ${what}`;
}
```

#### var, let and const

(1) don't use var anymore, because let and const are more specific

(2) default to const, because it cannot be re-assigned or re-declared

(3) use let when re-assigning the variable

#### Ternary operator

Here's how to use the ternary operator in React:

```jsx
<evluation ? do_this_if_true : else_do_this>
```

example:

```jsx
{this.showUsers ? (<h3>Will show users</h3>) : (<h3>Won't show users</h3>)}
```

#### Import and Export

In React, you can import/export like so:

```jsx
//File1.js
const firstname = 'John';
const lastname = 'Doe';
 
export { firstname, lastname };
```

Then you can import them in another file with a relative path to the first file:

```jsx
//File2.js
import { firstname, lastname } from './File1.js';

console.log(firstname);
```

You can also import all exported variables from another file as one object:

```jsx
import * as person from './File1.js';

console.log(person.firstname);
```

Imports can have an aliases too:

```jsx
import { firstname as username } from './File1.js';
 
console.log(username);
```

All the previous cases are named imports and exports. But there exists the `default` statement too that can be used for:

(1) Exporting and importing a single functionality

(2) Highlighting main functionality of exported API of a module

(3) Having a fallback import functionality

```jsx
const person = {
  firstname: 'John',
  lastname: 'Doe',
};
 
export default person;
```

Leave out the curly braces for the import to import the default export:

```jsx
import developer from './file1.js';

console.log(developer);
```

These are the basic concepts present in both JS and React. You can read more about these [here](https://www.robinwieruch.de/javascript-fundamentals-react-requirements)

### Getting Started

To get started with react, we can use the create-react-app starter. To use it, we can use the command `npx create-react-app`. Once done, you'll have a bunch of files generated for you. Let's start with what we see in App.js ( a simplified version):

```jsx
import React from 'react';
function App() {
    return (
        <div>
            <h1>Hello World</h1>
        </div> 
    );
}
export default App;
```

This is a React component, called App component which is nothing but a JavaScript function. It’s commonly called function component, because there are other variations of React components. The App component doesn't receive any parameters in its function signature yet. The App component returns code that resembles HTML which is called JSX.

### String variables

We can use string variables within our HTML like so:

```jsx
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

**Notice the use of `<div>` in our return statement: make sure you add that otherwise return won't work correctly!

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
    <div> 
        <h1>
            {welcome.greeting} {welcome.title}
        </h1>
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
const list = [/*...*/];

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
        </div>
    ); }
export default App;
```

Once we’ve defined a component, we can use it like any HTML element anywhere in our JSX. The element produces an component instance of your component, or in other words, the component gets instantiated. You can create as many component instances as you want. It’s not much different from a JavaScript class definition and usage.

Larger React applications have component hierarchies (also called component trees). There is usually one uppermost entry point component (e.g. App) that spans a tree of components below it. The App is the parent component of the List, so the List is a child component of the App. In a component tree, the App is the root component, and the components that don’t render any other components are called leaf components (e.g. List). The App can have multiple children, as can the List. If the App has another child component, the additional child component is called a sibling component of the List.

Similar to how we have components inside App.js, our `App` itself is a component that resides in the `App.js` file. This component is used in our `src/index.js` file like so:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
```

Next to React in the snippet above, there is another imported library called react-dom, in which a ReactDOM.render() function uses an HTML node to replace it with JSX. The process integrates React into HTML. ReactDOM.render() expects two arguments; the first is to render the JSX. It creates an instance of your App component, though it can also pass simple JSX without any component instantiation. The second argument specifies where the React application enters your HTML. It expects an element with an id='root', found in the public/index.html file. This is a basic HTML file.

### Arrow Functions Continued

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
const list = [/**/];

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
        </div>
    );
};
export default App;
```

If an arrow function doesn't do anything in between, but only returns something,in other words, if an arrow function doesn't perform any task, but only returns information, you can remove the block body (curly braces) of the function. In a concise body, an implicit return statement is attached, so you can remove the return statement:

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
const List = () =>
  list.map(item => (
    <div key={item.objectID}>
        <span>
            <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
    </div>
));


const App = () => (
    <div> ...
    </div>
);
export default App;
```

### Handler Functions

The App component still has the input field and label, which we haven’t used. In HTML outside of JSX, input fields have an onchange handler. We’re going to discover how to use onchange handlers with a React component’s JSX. We'll define a function – which can be normal or arrow – for the change event of the input field. In React, this function is called an "event" handler. Now the function can be passed to the `onChange` attribute (JSX named attribute) of the input field:

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

Now, when you type, say a `?`, in the search box, and inspect the console in chrome, you'll see this (notice the `data` field on line 2 below):

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
            <label htmlFor="search">Search: </label>
            <input id="search" type="text" onChange={handleChange} />
        </div>
    );
};
export default App;
```

The synthetic event is essentially a wrapper around the browser’s native event, with more functions that are useful to prevent native browser behavior (e.g. refreshing a page after the user clicks a form’s submit button). This is how we give HTML elements in JSX handler functions to respond to user interaction. Always pass functions to these handlers, not the return value of the function, except when the return value is a function:

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

You can read more about events [here](https://reactjs.org/docs/events.html)

### React Props

We are currently using the list variable as a global variable in the current application. As a reminder, here's what we had:

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
        </div>
    );
};
export default App;
```

We used the list directly from global scope in App component, and again in the List component. This could work if you only had one variable, but it doesn't scale with multiple variables across multiple components from many different files.

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

const handleChange = event => { ... };
return ( ... );
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
    return (
        <div>
            <ul>
                {/*List tag being passed the array as props:*/}
                <List list={stories}/>
            </ul>
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

First, there is a utility function called `useState` that we take from React for managing state. The `useState` function is called a hook. You might remember `useState` from [earlier](#classes) when we incremented and decremented weight based on button clicks. There are many more hooks in React but we'll first focus on `useState` hook:

```jsx
const App = () => {
  const stories = [ ... ];
  const [searchTerm, setSearchTerm] = React.useState('');
... };
```

We get the `useState` hook by making the `React.useState('')` call. The `.useState()` call takes an initial state as argument, which in the case above, is an empty string. The `useState()` function will return an array with two values. The first value, `searchTerm`, represents the current state. The second value is a function to update this state `setSearchTerm`. This function is also referred to as state updater function. Now, every time we need to update the state, we'll have to make a call to `setSearchTerm` to do so. This can be done like this:

```jsx
setSearchTerm('newStateVal');
```

As a side note, this return type (where multiple values are returned from a function) is called array destructuring as seen in this java script example:

```jsx
// basic array definition
const list = ['a', 'b'];
// no array destructuring
const itemOne = list[0]; const itemTwo = list[1];
// array destructuring
const [firstItem, secondItem] = list;
```

Array destructuring is just a shorthand version of accessing each item one by one. If you express it without the array destructuring in React, it becomes less readable. 

After we initialize the state and have access to the current state and the state updater function, we'll display the current state and update it within the App component’s event handler:

```jsx
import * as React from 'react';

const App = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
      <h3>You searched for: </h3>
      <p>{searchTerm}</p>
    </div>
  )
};
export default App;
```

When the user types into the input field, the input field’s change event is captured by the handler with its current internal value. This is done using `onChange={handleChange}`. Once the call is made to `handleChange` function we use `setSearchTerm` function call and pass it the value of new state. After the new state is set, the component renders again. The new state becomes the current state and can be displayed in the component’s JSX. 

Notice how we're not using `this.state` or `this.searchTerm`. Instead we've used curly braces: `{searchTerm}`. That's because in a class, we need to call `this.setState()` to update the state. If it's a function component, then simply using the state variable would suffice. 

We can also separate `Search` out into its own component and add it to our App. Through this process, the Search component becomes a sibling of the List component, and vice versa. We’ll also move the handler and the state into the Search component to keep our functionality intact. As shown below, we've created a new `Search` component that renders the search box and updates HTML based on input received in that search box:

```jsx
import React from 'react';

/*Search component*/
const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
      <hr />
    </div>
  )
};

/*List component*/
const List = (props) => (
  <ul>
    {props.list.map((item) => (
      <li key={item.objectID}>
        <span>
          <a href={item.url}>{item.title}</a>
        </span>
        <span>{item.author}</span>
        <span>{item.num_comments}</span>
        <span>{item.points}</span>
      </li>
    ))}
  </ul>
);
```

Finally, we can now just import `List` and `Search` components into our app like so:

```jsx
const App = () => {
    const stories = [/**/];
    return (
        <div>
            <ul>
                {/*Adding our generated List as a tag:*/}
                <List list={stories}/>
                <Search/>
            </ul>
        </div>
    );
};
export default App;
```

Side note: if you add the initial state, it'll be rendered in the initial rendering of the component (when the user hasn't typed anything yet). To do so, simply add the initial state on `useState` hook initialization:

```jsx
const [searchTerm, setSearchTerm] = React.useState('<Initial State>');
```

Declaring state variables as a pair of [something, setSomething] is also handy because it lets us give different names to different state variables if we want to use more than one:

```jsx
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
}
```

I've used the term `hook` above, but what's a `hook`?

#### Hooks
A Hook is a special function that lets you “hook into” React features. For example, `useState` is a Hook that lets you add React state to function components. We’ll learn other Hooks later. If you write a function component and realize you need to add some state to it, previously you had to convert it to a class. Now you can use a Hook inside the existing function component. You can learn more about hooks [here](https://reactjs.org/docs/hooks-state.html).


### useEffect Hook

The useEffect hook is used to manage side effects that aren't related to the components' rendering. Things such as console messages or loading data are managed by useEffect. To use this hook, we need to import it:

```jsx
import React, {useState, useEffect} from 'react';
```

The useEffect hook takes in two arguments a call-back function and a dependency array:

```jsx
useEffect(() => {
    //Do something...
}, []);
```

The dependency array can be used to keep track of values:

``` jsx
import React, { useState, useEffect } from "react";

function App(){
    const [emotion, setEmotion] = useState("happy");
    
    useEffect(() => {
        console.log(`The emotion is: ${emotion}`);
    }, [emotion]);    

}
```

useEffect will update the console ONLY on emotion change. We can use useEffect to handle values returned from API calls:

```jsx
function App(props) {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);

    useEffect(() => {
        if (!props.login) return;
        setLoading(true);

       fetch(`https://api.github.com/users/${props.login}`)
           .then(r => r.json())
           .then(setData)
           .then(() => setLoading(false))
           .catch(setError);
    }, [props.login]);

    if (loading){
        return <h1>Loading...</h1>
    }

    if (error){
        return <pre>{JSON.stringify(error,null,2)}</pre>
    }

    if (!data){
        return null;
    }

    return (
        <>
            <div>
                <h3>UserName: {data.login}</h3>
                <h3>Id: {data.id}</h3>
                <h3>email: {data.email}</h3>
                <img alt={data.login} src={data.avatar_url}/>
            </div>
        </>
    )

}
```

### GraphQL Basics

If we have our schema in a `schema.js` file like so:

```jsx
import {buildSchema} from 'graphql';

const schema = buildSchema(`
    type Query {
        hello: String
    }
`)

export default schema;

```

we can have the following resolver:

```jsx
const root = { hello: () => "This is from resolver"};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
```

The schema shows that we can `Query` on type `hello` and we'll get back the hard-coded value from the resolver. Also notice that the resolver called `root` has the same name inside of it that's defined in `Query` in the schema, ie `hello`. Basically, the resolver will determine what to return when a `Query` of type `hello` is made.

Expanding on the example above, you can have the following schema:

```jsx
import {buildSchema} from "graphql";

const schema = buildSchema(`
    type Friend {
        id: ID
        firstName: String
        lastName: String
        gender: String
        email: String        
    }
    
    type Query {
        friend: Friend
    }
    
`);

export default schema;
```

with the following resolver now being called for the `Query` friend:

```jsx
const root = { friend: () => {
        return {
            "id": 123456,
            "firstName": "First",
            "lastName": "Last",
            "gender": "Male",
            "email": "test@test.com"
        }
    }};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
```

If you go to the `/graphql` endpoint, you can ask only for the data you're interested in:

```graphql
query {
  friend {
    gender
  } 
}
```

We can also have arrays of objects within GraphQL schemas as well. Let's say we want to have an array of emails:

We'll say that we have an object of type `email` that takes an array of type `Email`. We also need to define what `Email` looks like:

```jsx
const schema = buildSchema(`
    type Friend {
        id: ID
        firstName: String
        lastName: String
        gender: String
        # exclamation means mandatory
        email: [Email]!       
    }
    
    type Email {
        email: String
    }
    
    type Query {
        friend: Friend
    }
    
`);
```

Next, our resolver should return an array of emails like so:

```jsx
const root = { friend: () => {
        return {
            "id": 123456,
            "firstName": "First",
            "lastName": "Last",
            "gender": "Male",
            "email": [
                {"email": "test1@test1.com"},
                {"email": "test2@test2.com"}
            ]
        }
    }};
```

Finally, we can query via graphiql:

```graphql
query {
  friend {
    firstName
    email{
      email
    }
  } 
}
```

So far we've only seen `Query` in action. What if we want to Create, Update or Delete records? For that we need `Mutation`. Let's start with create. To create new records, we also need to define the `input` type in our schema. It'll literally determine the type of input we expect. So, if we're creating a new `Friend`, our input would be:

```jsx
    input FriendInput {
        id: ID
        firstName: String
        lastName: String
        gender: String
        email: [Email]!
    }
```

Notice above that our `FriendInput` is of type `input`. Next, we'll make use of `Mutation` to actually accept and check the `input`:

```jsx
    type Mutation {
        # name        type   typeName     return
        createFriend(input: FriendInput): Friend
    }
```

In the schema above, our `Mutation` defines a function called `createFriend` that takes in an input called `input` which is of type `FriendInput`. The `FriendInput` input type will check to make sure that the fields provided are of the correct type. If so, the mutation will return the `Friend`. So now, our schema looks like this:

```jsx
const schema = buildSchema(`
    type Friend {
        id: ID
        firstName: String
        lastName: String
        gender: String
        email: String   
    }
    
    type Query {
        friend: Friend
    }
    
    input FriendInput {
        id: ID
        firstName: String
        lastName: String
        gender: String
        email: String
    }
    
    type Mutation {
        createFriend(input: FriendInput): Friend
    }
`);
```

Usually, created data is stored to a data store (usually a DB), but for our example we'll use an in-memory array. So, in our .ts file, we'll have our resolver save the mutation to an array. So we'll create a new `Friend` class and an array to hold our `Friend` objects:

```jsx
const friendDB = {};

class Friend {
    constructor(id, {firstName, lastName, gender, email}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.email = email;
    }
}
```

Next, we need to update our resolver. We need to be able to handle the `createFriend` mutation. To do so, we'll add the following to our resolver:

```jsx

const root = {
    friend: () => {
        return {
            "id": 123456,
            "firstName": "First",
            "lastName": "Last",
            "gender": "Male",
            "email": "test@test.com"
        }
        },
    createFriend: ({input}) => {
        let id = require('crypto').randomBytes(10).toString('hex');
        friendDB[id] = input;
        return new Friend(id, input);
    }
};
```

Before we proceed, let's talk a little about resolvers. Resolvers are the functions that respond to queries and mutations. They're the functions that give us the result of the query. A good practice is to extract resolvers into their own files for ease of use. Let's do that. We'll move the resolvers out and are left with this in our index.js:

```jsx
import express from 'express';
import schema from './schema';
import { graphqlHTTP } from 'express-graphql';

const app = express();

app.get('/', (req,res) => {
    res.send('Graphql is amazing!');
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(8080, () => console.log('Running server on port localhost:8080/graphql'));
```

We've moved resolvers to a file called `resolvers.js` and have the following in it:

```jsx
const friendDB = {};

class Friend {
    constructor(id, {firstName, lastName, gender, email}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.email = email;
    }
}

const resolvers = {
    friend: () => {
        return {
            "id": 123456,
            "firstName": "First",
            "lastName": "Last",
            "gender": "Male",
            "email": "test@test.com"
        }
    },
    createFriend: ({input}) => {
        let id = require('crypto').randomBytes(10).toString('hex');
        friendDB[id] = input;
        return new Friend(id, input);
    }
};
```

Now, instead of hard-coded values, let's re-name the first resolver (that we've been using for `Query`) and return from the array. So now, our resolvers look like this:

```jsx
const friendDB = {};

class Friend {
    constructor(id, {firstName, lastName, gender, email}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.email = email;
    }
}

const resolvers = {
    // Needs an id for lookup
    getFriend: ({id}) => {
        // Return a new Friend object along with id
        return new Friend(id, friendDB[id])
    },
    createFriend: ({input}) => {
        let id = require('crypto').randomBytes(10).toString('hex');
        friendDB[id] = input;
        return new Friend(id, input);
    }
};

export default resolvers;
```

In our current schema, we have no `getFriend` Query because this is what we had initially:

```jsx
const schema = buildSchema(`
    type Friend {
        id: ID
        firstName: String
        lastName: String
        gender: String
        email: String   
    }
    
    # Need to edit this Query 
    # to account for getFriend
    type Query {
        friend: Friend
    }
    
    input FriendInput {
        id: ID
        firstName: String
        lastName: String
        gender: String
        email: String
    }
    
    type Mutation {
        createFriend(input: FriendInput): Friend
    }
`);
```

Like we said earlier, the `getFriend()` function takes in an ID and returns a `Friend` object. So, our updated `Query` would look like this:

```jsx
    type Query {
        getFriend(id: ID): Friend
    }
```

and our updated `schema.js` file will look like this:

```jsx
import {buildSchema} from "graphql";

const schema = buildSchema(`
    type Friend {
        id: ID
        firstName: String
        lastName: String
        gender: String
        email: String 
    }
    
    type Query {
        getFriend(id: ID): Friend
    }
    
    input FriendInput {
        id: ID
        firstName: String
        lastName: String
        gender: String
        email: String
    }
    
    type Mutation {
        createFriend(input: FriendInput): Friend
    }
    
`);

export default schema;
```

Finally, our index.js needs to be updated to use the new resolver file we created:

```jsx
import express from 'express';
import schema from './schema';
import { graphqlHTTP } from 'express-graphql';
import resolvers  from './resolvers'

const app = express();

app.get('/', (req,res) => {
    res.send('Graphql is amazing!');
});

// Pass resolvers to root
const root = resolvers;

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(8080, () => console.log('Running server on port localhost:8080/graphql'));
```

Now let's see how we can use mutation to add `Friend` from GraphiQL:

```graphql
mutation {
  createFriend(input:{
    firstName:"FName1",
    lastName:"LName1",
    gender: "gender1",
    email:"email1@test.com"
  
  }) {
    id
  }
}
```

The mutation above will be resolved by this resolver:

```jsx
    createFriend: ({input}) => {
        let id = require('crypto').randomBytes(10).toString('hex');
        friendDB[id] = input;
        return new Friend(id, input);
    }
```

Notice how the `createFriend` mutation, and by extension the resolver, takes in an input object of type `Friend`. We've made sure that we provide all the relevant fields required for a `Friend` object (id: ID, firstName: String, lastName: String ,gender: String ,email: String). It'll then return the ID for the `Friend` that was created. So the sample shown above has our test fields and an `id` field with an unspecified value. That `id` is automatically generated for us via the resolver. The result of the above mutation would look like so:

```graphql
{
  "data": {
    "createFriend": {
      "id": "096b554f9de88f8a6a61"
    }
  }
}
```

Now, if you want to query the `Friend` with an id, you can do the following:

```graphql
query {
  getFriend(id: "d7d7b2481cd95d25f7d8"){
    firstName
    lastName
    gender
    email
  }
}
```

The query above will be resolved by this resolver:

```jsx
    getFriend: ({id}) => {
        return new Friend(id, friendDB[id])
    },
```

and you'll see this output via GraphiQL:

```graphql
{
  "data": {
    "getFriend": {
      "firstName": "FName1",
      "lastName": "LName1",
      "gender": "gender1",
      "email": "email1@test.com"
    }
  }
}
```

And that's how you handle queries and mutations via resolvers!

Let's refactor our schema by leveraging a library called `graphql-tools`. To do so, we'd run `npm i graphql-tools`. Next, let's see what our schema looks like right now:

```jsx
import {buildSchema} from "graphql";

const schema = buildSchema(`
    type Friend {
        id: ID
        firstName: String
        lastName: String
        gender: String
        email: String 
    }
    
    type Query {
        getFriend(id: ID): Friend
    }
    
    input FriendInput {
        id: ID
        firstName: String
        lastName: String
        gender: String
        email: String
    }
    
    type Mutation {
        createFriend(input: FriendInput): Friend
    }
    
`);

export default schema;
```

We'll import an executable schema helper from graphql-tools and import the resolvers within the schema. We'll define our schema as `typeDefs` and then declare a schema variable that'll call `makeExecutableSchema` with our `typeDefs` and our resolvers.

```jsx
import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './resolvers';

const typeDefs = `
    type Friend {
        id: ID
        firstName: String
        lastName: String
        gender: String
        email: String 
    }
    
    type Query {
        getFriend(id: ID): Friend
    }
    
    input FriendInput {
        id: ID
        firstName: String
        lastName: String
        gender: String
        email: String
    }
    
    type Mutation {
        createFriend(input: FriendInput): Friend
    }
    
`;

const schema = makeExecutableSchema({typeDefs, resolvers});

export { schema };
```

With that updated, we need to update our resolvers.js file as well. We'll create a resolver map that'll look a lot like the GraphQL syntax that we've been using:

```jsx
const friendDB = {};

class Friend {
    constructor(id, {firstName, lastName, gender, email}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.email = email;
    }
}

//resolver map
export const resolvers = {
    Query: {
        getFriend: (_,{id}) => {
            return new Friend(id, friendDB[id])
        },
    },

    Mutation: {
        createFriend: (_,{input}) => {
            let id = require('crypto').randomBytes(10).toString('hex');
            friendDB[id] = input;
            return new Friend(id, input);
        }
    }
};

```

All we did here was move the `createFriend` resolver inside the Mutation and `getFriend` resolver inside the Query. Now, our resolvers are being used inside of the schema. One thing to note here is that the query and mutation resolvers are now using a function and it's signature is as follows:

```jsx
fieldName: (parent, args, context, info) => data;
```

Since we're not using any of the function arguments except for `args`, we'd have to provide an underscore, `_`, for the arguments before args as shown above.

Finally, we need to update the `index.js` file by removing the old resolvers import. We'll instead import resolvers from the schema. We'll also get rid of the root resolvers and the rootValue field inside app.use:

```jsx
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { schema }  from './schema'

const app = express();

app.get('/', (req,res) => {
    res.send('Graphql is amazing!');
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(8080, () => console.log('Running server on port localhost:8080/graphql'));
```

### Updates with Mutations

So far, we've added new items to our in-memory db using mutations and have been using queries to return items from our DB. Now, let's see how we can use mutations to update existing items. Ofcourse, the first thing we need to do is decide what the `updateFriend` mutation will look like: ie what will it accept and what would be returned?

It makes sense for it to accept `FriendInput` which already exists and then it should return the updated `Friend`. Ok, so our `schema.js` with this new mutation would look like this:

```jsx
    type Mutation {
        createFriend(input: FriendInput): Friend
        updateFriend(input: FriendInput): Friend
    }
```

Next, we need to update the resolver as well. Again, we'll add the logic inside the `Mutation` like so:

```jsx
const resolvers = {
    Query: {
        getFriend: (_,{id}) => {
            return new Friend(id, friendDB[id])
        },
    },

    Mutation: {
        createFriend: (_,{input}) => {
            let id = require('crypto').randomBytes(10).toString('hex');
            friendDB[id] = input;
            console.log("DB looks like this: ", friendDB);
            return new Friend(id, input);
        },
        updateFriend: (_,{input}) => {
            //Do something
        }
    }
};
```

Now, this resolver should grab the `id` from the input (remember our FriendInput already has the ID present) and update the item in our array. We can call a separate function called `findFriendAndUpdate` to do that for us. Next, this resolver should then return the updated `Friend`. Here's this logic in code:

```jsx
function findFriendAndUpdate (input) {
    friendDB[input.id] = input;
}

//resolver map
const resolvers = {
    Query: {
        getFriend: (_,{id}) => {
            return new Friend(id, friendDB[id])
        },
    },

    Mutation: {
        createFriend: (_,{input}) => {
            let id = require('crypto').randomBytes(10).toString('hex');
            friendDB[id] = input;
            console.log("DB looks like this: ", friendDB);
            return new Friend(id, input);
        },
        updateFriend: (_,{input}) => {
            findFriendAndUpdate(input);
            return new Friend(input.id, input);
        }
    }
};
```

Finally, the graphql query to update an existing `Friend` would look like this:

```graphql
mutation{
  updateFriend(input:{
    id: "192f3e997a5f14ff109f"
    firstName:"FnameNew"
    lastName:"LnameNew"
    email:"newEmail@email.com"
    gender:"FEMALE"
  }) {
    id
    firstName
    lastName
  } 
}
```

### Queries and Aliases

You can define aliases for queries for better readability. For example, if I have 2 friends in my DB, I can have the following 2 aliases for those queries:

```graphql
query {
  SuperStartFriend:getFriend(id: "192f3e997a5f14ff109f"){
    firstName
    lastName
    email
  }
  FriendWithMyName:getFriend(id:"8dc8fd71c3001cbdcc7a"){
    firstName
    lastName
    email
  }
}
```

and the result you get back would be:

```graphql
{
  "data": {
    "SuperStartFriend": {
      "firstName": "Ronaldo",
      "lastName": "Cristiano",
      "email": "superstart@test.com"
    },
    "FriendWithMyName": {
      "firstName": "Me",
      "lastName": "Ne",
      "email": "meme@test.com"
    }
  }
}
```

### Queries and Fragments

Like Aliases, Fragments are a neat feature that come built in with GraphiQL and are very useful when we start requesting the same data across several items. Let's say our DB has 4 friends present:

```jsx

DB looks like this:  {
  '192f3e997a5f14ff109f': [Object: null prototype] {
    id: '192f3e997a5f14ff109f',
    firstName: 'Ronaldo',
    lastName: 'Cristiano',
    gender: 'MALE',
    email: 'ronaldo@gmail.com'
  },
  '8dc8fd71c3001cbdcc7a': [Object: null prototype] {
    firstName: 'Iqbal',
    lastName: 'khan',
    email: 'asjkdhaskhd@gmail.com'
  },
  fd956a321845f09240c9: [Object: null prototype] {
    firstName: 'Friend3',
    lastName: 'Friend3',
    email: 'friend3@test.com'
  },
  '33700cc78de32fdf6b3e': [Object: null prototype] {
    firstName: 'Friend4',
    lastName: 'Friend4',
    email: 'friend4@test.com'
  }
}
```

Fragments are similar to aliases in that they help us collect data from various objects. One thing to keep in mind though: for your fragments to work, each query must return similar data. Let's see what that means:

```graphql
query {
  one:getFriend(id:"33700cc78de32fdf6b3e"){
    ...friendFragment
  }
  two:getFriend(id:"8dc8fd71c3001cbdcc7a"){
    ...friendFragment
  }
}
```

If you paste the query above, you'll see that the `friendFragment` would be showing an error. That's because we haven't defined what the `friendFragment` is. Let's do that now:

```graphql
fragment friendFragment on Friend{
 # Define here what you want! 
}
```

In the syntax above, we've defined a friend fragment on type `Friend`. Now you see why each fragment should be of the same type?! Then inside the fragment, you define what you want from each returned friend. Obviously, you'd want to make sure that the returned fields are actually present for our `Friend` type. Let's get back the `firstName` and `email` only:

```graphql
fragment friendFragment on Friend{
  email
  firstName
}
```

Therefore, our complete query would look like so:

```graphql
query {
  one:getFriend(id:"33700cc78de32fdf6b3e"){
    ...friendFragment
  }
  two:getFriend(id:"192f3e997a5f14ff109f"){
    ...friendFragment
  }
}

fragment friendFragment on Friend{
  email
  firstName
  gender
}
```

and if you run the above, you get this back:

```graphql
{
  "data": {
    "one": {
      "email": "friend4@test.com",
      "firstName": "Friend4",
      "gender": null
    },
    "two": {
      "email": "ronaldo@test.com",
      "firstName": "Ronaldo",
      "gender": "MALE"
    }
  }
}
```

Notie if one object doesn't have a value, it's returned as null.
