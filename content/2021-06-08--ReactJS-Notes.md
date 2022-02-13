---
date: 2021-06-08
draft: false
thumbnail: /post-images/react.png
title: ReactJS Notes
extract: My notes as I learn ReactJS
categories:
  - React
tags:
  - blog
  - React
---

**My notes as I walk through [react docs](https://beta.reactjs.org/learn)**

- [Introduction](#introduction)
- [Local Setup](#local-setup)
- [React Basics](#react-basics)
  - [Classes](#classes)
  - [Components](#components)
  - [JSX](#jsx)
  - [Conditional Rendering](#conditional-rendering)
  - [Rendering Lists](#rendering-lists)
  - [Responding to Events](#responding-to-events)
- [React State](#react-state)
- [Using Hooks](#using-hooks)
- [Sharing data between components](#sharing-data-between-components)
- [Let's Design!](#lets-design)
  - [Break UI into a component hierarchy](#break-ui-into-a-component-hierarchy)
  - [Create a static version in React](#create-a-static-version-in-react)
- [ENDED HERE](#ended-here)
    - [Arrow Functions](#arrow-functions)
    - [Functional Programming](#functional-programming)
    - [Template Literals](#template-literals)
    - [var, let and const](#var-let-and-const)
    - [Ternary operator](#ternary-operator)
    - [Import and Export](#import-and-export)
  - [String variables](#string-variables)
  - [JS Object](#js-object)
  - [Lists in React](#lists-in-react)
  - [Components](#components-1)
  - [Arrow Functions Continued](#arrow-functions-continued)
  - [Handler Functions](#handler-functions)
  - [React Props](#react-props)
  - [React State](#react-state-1)
    - [Hooks](#hooks)
  - [Callback Hanlders](#callback-hanlders)
  - [Lifting State In React](#lifting-state-in-react)
  - [React Controlled Components](#react-controlled-components)
  - [Props: Enhancements](#props-enhancements)
  - [React Side Effects](#react-side-effects)
  - [useEffect Hook](#useeffect-hook)
  - [Creating our own hook](#creating-our-own-hook)
  - [React Fragments](#react-fragments)
  - [React Reusable components](#react-reusable-components)
  - [Children](#children)
  - [Inline Handlers in JSX](#inline-handlers-in-jsx)
  - [GraphQL Basics](#graphql-basics)
  - [Updates with Mutations](#updates-with-mutations)
  - [Queries and Aliases](#queries-and-aliases)
  - [Queries and Fragments](#queries-and-fragments)

## Introduction

React is a JavaScript-based UI development library. Facebook and an open-source developer community run it. Although React is a library rather than a language, it is widely used in web development. At its very core, React maintains a HTML tree for you. This tree is able to do efficient diff computations on the nodes that you create.

When you write something like:

```jsx
const tag = <h1>Hello</h1>;
```

what you're essentially doing is this:

```jsx
const tag = React.createElement("h1", {}, "Hello");
```

Later down the road, we'll see the `<App />` tag in `index.js` which parses all our components and creates the completed DOM for us. This means that when `<App />` has done parsing, there's just a huge object of React elements.

Then how is React able to construct actual divs and p tags out of it? Meet `ReactDOM` which recursively creates nodes depending on their 'type' property and appends them to the DOM. For more details, checkout [this](https://www.freecodecamp.org/news/react-under-the-hood/) great write-up

## Local Setup

Here's how to create your own react-app so that you can follow along:

```tsx
npx create-react-app my-app --template typescript
```

Using the command above, you can start a new TypeScript app using templates. That's defined by appending `--template typescript` to the creation command above. This will create your react app called `my-app` in the directory where you ran this command. Once the project is created, remove all the fluff except for:

```tsx
index.html, App.tsx,
index.tsx, .gitignore,
package.json, tsconfig.json
```

All other files can be safely deleted.

Then run these commands:

```tsx
npm install && npm run build
npm start
```

Your app should automatically be launched using your default browser at the URL: `http://localhost:3000/`. To setup `prettier` and format on save, check out [this](https://scottsauber.com/2017/06/10/prettier-format-on-save-never-worry-about-formatting-javascript-again/) write up. Let's dive in and see how react works!

## React Basics

Let's check out some basic concepts in react:

### Classes

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

We pass the name to SoccerPlayer's constructor above even though there's no specific constructor for the soccerPlayer class. That's because it extends the Person class which does have a constructor. That is why, we're able to call getName and print the name.

Similarly, here's a class "component" in React:

```jsx
import React, { Component } from "react";

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

We've defined a class component called `App` that's a more specific version of class `Component` which is imported from the `react` package (the import statement). Similar to how we were able to use `getName()` for our player above, the `App` component can use methods exposed by `Component` class such as `componentDidMount()`, `setState()` etc.

As a side note, you can have your react classes in either a `.ts` file (pure typescript file) or `.tsx` file (allows use of jsx tags). You can use `tsx` instead of `ts` with very little difference. `tsx` obviously allows the usage of `jsx` tags inside TypeScript, but this introduces some parsing ambiguities that make tsx slightly different. Since we're using explicit tags, we'll use `.tsx`.

### Components

I used the term class component above. Let's formally understand what a component is:
React apps are made out of components. A component is a piece of the UI (user interface) that has its own logic and appearance. A component can be as small as a button, or as large as an entire page.

React components are JavaScript functions that return markup:

```tsx
function MyButton() {
  return <button>Click me</button>;
}
```

This component can then be "nested" inside another component. For our demo, we'll use the bare bones App component we created earlier:

```tsx
import React, { Component } from "react";

function MyButton() {
  return <button>Click me</button>;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to React</h1>
        <MyButton />
      </div>
    );
  }
}

export default App;
```

Snippet above shows 2 common methods to create a component in react: class (App) vs functions (MyButton). The export default keywords specify the main component in the file which is `App` in our example.

Notice that `<MyButton />` starts with a capital letter. That’s how you know it’s a React component. React component names must always start with a capital letter, while HTML tags must be lowercase.

### JSX

The markup syntax you’ve seen above is called JSX. It is optional, but most React projects use JSX for its convenience. All of the tools we recommend for local development support JSX out of the box.

JSX is stricter than HTML. You have to close tags like <br />. Your component also can’t return multiple JSX tags. You have to wrap them into a shared parent, like a <div>...</div> or an empty <>...</> wrapper.

JSX lets you put markup into JavaScript. Curly braces let you “escape back” into JavaScript so that you can embed some variable from your code and display it to the user. For example, this will display user.name:

```jsx
return <h1>{user.name}</h1>;
```

You can also “escape into JavaScript” from JSX attributes, but you have to use curly braces instead of quotes. For example, className="avatar" passes the "avatar" string as the CSS class, but src={user.imageUrl} reads the JavaScript user.imageUrl variable value, and then passes that value as the src attribute:

```jsx
return <img className="avatar" src={user.imageUrl} />;
```

### Conditional Rendering

In React, there is no special syntax for writing conditions. Instead, you’ll use the same techniques as you use when writing regular JavaScript code. For example, you can use an if statement to conditionally include JSX:

```jsx
let content;
if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}
return <div>{content}</div>;
```

If you prefer more compact code, you can use the conditional ? operator. Unlike if, it works inside JSX:

```jsx
<div>{isLoggedIn ? <AdminPanel /> : <LoginForm />}</div>
```

When you don’t need the else branch, you can also use a shorter logical && syntax:

```jsx
<div>{isLoggedIn && <AdminPanel />}</div>
```

### Rendering Lists

You will rely on JavaScript features like for loop and the array map() function to render lists of components. For example, let’s say you have an array of products:

```jsx
const products = [
  { title: "Cabbage", isFruit: false, id: 1 },
  { title: "Garlic", isFruit: false, id: 2 },
  { title: "Apple", isFruit: true, id: 3 },
];
```

Inside your component, use the map() function to transform an array of products into an array of <li> items:

```jsx
const listItems = products.map((product) => (
  <li
    key={product.id}
    style={{
      color: product.isFruit ? "magenta" : "darkgreen",
    }}
  >
    {product.title}
  </li>
));
```

Here's our original `App` component making use of lists and displaying the items:

```jsx
import React, { Component } from "react";

function MyButton() {
  return <button>Click me</button>;
}

function DisplayList() {
  const products = [
    { title: "Cabbage", isFruit: false, id: 1 },
    { title: "Garlic", isFruit: false, id: 2 },
    { title: "Apple", isFruit: true, id: 3 },
  ];

  const listItems = products.map((product) => (
    <li
      key={product.id}
      style={{
        color: product.isFruit ? "magenta" : "darkgreen",
      }}
    >
      {product.title}
    </li>
  ));
  return <div>{listItems}</div>;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to React</h1>
        <MyButton />
        <DisplayList />
      </div>
    );
  }
}

export default App;
```

### Responding to Events

You can respond to events by declaring event handler functions inside your components. Let's update the button component to display 'You clicked me' when clicked:

```jsx
function MyButton() {
  function handleClick() {
    alert("You clicked me!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
```

Notice how onClick={handleClick} has no parentheses at the end! Do not **_call_** the event handler function: you only need to **_pass it down_**. React will call your event handler when the user clicks the button.

## React State

Often, you’ll want your component to “remember” some information and display it. For example, maybe you want to count the number of times a button is clicked. To do this, add state to your component.

First, import `useState` from React:

```jsx
import { useState } from "react";
```

Now you can declare a **_state variable_** inside your component:

```jsx
function MyButton() {
  const [count, setCount] = useState(0);
```

You will get two things from `useState`: the current state (count), and the function that lets you update it (`setCount`). You can give them any names, but the convention is to call them like `[something, setSomething]`.

The first time the button is displayed, count will be 0 because you passed 0 to `useState()`. When you want to change state, call `setCount()` and pass the new value to it. Clicking this button will increment the counter.

I've cleaned up our `App` component to only use `MyButton` component. Inside `MyButton`, I'm using `useState` with initial value as 0. `onClick` calls `handleClick` that increments the `count` using `setCount`. I show the current value of `count` as part of button's text:

```jsx
import React, { Component } from "react";
import { useState } from "react";

function MyButton() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return <button onClick={handleClick}>Clicked count: {count}</button>;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to React</h1>
        <MyButton />
      </div>
    );
  }
}

export default App;
```

Clicking this button will increment the counter. React will call your component function again. This time, count will be 1. Then it will be 2. And so on. If you render the same component multiple times (ie multiple buttons), each will get its own state. Try clicking each button separately:

```jsx
import React, { Component } from "react";
import { useState } from "react";

function MyButton() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return <button onClick={handleClick}>Clicked count: {count}</button>;
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Welcome to React</h1>
        <MyButton />
        <MyButton />
        <MyButton />
        <MyButton />
      </div>
    );
  }
}

export default App;
```

Notice how each button “remembers” its own count state and doesn’t affect other buttons. More [here](https://beta.reactjs.org/apis/usestate) on `[useState]`.

## Using Hooks

Functions starting with use are called Hooks. useState is a built-in Hook provided by React. You can find other built-in Hooks in the [React API reference](https://beta.reactjs.org/apis). You can also write your own Hooks by combining existing ones.

Hooks are more restrictive than regular functions. You can only call Hooks at the top level of your components (or other Hooks). If you want to `useState` in a condition or a loop, extract a new component and put it there.

## Sharing data between components

In the previous example, each button had its own independent counter, but what if you wanted all buttons to always show the sum of all clicks? This is where you'd want to share data between buttons and would want them to always update together.

To make all buttons display the same count and update together, you need to move the state from the individual buttons “upwards” to the closest component containing all of them. In this example, it is `App`. This means, you'd have to move state up from `MyButton` to `App`. If, however, you tried adding state to your `App` component as is:

```jsx
class App extends Component {
  render() {
    const [count, setCount] = useState(0);
    return (
      <div className="App">
        <h1>Welcome to React</h1>
        <MyButton />
        <MyButton />
        <MyButton />
        <MyButton />
      </div>
    );
  }
```

you'd see this error (more on it [here](https://reactjs.org/docs/hooks-rules.html)):

```text
React Hook useState cannot be called in a class component.
React Hooks must be called in a React function component or
a custom React Hook function.
```

We'd have to convert our `App` from:

```jsx
class App extends Component{...}
```

to

```jsx
export default function App(){...}
```

and remove `render()`. Here's the new `App` component:

```jsx
import { useState } from "react";

function MyButton() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return <button onClick={handleClick}>Clicked count: {count}</button>;
}

export default function App() {
  return (
    <div className="App">
      <h1>Welcome to React</h1>
      <MyButton />
      <MyButton />
      <MyButton />
      <MyButton />
    </div>
  );
}
```

Now, we can add state to `App`:

```jsx
export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="App">
      <h1>Welcome to React</h1>
      <MyButton />
      <MyButton />
      <MyButton />
    </div>
  );
}
```

Then, pass the state down from `App` to each `MyButton`, together with the shared click handler. You can pass information to MyButton using the JSX curly braces:

```jsx
export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="App">
      <h1>Welcome to React</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
```

Finally, `MyButton` will take in the count and handler and update itself accordingly (also note how I had to define the type as any for `count` and `onClick`):

```jsx
function MyButton({ count, onClick }: { count: any, onClick: any }) {
  return <button onClick={onClick}>Clicked count: {count}</button>;
}
```

Here's the complete code:

```jsx
import { useState } from "react";

function MyButton({ count, onClick }: { count: any, onClick: any }) {
  return <button onClick={onClick}>Clicked count: {count}</button>;
}

export default function App() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="App">
      <h1>Welcome to React</h1>
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
```

When you click the button, the `onClick` handler fires. Each button’s onClick prop was set to the handleClick function inside `App`, so the code inside of it runs. That code calls setCount(count + 1), incrementing the count state variable. The new count value is passed as a prop to each button, so they all show the new value. This is called “lifting state up”. By moving state up, we’ve shared it between components.

## Let's Design!

Let's walk through the thought process of building a searchable product data table with React. Imaging we have a JSON API configured that returns this data when queried:

```jsx
[
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];
```

Here's what it should be displayed as:

![Mock-up](./images/react/mockup.png)

### Break UI into a component hierarchy

We'll start by drawing boxes around every component and subcomponent in the mockup and naming them. If your JSON is well-structured, you’ll often find that it naturally maps to the component structure of your UI. That’s because UI and data models often have the same information architecture—that is, the same shape. Separate your UI into components, where each component matches one piece of your data model.

There are five components on this screen:

![BreakDown](./images/react/breakdown.png)

Here's how we'll label each component:

- `FilterableProductTable` (grey) contains the entire app.
- `SearchBar` (blue) receives the user input.
- `ProductTable` (lavender) displays and filters the list according to the user input.
- `ProductCategoryRow` (green) displays a heading for each category.
- `ProductRow` (yellow) displays a row for each product.

If you look at `ProductTable` (lavender), you’ll see that the table header (containing the “Name” and “Price” labels) isn’t its own component. This is a matter of preference, and you could go either way. For this example, it is a part of `ProductTable` because it appears inside the `ProductTable’s` list. However, if this header grows to be complex (e.g., if you add sorting), it would make sense to make this its own `ProductTableHeader` component.

Now that you’ve identified the components in the mockup, arrange them into a hierarchy. Components that appear within another component in the mockup should appear as a child in the hierarchy:

- `FilterableProductTable`
  - `SearchBar`
  - `ProductTable`
    - `ProductCategoryRow`
    - `ProductRow`

### Create a static version in React

Now that you have your component hierarchy, it’s time to implement your app. The most straightforward approach is to build a version that renders the UI from your data model without adding any interactivity… yet! It’s often easier to build the static version first and then add interactivity separately. Building a static version requires a lot of typing and no thinking, but adding interactivity requires a lot of thinking and not a lot of typing.

To build a static version of your app that renders your data model, you’ll want to build components that reuse other components and pass data using props. Props are a way of passing data from parent to child. (If you’re familiar with the concept of state, don’t use state at all to build this static version. State is reserved only for interactivity, that is, data that changes over time. Since this is a static version of the app, you don’t need it.)

You can either build “top down” by starting with building the components higher up in the hierarchy (like FilterableProductTable) or “bottom up” by working from components lower down (like ProductRow). In simpler examples, it’s usually easier to go top-down, and on larger projects, it’s easier to go bottom-up.

Let's have a look at the code for creating a "staic only" version of our product.

- Let's start with the smallest element: `ProductRow`:

`ProductRow` is the row that displays our product's name as red if it is not stocked and its price. In order to display this information, it'd need access to the current product that's being processed. For example:

```jsx
{ category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
```

Once it is determined whether the item is stocked or not, we create a table row and add the name (with the right color) and price to the table:

```jsx
function ProductRow({ product }: { product: any }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <div>
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    </div>
  );
}
```

- Let's next see `ProductCategoryRow`:

This is a special case of a row which ONLY displays what the category name is. To perform its function, all it needs is the category for the current item being processed. Notice however that in the final table, this category is only listed ONCE: when the category type changes. This special condition will be handled elsewhere. This is what our `ProductCategoryRow` looks like:

```jsx
function ProductCategoryRow({ category }: { category: string }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}
```

- `ProductTable`

This is where we need to display the two headers: `Name` and `Price` and display our list of items. For this, we need the list of products. This is also where we'll add the logic for displaying category name (using a simple `lastCategory` check). We'll aggregate all our rows in a list called `rows` and then finally return it from this component:

```jsx
function ProductTable({ products }: { products: [any] }) {
  const rows: any[] = [];
  let lastCategory = "";
  products.forEach((product, i) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>Name</th>
          <th colSpan={2}>Price</th>
        </tr>
        <tbody>{rows}</tbody>
      </thead>
    </table>
  );
}
```

- `SearchBar`

This one is simple: all we need here is a search bar with some pre-populated text and a checkbox with some text:

```jsx
function SearchBar() {
  return (
    <div>
      <div>
        <form>
          <label>
            <input type="text" placeholder="Search..." />
          </label>
        </form>
      </div>
      <br />
      <div>
        <label>
          <input type="checkbox" />
          Only show products in stock
        </label>
      </div>
    </div>
  );
}
```

- `FilterableProductTable`

The top level component receives the products array and is responsible for calling all the components with this info:

```jsx
function FilterableProductTable({ products }: { products: any }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}
```

Most logical approach is to first display the `SearchBar` and then display the `ProductTable` because that's how our UI is designed.

Final `App` component that gets rendered is setup like so:

```jsx
const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  return (
    <div className="App">
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}
```

Our static table is now completed! We still need to take of the checkbox and searchbox functionalities.

Before moving on, let's see the static UI code in its entirety:

```jsx
function FilterableProductTable({ products }: { products: any }) {
  return (
    <div>
      <SearchBar />
      <ProductTable products={products} />
    </div>
  );
}

function ProductRow({ product }: { product: any }) {
  const name = product.stocked ? (
    product.name
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <div>
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    </div>
  );
}

function ProductCategoryRow({ category }: { category: string }) {
  return (
    <tr>
      <th colSpan={2}>{category}</th>
    </tr>
  );
}

function ProductTable({ products }: { products: [any] }) {
  const rows: any[] = [];
  let lastCategory = "";
  products.forEach((product, i) => {
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }
    rows.push(<ProductRow product={product} key={product.name} />);
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>Name</th>
          <th colSpan={2}>Price</th>
        </tr>
        <tbody>{rows}</tbody>
      </thead>
    </table>
  );
}

function SearchBar() {
  return (
    <div>
      <div>
        <form>
          <label>
            <input type="text" placeholder="Search..." />
          </label>
        </form>
      </div>
      <br />
      <div>
        <label>
          <input type="checkbox" />
          Only show products in stock
        </label>
      </div>
    </div>
  );
}

const PRODUCTS = [
  { category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  { category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit" },
  { category: "Fruits", price: "$2", stocked: false, name: "Passionfruit" },
  { category: "Vegetables", price: "$2", stocked: true, name: "Spinach" },
  { category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin" },
  { category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

export default function App() {
  return (
    <div className="App">
      <FilterableProductTable products={PRODUCTS} />
    </div>
  );
}
```

## ENDED HERE

✋ 🚧 Sections below are WIP 🚧 ✋
As your classes grow, they may have multiple properties. For example, say we add age, location, height and weight to our person class:

```jsx
import React, { Component } from "react";

class Person extends Component {
  constructor(props) {
    super(props);
    this.firstName = "John";
    this.lastName = "Doe";
    this.age = 22;
    this.location = "UK";
    this.height = "6 feet";
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
    weight: 160,
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
class App extends Component {
  state = {
    /*...*/
  };
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
function sayHello() {
  return "Hello!";
}
```

In ES6, you can use an arrow function with body:

```jsx
const sayHello = () => {
  return "Hello!";
};
```

or you can have a function without body and with an implicit return:

```jsx
const sayHello = () => "Hello";
```

JavaScript arrow functions are often used in React applications for keeping the code concise and readable.

#### Functional Programming

In React, you can use a function to define a component:

```jsx
const sayHello = (props) => <h1>{props.greeting}</h1>;
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
{
  this.showUsers ? <h3>Will show users</h3> : <h3>Won't show users</h3>;
}
```

#### Import and Export

In React, you can import/export like so:

```jsx
//File1.js
const firstname = "John";
const lastname = "Doe";

export { firstname, lastname };
```

Then you can import them in another file with a relative path to the first file:

```jsx
//File2.js
import { firstname, lastname } from "./File1.js";

console.log(firstname);
```

You can also import all exported variables from another file as one object:

```jsx
import * as person from "./File1.js";

console.log(person.firstname);
```

Imports can have an aliases too:

```jsx
import { firstname as username } from "./File1.js";

console.log(username);
```

All the previous cases are named imports and exports. But there exists the `default` statement too that can be used for:

(1) Exporting and importing a single functionality

(2) Highlighting main functionality of exported API of a module

(3) Having a fallback import functionality

```jsx
const person = {
  firstname: "John",
  lastname: "Doe",
};

export default person;
```

Leave out the curly braces for the import to import the default export:

```jsx
import developer from "./file1.js";

console.log(developer);
```

These are the basic concepts present in both JS and React. You can read more about these [here](https://www.robinwieruch.de/javascript-fundamentals-react-requirements)

### String variables

We can use string variables within our HTML like so:

```jsx
import React from "react";
const title = "React";
function App() {
  return (
    <div>
      <h1>Hello {title}</h1>
    </div>
  );
}
export default App;
```

**Notice the use of `<div>` in our return statement: make sure you add that otherwise return won't work correctly!**

### JS Object

Let's see how we can add js object:

```jsx
import React from "react";
const welcome = {
  greeting: "Hey",
  title: "React",
};

function App() {
  return (
    <div>
      <h1>
        {welcome.greeting} {welcome.title}
      </h1>
    </div>
  );
}
export default App;
```

Rendered object will be `Hey React`. Remember, everything in curly braces in JSX can be used for JavaScript expressions (e.g. function execution)

### Lists in React

So far we’ve rendered a few primitive variables in JSX; next we’ll render a list of items. First, let’s define the array as a variable. We can define a variable outside or inside the component. The following defines it outside:

```jsx
import React from "react";
const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function App() {
  return (
    <div>
      <h1>Hello React!</h1>
    </div>
  );
}
export default App;
```

Each item in the list has a title, a url, an author, an identifier (objectID), points – which indicate the popularity of an item – and a count of comments. Next, we’ll render the list within our JSX dynamically:

```jsx
import React from "react";
const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function App() {
  return (
    <div>
      <ul>
        {list.map(function (item) {
          return <div>{item.title}</div>;
        })}
      </ul>
    </div>
  );
}
export default App;
```

React will display each item now but if you open up your terminal, you'll see a warning:

```text
react-jsx-dev-runtime.development.js:117 Warning: Each child in a list should have a unique "key" prop.

Check the render method of `App`. See https://reactjs.org/link/warning-keys for more information.
    at div
    at App (http://localhost:3000/static/js/bundle.js:39:1)
```

The error says that each item in the list should have a unique key. This allows you to handle advanced dynamic lists more gracefully. By assigning a key attribute to each list item’s element, React can identify modified items if the list changes (e.g. re-ordering). For our example, we can use the `objectID` (since it is unique) as our `key` attribute:

```jsx
import React from "react";
const list = [...];

function App() {
  return (
    <div>
      <ul>
        {list.map(function (item) {
          return <div key={item.objectID}>{item.title}</div>;
        })}
      </ul>
    </div>
  );
}
export default App;
```

We avoid using the index of the item in the array to make sure the key attribute is a stable identifier. Re-render page and the warning that showed earlier should be gone.

Let's flesh out our example a little more and start printing out more information from our object:

```jsx
import React from "react";
const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

function App() {
  return (
    <div>
      <ul>
        {list.map(function (item) {
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
  );
}
export default App;
```

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
```

### Components

In the example above, notice how our list generation logic became quite complicated. It seems cluttered sitting alongside our main logic. To make things simpler (and for the sake of separation of concerns), let's define the list as a separate component in a different file called `List.tsx`:

```tsx
import React from "react";

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    numComments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    numComments: 2,
    points: 5,
    objectID: 1,
  },
];

export function List() {
  return (
    <div>
      <ul>
        {list.map(function (item) {
          return (
            <div key={item.objectID}>
              <h2>Title: {item.title} </h2>
              <h3>By {item.author}</h3>
              <p>Number of Comments: {item.numComments}</p>
              <p>Points: {item.points}</p>
              <a href={item.url}>URL</a>
            </div>
          );
        })}
      </ul>
      ;
    </div>
  );
}
```

Notice the export keyword in `List.tsx`. Also notice how we return from the function our entire List logic. Once we’ve defined a component, we can use it like any HTML element anywhere in our JSX. The element produces an component instance of your component, or in other words, the component gets instantiated. You can create as many component instances as you want. It’s not much different from a JavaScript class definition and usage. We'll import this in our App component like so:

```tsx
import React, { Component } from "react";
import { List } from "./components/List";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hello!</h1>
        <List />
      </div>
    );
  }
}
export default App;
```

Larger React applications have component hierarchies (also called component trees). There is usually one uppermost entry point component (e.g. App) that spans a tree of components below it. The App is the parent component of the List, so the List is a child component of the App. In a component tree, the App is the root component, and the components that don’t render any other components are called leaf components (e.g. List). The App can have multiple children, as can the List. If the App has another child component, the additional child component is called a sibling component of the List.

Similar to how we have components inside App.js, our `App` itself is a component that resides in the `App.js` file. This component is used in our `src/index.js` file like so:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
```

The second import statement above imports a library called react-dom, in which a ReactDOM.render() function uses an HTML node to replace it with JSX. The process integrates React into HTML. ReactDOM.render() expects two arguments; the first is to render the JSX. It creates an instance of your App component, though it can also pass simple JSX without any component instantiation. The second argument specifies where the React application enters your HTML. It expects an element with an id='root', found in the public/index.html file. This is a basic HTML file.

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

Converting our List class to use arrow functions, we'll get this:

```jsx
import React from "react";
const list = [
  /**/
];

/*Creating our List component :*/
export const List = () => {
  return (
    <div>
      <ul>
        {list.map(function (item) {
          return (
            <div key={item.objectID}>
              <h2>Title: {item.title} </h2>
              <h3>By {item.author}</h3>
              <p>Number of Comments: {item.numComments}</p>
              <p>Points: {item.points}</p>
              <a href={item.url}>URL</a>
            </div>
          );
        })}
      </ul>
      ;
    </div>
  );
};
```

If an arrow function doesn't do anything in between, but only returns something,in other words, if an arrow function doesn't perform any task, but only returns information, you can remove the block body (curly braces) of the function. In a concise body, an implicit return statement is attached, so you can remove the return statement:

```jsx
// with block body
(count) => {
  // perform any task in between
  return count + 1;
};
// with concise body
(count) => count + 1;
```

### Handler Functions

Let's add input field and label to our App component:

```jsx
import React, { Component } from "react";
import { List } from "./components/List";

class App extends Component {
  handleChange = (event: any) => {
    console.log(event);
  };
  render() {
    return (
      <div>
        <h1>Hello!</h1>
        <List />
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" onChange={this.handleChange} />
      </div>
    );
  }
}
export default App;
```

In HTML outside of JSX, input fields have an onchange handler. We’re going to discover how to use onchange handlers with a React component’s JSX. We'll define a function – which can be normal or arrow – for the change event of the input field. In React, this function is called an "event" handler. Now the function can be passed to the `onChange` attribute (JSX named attribute) of the input field.

Now, when you type, say a `?`, in the search box, and inspect the console in chrome, you'll see this (notice the `data` field on line 2 below):

```jsx
SyntheticBaseEvent {_reactName: "onChange", _targetInst: null, type: "change", nativeEvent: InputEvent, target: input#search, …}
nativeEvent: InputEvent {isTrusted: true, data: "?", isComposing: false, inputType: "insertText", dataTransfer: null, …}
```

This is called a synthetic event defined by a JavaScript object. To just get the value typed by the user, you can use `event.target.value`:

```jsx
import React, { Component } from "react";
import { List } from "./components/List";

class App extends Component {
  handleChange = (event: any) => {
    console.log(event.target.value);
  };
  render() {
    return (
      <div>
        <h1>Hello!</h1>
        <List />
        <label htmlFor="search">Search: </label>
        <input id="search" type="text" onChange={this.handleChange} />
      </div>
    );
  }
}
export default App;
```

This is how we give HTML elements in JSX handler functions to respond to user interaction. Always pass functions to these handlers, not the return value of the function, except when the return value is a function:

```jsx
{
  /*don't do this*/
}
<input id="search" type="text" onChange={this.handleChange()} />;

{
  /*do this instead*/
}
<input id="search" type="text" onChange={this.handleChange} />;
```

You can read more about events [here](https://reactjs.org/docs/events.html)

### React Props

We are currently using the list variable as a global variable in the List component. As a reminder, here's what we had:

```jsx
import React from "react";

const list = [
  {
    title: "React",
    url: "https://reactjs.org/",
    author: "Jordan Walke",
    numComments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: "Redux",
    url: "https://redux.js.org/",
    author: "Dan Abramov, Andrew Clark",
    numComments: 2,
    points: 5,
    objectID: 1,
  },
];

export const List = () => {
  return (
    <div>
      <ul>
        {list.map(function (item) {
          return (
            <div key={item.objectID}>
              <h2>Title: {item.title} </h2>
              <h3>By {item.author}</h3>
              <p>Number of Comments: {item.numComments}</p>
              <p>Points: {item.points}</p>
              <a href={item.url}>URL</a>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
```

We used the list directly from global scope in List component. This could work if you only had one variable, but it doesn't scale with multiple variables across multiple components from many different files.

Using so called **props**, we can pass variables as information from one component to another component. Before using props, we’ll move the list from the global scope in List component, to App component and rename it to its actual domain:

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
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
  ];
  return (
    <div>
      <ul>
        {/*List tag being passed the array as props:*/}
        <List list={stories} />
      </ul>
    </div>
  );
};
export default App;
```

Remember our `List` component? It'll now accept the **props**, iterate over the props and add create our object:

```jsx
/*Creating our List component that accepts props :*/
const List = (props) => {
  return props.list.map(function (item) {
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
setSearchTerm("newStateVal");
```

As a side note, this return type (where multiple values are returned from a function) is called array destructuring as seen in this java script example:

```jsx
// basic array definition
const list = ["a", "b"];
// no array destructuring
const itemOne = list[0];
const itemTwo = list[1];
// array destructuring
const [firstItem, secondItem] = list;
```

Array destructuring is just a shorthand version of accessing each item one by one. If you express it without the array destructuring in React, it becomes less readable.

After we initialize the state and have access to the current state and the state updater function, we'll display the current state and update it within the App component’s event handler:

```jsx
import * as React from "react";

const App = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
      <h3>You searched for: </h3>
      <p>{searchTerm}</p>
    </div>
  );
};
export default App;
```

When the user types into the input field, the input field’s change event is captured by the handler with its current internal value. This is done using `onChange={handleChange}`. Once the call is made to `handleChange` function we use `setSearchTerm` function call and pass it the value of new state. After the new state is set, the component renders again. The new state becomes the current state and can be displayed in the component’s JSX.

Notice how we're not using `this.state` or `this.searchTerm`. Instead we've used curly braces: `{searchTerm}`. That's because in a class, we need to call `this.setState()` to update the state. If it's a function component, then simply using the state variable would suffice.

We can also separate `Search` out into its own component and add it to our App. Through this process, the Search component becomes a sibling of the List component, and vice versa. We’ll also move the handler and the state into the Search component to keep our functionality intact. As shown below, we've created a new `Search` component that renders the search box and updates HTML based on input received in that search box:

```jsx
import React from "react";

/*Search component*/
const Search = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  return (
    <div>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={handleChange} />
      <p>
        Searching for <strong>{searchTerm}</strong>.
      </p>
      <hr />
    </div>
  );
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
  const stories = [
    /**/
  ];
  return (
    <div>
      <ul>
        {/*Adding our generated List as a tag:*/}
        <List list={stories} />
        <Search />
      </ul>
    </div>
  );
};
export default App;
```

Side note: if you add the initial state, it'll be rendered in the initial rendering of the component (when the user hasn't typed anything yet). To do so, simply add the initial state on `useState` hook initialization:

```jsx
const [searchTerm, setSearchTerm] = React.useState("<Initial State>");
```

Declaring state variables as a pair of [something, setSomething] is also handy because it lets us give different names to different state variables if we want to use more than one:

```jsx
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState("banana");
  const [todos, setTodos] = useState([{ text: "Learn Hooks" }]);
}
```

I've used the term `hook` above, but what's a `hook`?

#### Hooks

A Hook is a special function that lets you “hook into” React features. For example, `useState` is a Hook that lets you add React state to function components. We’ll learn other Hooks later. If you write a function component and realize you need to add some state to it, previously you had to convert it to a class. Now you can use a Hook inside the existing function component. You can learn more about hooks [here](https://reactjs.org/docs/hooks-state.html).

### Callback Hanlders

So far, we've seen a `Search` component that sets a state by taking input from the user. Search component is a child of `App`. Remember we also had a sibling of search component called `List`. The idea is to filter the displayed `List` based on the user input received. To do so, the `Search` component needs to share its state with its parent, ie transfer state up. Now, we know that state can be passed down from parent to child via props, but how do we send state back up to the `App` component? `callBack` functions! Great explanation [here](https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced)

Simply put: A callback is a function that is to be executed after another function has finished executing — hence the name ‘call back’. Callbacks are a way to make sure certain code doesn’t execute until other code has already finished execution.

Let's look at a simple example:

```jsx
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}

doHomework("math", function () {
  alert("Finished my homework");
});
```

In the example above, we first make a call to `doHomework` with the arguments `math` and an anonymous `callBack` function:

```jsx
function() {
  alert('Finished my homework');
}
```

So, the order of execution would be

- `doHomework` is called with the `math` and `callback` argument.
- Inside `doHomework`, we see the following output: `Starting my math homework`.
- Next, the callback function is called and the order of execution returns back to the original call
- We then see the following printed: `'Finished my homework'`

One cool thing about callbacks, you don't have to define the callback within the function call. In the above example, we passed the entire function in our call to `doHomework`. However, callbacks can be defined elsewhere:

```jsx
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}
function alertFinished() {
  alert("Finished my homework");
}
doHomework("math", alertFinished);
```

Looking at a real world example, here's a sample call to the Twitter API's `search/tweets` endpoint with `params` and a callback function:

```jsx
T.get("search/tweets", params, function (err, data, response) {
  if (!err) {
    // This is where the magic will happen
  } else {
    console.log(err);
  }
});
```

Going back to our example, we wanted to use callbacks to pass our state up the dependency tree: from `Search` back to `App`. To do so, we'll make a few changes to our `App` and `Search` components. First, we'll create a callback function called `handleSearch`:

```jsx
const handleSearch = (event) => {
  console.log(event.target.value);
};
```

This is a simple function that takes an event and logs it to the console. Next, we'll pass this callback to `Search` component as props from `App`. That's because `Search` is a child of `App`.

```jsx
<Search onSearch={handleSearch}>
```

This means, once you're done searching call the callback! For this to work, we'd change our `Search` component so that it accepts props now:

```jsx
const Search = (props) => {...}
```

Here's what our setup looks like now:

```jsx
const App = () => {
  const stories = [...]];

  // A -> Callback function
  const handleSearch = (event) => {
    console.log(event.target.value);
  }

  return (
    <div>
      // B -> Call search with callback as prop
      <Search onSearch={handleSearch}/>
      <List list={stories} />
    </div>
  );
};

const Search = (props) => {
  const [searchTerm, setSearchTerm] = React.useState();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    // C -> Call the callback once done capturing event
    props.onSearch(event);
  }

  return (
    <div>
      <label htmlFor="search"> Search: </label>
      <input id="search" type="text" onChange={handleChange}/>
      <p>
        Searching for <strong>{searchTerm}</strong>
      </p>
    </div>
  )
}
```

We pass a function from one component (App) to another component (Search); we call it in the second component (Search); but have the actual implementation of the function call in the first component (App). This way, we can communicate up the component tree.

### Lifting State In React

Currently, the Search component still has its internal state. While we established a callback handler to pass information up to the App component, we are not using it yet. We need to figure out how to share the Search component’s state across multiple components.

The search term is needed in the App to filter the list before passing it to the List component as props. We’ll need to lift state up from Search to App component to share the state with more components. To do so, we can remove the state from `Search` and add it in `App`:

```jsx
const App = () => {
  const [searchTerm, setSearchTerm] = React.useState();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      <List list={stories} />
    </div>
  );
};

const Search = (props) => {
  return (
    <div>
      <label htmlFor="search"> Search: </label>
      <input id="search" type="text" onChange={props.onSearch} />
    </div>
  );
};
```

Now in the logic above, we define the `handleSearch` in `App`. Next, we call `Search` with the `onSearch={handleSearch}` callback prop. Inside `Search`, the prop is called back once input is captured by the user using the line:

```jsx
<input id="search" type="text" onChange={props.onSearch} />
```

Finally, when the callback is called, the state is set by using the `setSearchTerm` call. We're now ready to filter the `stories` prop that is being passed to `List` component. We'll use what was returned from `Search` to filter what to display in `List`.

To filter our results based on what the user types in the search, we'll again make use of the state we saved in our `App` component. Always manage the state at a component where every component that’s interested in it is one that either manages the state (using information directly from state) or a component below the managing component (using information from props). If a component below needs to update the state, pass a callback handler down to it (see Search component). If a component needs to use the state (e.g. displaying it), pass it down as props.

By managing the search feature state in the `App` component, we can finally filter the list with the stateful `searchTerm` before passing the list to the `List` component:

```jsx
const App = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredStories = stories.filter(function (story) {
    return story.title.includes(searchTerm);
  });
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search onSearch={handleSearch} />
      <List list={filteredStories} />
    </div>
  );
};

const Search = (props) => {
  return (
    <div>
      <label htmlFor="search"> Search: </label>
      <input id="search" type="text" onChange={props.onSearch} />
    </div>
  );
};
```

Above, [JavaScript array’s built-in filter function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) is used to create a new filtered array. The filter function takes a function as an argument, which accesses each item in the array and returns true or false. If the function returns true, meaning the condition is met, the item stays in the newly created array; if the function returns false, it’s removed.

If you run the code above as is and search for `react` you'll see nothing rendered in the list because `React !== react`. We can remedy that by changing both the titles and search term to lower case before comparing in the filter function:

```jsx
const filteredStories = stories.filter(function (story) {
  return story.title.toLowerCase().includes(searchTerm.toLowerCase());
});
```

Let's refactor the filter function above to:

```jsx
const filteredStories = stories.filter((story) => {
  return story.title.toLowerCase().includes(searchTerm.toLowerCase());
});
```

In addition, we could turn the return statement into an immediate return, because no other task (business logic) happens before the return:

```jsx
const searchedStories = stories.filter((story) =>
  story.title.toLowerCase().includes(searchTerm.toLowerCase())
);
```

Here's where we ended up:

```jsx
import * as React from "react";

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search onSearch={handleSearch} />
      <List list={filteredStories} />
    </div>
  );
};

const Search = (props) => {
  return (
    <div>
      <label htmlFor="search"> Search: </label>
      <input id="search" type="text" onChange={props.onSearch} />
    </div>
  );
};

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
export default App;
```

### React Controlled Components

In HTML, form elements such as `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with `setState()`.

We can combine the two by making the React state be the “single source of truth”. Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a “controlled component”. Controlled components are not necessarily React components, but HTML elements. Here, we’ll learn how to turn the Search component and its input field into a controlled component.

Why do we actually need a controlled component? Well, if we look again at the example above, we have the following:

```jsx
import * as React from "react";

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search onSearch={handleSearch} />
      <List list={filteredStories} />
    </div>
  );
};

const Search = (props) => {
  return (
    <div>
      <label htmlFor="search"> Search: </label>
      <input id="search" type="text" onChange={props.onSearch} />
    </div>
  );
};

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
export default App;
```

Here, we didn't have an initial state set:

```jsx
const [searchTerm, setSearchTerm] = React.useState("");
```

if we change this line to:

```jsx
const [searchTerm, setSearchTerm] = React.useState("React");
```

we'll see that the list has been filtered but the input field doesn't show the initial `searchTerm` (ie the search box is empty!). We want the input field to reflect the actual searchTerm used from the initial state; but it’s only reflected through the filtered list. We need to convert the Search component with its input field into a controlled component. So far, the input field doesn’t know anything about the searchTerm. It only uses the change event to inform us of a change.

The input field has a value attribute that can be used to show the initial state. To do so, we'll update the `Search` component in `App` to:

```jsx
//old
<Search onSearch={handleSearch}/>
//new - searchTerm is the state
<Search search={searchTerm} onSearch={handleSearch}/>
```

and inside `Search` component, we'll do this:

```jsx
//old
<input id="search" type="text" onChange={props.onSearch}/>
//new - pull value from props.search
<input id="search" type="text" value={props.search} onChange={props.onSearch}/>
```

`Search` component now looks like:

```jsx
const Search = (props) => {
  return (
    <div>
      <label htmlFor="search"> Search: </label>
      <input
        id="search"
        type="text"
        value={props.search}
        onChange={props.onSearch}
      />
    </div>
  );
};
```

Now the input field starts with the correct initial value, using the searchTerm from the React state.We learned about controlled components in this section, and, taking all the previous sections as learning steps into consideration, discovered another concept called unidirectional data flow:

```jsx
UI -> Side-Effect -> State -> UI -> ...
```

A React application and its components start with an initial state, which may be passed down as props to other components. It’s rendered for the first time as a UI. Once a side-effect occurs, like user input or data loading from a remote API, the change is captured in React’s state. Once state has been changed, all the components affected by the modified state or the implicitly modified props are re-rendered (the component functions runs again).

### Props: Enhancements

Let's take a look at a few ways we can improve props and props processing in our react components. We had this `Search` component earlier:

```jsx
const Search = (props) => {
  return (
    <div>
      <label htmlFor="search"> Search: </label>
      <input
        id="search"
        type="text"
        value={props.search}
        onChange={props.onSearch}
      />
    </div>
  );
};
```

We can apply destructuring of the props object in the component's function body:

```jsx
const Search = (props) => {
  const { search, onSearch } = props;
  return (
    <div>
      <label htmlFor="search"> Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch} />
    </div>
  );
};
```

That’s a basic destructuring of the props object in a React component, so that the object’s properties can be used conveniently in the component. We can take all this one step further by destructuring the props object right away in the function signature of our component, omitting the function’s block body of the component again:

```jsx
const Search = ({ search, onSearch }) => {
  return (
    <div>
      <label htmlFor="search"> Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch} />
    </div>
  );
};
```

### React Side Effects

Next we’ll add a feature to our Search component in the form of another React hook. We’ll make the Search component remember the most recent search interaction, so the application opens it in the browser whenever it restarts. We'll use the local storage of our browser to store the `searchTerm` accompanied by an id. Next, we'll use this stored value (if it exists) to set the initial state of the `searchTerm`. If it doesn't exist, we'll do 2 things:

1. We'll default to `React` for our initial search term.
2. We'll set the `stateHistory` to whatever the user searches for. This value will then be used when user re-visits the page.

To do so, we'll use `localStorage`. `localStorge` has 2 important methods:

```jsx
localStorage.setItem(<identifier>,<value>)
localStorage.getItem(<identifier>)
```

In our example, we'll place the `searchTerm` in our local storage with the identifier called `stateHistory`. Let's see this in action:

First thing we need to do is check and see if a value exists in `localStorage` with the id `stateHistory`. If so, set `searchTerm` to that, otherwise, set `searchTerm` to "React":

```jsx
const [searchTerm, setSearchTerm] = React.useState(
  localStorage.getItem("stateHistory") || "React"
);
```

Next, we need to update the value stored in local storage. To do so, we'll use our callback function to capture what's returned from the `Search` component and update item in local storage:

```jsx
const handleSearch = (event) => {
  setSearchTerm(event.target.value);
  localStorage.setItem("stateHistory", searchTerm);
};
```

That's it! Using the local storage in React can be seen as a side-effect because we interact outside of React’s domain by using the browser’s API. Here's what we have so far:

```jsx
import * as React from "react";

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem("stateHistory") || "React"
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    localStorage.setItem("stateHistory", searchTerm);
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <List list={filteredStories} />
    </div>
  );
};

const Search = ({ search, onSearch }) => {
  return (
    <div>
      <label htmlFor="search"> Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch} />
    </div>
  );
};

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
export default App;
```

### useEffect Hook

We used `localStorage` in the previous section but that approach has a flaw: the handler function we have, `handleSearch`, should only be concerned with updating the state and not worry about side-effects. Also, if we use `setSearchTerm` elsewhere to update the state, we can't be sure that our `localStorage` is being updated as well. We need to fix this using `useEffect` hook.

The `useEffect` hook is used to manage side effects that aren't related to the components' rendering. Things such as console messages or loading data are managed by `useEffect`. To use this hook, we need to import it:

```jsx
import React, { useState, useEffect } from "react";
```

The useEffect hook takes in two arguments a call-back function and a dependency array:

```jsx
useEffect(() => {
  //Do something...
}, []);
```

The dependency array can be used to keep track of values:

```jsx
import React, { useState, useEffect } from "react";

function App() {
  const [emotion, setEmotion] = useState("happy");

  useEffect(() => {
    console.log(`The emotion is: ${emotion}`);
  }, [emotion]);
}
```

In our example from earlier, we'll use `useEffect` to trigger the side-effect each time `searchTerm` changes. We said we weren't happy with `handleSearch` dealing with `localStorage`, so let's get rid of that logic from `handleSearch` callback:

```jsx
const handleSearch = (event) => {
  setSearchTerm(event.target.value);
};
```

We'll keep the initial state load logic as is:

```jsx
const [searchTerm, setSearchTerm] = React.useState(
  localStorage.getItem("stateHistory") || "React"
);
```

Next, we'll use `useEffect` to update the state within the `App`:

```jsx
React.useEffect(() => {
  localStorage.setItem("stateHistory", searchTerm);
}, [searchTerm]);
```

Like mentioned earlier, React’s useEffect Hook takes two arguments: The first argument is a function where the side-effect occurs. In our case, the side-effect is when the user types the searchTerm we save that value in browser’s local storage. The optional second argument is a dependency array of variables. If one of theses variables changes, the function for the side-effect is called. In our case, the function is called every time the `searchTerm` changes; and it’s also called initially when the component renders for the first time.

Leaving out the dependency array, would make the function for the side-effect run on every render (initial render and update renders) of the component. If the dependency array of React’s useEffect is an empty array, the function for the side-effect is only called once, after the component renders for the first time. As is evident, `useEffect` hook lets us opt into React’s component lifecycle. It can be triggered when the component is first mounted, but also if one of its dependencies are updated.

Using `useEffect` instead of managing the side-effect in the handler has made the application more robust. Whenever and wherever `searchTerm` is updated via `setSearchTerm`, local storage will always be in sync with it.

Finally, here's the updated code:

```jsx
import * as React from "react";

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem("stateHistory") || "React"
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  React.useEffect(() => {
    localStorage.setItem("stateHistory", searchTerm);
  }, [searchTerm]);

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <List list={filteredStories} />
    </div>
  );
};

const Search = ({ search, onSearch }) => {
  return (
    <div>
      <label htmlFor="search"> Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch} />
    </div>
  );
};

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
export default App;
```

### Creating our own hook

Thus far we’ve covered the two most popular hooks in React: useState and useEffect. useState is used to make your application interactive; useEffect is used to opt into the lifecycle of your components. Next, we'll create a custom hook called `useSemiPersistentState`: one that manages state and also synchronizes with local storage. It’s not fully persistent because clearing the local storage of the browser deletes relevant data for this application.

Start by extracting all relevant implementation details from the App component into this new custom
hook:

```jsx
const useSemiPersistentState = () => {
  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem("stateHistory") || "React"
  );

  React.useEffect(() => {
    localStorage.setItem("stateHistory", searchTerm);
  }, [searchTerm]);
};
```

So far, it’s just a function around our useState and useEffect hooks. Before we can use it, let’s return the values that are needed in our App component from this custom hook:

```jsx
const useSemiPersistentState = () => {
  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem("stateHistory") || "React"
  );

  React.useEffect(() => {
    localStorage.setItem("stateHistory", searchTerm);
  }, [searchTerm]);

  return [searchTerm, setSearchTerm];
};
```

We are following two conventions of React’s built-in hooks here:

- First, the naming convention which puts the “use” prefix in front of every hook name;
- second, the returned values are returned as an array.

This custom hook is defined outside of `App` component. Now we can use the custom hook with its returned values in the App component with the usual array destructuring:

```jsx
const [searchTerm, setSearchTerm] = useSemiPersistentState();
```

Here's what our code looks like right now:

```jsx
import * as React from "react";

const useSemiPersistentState = () => {
  const [searchTerm, setSearchTerm] = React.useState(
    localStorage.getItem("stateHistory") || "React"
  );

  React.useEffect(() => {
    localStorage.setItem("stateHistory", searchTerm);
  }, [searchTerm]);

  return [searchTerm, setSearchTerm];
};

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistentState();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <List list={filteredStories} />
    </div>
  );
};
```

Another goal of a custom hook should be reusability. All of this custom hook’s internals are about the search domain, but the hook should be for a value that’s set in state and synchronized in local storage. Let’s adjust the naming:

```jsx
const useSemiPersistentState = () => {
  const [value, setValue] = React.useState(localStorage.getItem("value") || "");

  React.useEffect(() => {
    localStorage.setItem("value", setValue);
  }, [value]);

  return [value, setValue];
};
```

We handle an abstracted “value” within the custom hook. Using it in the App component, we can name the returned current state and state updater function anything domain-related (e.g. searchTerm and setSearchTerm) with array destructuring.

There is still one problem with this custom hook. Using the custom hook more than once in a React application leads to an overwrite of the “value” allocated item in the local storage. To fix this, pass in a key to our hook. Another improvement is to give the custom hook the initial state we had from the outside:

```jsx
const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, setValue);
  }, [value, key]);

  return [value, setValue];
};
```

Now from the `App` component, we need to call this hook like so:

```jsx
const [searchTerm, setSearchTerm] = useSemiPersistentState(
  "stateHistory",
  "React"
);
```

A custom hook can encapsulate non-trivial implementation details that should be kept away from a component; it can be used in more than one React component and can even be open-sourced as an external library. More on react hooks [here](https://www.robinwieruch.de/react-hooks/)

Here's what our complete code looks like right now:

```jsx
import * as React from "react";

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, setValue);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    "stateHistory",
    "React"
  );

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <Search search={searchTerm} onSearch={handleSearch} />
      <List list={filteredStories} />
    </div>
  );
};

const Search = ({ search, onSearch }) => {
  return (
    <div>
      <label htmlFor="search"> Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch} />
    </div>
  );
};

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
export default App;
```

### React Fragments

One caveat with JSX, especially when we create a dedicated Search component, is that we must introduce a wrapping HTML element to render it (notice the `div` tag):

```jsx
const Search = ({ search, onSearch }) => {
  return (
    <div>
      <label htmlFor="search"> Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch} />
    </div>
  );
};
```

Normally the JSX returned by a React component needs only one wrapping top-level element. To render multiple top-level elements side-by-side, we have to wrap them into an array instead. Since we’re working with a list of elements, we have to give every sibling element React’s key attribute:

```jsx
const Search = ({ search, onSearch }) => [
  <label key="1" htmlFor="search">
    {" "}
    Search:{" "}
  </label>,
  <input key="2" id="search" type="text" value={search} onChange={onSearch} />,
];
```

This is one way to have multiple top-level elements in your JSX. It doesn’t turn out very readable, though, as it becomes verbose with the additional key attribute. Another solution is to use a React fragment:

```jsx
<>
  <label htmlFor="search"> Search: </label>
  <input id="search" type="text" value={search} onChange={onSearch} />
</>
```

A fragment wraps other elements into a single top-level element without adding to the rendered output. Both Search elements should be visible in your browser now, with input field and label. You can use a `div` instead as well but a fragment is cleaner. More on fragments [here](https://reactjs.org/docs/fragments.html).

### React Reusable components

Let's take a look at what our `Search` component:

```jsx
const Search = ({ search, onSearch }) => {
  return (
    <div>
      <label htmlFor="search"> Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch} />
    </div>
  );
};
```

`Search` component isn't performing any sort of search but instead is responsible for capturing input from the user. Therefore, we can re-name this component to `InputWithLabel` . Next, notice it takes in two props: `({search, onSearch})` where one is the value and the other is the callback function that gets called when value changes. This can be extracted to a simpler component that can accept any input, let's call it `input` and a callback function, let's call it `onInputChange`, that should be called when the said input changes.

Also, notice we provide values for id:

```jsx
id = "search";
```

an actual label, which in this case is `Search`:

```jsx
<label htmlFor="search"> Search: </label>
```

and the type of input we're receiving:

```jsx
type = "text";
```

If we can ask the caller to pass these, our component would look like (old version is also shown for easy comparison):

```jsx
const Search = ({ search, onSearch }) => {
  return (
    <div>
      <label htmlFor="search"> Search: </label>
      <input id="search" type="text" value={search} onChange={onSearch} />
    </div>
  );
};

const InputWithLabel = ({ label, id, type, input, onInputChange }) => {
  return (
    <div>
      <label htmlFor={id}> {label} </label>
      <input id={id} type={type} value={input} onChange={onInputChange} />
    </div>
  );
};
```

Now, our `App` component can call `InputWithLabel` like so:

```jsx
const filteredStories = stories.filter((story) =>
  story.title.toLowerCase().includes(searchTerm.toLowerCase())
);
return (
  <div>
    <h1>My Hacker Stories</h1>
    <InputWithLabel
      label="Search"
      id="search"
      type="text"
      input={searchTerm}
      onInputChange={handleSearch}
    />
    <List list={filteredStories} />
  </div>
);
```

Finally, here's what our entire `App` looks like:

```jsx
import React from "react";

const useSemiPersistentState = (key, initialState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        label="Search"
        value={searchTerm}
        onInputChange={handleSearch}
      />
      <List list={filteredStories} />
    </div>
  );
};

const InputWithLabel = ({ id, label, value, type = "text", onInputChange }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input id={id} type={type} value={value} onChange={onInputChange} />
  </>
);

const List = ({ list }) =>
  list.map((item) => <Item key={item.objectID} item={item} />);

const Item = ({ item }) => (
  <div>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </div>
);

export default App;
```

With just a few changes we turned a specialized Search component into a more reusable component. We generalized the naming of the internal implementation details and gave the new component a larger API surface to provide all the necessary information from the outside. We aren’t using the component elsewhere, but we increased its ability to handle the task if we do. More on re-usable components [here](https://www.robinwieruch.de/react-reusable-components/)

### Children

In the code we used above, our `App` component is passing in the `Search` string as a label. This label is displayed before the search box. However, there's another way we can capture this information from App instead of passing it as a prop: `children`. What we can do is remove the `label` prop and use the `InputWithLabel` like so:

```jsx
<InputWithLabel id="search" value={searchTerm} onInputChange={handleSearch}>
  <strong>Search:</strong>
</InputWithLabel>
```

Notice how we've added a closing tag and text, `Search:` in between. Next, this can be accessed as `children` in the `InputWithLabel` component:

```jsx
const InputWithLabel = ({
  id,
  value,
  type = "text",
  onInputChange,
  children,
}) => (
  <>
    <label htmlFor={id}>{children}</label>
    <input id={id} type={type} value={value} onChange={onInputChange} />
  </>
);
```

React component’s elements behave similar to native HTML. Everything that’s passed between a component’s elements can be accessed as `children` in the component and be rendered somewhere. This allows you to have more freedom from outside the `InputWithLabel` component in controlling how you want your label to show. For example, you could show the label as bold:

```jsx
<InputWithLabel
  id="search"
  type="text"
  input={searchTerm}
  onInputChange={handleSearch}
>
  <strong>Search:</strong>
</InputWithLabel>
```

With this React feature, we can compose React components into each other. You can pass components via React children as well.

### Inline Handlers in JSX

The list of stories we have so far is only an unstateful variable. We can filter the rendered list with the search feature, but the list itself stays intact if we remove the filter. The filter is just a temporary change through a third party, but we can’t manipulate the real list yet. To gain control over the list, make it stateful by using it as initial state in React’s useState Hook. The returned values are the current state (stories) and the state updater function (setStories). We aren’t using the custom useSemiPersistentState hook yet, because we don’t want to open the browser with the cached list each time. Instead, we always want to start with the initial list:

```jsx
//App.jsx
const App = () => {
  const stories = [
    {
      title: "React",
      url: "https://reactjs.org/",
      author: "Jordan Walke",
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: "Redux",
      url: "https://redux.js.org/",
      author: "Dan Abramov, Andrew Clark",
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  // Grab allStories and set as initial state:
  const [allStories, setStories] = useState(stories);
  //Filter allStories
  const filteredStories = allStories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <List list={filteredStories} />
    </div>
  );
};
```

Next, we'll manipulate the list by removing an item from it:

```jsx

```

### GraphQL Basics

If we have our schema in a `schema.js` file like so:

```jsx
import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

export default schema;
```

we can have the following resolver:

```jsx
const root = { hello: () => "This is from resolver" };

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
```

The schema shows that we can `Query` on type `hello` and we'll get back the hard-coded value from the resolver. Also notice that the resolver called `root` has the same name inside of it that's defined in `Query` in the schema, ie `hello`. Basically, the resolver will determine what to return when a `Query` of type `hello` is made.

Expanding on the example above, you can have the following schema:

```jsx
import { buildSchema } from "graphql";

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
const root = {
  friend: () => {
    return {
      id: 123456,
      firstName: "First",
      lastName: "Last",
      gender: "Male",
      email: "test@test.com",
    };
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
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
const root = {
  friend: () => {
    return {
      id: 123456,
      firstName: "First",
      lastName: "Last",
      gender: "Male",
      email: [{ email: "test1@test1.com" }, { email: "test2@test2.com" }],
    };
  },
};
```

Finally, we can query via graphiql:

```graphql
query {
  friend {
    firstName
    email {
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
  constructor(id, { firstName, lastName, gender, email }) {
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
      id: 123456,
      firstName: "First",
      lastName: "Last",
      gender: "Male",
      email: "test@test.com",
    };
  },
  createFriend: ({ input }) => {
    let id = require("crypto").randomBytes(10).toString("hex");
    friendDB[id] = input;
    return new Friend(id, input);
  },
};
```

Before we proceed, let's talk a little about resolvers. Resolvers are the functions that respond to queries and mutations. They're the functions that give us the result of the query. A good practice is to extract resolvers into their own files for ease of use. Let's do that. We'll move the resolvers out and are left with this in our index.js:

```jsx
import express from "express";
import schema from "./schema";
import { graphqlHTTP } from "express-graphql";

const app = express();

app.get("/", (req, res) => {
  res.send("Graphql is amazing!");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(8080, () =>
  console.log("Running server on port localhost:8080/graphql")
);
```

We've moved resolvers to a file called `resolvers.js` and have the following in it:

```jsx
const friendDB = {};

class Friend {
  constructor(id, { firstName, lastName, gender, email }) {
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
      id: 123456,
      firstName: "First",
      lastName: "Last",
      gender: "Male",
      email: "test@test.com",
    };
  },
  createFriend: ({ input }) => {
    let id = require("crypto").randomBytes(10).toString("hex");
    friendDB[id] = input;
    return new Friend(id, input);
  },
};
```

Now, instead of hard-coded values, let's re-name the first resolver (that we've been using for `Query`) and return from the array. So now, our resolvers look like this:

```jsx
const friendDB = {};

class Friend {
  constructor(id, { firstName, lastName, gender, email }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.email = email;
  }
}

const resolvers = {
  // Needs an id for lookup
  getFriend: ({ id }) => {
    // Return a new Friend object along with id
    return new Friend(id, friendDB[id]);
  },
  createFriend: ({ input }) => {
    let id = require("crypto").randomBytes(10).toString("hex");
    friendDB[id] = input;
    return new Friend(id, input);
  },
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
import { buildSchema } from "graphql";

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
import express from "express";
import schema from "./schema";
import { graphqlHTTP } from "express-graphql";
import resolvers from "./resolvers";

const app = express();

app.get("/", (req, res) => {
  res.send("Graphql is amazing!");
});

// Pass resolvers to root
const root = resolvers;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(8080, () =>
  console.log("Running server on port localhost:8080/graphql")
);
```

Now let's see how we can use mutation to add `Friend` from GraphiQL:

```graphql
mutation {
  createFriend(
    input: {
      firstName: "FName1"
      lastName: "LName1"
      gender: "gender1"
      email: "email1@test.com"
    }
  ) {
    id
  }
}
```

The mutation above will be resolved by this resolver:

```jsx
createFriend: ({ input }) => {
  let id = require("crypto").randomBytes(10).toString("hex");
  friendDB[id] = input;
  return new Friend(id, input);
};
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
  getFriend(id: "d7d7b2481cd95d25f7d8") {
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
import { buildSchema } from "graphql";

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
import { makeExecutableSchema } from "graphql-tools";
import { resolvers } from "./resolvers";

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

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
```

With that updated, we need to update our resolvers.js file as well. We'll create a resolver map that'll look a lot like the GraphQL syntax that we've been using:

```jsx
const friendDB = {};

class Friend {
  constructor(id, { firstName, lastName, gender, email }) {
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
    getFriend: (_, { id }) => {
      return new Friend(id, friendDB[id]);
    },
  },

  Mutation: {
    createFriend: (_, { input }) => {
      let id = require("crypto").randomBytes(10).toString("hex");
      friendDB[id] = input;
      return new Friend(id, input);
    },
  },
};
```

All we did here was move the `createFriend` resolver inside the Mutation and `getFriend` resolver inside the Query. Now, our resolvers are being used inside of the schema. One thing to note here is that the query and mutation resolvers are now using a function and it's signature is as follows:

```jsx
fieldName: (parent, args, context, info) => data;
```

Since we're not using any of the function arguments except for `args`, we'd have to provide an underscore, `_`, for the arguments before args as shown above.

Finally, we need to update the `index.js` file by removing the old resolvers import. We'll instead import resolvers from the schema. We'll also get rid of the root resolvers and the rootValue field inside app.use:

```jsx
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { schema } from "./schema";

const app = express();

app.get("/", (req, res) => {
  res.send("Graphql is amazing!");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(8080, () =>
  console.log("Running server on port localhost:8080/graphql")
);
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
    getFriend: (_, { id }) => {
      return new Friend(id, friendDB[id]);
    },
  },

  Mutation: {
    createFriend: (_, { input }) => {
      let id = require("crypto").randomBytes(10).toString("hex");
      friendDB[id] = input;
      console.log("DB looks like this: ", friendDB);
      return new Friend(id, input);
    },
    updateFriend: (_, { input }) => {
      //Do something
    },
  },
};
```

Now, this resolver should grab the `id` from the input (remember our FriendInput already has the ID present) and update the item in our array. We can call a separate function called `findFriendAndUpdate` to do that for us. Next, this resolver should then return the updated `Friend`. Here's this logic in code:

```jsx
function findFriendAndUpdate(input) {
  friendDB[input.id] = input;
}

//resolver map
const resolvers = {
  Query: {
    getFriend: (_, { id }) => {
      return new Friend(id, friendDB[id]);
    },
  },

  Mutation: {
    createFriend: (_, { input }) => {
      let id = require("crypto").randomBytes(10).toString("hex");
      friendDB[id] = input;
      console.log("DB looks like this: ", friendDB);
      return new Friend(id, input);
    },
    updateFriend: (_, { input }) => {
      findFriendAndUpdate(input);
      return new Friend(input.id, input);
    },
  },
};
```

Finally, the graphql query to update an existing `Friend` would look like this:

```graphql
mutation {
  updateFriend(
    input: {
      id: "192f3e997a5f14ff109f"
      firstName: "FnameNew"
      lastName: "LnameNew"
      email: "newEmail@email.com"
      gender: "FEMALE"
    }
  ) {
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
  SuperStartFriend: getFriend(id: "192f3e997a5f14ff109f") {
    firstName
    lastName
    email
  }
  FriendWithMyName: getFriend(id: "8dc8fd71c3001cbdcc7a") {
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
  one: getFriend(id: "33700cc78de32fdf6b3e") {
    ...friendFragment
  }
  two: getFriend(id: "8dc8fd71c3001cbdcc7a") {
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
fragment friendFragment on Friend {
  email
  firstName
}
```

Therefore, our complete query would look like so:

```graphql
query {
  one: getFriend(id: "33700cc78de32fdf6b3e") {
    ...friendFragment
  }
  two: getFriend(id: "192f3e997a5f14ff109f") {
    ...friendFragment
  }
}

fragment friendFragment on Friend {
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
