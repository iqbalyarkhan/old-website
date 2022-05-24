---
date: 2021-06-10
draft: false
thumbnail: /post-images/apollo-server.png
title: Apollo Server Tutorial
extract: Sample project using Apollo Server
categories:
  - React
tags:
  - blog
  - React
---

- [Introduction](#introduction)
- [Create a new project](#create-a-new-project)
  - [Define Schema](#define-schema)
  - [Define Data Set](#define-data-set)
  - [Resolver](#resolver)
  - [Create Apollo Server Instance](#create-apollo-server-instance)

## Introduction

[This tutorial helps you](https://www.apollographql.com/docs/apollo-server/getting-started/):

- Obtain a basic understanding of GraphQL principles
- Define a GraphQL schema that represents the structure of your data set
- Run an instance of Apollo Server that lets you execute queries against your schema

## Create a new project

Follow these to create your project:

```bash
mkdir graphql-server-example
cd graphql-server-example
npm init --yes
npm install apollo-server graphql
touch index.js
```

To keep things simple, `index.js` will contain all of the code for this example application.

### Define Schema

Every GraphQL server (including Apollo Server) uses a schema to define the structure of data that clients can query. In this example, we'll create a server for querying a collection of books by title and author.

Here's what our schema would look like:

```js
const { ApolloServer, gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;
```

This snippet defines a simple, valid GraphQL schema. Clients will be able to execute a query named books, and our server will return an array of zero or more Books.

### Define Data Set

Now that we've defined the structure of our data, we can define the data itself. Apollo Server can fetch data from any source you connect to (including a database, a REST API, a static object storage service, or even another GraphQL server). For the purposes of this tutorial, we'll just hardcode some example data.

Add the following to the bottom of index.js:

```js
const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];
```

This snippet defines a simple data set that clients can query. Notice that the two objects in the array each match the structure of the Book type we defined in our schema.

### Resolver

We've defined our data set, but Apollo Server doesn't know that it should use that data set when it's executing a query. To fix this, we create a resolver.

Resolvers tell Apollo Server how to fetch the data associated with a particular type. Because our Book array is hardcoded, the corresponding resolver is straightforward.

```js
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    books: () => books,
  },
};
```

### Create Apollo Server Instance

We've defined our schema, data set, and resolver. Now we just need to provide this information to Apollo Server when we initialize it.

Add the following to the bottom of index.js:

```js
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

We're ready to start our server! Run the following from your project's root directory:

```bash
node index.js
```
