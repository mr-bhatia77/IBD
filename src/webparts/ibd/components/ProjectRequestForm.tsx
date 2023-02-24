import * as React from "react";
import { useState } from "react";
import { Form, FormGroup, Button, Row, Col } from "react-bootstrap";
import './ProjectRequestForm.css';
interface IProjectRequestForm {
    userDisplayName: string
}

const ProjectRequestForm: React.FunctionComponent<IProjectRequestForm> = ({ userDisplayName }) => {

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

    return (<div className='boxShadow'><h2 className='mainPageHeading'>Raise Project Request</h2>
        <Form onSubmit={handleSubmit} className="my-form" onReset={handleReset}>
            <Row>
                <Col xs={9}>
                <FormGroup className="mb-3">
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
               </Col>
               </Row>
               <Row>
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
            <Col xs={6}>
                <FormGroup className="mb-3">
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
                </Col>
                </Row>
               <Row>
               <Col xs={6}>
                <FormGroup  className="mb-3">
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
                </Col>
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
    </div>
    );
};

export default ProjectRequestForm;