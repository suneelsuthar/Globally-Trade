import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import aboutBg from "../assets/aboutbg.jpeg";

function About() {
  return (
    <div className="about-page">
      <div
        className="about-hero"
        style={{ backgroundImage: `url(${aboutBg})` }}
      >
        <div className="about-hero-overlay"></div>
        <Container className="about-hero-content">
          <h1 className="about-hero-title">About Us</h1>
          <p className="about-hero-subtitle">Learn more about Global Trade</p>
        </Container>
      </div>

      <Container fluid className="about-content">
        <Row>
          <Col lg={8} className="mx-auto">
            <div className="about-section mb-5">
              <p className="about-text">
                Globally Trade Data is a digital platform focused on
                international Energy and Petroleum trade data. Founded by Narjis
                Fatima, the website provides organized information based on
                actual shipment and customs records related to petroleum
                products, cargo movement, ports, and global energy trade
                activities.
              </p>
              <p className="about-text">
                Our platform helps users explore important trade details such as
                shipment records, loading and discharge ports, transit duration,
                customs clearance time, and yearly petroleum trade activity. All
                data is structured from spreadsheet records into an
                easy-to-understand digital system for better trade monitoring
                and analysis.{" "}
              </p>
              <p className="about-text">
                Globally Trade Data is committed to making energy and petroleum
                trade information simple, accurate, and accessible through a
                modern and user-friendly platform.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default About;
