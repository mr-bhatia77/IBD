import * as React from "react";
import { useState, useEffect } from "react";
import { Form, FormGroup, Button, Row, Col } from "react-bootstrap";
import AxiosInstance from "../services/AxiosInstance";
import { siteNameOptionsMaker } from "../services/commonFunctions";
import './ProjectRequestForm.css';
interface IProjectRequestForm {
    userDisplayName: string
}

const ProjectRequestForm: React.FunctionComponent<IProjectRequestForm> = ({ userDisplayName }) => {

    const [projectName, setProjectName] = useState("");
    const [bloodSampleCount, setBloodSampleCount] = useState("");
    const [tissueSampleCount, setTissueSampleCount] = useState("");
    const [siteName, setSiteName] = useState(null);
    const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);
    const [siteNameOptions, setSiteNameOptions] = useState([<option value="Select Site Name" className="boldItalicText">Select Site Name</option>]);

    useEffect(() => {
      AxiosInstance.get('/meta/allEvents/fetchData').then((res)=>{
        setSiteNameOptions(siteNameOptionsMaker(res?.data));

      }).catch((error)=>{
        console.log(error)
      })
    

    }, [])
    

    useEffect(() => {
        // console.log({projectName, bloodSampleCount, tissueSampleCount, siteName})
        if (projectName && ((Number(bloodSampleCount) + Number(tissueSampleCount))>0) && siteName) {
            setSubmitDisabled(false);
        }
        else setSubmitDisabled(true);
    }, [projectName, bloodSampleCount, tissueSampleCount, siteName])

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log( {userDisplayName,projectName,bloodSampleCount,tissueSampleCount,siteName});
        
        setProjectName('');
        setBloodSampleCount('');
        setTissueSampleCount('');
        setSiteName('Select Site Name');
    };

    const handleReset = (e: any) => {
        console.log('hello from reset')
        setProjectName(null);
        setBloodSampleCount(null);
        setTissueSampleCount(null);
        setSiteName(null);
    };

    const handleSiteChange = (e: any) => {
        setSiteName(e.target.value === 'Select Site Name' ? null : e.target.value)
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
                        onChange={(e) => setProjectName(e.target.value === '' ? null : e.target.value)}
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
                            min={0}
                            onChange={(e) => setBloodSampleCount(e.target.value === '' ? null : e.target.value)}
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
                            min={0}
                            onChange={(e) => setTissueSampleCount(e.target.value === '' ? null : e.target.value)}
                        />
                    </FormGroup>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col xs={9}>
                    <Form.Group controlId="formSite">
                        <Form.Label>Site Name: </Form.Label>
                        <Form.Select value={siteName} onChange={handleSiteChange}>
                            {siteNameOptions}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mb-3 justify-content-md-center">
                <Col xs={4}>
                    <Button variant="success" type="submit" disabled={submitDisabled}>
                        Add Project Request
                    </Button>
                </Col>
                <Col xs={3}>
                    <Button variant="primary" type="reset">
                        Reset Form
                    </Button>
                </Col>
            </Row>
        </Form>
    </div>
    );
};

export default ProjectRequestForm;