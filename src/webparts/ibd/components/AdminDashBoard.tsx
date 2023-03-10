import * as React from "react";
import { useState } from "react";
// import { Table } from 'react-bootstrap';
import AxiosInstance from "../services/AxiosInstance";
import { Form, Row, Col, Button } from "react-bootstrap";

const projectOptions = [
  "Select Project",
  "Option 1",
  "Option 2",
  "Option 3",
  "Option 4",
  "Option 5",
];

function Dashboard() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append("file", file);

    AxiosInstance.post("/api/upload", formData)
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="projectName">
            <Form.Label>Project Name:</Form.Label>
            <Form.Select>
              {projectOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="projectStatus">
            <Form.Label>Project Status:</Form.Label>
            <Form.Control type="text" disabled />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Select sample list to be uploaded</Form.Label>
            <Form.Control type="file" onChange={handleFileChange} />
            <Button className="mt-3" variant="success" onClick={handleFileUpload}>
              Upload CSV
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </>
  );
}

export default Dashboard;
