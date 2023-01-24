import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { useState } from "react";
import { Form, FormGroup, Button, Row, Col } from "react-bootstrap";

interface IApp {
  userDisplayName: string;
}

const App: React.FC<IApp> = ({ userDisplayName }) => {
  const [projectName, setProjectName] = useState("");
  const [bloodSampleCount, setBloodSampleCount] = useState("");
  const [tissueSampleCount, setTissueSampleCount] = useState("");
  const [siteName, setSiteName] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(
      userDisplayName,
      projectName,
      bloodSampleCount,
      tissueSampleCount,
      siteName
    );
  };

  const handleReset = (e: any) => {
    console.log("form reset");
  };

  return (
    <Form onSubmit={handleSubmit} className="my-form" onReset={handleReset}>
        <Row>
      <FormGroup as={Col} className="mb-3">
        <Form.Label for="username">Username: </Form.Label>
            <Form.Control
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              value={userDisplayName}
              disabled
            />
      </FormGroup>
      <FormGroup as={Col} className="mb-3">
        <Form.Label for="projectName">Project Name: </Form.Label>
        <Form.Control
          type="text"
          name="projectName"
          id="projectName"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </FormGroup>
      </Row>
      <Row>
      <FormGroup as={Col} className="mb-3">
        <Form.Label for="bloodSampleCount">Blood Sample Count:</Form.Label>
        <Form.Control
          type="number"
          name="bloodSampleCount"
          id="bloodSampleCount"
          placeholder="Enter blood sample count"
          value={bloodSampleCount}
          onChange={(e) => setBloodSampleCount(e.target.value)}
        />
      </FormGroup>
      <FormGroup as={Col} className="mb-3">
        <Form.Label for="tissueSampleCount">Tissue Sample Count: </Form.Label>
        <Form.Control
          type="number"
          name="tissueSampleCount"
          id="tissueSampleCount"
          placeholder="Enter tissue sample count"
          value={tissueSampleCount}
          onChange={(e) => setTissueSampleCount(e.target.value)}
        />
      </FormGroup>
      </Row>
      <Row>
        <Col xs={6}>
      <FormGroup className="mb-3">
        <Form.Label for="siteName">Site Name: </Form.Label>
        <Form.Control
          type="text"
          name="siteName"
          id="siteName"
          placeholder="Enter site name"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
        />
      </FormGroup>
      </Col>
      </Row>
      <Row className="mb-3 justify-content-md-center">
        <Col xs={4}>
          <Button variant="success" type="submit">
            Add Project Request
          </Button>
        </Col>
        <Col xs={3}>
          <Button variant="primary" type="reset">
            Clear Data
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default App;
