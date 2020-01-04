---
date: 2019-12-25
title: ReactJS Notes
draft: true
title: "ReactJS Notes"
extract: My notes as I learn ReactJS
categories:
    - React
tags:
    - blog
---

This post is mostly a collection of notes I have while I learn ReactJS. This post came about after I realized the fact that I've created this website using [Gatsby](https://github.com/GatsbyCentral/gatsby-v2-starter-lumen) starter and have no idea how react works! 

### Table of Contents

1. [Components](#react-classes)

    * [What they are](#what-they-are)

    * [How to use them](#how-to-use-them)

    * [Types of components](#types-of-components)

    * [Babel](#babel)

    * [Class Approach](#class-approach)

    * [Hooks Approach](#hooks-approach)

    * [Multiple Components](#multiple-components)

    * [One Way Data Flow](#one-way-data-flow)

    * [Props](#props)

    * [Generic Component](#generic-components)

2. [React Classes](#react-classes)




### Components

#### What they are
Components are similar to functions: they take in an input (state and/or props) and return UI elements. The difference between the two is that props are immutable while states can be changed.Components can have private states that change over the lifecycle of a component.

#### How to use them
`<MyComponentName />` this is also called a self-closing tag for a custom built component. Notice the naming convention: **A component name has to begin with an uppercase letter**. If not, React will interpret it as an HTML element.

#### Types of components

- **function components**: These have the following syntax:

```js{numberLines}
function MyComponent(props){
    return <div>Hello {props.name} </div>
}
```

- **class components**: These have the following syntax:

```js{numberLines}
class MyComponent extends React.Component{
    render(){
        return <div>Hello {props.name} </div>
    }
}
```

In either case, components perform the same function: take in props or state and return an updated DOM.

#### Babel

The syntax on line 3 above:

`return <div>Hello {props.name} </div>` 

is not valid JS syntax. To convert this into something that the browser can understand, [Babel](https://babeljs.io/) is used. Therefore, the highlighted line is converted to:

`return React.createElement('div',null, 'Hello')`


This line is also JSX:

`<Hello />`

which is not an HTML element but a react element and this is converted to:

`React.createElement('Hello',null, null)`

### Example

Click on a button and display the number of times it has been clicked. To do so, we need to keep track of the `state` of our component. 

#### Class approach

`index.js`:

```js{numberLines}
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from './Button';
import * as serviceWorker from './serviceWorker';

//Using our Button component as a self closing tag - <Button />
//The second argument is where we wish to show the component - this is the
//entry point for react
ReactDOM.render(<Button />, document.getElementById('root'));
```

`button.js`:
```js{numberLines}
class Button extends React.Component{

    constructor(props) {
        super(props);
        this.state = {numberOfClicks: 0};
    }


    //This is not Javascript but JSX that is being
    //converted to react API calls using Babel that converts
    //JSX to react API calls
    render(){
        return (
            <div>
            <button onClick={ () => this.setState({numberOfClicks: this.state.numberOfClicks + 1})}>
                {this.state.numberOfClicks}
            </button>
            </div>
        );
    }
}

export default Button;
```

The approach above uses a component class called `Button`. 
- constructor by default takes in the `props` argument
- We then set the state using the `this.state` keyword and pass in an object
called `numberOfClicks`
- In the `render()` method, we return a div that updates the count for `numberOfClicks` on each click and sets it to the class' state. Then it displays the number of clicks in the button as text.

#### Hooks approach

The above can be accomplished using `hooks`. React hooks has a global function called `useState()` that we'll use to keep track of the number of times the button has been clicked. `useState()` is an example of a React hook that allows you to use React features without writing a class. We'll invoke this function. 

`useState()` returns two items: 
- our state object
- a function to update our state object. 

`useState()` accepts:
- an initial state value to determine the "type" of our state (number, string etc)

The state object can be of any type. In our case, the object would be our `numberOfClicks` and the function would be `updateNumberOfClicks`. JS array destructuring is used to capture the 2 variables that are returned by `useState()` function. So, to use our hook we'd follow this syntax:

```js{numberLines}
//const [currentStateValue, functionToSetNewStateValue] = useState(initialStateValue)
const [numberOfClicks, updateNumberOfClicks] = useState(0);
```

Here's the complete updated code for our Button component using hooks:

```js{numberLines}
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function Button(){
  const [numberOfClicks, updateNumberOfClicks] = useState(0);
  return (
      <div>
        <button onClick={() => updateNumberOfClicks(numberOfClicks + 1)}>
          {numberOfClicks}
        </button>
      </div>
  )
}

// class Button extends React.Component{
//
//   constructor(props) {
//     super(props);
//     this.state = {numberOfClicks: 0};
//   }
//
//   //This is not Javascript but JSX that is being
//   //converted to react API calls using Babel that converts
//   //JSX to react API calls
//   render(){
//     return (
//         <div>
//           <button onClick={ () => this.setState({numberOfClicks: this.state.numberOfClicks + 1})}>{this.state.numberOfClicks}</button>
//         </div>
//     );
//   }
// }

export default Button;
```

For our button we define an `onClick()` attribute that receives a functionReference:

```js
onClick={functionRef}
```

This means we need to pass a reference to a function. So, we can do the following:

```js{numberLines}
function printInConsole(){
    console.log(Math.random());
}

<button onClick={printInConsole}></button>

```

We can also directly pass the function's definition to the `onClick` event:
```js{numberLines}
<button onClick={
    function printInConsole(){
        console.log(Math.random());
    }
}></button>
```

For the sake of ease, in the example above we used the **arrow function** syntax:

```js{numberLines}
<button onClick={() => updateNumberOfClicks(numberOfClicks + 1)}></button>
```

This is the inline arrow function definition:
```js
() => console.log(Math.random())
```

In the end, to display the updated value, we just used the `numberOfClicks` variable and allowed react to keep track of the value's state:

```js{numberLines}
function Button(){
  const [numberOfClicks, updateNumberOfClicks] = useState(0);
  return (
      <div>
        <button onClick={() => updateNumberOfClicks(numberOfClicks + 1)}>
          {numberOfClicks}
        </button>
      </div>
  )
}
```
Therefore, out UI implementation was telling react to display whatever the value of `numberOfClicks` is and we used React to update the it for us. The implementation looks ugly right now and is hard to read. Better approach would be to use an explicit function inside the `Button` function:

```js{numberLines}
function Button(){
  const [numberOfClicks, updateNumberOfClicks] = useState(0);
  {/*Function to handle updating clicks*/}
  const handleClick = () => updateNumberOfClicks(numberOfClicks + 1);
  return (
      <div>
        <button onClick={handleClick}>
          {numberOfClicks}
        </button>
      </div>
  )
}
```

### Multiple Components

<em>**Note: As of now, I haven't figured out how to have the 2 components in a different file and then export them to `index.js` so I'll be porting both my functions (`Display()` and `Button()`) to `index.js` where the `ReactDOM.render()` function resides.**</em>

What if we have more than 1 components? Say we have 2:

```js{numberLines}
function Button(){
  const [numberOfClicks, updateNumberOfClicks] = useState(0);
  {/*Function to handle updating clicks*/}
  const handleClick = () => updateNumberOfClicks(numberOfClicks + 1);
  return (
      <div>
        <button onClick={handleClick}>
          {numberOfClicks}
        </button>
      </div>
  )
}

function Display(){
    return(
        <div>...
        </div>
    )
}

ReactDOM.render(
    <Button />, document.getElementById('root')

);
```

To display our new component in the DOM, we need to add it to our `render` method in `index.js`. To do so, we can do 2 things:

(1) Add a div to the render so that it displays both our components:


```js{numberLines}
ReactDOM.render(
    <div>
        <Button/>
        <Display/>
    </div>
    , document.getElementById('root')
);
```

We've made our react elements childer of another react element which is a `div` in our case. 

(2) `<React.Fragment>` which is a special object to include multiple elements without introducing a new div parent. As a shortcut, you can also just use empty tags like so: `<>`

```js{numberLines}
ReactDOM.render(
    <>
        <Button/>
        <Display/>
    </>
    , document.getElementById('root')
);
```

Improvement: This is again too much information in the `ReactDOM.render` function. We can extract this into another component and just use that component in the `ReactDOM.render` function. So, after that improvement, our final code looks like this now:

```js{numberLines}
import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

function Button(){
    const [numberOfClicks, updateNumberOfClicks] = useState(0);
    const handleClick = () => updateNumberOfClicks(numberOfClicks + 1);
    return (
        <div>
            <button onClick={handleClick}>
            </button>
        </div>
    )
}

function Display(){
    return(
        <div>...
        </div>
    )
}

function App(){
    return(
        <>
            <Button/>
            <Display/>
        </>
    )
}

ReactDOM.render( <App/>, document.getElementById('root'));
serviceWorker.unregister();

```

#### One-Way Data Flow

After the above improvement, we need to refactor our code: we need to remove the displaying of value from the `Button()` function to the `Display()` function. However, we've got a problem: our `[numberOfClicks, updateNumberOfClicks]` information resides in the `Button()` function. How do we access that information in the `Display()` component? In short, how do we share information between sibilng components (siblings in our case are Display and Button Components)? The state in a react component can only be accessed by that component itself and no one else.

To do so, we need to lift it one component up, to the `App()` component which is the parent of both `Display()` and `Button()` components. This would allow us to **flow** our data from the parent to the child components. To do so, we'll use something called props:

##### Props

We'll use the following code to pass information from `App()` to `Button()` and `Display()`:

```js{numberLines}
function Button(props){
    return (
        <div>
            <button onClick={props.counter}>
                Click to increment counter below....
            </button>
        </div>
    )
}

function Display(props){
    return(
        <div>
            From Display: {props.message}
        </div>
    )
}

function App(){
    const [numberOfClicks, updateNumberOfClicks] = useState(0);
    const incrementCounter = () => updateNumberOfClicks(numberOfClicks + 1)
    return(
        <>
            <Button counter={incrementCounter}/>
            <Display message={numberOfClicks}/>
        </>
    )
}
```

First, we move the `useState()` function to our `App()` component so that our child components, `Display()` and `Button()` can use the number of clicks information to update and display it. We then declare a function in `App()` called `incrementCounter()`:

```js{numberLines}
    const [numberOfClicks, updateNumberOfClicks] = useState(0);
    const incrementCounter = () => updateNumberOfClicks(numberOfClicks + 1)
```

that accesses the `updateNumberOfClicks` from our `useState()` function to increment the number of clicks. Once we've set this up in our `App()` component, we send the current `numberOfClicks` information to the `Display()` component for displaying and the `incrementCounter()` function to `Button()` component for incrementing. To do so, we use props:

```js{numberLines}
    <Button counter={incrementCounter}/>
    <Display message={numberOfClicks}/>
```

We can now access this information in each of our components using `counter` and `message` props:

```js{numberLines}
props.message {/*in Display component*/}
props.counter {/*in Button component*/}
```

In the `Button()` component, every time the button is clicked, a message is sent back to the parent component, `App()`, by `Button()` to invoke the `incrementCounter()` function. `App()` then increments the counter and as a result the updated count is forwarded to `Display()` component that then displays the updated number of clicks. The `Button` component has no idea what's going to happen on the `onClick` function, all it does is that it calls the `props.counter` function which is handled by the `App` component. So the `App` component delegates the behavior to the `Button` for clicks and `Display` for displaying while keeping control of the state. This is also known as **separation of responsibilities**. It goes without saying but you only want to give those components access to the information that need it. In our case, the `Display` component only needs to display the number of clicks so it doesn't need to increment it. 

#### Generic Components

The idea behind components is that they can be created once and used in multiple places throughout the app. In our example, we can make our increment functionality generic by doing the following:

```js{numberLines}
function Button(props){
    // const [numberOfClicks, updateNumberOfClicks] = useState(0);
    // const handleClick = () => updateNumberOfClicks(numberOfClicks + 1);
    return (
        <div>
            <button onClick={ () => props.counter(props.incrementAmount)}>
                Click to increment counter below by {props.incrementAmount}
            </button>
        </div>
    )
}

function Display(props){
    return(
        <div>

            From Display: {props.message}

        </div>
    )
}

function App(){
    //Generic variable to hold the amount to increment
    const [numberOfClicks, updateNumberOfClicks] = useState(0);
    const incrementCounter = (incrementBy) => updateNumberOfClicks(numberOfClicks + incrementBy)
    return(
        <>
            <Button counter={incrementCounter} incrementAmount={1}/>
            <Button counter={incrementCounter} incrementAmount={5}/>
            <Button counter={incrementCounter} incrementAmount={10}/>
            <Button counter={incrementCounter} incrementAmount={20}/>
            <Button counter={incrementCounter} incrementAmount={50}/>
            <Button counter={incrementCounter} incrementAmount={100}/>
            <Display message={numberOfClicks}/>
        </>
    )
}
```

Say we've got a few different buttons that each increment based on their `incrementAmount`. We need a way to pass that value (1,5,10,20,50 or 100) to the `updateNumberOfClicks` function for our `useState` call. So, we make our `incrementCounter` function take in the value that is passed to the `Button` component. Remember `props.counter` in `Buttons` is aliased as `incrementCounter` in `App`. However in the `Button` component simply doing this:

```js{numberLines}
<button onClick={props.counter(props.incrementAmount)}>
```

won't work. This is because the `onClick` is taking in a reference to a function and when we pass in an argument, we're invoking a function. So, to make it a function reference, all we need to do is:

```js{numberLines}
<button onClick={ () => props.counter(props.incrementAmount)}>
```

Again, the code above looks to be doing too much and is not readable so we move the logic to our `handleClick` function. With that done, our final code would look like this:

```js{numberLines}
function Button(props){
    // const [numberOfClicks, updateNumberOfClicks] = useState(0);
    const handleClick = () => props.counter(props.incrementAmount);
    return (
        <div>
            <button onClick={handleClick}>
                Click to increment counter below by {props.incrementAmount}
            </button>
        </div>
    )
}

function Display(props){
    return(
        <div>

            From Display: {props.message}

        </div>
    )
}

function App(){
    //Generic variable to hold the amount to increment
    // const incrementBy = 3;
    const [numberOfClicks, updateNumberOfClicks] = useState(0);
    const incrementCounter = (incrementValue) => updateNumberOfClicks(numberOfClicks + incrementValue);
    return(
        <>
            <Button counter={incrementCounter} incrementAmount={1}/>
            <Button counter={incrementCounter} incrementAmount={3}/>
            <Button counter={incrementCounter} incrementAmount={5}/>
            <Button counter={incrementCounter} incrementAmount={10}/>
            <Button counter={incrementCounter} incrementAmount={20}/>
            <Button counter={incrementCounter} incrementAmount={100}/>
            <Display message={numberOfClicks}/>
        </>
    )
}

//Using our Button component as a self closing tag - <Button />
//The second argument is where we wish to show the component - this is the
//entry point for react
ReactDOM.render( <App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

### React Classes

A react class is similar to classes in our object oriented programming languages. To define a class, we use the following syntax:

```js{numberLines}
class App extends React.Component{

  /*
  * This is a required function that has to
  * return your virtual DOM
  * */
   render() {
    return <div className="header">HEADER HERE</div>
  }
}

export default App;
```

- The `render()` function is a required function that **MUST** return your virtual DOM. 
- A react class must extend `React.Component`.

Since we're using a class, we maintain props and state for the class' instance using the `this` keyword. So if our class was getting a prop called `title`, our class would use it like this:

```js{numberLines}
class App extends React.Component{

  /*
  * This is a required function that has to
  * return your virtual DOM
  * */
   render() {
    return <div className="header">{this.props.title}</div>
  }
}

export default App;
```