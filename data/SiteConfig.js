

const config = {
  siteTitle: "Iqbal Khan", // Site title.
  siteTitleShort: "Iqbal Khan blog", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Iqbal Khan Gatsby blog", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://gatsby-markdown-blog-starter.netlify.com", // Domain of your website without pathPrefix.
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "Iqbal Khan - My personal blog", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "1825356251115265", // FB Application ID for using app insights
  googleAnalyticsID: "UA-143381023-1", // GA tracking ID.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "MM/DD/YYYY", // Date format for display.
  userName: "Iqbal Khan", // Username to display in the author segment.
  userEmail: "iqbalyarkhan@hotmail.com", // Email used for RSS feed's author segment
  userTwitter: "iqbalyarkhan", // Optionally renders "Follow Me" in the Bio segment.
  userGitHub: "iqbalyarkhan", // Optionally renders "Follow Me" in the Bio segment.
  userLocation: "Dallas, TX", // User location to display in the author segment.
  userAvatar: "https://i.ibb.co/WPz9CNk/avatar.jpg", // User avatar to display in the author segment.
  userDescription:
    "SWE with a passion for swimming, running and competitive programming", // User description to display in the author segment.
  copyright: "Copyright © 2020. All rights reserved.", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "red" // Used for setting manifest background color.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

module.exports = config;
