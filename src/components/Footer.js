import React from "react";
import { Container } from "react-bootstrap";
import { FiPackage, FiMapPin, FiBox, FiActivity } from "react-icons/fi";

function Footer() {
  return (
    <footer className="footer-simple">
      <Container>
        <div className="footer-content">
          <div className="footer-brand">
            <h5>Global Trade</h5>
            <p>Connecting the world through seamless cargo solutions</p>
          </div>

          <div className="footer-stats">
            <div className="footer-stat-item">
              <FiPackage size={20} />
              <span>Shipments</span>
            </div>
            <div className="footer-stat-item">
              <FiMapPin size={20} />
              <span>Ports</span>
            </div>
            <div className="footer-stat-item">
              <FiBox size={20} />
              <span>Cargo</span>
            </div>
            <div className="footer-stat-item">
              <FiActivity size={20} />
              <span>Trades</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Global Trade. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
