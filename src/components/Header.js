import React, { Component } from "react";
import { Link } from "gatsby";
import config from '../../data/SiteConfig';
import Categories from './Categories'
import styles from './Header.module.scss'

const Header = () => (
  <header>
    <h1>
      <Link to="/about">About Me</Link>
    </h1>
    <nav>
      <ul className={styles.mainNav}>
        <li>
          <Link to="/" activeClassName={styles.activeNav}>All Posts</Link>
        </li>
        <Categories activeClassName={styles.activeNav} />
      </ul>
    </nav>
  </header>
  );

export default Header