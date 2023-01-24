import "bootstrap/dist/css/bootstrap.min.css";
import * as React from "react";
import { useState } from "react";
import { Form, FormGroup, Button, Row, Col } from "react-bootstrap";
import "./App.css";

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

  return (
    <Form onSubmit={handleSubmit} className='my-form'>
      <FormGroup>
        <Row>
          <Col xs={3}>
            <Form.Label for="username">Username: </Form.Label>
          </Col>
          <Col xs={9}>
            <Form.Control
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              value={userDisplayName}
              disabled
              className="my-form-input"
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Form.Label for="projectName">Project Name: </Form.Label>
        <Form.Control
          type="text"
          name="projectName"
          id="projectName"
          placeholder="Enter project name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="my-form-input"
        />
      </FormGroup>
      <FormGroup>
        <Form.Label for="bloodSampleCount">Blood Sample Count:</Form.Label>
        <Form.Control
          type="number"
          name="bloodSampleCount"
          id="bloodSampleCount"
          placeholder="Enter blood sample count"
          value={bloodSampleCount}
          onChange={(e) => setBloodSampleCount(e.target.value)}
          className="my-form-input"
        />
      </FormGroup>
      <FormGroup>
        <Form.Label for="tissueSampleCount">Tissue Sample Count: </Form.Label>
        <Form.Control
          type="number"
          name="tissueSampleCount"
          id="tissueSampleCount"
          placeholder="Enter tissue sample count"
          value={tissueSampleCount}
          onChange={(e) => setTissueSampleCount(e.target.value)}
          className="my-form-input"
        />
      </FormGroup>
      <FormGroup>
        <Form.Label for="siteName">Site Name: </Form.Label>
        <Form.Control
          type="text"
          name="siteName"
          id="siteName"
          placeholder="Enter site name"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
          className="my-form-input"
        />
      </FormGroup>
      <Button type="submit" className="my-form-button">
        Submit
      </Button>
    </Form>
  );
};

export default App;
