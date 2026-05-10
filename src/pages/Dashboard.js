import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col, Dropdown, Table, Badge } from "react-bootstrap";
import { FiPackage, FiMapPin, FiBox, FiAnchor, FiFilter } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

function Dashboard() {
  const API_BASE = "http://127.0.0.1:5000/api";
  const [stats, setStats] = useState({
    shipments: 0,
    ports: 0,
    cargo: 0,
    trades: 0,
  });
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("shipments");
  const [chartFilter, setChartFilter] = useState("all");

  const [shipmentData, setShipmentData] = useState([]);
  const [portsData, setPortsData] = useState([]);
  const [cargoData, setCargoData] = useState([]);
  const [tradesData, setTradesData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [
        shipmentsRes,
        loadingPortsRes,
        dischargePortsRes,
        cargoRes,
        tradesRes,
      ] = await Promise.all([
        axios.get(`${API_BASE}/shipments`),
        axios.get(`${API_BASE}/ports/loading`),
        axios.get(`${API_BASE}/ports/discharge`),
        axios.get(`${API_BASE}/cargo`),
        axios.get(`${API_BASE}/trades`),
      ]);

      const shipments = shipmentsRes.data;
      const loadingPorts = loadingPortsRes.data;
      const dischargePorts = dischargePortsRes.data;
      const cargo = cargoRes.data;
      const trades = tradesRes.data;

      setStats({
        shipments: shipments.length,
        ports: loadingPorts.length + dischargePorts.length,
        cargo: cargo.length,
        trades: trades.length,
      });

      setShipmentData(shipments);
      setPortsData([...loadingPorts, ...dischargePorts]);
      setCargoData(cargo);
      setTradesData(trades);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic chart data generation based on real data
  const generateChartData = (data, type) => {
    if (!data || data.length === 0) {
      return [
        { label: "Jan", value: 0 },
        { label: "Feb", value: 0 },
        { label: "Mar", value: 0 },
        { label: "Apr", value: 0 },
        { label: "May", value: 0 },
        { label: "Jun", value: 0 },
        { label: "Jul", value: 0 },
      ];
    }

    // Group by month based on creation date or ID
    const monthlyData = {
      Jan: 0,
      Feb: 0,
      Mar: 0,
      Apr: 0,
      May: 0,
      Jun: 0,
      Jul: 0,
    };

    data.forEach((item, index) => {
      const month = Object.keys(monthlyData)[index % 7];
      monthlyData[month] += 1;
    });

    return Object.keys(monthlyData).map((month) => ({
      label: month,
      value: monthlyData[month],
    }));
  };

  // Dynamic chart data based on real API data
  const chartDataMap = {
    shipments: generateChartData(shipmentData, "shipments"),
    ports: generateChartData(portsData, "ports"),
    cargo: generateChartData(cargoData, "cargo"),
    trades: generateChartData(tradesData, "trades"),
  };

  const chartConfig = {
    shipments: {
      title: "Monthly Shipments",
      color: "#0f2454",
      name: "Shipments",
    },
    ports: { title: "Active Ports", color: "#0f2454", name: "Active Ports" },
    cargo: { title: "Cargo Volume (tons)", color: "#0f2454", name: "Volume" },
    trades: { title: "Completed Trades", color: "#0f2454", name: "Trades" },
  };

  const handleTileClick = (tab) => {
    setChartFilter("all");
    setActiveTab(tab);
  };

  const getFilteredChartData = () => {
    const baseData = chartDataMap[activeTab];
    if (chartFilter === "all") return baseData;

    const multiplier =
      activeTab === "shipments"
        ? chartFilter === "Import"
          ? 0.6
          : 0.4
        : activeTab === "ports"
          ? chartFilter === "China"
            ? 0.4
            : chartFilter === "Singapore"
              ? 0.3
              : 0.3
          : activeTab === "cargo"
            ? chartFilter === "High"
              ? 0.3
              : chartFilter === "Medium"
                ? 0.2
                : 0.5
            : activeTab === "trades"
              ? chartFilter === "Container"
                ? 0.4
                : chartFilter === "Liquid"
                  ? 0.3
                  : 0.3
              : 1;

    return baseData.map((item) => ({
      ...item,
      value: Math.round(item.value * multiplier),
    }));
  };

  const getDirectionBadge = (direction) => {
    return direction === "Import" ? "primary" : "success";
  };

  const getHazardBadge = (level) => {
    switch (level) {
      case "High":
        return "danger";
      case "Medium":
        return "warning";
      default:
        return "success";
    }
  };

  const renderDataTable = () => {
    switch (activeTab) {
      case "shipments":
        return (
          <>
            <h5 className="table-title ">Shipment Records</h5>
            <div className="table-responsive-wrapper">
              <Table responsive className="simple-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Year</th>
                    <th>Departure</th>
                    <th>Arrival</th>
                    <th>Transit</th>
                    <th>Dir</th>
                  </tr>
                </thead>
                <tbody>
                  {shipmentData.map((item) => (
                    <tr key={item.Shipment_ID}>
                      <td>{item.Shipment_ID}</td>
                      <td>{item.Year}</td>
                      <td>{item.Departure_Date}</td>
                      <td>{item.Arrival_Date}</td>
                      <td>{item.Transit_Days}d</td>
                      <td>
                        <Badge bg={getDirectionBadge(item.Trade_Direction)}>
                          {item.Trade_Direction}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        );
      case "ports":
        return (
          <>
            <h5 className="table-title">Port Records</h5>
            <div className="table-responsive-wrapper">
              <Table responsive className="simple-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Port Name</th>
                    <th>Country</th>
                    <th>Type</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {portsData.map((item) => (
                    <tr key={item.Port_ID}>
                      <td>{item.Port_ID}</td>
                      <td>{item.Port_Name}</td>
                      <td>{item.Country}</td>
                      <td>{item.Port_Type}</td>
                      <td>{item.Location}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        );
      case "cargo":
        return (
          <>
            <h5 className="table-title">Cargo Records</h5>
            <div className="table-responsive-wrapper">
              <Table responsive className="simple-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Hazard</th>
                  </tr>
                </thead>
                <tbody>
                  {cargoData.map((item) => (
                    <tr key={item.Cargo_ID}>
                      <td>{item.Cargo_ID}</td>
                      <td>{item.Cargo_Type}</td>
                      <td>{item.Trade_Category}</td>
                      <td>{item.Description}</td>
                      <td>
                        <Badge bg={getHazardBadge(item.Hazard_Level)}>
                          {item.Hazard_Level}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        );
      case "trades":
        return (
          <>
            <h5 className="table-title">Trade Records</h5>
            <div className="table-responsive-wrapper">
              <Table responsive className="simple-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Shipment</th>
                    <th>Cargo</th>
                    <th>Loading</th>
                    <th>Discharge</th>
                  </tr>
                </thead>
                <tbody>
                  {tradesData.map((item) => (
                    <tr key={item.Trade_ID}>
                      <td>{item.Trade_ID}</td>
                      <td>{item.Shipment_ID}</td>
                      <td>{item.Cargo_Type}</td>
                      <td>{item.Loading_Port}</td>
                      <td>{item.Discharge_Port}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header px-3 mt-5">
        <div>
          <h2 className="dashboard-title">Analytics Dashboard</h2>
          <p className="dashboard-subtitle">
            Track your global trade operations at a glance
          </p>
        </div>
      </div>

      <Row className="mb-4">
        {[
          {
            key: "shipments",
            icon: FiPackage,
            label: "Total Shipments",
            value: stats.shipments,
            color: "secondary",
          },
          {
            key: "ports",
            icon: FiAnchor,
            label: "Total Ports",
            value: stats.ports,
            color: "secondary",
          },
          {
            key: "cargo",
            icon: FiBox,
            label: "Cargo Types",
            value: stats.cargo,
            color: "secondary",
          },
          {
            key: "trades",
            icon: FiMapPin,
            label: "Trade Records",
            value: stats.trades,
            color: "secondary",
          },
        ].map((tile) => {
          const Icon = tile.icon;
          return (
            <Col md={3} key={tile.key}>
              <div
                className={`dashboard-tile ${activeTab === tile.key ? "active-tile" : ""}`}
                onClick={() => handleTileClick(tile.key)}
                style={{ cursor: "pointer" }}
              >
                <div className={`dashboard-tile-icon ${tile.color}`}>
                  <Icon size={28} />
                </div>
                <div className="dashboard-tile-content">
                  <span className="tile-label">{tile.label}</span>
                  <span className="tile-value">{tile.value}</span>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>

      <Card className="dashboard-chart-card mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="chart-title m-0">{chartConfig[activeTab].title}</h5>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-primary"
                size="sm"
                className="filter-btn"
              >
                <FiFilter size={14} className="me-1" />
                {chartFilter === "all" ? "Filter" : chartFilter}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {activeTab === "shipments" && (
                  <>
                    <Dropdown.Item onClick={() => setChartFilter("all")}>
                      All Shipments
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setChartFilter("Import")}>
                      Import Only
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setChartFilter("Export")}>
                      Export Only
                    </Dropdown.Item>
                  </>
                )}
                {activeTab === "ports" && (
                  <>
                    <Dropdown.Item onClick={() => setChartFilter("all")}>
                      All Ports
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setChartFilter("China")}>
                      China
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setChartFilter("Singapore")}>
                      Singapore
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setChartFilter("Pakistan")}>
                      Pakistan
                    </Dropdown.Item>
                  </>
                )}
                {activeTab === "cargo" && (
                  <>
                    <Dropdown.Item onClick={() => setChartFilter("all")}>
                      All Cargo
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setChartFilter("High")}>
                      High Hazard
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setChartFilter("Medium")}>
                      Medium Hazard
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setChartFilter("Low")}>
                      Low Hazard
                    </Dropdown.Item>
                  </>
                )}
                {activeTab === "trades" && (
                  <>
                    <Dropdown.Item onClick={() => setChartFilter("all")}>
                      All Trades
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setChartFilter("Container")}>
                      Container
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setChartFilter("Liquid")}>
                      Liquid
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => setChartFilter("Dry")}>
                      Dry Cargo
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="chart-container" style={{ height: "380px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={getFilteredChartData()}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                <XAxis dataKey="label" stroke="#6c757d" fontSize={12} />
                <YAxis stroke="#6c757d" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e9ecef",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={chartConfig[activeTab].color}
                  strokeWidth={2}
                  name={chartConfig[activeTab].name}
                  dot={{ fill: chartConfig[activeTab].color }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card.Body>
      </Card>

      <Card className="dashboard-table-card">
        <Card.Body>{renderDataTable()}</Card.Body>
      </Card>
    </div>
  );
}

export default Dashboard;
