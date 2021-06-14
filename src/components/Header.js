import React, { Component } from "react";
import { Link } from "gatsby";
import config from "../../data/SiteConfig";
import Categories from "./Categories";
import styles from "./Header.module.scss";
import { myContext } from "./Provider";
import { ThemeManagerContext } from "gatsby-styled-components-dark-mode"
import { Toggle } from "react-toggle-component"

const Header = () => {

  return (
    <myContext.Consumer>
      {context => (
        <React.Fragment>
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

            <Toggle
                leftBackgroundColor="white"
                rightBackgroundColor="black"
                borderColor="black"
                knobColor="tomato"
                name="toggle-switch"
                onToggle={() => context.changeTheme()}
            />
          </header>
        </React.Fragment>
      )}
    </myContext.Consumer>
  );
};

export default Header;
