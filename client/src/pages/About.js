import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Fleur Necessities"}>
      <div className="about-container">
        <h1 className="about-heading">About Fleur Necessities</h1>

        <div className="about-content">
          <img
            src="/images/about1.jpg"
            alt="Fleur Necessities"
            className="about-image"
          />

          <p className="about-text">
            Welcome to Fleur Necessities, your online destination for
            exquisitely crafted jewelry. Our passion is to bring elegance and
            style to every moment, offering a curated collection that celebrates
            individuality and self-expression.
          </p>

          <p className="about-text">
            At Fleur Necessities, we believe that jewelry is more than just an
            accessory; it's a reflection of your unique personality. Our
            collection features timeless pieces in a variety of styles,
            carefully designed to complement your distinctive taste and enhance
            your everyday elegance.
          </p>

          <img
            src="/images/about2.jpg"
            alt="Jewelry Collection"
            className="about-image"
          />

          <p className="about-text">
            Explore our enchanting world of jewelry, where each piece is
            thoughtfully created with precision and adorned with the finest
            materials. Whether you're looking for a delicate necklace, a
            statement ring, or a pair of earrings that make a statement, Fleur
            Necessities has something for every occasion.
          </p>

          <p className="about-text">
            Thank you for choosing Fleur Necessities to be part of your
            unforgettable moments. Elevate your style, express your
            individuality, and shine with our exquisite jewelry.
          </p>
        </div>
      </div>
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
