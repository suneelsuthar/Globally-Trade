import React, { useState, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import { FiSearch } from "react-icons/fi";
import { FiPackage, FiMapPin, FiBox, FiActivity } from "react-icons/fi";

function Home() {
  const [direction, setDirection] = useState(null);
  const [shipmentId, setShipmentId] = useState("");
  const [stats, setStats] = useState({
    shipments: 0,
    ports: 0,
    cargo: 0,
    trades: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [shipmentsRes, portsRes, cargoRes, tradesRes] = await Promise.all(
          [
            fetch("http://localhost:5000/api/shipments"),
            fetch("http://localhost:5000/api/ports/loading"),
            fetch("http://localhost:5000/api/cargo"),
            fetch("http://localhost:5000/api/trades"),
          ],
        );

        const shipments = await shipmentsRes.json();
        const ports = await portsRes.json();
        const cargo = await cargoRes.json();
        const trades = await tradesRes.json();

        setStats({
          shipments: shipments.length,
          ports: ports.length,
          cargo: cargo.length,
          trades: trades.length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const directionOptions = [
    { value: "Import", label: "📥 Import" },
    { value: "Export", label: "📤 Export" },
  ];

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (direction) params.append("direction", direction.value);
    if (shipmentId) params.append("shipment_id", shipmentId);
    navigate(`/shipments?${params.toString()}`);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "0",
      border: "2px solid #e9ecef",
      borderLeft: "none",
      borderRight: "none",
      minHeight: "48px",
      height: "48px",
      fontSize: "1rem",
      boxShadow: "none",
      backgroundColor: "white",
      "&:hover": {
        borderColor: "#e9ecef",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "1rem",
      padding: "12px 16px",
      textAlign: "left",
      justifyContent: "flex-start",
      backgroundColor: state.isSelected ? "#2095AE" : "white",
      color: state.isSelected ? "white" : "#333",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: state.isSelected ? "#2095AE" : "#f0f0f0",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: "1rem",
      color: "#333",
      textAlign: "left",
      width: "100%",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "1rem",
      color: "#6c757d",
      textAlign: "left",
      width: "100%",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "8px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
      border: "1px solid #e9ecef",
      zIndex: 9999,
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "4px",
      borderRadius: "8px",
      maxHeight: "200px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#6c757d",
      padding: "8px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: "#6c757d",
      padding: "8px",
    }),
  };

  return (
    <div className="landing-page">
      <div className="hero-section">
        <div className="hero-overlay"></div>
        <Container className="hero-content">
          <h1 className="hero-title">Welcome to Global Trade</h1>
          <p className="hero-subtitle">
            We've been helping businesses ship cargo across the world for years.
            <br />
            Let us help you find what you're looking for.
          </p>

          <div className="hero-filter">
            <Form onSubmit={handleFilterSubmit}>
              <div className="filter-group">
                <Form.Control
                  type="search"
                  placeholder="Shipment ID"
                  value={shipmentId}
                  onChange={(e) => setShipmentId(e.target.value)}
                  className="filter-input-first"
                />
                <Select
                  value={direction}
                  onChange={setDirection}
                  options={directionOptions}
                  placeholder="Trade Direction"
                  isClearable
                  styles={customStyles}
                  className="filter-select-react"
                />
                <Button
                  type="submit"
                  variant="primary"
                  className="filter-button"
                >
                  <FiSearch size={20} />
                </Button>
              </div>
            </Form>
          </div>
        </Container>
      </div>

      <div className="stats-section py-5">
        <Container>
          <div className="row">
            <div className="col-md-3 mb-4">
              <div
                className="stat-card clickable"
                onClick={() => navigate("/shipments")}
              >
                <div className="stat-icon stat-icon-shipments">
                  <FiPackage size={32} />
                </div>
                <div className="stat-content">
                  <h3 className="stat-number">{stats.shipments}</h3>
                  <p className="stat-label">Active Shipments</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div
                className="stat-card clickable"
                onClick={() => navigate("/ports")}
              >
                <div className="stat-icon stat-icon-ports">
                  <FiMapPin size={32} />
                </div>
                <div className="stat-content">
                  <h3 className="stat-number">{stats.ports}</h3>
                  <p className="stat-label">Ports Worldwide</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div
                className="stat-card clickable"
                onClick={() => navigate("/cargo")}
              >
                <div className="stat-icon stat-icon-cargo">
                  <FiBox size={32} />
                </div>
                <div className="stat-content">
                  <h3 className="stat-number">{stats.cargo}</h3>
                  <p className="stat-label">Cargo Types</p>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div
                className="stat-card clickable"
                onClick={() => navigate("/dashboard")}
              >
                <div className="stat-icon stat-icon-trades">
                  <FiActivity size={32} />
                </div>
                <div className="stat-content">
                  <h3 className="stat-number">{stats.trades}</h3>
                  <p className="stat-label">Trade Records</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="features-section py-5">
        <Container>
          <div className="section-header text-center mb-5">
            <h6 className="section-subtitle">OUR SERVICES</h6>
            <h2 className="section-title">What We Do</h2>
            <p className="section-description">
              Comprehensive cargo management solutions for businesses worldwide
            </p>
          </div>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="feature-card-modern">
                <div className="feature-icon-box feature-icon-ship">
                  <FiPackage size={40} />
                </div>
                <h4 className="feature-title">Ship Your Cargo</h4>
                <p className="feature-description">
                  We make it easy to manage your shipments with our simple
                  tracking system and streamlined processes.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card-modern">
                <div className="feature-icon-box feature-icon-track">
                  <FiMapPin size={40} />
                </div>
                <h4 className="feature-title">Track Live</h4>
                <p className="feature-description">
                  Know exactly where your cargo is at any time with real-time
                  updates and location tracking.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="feature-card-modern">
                <div className="feature-icon-box feature-icon-global">
                  <FiBox size={40} />
                </div>
                <h4 className="feature-title">Global Reach</h4>
                <p className="feature-description">
                  Our network spans across major ports in multiple countries,
                  ensuring worldwide coverage.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="cta-section py-5">
        <Container className="text-center">
          <h2 className="mb-4">Ready to Get Started?</h2>
          <p className="lead mb-4">
            We're here to help with your shipping needs. Let's work together.
          </p>
          <Button as={Link} to="/shipments" variant="primary" size="lg">
            View All Shipments
          </Button>
        </Container>
      </div>
    </div>
  );
}

export default Home;
