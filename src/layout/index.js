import React from "react";
import Helmet from "react-helmet";
import { view, store } from "@risingstack/react-easy-state";
import Interpolator from "react-apply-darkmode/interpolator";
import Footer from "../components/Footer";
import Header from "../components/Header";
import config from "../../data/SiteConfig";
import styles from "./index.module.scss";
import appStore from "../utils/appStore";

const MainLayout = view(({ children }) => (
  <Interpolator appearance={appStore.color ? "dark" : "light"}>
    <>
      <Header />
      <Helmet>
        <meta name="description" content={config.siteDescription} />
      </Helmet>
      {children}
      <Footer />
    </>
  </Interpolator>
));

export default MainLayout;
