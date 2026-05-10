import React, { useState } from "react";
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
  const [stats] = useState({
    shipments: 4,
    ports: 3,
    cargo: 4,
    trades: 4,
  });

  const [activeTab, setActiveTab] = useState("shipments");
  const [chartFilter, setChartFilter] = useState("all");

  const shipmentData = [
    {
      Shipment_ID: 1001,
      Year: 2024,
      Departure_Date: "2024-01-05",
      Arrival_Date: "2024-01-20",
      Transit_Days: 15,
      Trade_Direction: "Import",
    },
    {
      Shipment_ID: 1002,
      Year: 2024,
      Departure_Date: "2024-02-10",
      Arrival_Date: "2024-02-25",
      Transit_Days: 15,
      Trade_Direction: "Export",
    },
    {
      Shipment_ID: 1003,
      Year: 2024,
      Departure_Date: "2024-03-01",
      Arrival_Date: "2024-03-18",
      Transit_Days: 17,
      Trade_Direction: "Import",
    },
    {
      Shipment_ID: 1004,
      Year: 2024,
      Departure_Date: "2024-03-15",
      Arrival_Date: "2024-03-30",
      Transit_Days: 15,
      Trade_Direction: "Export",
    },
    {
      Shipment_ID: 1005,
      Year: 2024,
      Departure_Date: "2024-04-02",
      Arrival_Date: "2024-04-18",
      Transit_Days: 16,
      Trade_Direction: "Import",
    },
    {
      Shipment_ID: 1006,
      Year: 2024,
      Departure_Date: "2024-05-08",
      Arrival_Date: "2024-05-22",
      Transit_Days: 14,
      Trade_Direction: "Export",
    },
    {
      Shipment_ID: 1007,
      Year: 2024,
      Departure_Date: "2024-06-12",
      Arrival_Date: "2024-06-28",
      Transit_Days: 16,
      Trade_Direction: "Import",
    },
    {
      Shipment_ID: 1008,
      Year: 2024,
      Departure_Date: "2024-07-01",
      Arrival_Date: "2024-07-15",
      Transit_Days: 14,
      Trade_Direction: "Export",
    },
  ];

  const portsData = [
    {
      Port_ID: 301,
      Port_Name: "Shanghai Port",
      Country: "China",
      Port_Type: "Seaport",
      Location: "Shanghai",
    },
    {
      Port_ID: 302,
      Port_Name: "Singapore Port",
      Country: "Singapore",
      Port_Type: "Seaport",
      Location: "Singapore",
    },
    {
      Port_ID: 303,
      Port_Name: "Karachi Port",
      Country: "Pakistan",
      Port_Type: "Seaport",
      Location: "Karachi",
    },
    {
      Port_ID: 304,
      Port_Name: "Dubai Port",
      Country: "UAE",
      Port_Type: "Seaport",
      Location: "Dubai",
    },
    {
      Port_ID: 305,
      Port_Name: "Mumbai Port",
      Country: "India",
      Port_Type: "Seaport",
      Location: "Mumbai",
    },
  ];

  const cargoData = [
    {
      Cargo_ID: 201,
      Cargo_Type: "Container Cargo",
      Trade_Category: "Electronics",
      Description: "Smartphones and Laptops",
      Hazard_Level: "Low",
    },
    {
      Cargo_ID: 202,
      Cargo_Type: "Liquid Cargo",
      Trade_Category: "Oil & Gas",
      Description: "Crude Petroleum Products",
      Hazard_Level: "High",
    },
    {
      Cargo_ID: 203,
      Cargo_Type: "Dry Cargo",
      Trade_Category: "Food",
      Description: "Rice and Grains",
      Hazard_Level: "Low",
    },
    {
      Cargo_ID: 204,
      Cargo_Type: "Hazardous Cargo",
      Trade_Category: "Chemicals",
      Description: "Industrial Chemicals",
      Hazard_Level: "High",
    },
    {
      Cargo_ID: 205,
      Cargo_Type: "Refrigerated",
      Trade_Category: "Pharma",
      Description: "Medical Supplies",
      Hazard_Level: "Medium",
    },
    {
      Cargo_ID: 206,
      Cargo_Type: "Bulk Cargo",
      Trade_Category: "Textiles",
      Description: "Cotton and Fabrics",
      Hazard_Level: "Low",
    },
  ];

  const tradesData = [
    {
      Trade_ID: 501,
      Shipment_ID: 1001,
      Cargo_Type: "Container Cargo",
      Loading_Port: "Shanghai Port",
      Discharge_Port: "Karachi Port",
    },
    {
      Trade_ID: 502,
      Shipment_ID: 1002,
      Cargo_Type: "Liquid Cargo",
      Loading_Port: "Singapore Port",
      Discharge_Port: "Karachi Port",
    },
    {
      Trade_ID: 503,
      Shipment_ID: 1003,
      Cargo_Type: "Dry Cargo",
      Loading_Port: "Shanghai Port",
      Discharge_Port: "Singapore Port",
    },
    {
      Trade_ID: 504,
      Shipment_ID: 1004,
      Cargo_Type: "Hazardous Cargo",
      Loading_Port: "Singapore Port",
      Discharge_Port: "Karachi Port",
    },
    {
      Trade_ID: 505,
      Shipment_ID: 1005,
      Cargo_Type: "Refrigerated",
      Loading_Port: "Dubai Port",
      Discharge_Port: "Mumbai Port",
    },
    {
      Trade_ID: 506,
      Shipment_ID: 1006,
      Cargo_Type: "Bulk Cargo",
      Loading_Port: "Mumbai Port",
      Discharge_Port: "Dubai Port",
    },
    {
      Trade_ID: 507,
      Shipment_ID: 1007,
      Cargo_Type: "Container Cargo",
      Loading_Port: "Shanghai Port",
      Discharge_Port: "Singapore Port",
    },
    {
      Trade_ID: 508,
      Shipment_ID: 1008,
      Cargo_Type: "Liquid Cargo",
      Loading_Port: "Karachi Port",
      Discharge_Port: "Dubai Port",
    },
  ];

  const chartDataMap = {
    shipments: [
      { label: "Jan", value: 1 },
      { label: "Feb", value: 1 },
      { label: "Mar", value: 2 },
      { label: "Apr", value: 1 },
      { label: "May", value: 1 },
      { label: "Jun", value: 1 },
      { label: "Jul", value: 1 },
    ],
    ports: [
      { label: "Jan", value: 2 },
      { label: "Feb", value: 3 },
      { label: "Mar", value: 3 },
      { label: "Apr", value: 4 },
      { label: "May", value: 5 },
      { label: "Jun", value: 5 },
      { label: "Jul", value: 5 },
    ],
    cargo: [
      { label: "Jan", value: 120 },
      { label: "Feb", value: 150 },
      { label: "Mar", value: 180 },
      { label: "Apr", value: 210 },
      { label: "May", value: 240 },
      { label: "Jun", value: 280 },
      { label: "Jul", value: 320 },
    ],
    trades: [
      { label: "Jan", value: 8 },
      { label: "Feb", value: 12 },
      { label: "Mar", value: 15 },
      { label: "Apr", value: 18 },
      { label: "May", value: 22 },
      { label: "Jun", value: 25 },
      { label: "Jul", value: 30 },
    ],
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
            color: "primary",
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
