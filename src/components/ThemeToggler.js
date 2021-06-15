import React from "react";
import { ThemeToggler } from "gatsby-plugin-dark-mode";
import DarkModeToggle from "react-dark-mode-toggle";
import appStore from "../utils/appStore";

class MyComponent extends React.Component {
  render() {
    return (
      <ThemeToggler>
        {({ theme, toggleTheme }) => (
          <DarkModeToggle
            onChange={e => {toggleTheme(e ? "dark" : "light"); appStore.switchTheme()}}
            checked={theme === "dark"}
            size={80}
            speed={2}
          />
        )}
      </ThemeToggler>
    );
  }
}

export default MyComponent;
