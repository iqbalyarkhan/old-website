import React from 'react'
import config from "../../data/SiteConfig";

const About = () => (
  <>
      <h1 align="center">
          {config.siteTitle}
      </h1>
    <p align="center">
        I am a MS student in Computer Science at Georgia Tech with a concentration in machine learning. I also completed my undergraduate majoring in Computer Science.<br></br>

        I had the pleasure of interning at <a href="https://www.hitachiconsulting.co.jp/english/">Hitachi Consulting</a> and <a href="https://www.credit-suisse.com/us/en.html">Credit Suisse Bank</a> and I'm currently working as a Senior Associate Software engineer at <a href="https://www.capitalone.com/">Capital One Bank</a>.<br></br>

    I've given talks at <a href="https://www.meetup.com/DFW-Data-Engineering-Meetup/events/255952404/">DFW Data engineering meetup</a> on Kafka and at <a href="https://hacksmu.org/">Hack SMU</a> where I spoke about building Rest APIs using Golang.
    </p>
  </>
);

export default About
