import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Fleur Necessities"}>
      <h1> About Page </h1>
    </Layout>
  );
};

Layout.defaultProps = {
  title: "Fleur Necessities - shop now",
  description: "Jewelry and More",
  keywords: "jewelry,rings,shop,montenegro",
  author: "fleurnecessities",
};

export default About;
