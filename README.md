### iqbalyarkhan.github.io

This is a site built with [Gatsby.js](https://www.gatsbyjs.org/) using [gatsby-starter-lumen](https://github.com/alxshelepenok/gatsby-starter-lumen). To get started:

```bash
npm install
npm run develop
```

#### Start Developing

Navigate into your new site’s directory and start it up.

```sh
cd blog
gatsby develop
```

#### Deploy to Github Pages

To deploy to github pages, simply do the following:

- Ensure that your `package.json` file correctly reflects where this repo lives
- Change the `pathPrefix` in your `config.js`
- Run the standard deploy command

```sh
npm run deploy
```


#### Access Locally
You can see your changes live in your local every time you save by:
```
$ cd [REPO_NAME]
$ gastby develop
```
and navigating to http://localhost:8000

To develop locally, make necessary changes then:
```
$ gatsby build
$ gatsby serve
```
Your project would be running locally. Once satisfied with your changes, push to your
github branch and once merged with master, run:
```
$ npm run deploy
```

