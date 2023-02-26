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

    const handleSiteChange = (e: any) => {
        setSiteName(e.target.value);
    }

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
                <Col xs={9}>
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
                <Col xs={9}>
                    <FormGroup className="mb-3">
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
            <Row className="mb-3">
                <Col xs={9}>
                    <Form.Group controlId="formSite">
                        <Form.Label>Site Name: </Form.Label>
                        <Form.Select value={siteName} onChange={handleSiteChange}>
                            <option value="site1">Site 1</option>
                            <option value="site2">Site 2</option>
                            <option value="site3">Site 3</option>
                            <option value="site4">Site 4</option>
                            <option value="site5">Site 5</option>
                            <option value="site6">Site 6</option>
                            <option value="site7">Site 7</option>
                            <option value="site8">Site 8</option>
                            <option value="site9">Site 9</option>
                            <option value="site10">Site 10</option>
                        </Form.Select>
                    </Form.Group>
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