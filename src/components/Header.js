import React, { Component } from "react";
import { Link } from "gatsby";
import config from '../../data/SiteConfig';
import Categories from './Categories'
import * as styles from './Header.module.scss'
import ThemeToggle from "../utils/themeToggle";

const Header = () => (
  <header>
    <h1>
      <Link to="/about" >About Me</Link>
    </h1>
    <nav>
      <ul className={styles.mainNav}>
        <li>
          <Link to="/" activeClassName={styles.activeNav}>All Posts</Link>
        </li>
        <Categories activeClassName={styles.activeNav} />
      </ul>
    </nav>
      <ThemeToggle />
  </header>
  );

export default Header