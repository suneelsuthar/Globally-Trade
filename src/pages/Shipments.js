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
import { useSearchParams } from "react-router-dom";
import { FiPackage, FiDownload, FiUpload } from "react-icons/fi";

function Shipments() {
  const [searchParams] = useSearchParams();
  const filterDirection = searchParams.get("direction");
  const filterShipmentId = searchParams.get("shipment_id");

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);

  const [formData, setFormData] = useState({
    Shipment_ID: "",
    Year: 2024,
    Departure_Date: "",
    Arrival_Date: "",
    Transit_Days: "",
    Trade_Direction: "Import",
  });

  const [errors, setErrors] = useState({});

  const [allShipments, setAllShipments] = useState([
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
  ]);

  let shipments = allShipments;
  if (filterDirection) {
    shipments = shipments.filter((s) => s.Trade_Direction === filterDirection);
  }
  if (filterShipmentId) {
    shipments = shipments.filter(
      (s) => s.Shipment_ID.toString() === filterShipmentId,
    );
  }

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
    if (!formData.Year || formData.Year < 1900 || formData.Year > 2100) {
      newErrors.Year = "Year must be between 1900 and 2100";
    }
    if (!formData.Departure_Date) {
      newErrors.Departure_Date = "Departure date is required";
    }
    if (!formData.Arrival_Date) {
      newErrors.Arrival_Date = "Arrival date is required";
    }
    if (
      formData.Departure_Date &&
      formData.Arrival_Date &&
      formData.Arrival_Date < formData.Departure_Date
    ) {
      newErrors.Arrival_Date = "Arrival date must be after departure date";
    }
    if (!formData.Transit_Days || formData.Transit_Days < 1) {
      newErrors.Transit_Days = "Transit days must be at least 1";
    }
    if (!formData.Trade_Direction) {
      newErrors.Trade_Direction = "Trade direction is required";
    }
    return newErrors;
  };

  const openAdd = () => {
    setFormData({
      Shipment_ID: "",
      Year: 2024,
      Departure_Date: "",
      Arrival_Date: "",
      Transit_Days: "",
      Trade_Direction: "Import",
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
    const newShipment = {
      ...formData,
      Shipment_ID:
        parseInt(formData.Shipment_ID) || 1000 + allShipments.length + 1,
      Transit_Days: parseInt(formData.Transit_Days) || 0,
    };
    setAllShipments([...allShipments, newShipment]);
    setShowAdd(false);
  };

  const openEdit = (shipment) => {
    setSelectedShipment(shipment);
    setFormData({ ...shipment });
    setErrors({});
    setShowEdit(true);
  };

  const handleEdit = () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setAllShipments(
      allShipments.map((s) =>
        s.Shipment_ID === selectedShipment.Shipment_ID
          ? { ...formData, Transit_Days: parseInt(formData.Transit_Days) || 0 }
          : s,
      ),
    );
    setShowEdit(false);
  };

  const openDelete = (shipment) => {
    setSelectedShipment(shipment);
    setShowDelete(true);
  };

  const handleDelete = () => {
    setAllShipments(
      allShipments.filter(
        (s) => s.Shipment_ID !== selectedShipment.Shipment_ID,
      ),
    );
    setShowDelete(false);
  };

  const getDirectionBadge = (direction) => {
    switch (direction) {
      case "Import":
        return <Badge bg="info">{direction}</Badge>;
      case "Export":
        return <Badge bg="success">{direction}</Badge>;
      default:
        return <Badge bg="secondary">{direction}</Badge>;
    }
  };

  const totalShipments = shipments.length;
  const imports = shipments.filter(
    (s) => s.Trade_Direction === "Import",
  ).length;
  const exports = shipments.filter(
    (s) => s.Trade_Direction === "Export",
  ).length;

  return (
    <div className="page-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-theme-primary">
          Shipments
          {(filterDirection || filterShipmentId) && (
            <Badge bg="info" className="ms-2">
              {filterShipmentId && `ID: ${filterShipmentId}`}
              {filterDirection && ` ${filterDirection}`}
            </Badge>
          )}
        </h2>
        <Button variant="primary" onClick={openAdd}>
          + Add Shipment
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <div className="simple-tile">
            <div className="simple-tile-icon">
              <FiPackage size={24} />
            </div>
            <div className="simple-tile-content">
              <h3>{totalShipments}</h3>
              <p>Total Shipments</p>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="simple-tile">
            <div className="simple-tile-icon secondary">
              <FiDownload size={24} />
            </div>
            <div className="simple-tile-content">
              <h3>{imports}</h3>
              <p>Imports</p>
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="simple-tile">
            <div className="simple-tile-icon secondary">
              <FiUpload size={24} />
            </div>
            <div className="simple-tile-content">
              <h3>{exports}</h3>
              <p>Exports</p>
            </div>
          </div>
        </Col>
      </Row>

      <Card className="simple-table-card">
        <Card.Body>
          <h5 className="table-title">Shipments</h5>
          {(filterDirection || filterShipmentId) && (
            <p className="filter-info">
              Filter: {filterShipmentId && `ID: ${filterShipmentId}`}{" "}
              {filterDirection && `Direction: ${filterDirection}`}
            </p>
          )}

          <Table responsive className="simple-table">
            <thead>
              <tr>
                <th>Shipment ID</th>
                <th>Year</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Transit</th>
                <th>Direction</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.Shipment_ID}>
                  <td>{shipment.Shipment_ID}</td>
                  <td>{shipment.Year}</td>
                  <td>{shipment.Departure_Date}</td>
                  <td>{shipment.Arrival_Date}</td>
                  <td>{shipment.Transit_Days} days</td>
                  <td>{getDirectionBadge(shipment.Trade_Direction)}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2 action-btn"
                      onClick={() => openEdit(shipment)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="action-btn"
                      onClick={() => openDelete(shipment)}
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
          <Modal.Title>Add New Shipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="Year"
                value={formData.Year}
                onChange={handleInputChange}
                isInvalid={!!errors.Year}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Year}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Departure Date</Form.Label>
              <Form.Control
                type="date"
                name="Departure_Date"
                value={formData.Departure_Date}
                onChange={handleInputChange}
                isInvalid={!!errors.Departure_Date}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Departure_Date}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Arrival Date</Form.Label>
              <Form.Control
                type="date"
                name="Arrival_Date"
                value={formData.Arrival_Date}
                onChange={handleInputChange}
                isInvalid={!!errors.Arrival_Date}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Arrival_Date}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Transit Days</Form.Label>
              <Form.Control
                type="number"
                name="Transit_Days"
                value={formData.Transit_Days}
                onChange={handleInputChange}
                isInvalid={!!errors.Transit_Days}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Transit_Days}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Trade Direction</Form.Label>
              <Form.Select
                name="Trade_Direction"
                value={formData.Trade_Direction}
                onChange={handleInputChange}
                isInvalid={!!errors.Trade_Direction}
              >
                <option value="Import">Import</option>
                <option value="Export">Export</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.Trade_Direction}
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
            Add Shipment
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton className="modal-header-theme">
          <Modal.Title>Edit Shipment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                name="Year"
                value={formData.Year}
                onChange={handleInputChange}
                isInvalid={!!errors.Year}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Year}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Departure Date</Form.Label>
              <Form.Control
                type="date"
                name="Departure_Date"
                value={formData.Departure_Date}
                onChange={handleInputChange}
                isInvalid={!!errors.Departure_Date}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Departure_Date}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Arrival Date</Form.Label>
              <Form.Control
                type="date"
                name="Arrival_Date"
                value={formData.Arrival_Date}
                onChange={handleInputChange}
                isInvalid={!!errors.Arrival_Date}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Arrival_Date}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Transit Days</Form.Label>
              <Form.Control
                type="number"
                name="Transit_Days"
                value={formData.Transit_Days}
                onChange={handleInputChange}
                isInvalid={!!errors.Transit_Days}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Transit_Days}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Trade Direction</Form.Label>
              <Form.Select
                name="Trade_Direction"
                value={formData.Trade_Direction}
                onChange={handleInputChange}
                isInvalid={!!errors.Trade_Direction}
              >
                <option value="Import">Import</option>
                <option value="Export">Export</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.Trade_Direction}
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
          Are you sure you want to delete shipment{" "}
          <strong>#{selectedShipment?.Shipment_ID}</strong>? This action cannot
          be undone.
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

export default Shipments;
