import React from "react";
import Layout from "../components/Layout/Layout";

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
      <div className="contact-container">
        <h1 className="contact-heading">Contact Us</h1>

        <div className="contact-info">
          <img
            src="/images/contactphoto.jpg"
            alt="ContactImage"
            className="contact-image"
          />

          <p>
            For any inquiries, please feel free to reach out to us via email or
            phone:
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <img
                src="/images/email-icon.png"
                alt="Email Icon"
                className="contact-icon"
              />
              <p className="contact-text">info@fleurnecessities.com</p>
            </div>

            <div className="contact-item">
              <img
                src="/images/phone-icon.png"
                alt="Phone Icon"
                className="contact-icon"
              />
              <p className="contact-text">+1 (123) 456-7890</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
