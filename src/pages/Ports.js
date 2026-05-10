import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Row,
  Col,
  Tab,
  Tabs,
  Modal,
  Form,
} from "react-bootstrap";
import { FiAnchor, FiMapPin, FiGlobe } from "react-icons/fi";

function Branches() {
  const [activeTab, setActiveTab] = useState("loading");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedPort, setSelectedPort] = useState(null);

  const [formData, setFormData] = useState({
    Port_ID: "",
    Port_Name: "",
    Country: "",
    Port_Type: "Seaport",
    Location: "",
  });

  const [errors, setErrors] = useState({});

  // Dummy data matching LoadingPort_3NF and DischargePort_3NF schema from app.py
  const [loadingPorts, setLoadingPorts] = useState([
    {
      Loading_Port_ID: 301,
      Port_Name: "Shanghai Port",
      Country: "China",
      Port_Type: "Seaport",
      Location: "Shanghai",
    },
    {
      Loading_Port_ID: 302,
      Port_Name: "Karachi Port",
      Country: "Pakistan",
      Port_Type: "Seaport",
      Location: "Karachi",
    },
    {
      Loading_Port_ID: 303,
      Port_Name: "Singapore Port",
      Country: "Singapore",
      Port_Type: "Seaport",
      Location: "Singapore",
    },
  ]);

  const [dischargePorts, setDischargePorts] = useState([
    {
      Discharge_Port_ID: 401,
      Port_Name: "Karachi Port",
      Country: "Pakistan",
      Port_Type: "Seaport",
      Location: "Karachi",
    },
    {
      Discharge_Port_ID: 402,
      Port_Name: "Dubai Port",
      Country: "UAE",
      Port_Type: "Seaport",
      Location: "Dubai",
    },
    {
      Discharge_Port_ID: 403,
      Port_Name: "Jeddah Port",
      Country: "Saudi Arabia",
      Port_Type: "Seaport",
      Location: "Jeddah",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.Port_Name.trim()) {
      newErrors.Port_Name = "Port name is required";
    }
    if (!formData.Country.trim()) {
      newErrors.Country = "Country is required";
    }
    if (!formData.Port_Type) {
      newErrors.Port_Type = "Port type is required";
    }
    if (!formData.Location.trim()) {
      newErrors.Location = "Location is required";
    }
    return newErrors;
  };

  const openAdd = () => {
    setFormData({
      Port_ID: "",
      Port_Name: "",
      Country: "",
      Port_Type: "Seaport",
      Location: "",
    });
    setErrors({});
    setShowAdd(true);
  };

  const handleAdd = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    const newPort = {
      ...formData,
      Port_ID:
        parseInt(formData.Port_ID) ||
        (activeTab === "loading" ? 300 : 400) +
          (activeTab === "loading"
            ? loadingPorts.length
            : dischargePorts.length) +
          1,
    };
    if (activeTab === "loading") {
      setLoadingPorts([
        ...loadingPorts,
        { ...newPort, Loading_Port_ID: newPort.Port_ID },
      ]);
    } else {
      setDischargePorts([
        ...dischargePorts,
        { ...newPort, Discharge_Port_ID: newPort.Port_ID },
      ]);
    }
    setShowAdd(false);
  };

  const openEdit = (port) => {
    setSelectedPort(port);
    setFormData({
      Port_ID: port.Loading_Port_ID || port.Discharge_Port_ID,
      Port_Name: port.Port_Name,
      Country: port.Country,
      Port_Type: port.Port_Type,
      Location: port.Location,
    });
    setErrors({});
    setShowEdit(true);
  };

  const handleEdit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    if (activeTab === "loading") {
      setLoadingPorts(
        loadingPorts.map((p) =>
          p.Loading_Port_ID === selectedPort.Loading_Port_ID
            ? { ...p, ...formData, Loading_Port_ID: parseInt(formData.Port_ID) }
            : p,
        ),
      );
    } else {
      setDischargePorts(
        dischargePorts.map((p) =>
          p.Discharge_Port_ID === selectedPort.Discharge_Port_ID
            ? {
                ...p,
                ...formData,
                Discharge_Port_ID: parseInt(formData.Port_ID),
              }
            : p,
        ),
      );
    }
    setShowEdit(false);
  };

  const openDelete = (port) => {
    setSelectedPort(port);
    setShowDelete(true);
  };

  const handleDelete = () => {
    if (activeTab === "loading") {
      setLoadingPorts(
        loadingPorts.filter(
          (p) => p.Loading_Port_ID !== selectedPort.Loading_Port_ID,
        ),
      );
    } else {
      setDischargePorts(
        dischargePorts.filter(
          (p) => p.Discharge_Port_ID !== selectedPort.Discharge_Port_ID,
        ),
      );
    }
    setShowDelete(false);
  };

  const totalPorts = loadingPorts.length + dischargePorts.length;
  const countries = [
    ...new Set([
      ...loadingPorts.map((p) => p.Country),
      ...dischargePorts.map((p) => p.Country),
    ]),
  ].length;

  return (
    <div className="page-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-theme-primary">Ports</h2>
        <Button variant="primary" onClick={openAdd}>
          + Add Port
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <div className="simple-tile">
            <div className="simple-tile-icon">
              <FiAnchor size={24} />
            </div>
            <div className="simple-tile-content">
              <h3>{totalPorts}</h3>
              <p>Total Ports</p>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="simple-tile">
            <div className="simple-tile-icon secondary">
              <FiMapPin size={24} />
            </div>
            <div className="simple-tile-content">
              <h3>{loadingPorts.length}</h3>
              <p>Loading Ports</p>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="simple-tile">
            <div className="simple-tile-icon secondary">
              <FiGlobe size={24} />
            </div>
            <div className="simple-tile-content">
              <h3>{countries}</h3>
              <p>Countries</p>
            </div>
          </div>
        </Col>
      </Row>

      <Tabs
        defaultActiveKey="loading"
        className="simple-tabs mb-4"
        onSelect={(k) => setActiveTab(k)}
      >
        <Tab eventKey="loading" title="Loading Ports">
          <Card className="simple-table-card">
            <Card.Body>
              <h5 className="table-title">Loading Ports</h5>
              <Table responsive className="simple-table">
                <thead>
                  <tr>
                    <th>Port ID</th>
                    <th>Port Name</th>
                    <th>Country</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingPorts.map((port) => (
                    <tr key={port.Loading_Port_ID}>
                      <td>{port.Loading_Port_ID}</td>
                      <td>{port.Port_Name}</td>
                      <td>{port.Country}</td>
                      <td>{port.Port_Type}</td>
                      <td>{port.Location}</td>
                      <td>
                        <Button
                          size="sm"
                          className="me-2 action-btn"
                          variant="outline-primary"
                          onClick={() => openEdit(port)}
                        >
                          Edit
                        </Button>
                        {/* <Button variant="primary" size="sm" onClick={handleEdit}>
            Save Changes
          </Button> */}
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="action-btn"
                          onClick={() => openDelete(port)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="discharge" title="Discharge Ports">
          <Card className="simple-table-card">
            <Card.Body>
              <h5 className="table-title">Discharge Ports</h5>
              <Table responsive className="simple-table">
                <thead>
                  <tr>
                    <th>Port ID</th>
                    <th>Port Name</th>
                    <th>Country</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dischargePorts.map((port) => (
                    <tr key={port.Discharge_Port_ID}>
                      <td>{port.Discharge_Port_ID}</td>
                      <td>{port.Port_Name}</td>
                      <td>{port.Country}</td>
                      <td>{port.Port_Type}</td>
                      <td>{port.Location}</td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2 action-btn"
                          onClick={() => openEdit(port)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="action-btn"
                          onClick={() => openDelete(port)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      {/* Add Modal */}
      <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
        <Modal.Header closeButton className="modal-header-theme">
          <Modal.Title>
            Add New {activeTab === "loading" ? "Loading" : "Discharge"} Port
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
           
            <Form.Group className="mb-3">
              <Form.Label>Port Name</Form.Label>
              <Form.Control
                type="text"
                name="Port_Name"
                value={formData.Port_Name}
                onChange={handleInputChange}
                placeholder="e.g. Shanghai Port"
                isInvalid={!!errors.Port_Name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Port_Name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="Country"
                value={formData.Country}
                onChange={handleInputChange}
                placeholder="e.g. China"
                isInvalid={!!errors.Country}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Country}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Port Type</Form.Label>
              <Form.Select
                name="Port_Type"
                value={formData.Port_Type}
                onChange={handleInputChange}
                isInvalid={!!errors.Port_Type}
              >
                <option value="Seaport">Seaport</option>
                <option value="Airport">Airport</option>
                <option value="Inland">Inland</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.Port_Type}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="Location"
                value={formData.Location}
                onChange={handleInputChange}
                placeholder="e.g. Shanghai"
                isInvalid={!!errors.Location}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Location}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" size="sm" onClick={() => setShowAdd(false)}>
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleAdd}>
            Add Port
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton className="modal-header-theme">
          <Modal.Title>Edit Port</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
           
            <Form.Group className="mb-3">
              <Form.Label>Port Name</Form.Label>
              <Form.Control
                type="text"
                name="Port_Name"
                value={formData.Port_Name}
                onChange={handleInputChange}
                isInvalid={!!errors.Port_Name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Port_Name}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="Country"
                value={formData.Country}
                onChange={handleInputChange}
                isInvalid={!!errors.Country}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Country}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Port Type</Form.Label>
              <Form.Select
                name="Port_Type"
                value={formData.Port_Type}
                onChange={handleInputChange}
                isInvalid={!!errors.Port_Type}
              >
                <option value="Seaport">Seaport</option>
                <option value="Airport">Airport</option>
                <option value="Inland">Inland</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.Port_Type}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="Location"
                value={formData.Location}
                onChange={handleInputChange}
                isInvalid={!!errors.Location}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Location}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowEdit(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton className="modal-header-danger">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete port{" "}
          <strong>
            #{selectedPort?.Loading_Port_ID || selectedPort?.Discharge_Port_ID}
          </strong>{" "}
          - {selectedPort?.Port_Name}? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowDelete(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Branches;
