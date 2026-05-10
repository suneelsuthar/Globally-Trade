import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isStickyPage = ["/shipments", "/cargo", "/ports", "/about"].includes(
    location.pathname,
  );
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const closeNav = () => setExpanded(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const websiteNavItems = [
    { path: "/", label: "Home" },
    { path: "/shipments", label: "Shipments" },
    { path: "/cargo", label: "Cargo" },
    { path: "/ports", label: "Ports" },
    { path: "/about", label: "About" },
  ];

  const navItems = websiteNavItems;
  const navbarClass = isHome
    ? `navbar-website navbar-scroll ${scrolled ? "scrolled" : ""}`
    : `navbar-website navbar-custom ${isStickyPage ? "sticky-top" : ""} ${!isStickyPage ? "mb-4" : ""}`;

  return (
    <Navbar
      expand="lg"
      className={navbarClass}
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
          <strong> Global Trade</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-right">
            {navItems.map((item) => (
              <Nav.Link
                key={item.path}
                as={Link}
                to={item.path}
                className={`nav-link-custom ${location.pathname === item.path ? "active" : ""}`}
                onClick={closeNav}
              >
                {item.label}
              </Nav.Link>
            ))}
            <Button
              as={Link}
              to="/dashboard"
              variant="outline-light"
              size="sm"
              className="ms-3 stats-btn"
              onClick={closeNav}
            >
              Statistics
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
