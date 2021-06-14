import React, { useState, createContext } from "react";
import Helmet from "react-helmet";
import { Interpolator } from "react-apply-darkmode";
import Footer from "../components/Footer";
import Header from "../components/Header";
import config from "../../data/SiteConfig";
import styles from "./index.module.scss";

import { myContext } from "../components/Provider";

export const UserStateContext = createContext(null);

const MainLayout = ({ children }) => {
  return (
    <myContext.Consumer>
      {context => (
        <React.Fragment>
          <Interpolator appearance={context.isActive ? "dark" : "light"}>
            <Header />
            <Helmet>
              <meta name="description" content={config.siteDescription} />
            </Helmet>
            {children}
            <Footer />
          </Interpolator>
        </React.Fragment>
      )}
    </myContext.Consumer>
  );
};

export default MainLayout;
