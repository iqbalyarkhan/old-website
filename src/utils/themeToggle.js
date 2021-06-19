import React from "react";
import { ThemeToggler } from "gatsby-plugin-dark-mode";

export default class ThemeToggle extends React.Component {
  render() {
    return (
      <ThemeToggler>
        {({ theme, toggleTheme }) => {
          if (theme == null) {
            return null;
          }
          return (
            <div className="theme-switch-wrapper">
              <label className="theme-switch">
                <input
                  type="checkbox"
                  onChange={e =>
                    toggleTheme(e.target.checked ? "dark" : "light")
                  }
                  checked={theme === "dark"}
                />
                <div className="slider round"></div>
              </label>
            </div>
          );
        }}
      </ThemeToggler>
    );
  }
}
