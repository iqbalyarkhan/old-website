---
date: 2019-12-24
title: "Gatsby JS Code block Line Numbers"
cover: "https://unsplash.it/400/300/?random?BoldMage"
categories: 
    - React
tags:
    - blog
---

### Introduction

There are various methods to display code on one's blog. This post will discuss one such setup that would allow you to use code blocks and line numbers using [GatsbyJS](https://www.gatsbyjs.org/)

### Setup

Here are the steps you need to take to get code blocks to appear on your gatsby blog:

First, install [gatsby-remark-prismjs](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/) by running this from within your gatsby project. 
```bash
npm install --save gatsby-transformer-remark gatsby-remark-prismjs prismjs
```

Once done, you should be able to see `prism-line-numbers.css` file located here in your project: `/node_modules/prismjs/plugins/line-numbers/`. This is as a result of the npm install we did above.

Edit `prism-line-numbers.css` to include the following. This is to allow for line numbers and proper alignment:

```css
/**
 * If you only want to use line numbering
 */

.gatsby-highlight {
	background-color: black;
	border-radius: 0.3em;
	margin: 0.5em 0;
	padding: 1em;
	overflow: auto;
	min-width: 60%;
}

.gatsby-highlight:hover{
	min-width: 100%;
}

.gatsby-highlight pre[class*="language-"].line-numbers {
	padding: 0;
	padding-left: 2.8em;
	overflow: initial;
}

pre[class*="language-"].line-numbers {
	position: relative;
	padding-left: 3.8em;
	counter-reset: linenumber;
}

pre[class*="language-"].line-numbers > code {
	position: relative;
	white-space: inherit;
}

.line-numbers .line-numbers-rows {
	position: absolute;
	pointer-events: none;
	top: 0;
	font-size: 100%;
	left: -3.8em;
	width: 3em; /* works for line-numbers below 1000 lines */
	letter-spacing: -1px;
	border-right: 1px solid #999;

	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;

}

.line-numbers-rows > span {
	pointer-events: none;
	display: block;
	counter-increment: linenumber;
}

.line-numbers-rows > span:before {
	content: counter(linenumber);
	display: block;
	padding-right: 0.8em;
	text-align: right;
}

```

Next, you need to add the following to your `gatsby-config.js` file. Make sure to add this to your plugins array:

```javascript{numberLines: true}
{
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-prismjs`,
          options: {
            // Class prefix for <pre> tags containing syntax highlighting;
            // defaults to 'language-' (eg <pre class="language-js">).
            // If your site loads Prism into the browser at runtime,
            // (eg for use with libraries like react-live),
            // you may use this to prevent Prism from re-processing syntax.
            // This is an uncommon use-case though;
            // If you're unsure, it's best to use the default value.
            classPrefix: "language-",
            // This is used to allow setting a language for inline code
            // (i.e. single backticks) by creating a separator.
            // This separator is a string and will do no white-space
            // stripping.
            // A suggested value for English speakers is the non-ascii
            // character '›'.
            inlineCodeMarker: null,
            // This lets you set up language aliases.  For example,
            // setting this to '{ sh: "bash" }' will let you use
            // the language "sh" which will highlight using the
            // bash highlighter.
            aliases: {},
            // This toggles the display of line numbers globally alongside the code.
            // To use it, add the following line in src/layouts/index.js
            // right after importing the prism color scheme:
            //  `require("prismjs/plugins/line-numbers/prism-line-numbers.css");`
            // Defaults to false.
            // If you wish to only show line numbers on certain code blocks,
            // leave false and use the {numberLines: true} syntax below
            showLineNumbers: false,
            // If setting this to true, the parser won't handle and highlight inline
            // code used in markdown i.e. single backtick code like `this`.
            noInlineHighlight: false,
          },
        },
      ],
    },
  }
```

Next, check to see if you have a `gatsby-browser.js` file. If not, create it inside the root folder of your project (at the same level as your `gatsby-config.js` file). Add this to that file:

```js
'use strict';

exports.onClientEntry = () => {};
require("prismjs/plugins/line-numbers/prism-line-numbers.css");
``` 

We're now ready to use code blocks in our blog. To do so you'd have to use 3 back ticks at the start of your code block, choose the language you're about to enter (c++, js, css etc) and add the option of `{numberLines: true}` to show line numbers. Optionally, you can also give a starting line number if you don't want it to begin at line 1 by doing this: `{numberLines: 13}`.

If you're interested, I'm using [prism-okadia](https://github.com/ocodia/okaidia-prismjs-theme/blob/master/okaidia.css) for this blog. You can find more prism themes [here](https://github.com/PrismJS/prism-themes/tree/master/themes).

Happy coding!