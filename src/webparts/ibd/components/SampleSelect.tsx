import * as React from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";

const sampleOptions = [
  "Select Sample",
  "Sample 1",
  "Sample 2",
  "Sample 3",
  "Sample 4",
  "Sample 5",
];

const data = [
  { id: 1, sampleId: "S1", type: "blood", checked: false },
  { id: 2, sampleId: "S2", type: "tissue", checked: false },
  { id: 3, sampleId: "S3", type: "blood", checked: false },
  { id: 4, sampleId: "S4", type: "tissue", checked: false },
  { id: 5, sampleId: "S5", type: "blood", checked: false },
  { id: 6, sampleId: "S6", type: "tissue", checked: false },
  { id: 7, sampleId: "S7", type: "blood", checked: false },
  { id: 8, sampleId: "S8", type: "tissue", checked: false },
];

const SampleSelect = () => {
  return (
    <div>
      <Row className="mb-3 sampleListBorder">
        <Row className="mb-3 sampleListHeader">
          <Col xs={6}>
            <Form.Group as={Col}>
              <Form.Label>Sample type:</Form.Label>
              <Form.Select>
                {sampleOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group as={Col}>
              <Form.Label>Sample Count:</Form.Label>
              <Form.Control type="number" min={1} step={1} />
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button variant="primary">+ ADD</Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={{ span: 8, offset: 2 }}>
            <Table striped bordered hover>
              <thead style={{ backgroundColor: "blue", color: "white" }}>
                <tr>
                  <th>S.No</th>
                  <th>Sample Type</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.type}</td>
                    <td>d</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default SampleSelect;
