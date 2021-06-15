import React, { Component } from "react";
import { Link } from "gatsby";
import { store } from "@risingstack/react-easy-state";
import config from "../../data/SiteConfig";
import Categories from "./Categories";
import styles from "./Header.module.scss";
import MyComponent from "./ThemeToggler";

const Header = () => (
  <header>
    <h1>
      <Link to="/about">About Me</Link>
    </h1>
    <nav>
      <ul className={styles.mainNav}>
        <li>
          <Link to="/" activeClassName={styles.activeNav}>
            All Posts
          </Link>
        </li>
        <Categories activeClassName={styles.activeNav} />
      </ul>
    </nav>
      <MyComponent/>
  </header>
);

export default Header;
