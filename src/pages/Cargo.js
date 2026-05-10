import React, { useState } from "react";
import {
  Card,
  Table,
  Button,
  Badge,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import { FiBox, FiAlertCircle, FiCheckCircle } from "react-icons/fi";

function Cargo() {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedCargo, setSelectedCargo] = useState(null);

  const [formData, setFormData] = useState({
    Cargo_ID: "",
    Cargo_Type: "",
    Trade_Category: "",
    Description: "",
    Hazard_Level: "Low",
  });

  const [errors, setErrors] = useState({});

  const [cargoData, setCargoData] = useState([
    {
      Cargo_ID: 201,
      Cargo_Type: "Container Cargo",
      Trade_Category: "Electronics",
      Description: "Electronic Goods",
      Hazard_Level: "Medium",
    },
    {
      Cargo_ID: 202,
      Cargo_Type: "Liquid Cargo",
      Trade_Category: "Oil & Gas",
      Description: "Petroleum Products",
      Hazard_Level: "High",
    },
    {
      Cargo_ID: 203,
      Cargo_Type: "Dry Cargo",
      Trade_Category: "Food",
      Description: "Food Products",
      Hazard_Level: "Low",
    },
    {
      Cargo_ID: 204,
      Cargo_Type: "Hazardous Cargo",
      Trade_Category: "Chemicals",
      Description: "Chemical Materials",
      Hazard_Level: "High",
    },
  ]);

  const getHazardBadge = (level) => {
    switch (level) {
      case "High":
        return <Badge bg="danger">{level}</Badge>;
      case "Medium":
        return <Badge bg="warning">{level}</Badge>;
      case "Low":
        return <Badge bg="success">{level}</Badge>;
      default:
        return <Badge bg="secondary">{level}</Badge>;
    }
  };

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
    if (!formData.Cargo_Type.trim()) {
      newErrors.Cargo_Type = "Cargo type is required";
    }
    if (!formData.Trade_Category.trim()) {
      newErrors.Trade_Category = "Trade category is required";
    }
    if (!formData.Description.trim()) {
      newErrors.Description = "Description is required";
    }
    if (!formData.Hazard_Level) {
      newErrors.Hazard_Level = "Hazard level is required";
    }
    return newErrors;
  };

  const openAdd = () => {
    setFormData({
      Cargo_ID: "",
      Cargo_Type: "",
      Trade_Category: "",
      Description: "",
      Hazard_Level: "Low",
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
    const newCargo = {
      ...formData,
      Cargo_ID: parseInt(formData.Cargo_ID) || 200 + cargoData.length + 1,
    };
    setCargoData([...cargoData, newCargo]);
    setShowAdd(false);
  };

  const openEdit = (cargo) => {
    setSelectedCargo(cargo);
    setFormData({ ...cargo });
    setErrors({});
    setShowEdit(true);
  };

  const handleEdit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setCargoData(
      cargoData.map((c) =>
        c.Cargo_ID === selectedCargo.Cargo_ID ? { ...formData } : c,
      ),
    );
    setShowEdit(false);
  };

  const openDelete = (cargo) => {
    setSelectedCargo(cargo);
    setShowDelete(true);
  };

  const handleDelete = () => {
    setCargoData(
      cargoData.filter((c) => c.Cargo_ID !== selectedCargo.Cargo_ID),
    );
    setShowDelete(false);
  };

  const totalCargo = cargoData.length;
  const highHazard = cargoData.filter((c) => c.Hazard_Level === "High").length;
  const lowHazard = cargoData.filter((c) => c.Hazard_Level === "Low").length;

  return (
    <div className="page-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-theme-primary">Cargo</h2>
        <Button variant="primary" onClick={openAdd}>
          + Add Cargo
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <div className="simple-tile">
            <div className="simple-tile-icon">
              <FiBox size={24} />
            </div>
            <div className="simple-tile-content">
              <h3>{totalCargo}</h3>
              <p>Total Cargo Types</p>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="simple-tile">
            <div className="simple-tile-icon secondary">
              <FiAlertCircle size={24} />
            </div>
            <div className="simple-tile-content">
              <h3>{highHazard}</h3>
              <p>High Hazard</p>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="simple-tile">
            <div className="simple-tile-icon secondary">
              <FiCheckCircle size={24} />
            </div>
            <div className="simple-tile-content">
              <h3>{lowHazard}</h3>
              <p>Low Hazard</p>
            </div>
          </div>
        </Col>
      </Row>

      <Card className="simple-table-card">
        <Card.Body>
          <h5 className="table-title">Cargo Types</h5>

          <Table responsive className="simple-table">
            <thead>
              <tr>
                <th>Cargo ID</th>
                <th>Type</th>
                <th>Category</th>
                <th>Description</th>
                <th>Hazard</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cargoData.map((cargo) => (
                <tr key={cargo.Cargo_ID}>
                  <td>{cargo.Cargo_ID}</td>
                  <td>{cargo.Cargo_Type}</td>
                  <td>{cargo.Trade_Category}</td>
                  <td>{cargo.Description}</td>
                  <td>{getHazardBadge(cargo.Hazard_Level)}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2 action-btn"
                      onClick={() => openEdit(cargo)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="action-btn"
                      onClick={() => openDelete(cargo)}
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
      <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
        <Modal.Header closeButton className="modal-header-theme">
          <Modal.Title>Add New Cargo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Cargo Type</Form.Label>
              <Form.Control
                type="text"
                name="Cargo_Type"
                value={formData.Cargo_Type}
                onChange={handleInputChange}
                placeholder="e.g. Container Cargo"
                isInvalid={!!errors.Cargo_Type}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Cargo_Type}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Trade Category</Form.Label>
              <Form.Control
                type="text"
                name="Trade_Category"
                value={formData.Trade_Category}
                onChange={handleInputChange}
                placeholder="e.g. Electronics"
                isInvalid={!!errors.Trade_Category}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Trade_Category}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="Description"
                value={formData.Description}
                onChange={handleInputChange}
                placeholder="Description of cargo"
                isInvalid={!!errors.Description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hazard Level</Form.Label>
              <Form.Select
                name="Hazard_Level"
                value={formData.Hazard_Level}
                onChange={handleInputChange}
                isInvalid={!!errors.Hazard_Level}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.Hazard_Level}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowAdd(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" size="sm" onClick={handleAdd}>
            Add Cargo
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton className="modal-header-theme">
          <Modal.Title>Edit Cargo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Cargo Type</Form.Label>
              <Form.Control
                type="text"
                name="Cargo_Type"
                value={formData.Cargo_Type}
                onChange={handleInputChange}
                isInvalid={!!errors.Cargo_Type}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Cargo_Type}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Trade Category</Form.Label>
              <Form.Control
                type="text"
                name="Trade_Category"
                value={formData.Trade_Category}
                onChange={handleInputChange}
                isInvalid={!!errors.Trade_Category}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Trade_Category}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="Description"
                value={formData.Description}
                onChange={handleInputChange}
                isInvalid={!!errors.Description}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Description}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hazard Level</Form.Label>
              <Form.Select
                name="Hazard_Level"
                value={formData.Hazard_Level}
                onChange={handleInputChange}
                isInvalid={!!errors.Hazard_Level}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.Hazard_Level}
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
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

      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton className="modal-header-danger">
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete cargo{" "}
          <strong>#{selectedCargo?.Cargo_ID}</strong> -{" "}
          {selectedCargo?.Cargo_Type}? This action cannot be undone.
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

export default Cargo;
