(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{Mdw5:function(e,t,a){"use strict";a.r(t),a.d(t,"pageQuery",(function(){return d}));var n=a("q1tI"),r=a.n(n),l=a("TJpk"),c=a.n(l),o=a("83Zx"),i=a("lPsB"),m=a("IpnI"),s=a.n(m);t.default=function(e){var t=e.data,a=e.pageContext;return r.a.createElement(o.a,null,r.a.createElement("main",null,r.a.createElement(c.a,{title:' "'+a.category+'" - '+s.a.siteTitle}),r.a.createElement("h1",null,"Category: ",a.category),r.a.createElement(i.a,{postEdges:t.allMarkdownRemark.edges})))};var d="675783074"},lPsB:function(e,t,a){"use strict";var n=a("q1tI"),r=a.n(n),l=a("Wbzz"),c=a("LZFG"),o=a.n(c);t.a=function(e){var t=e.postEdges,a=function(){var e=[];return t.forEach((function(t){e.push({path:t.node.fields.slug,tags:t.node.frontmatter.tags,categories:t.node.frontmatter.categories,extract:t.node.frontmatter.extract,thumbnail:t.node.frontmatter.thumbnail,cover:t.node.frontmatter.cover,title:t.node.frontmatter.title,date:t.node.fields.date,excerpt:t.node.excerpt,timeToRead:t.node.timeToRead})})),e}();return r.a.createElement("div",{className:o.a.articleList},a.map((function(e){return r.a.createElement(l.Link,{to:e.path,key:e.title},r.a.createElement("article",{className:o.a.articleBox},r.a.createElement("div",{className:o.a.right},r.a.createElement("img",{src:e.thumbnail}),r.a.createElement("h2",null,e.title),r.a.createElement("div",{className:o.a.meta},e.date,"  — ",r.a.createElement("span",null,e.categories.join(" / ")),"  — ",e.timeToRead," Min Read "),r.a.createElement("p",null,e.extract))))})))}}}]);
//# sourceMappingURL=component---src-templates-category-js-5aef66e58578c64d36fe.js.map