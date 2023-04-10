import * as React from "react";
import { useState, useEffect } from "react";
import { Form, FormGroup, Button, Row, Col } from "react-bootstrap";
// import AxiosInstance from "../services/AxiosInstance";
import { instituteNameOptionsMaker,compare } from "../services/commonFunctions";
import {instituteListCons} from '../services/Constants'
import "./ProjectRequestForm.css";
import SampleSelect from "./SampleSelect";
interface IProjectRequestForm {
  userDisplayName: string;
}

const ProjectRequestForm: React.FunctionComponent<IProjectRequestForm> = ({
  userDisplayName,
}) => {
  const [projectName, setProjectName] = useState("");
  // const [sampleList,setSampleList] = useState([])
  const [researcherName, setResearcherName] = useState("");
  const [instituteName, setInstituteName] = useState("Select Institute");
  const [instituteList,setInstituteList] = useState([<option value="Select Institute" className="boldItalicText">Select Institute</option>])
  const [isNewRequest,setIsNewRequest] = useState<boolean>(true);
  // const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
    setInstituteList(instituteNameOptionsMaker(instituteListCons.sort((a,b)=>compare(a.instituteName,b.instituteName))));
    // AxiosInstance.get("/meta/allEvents/fetchData")
    //   .then((res) => {
    //     setInstituteName(siteNameOptionsMaker(res?.data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }, []);

  // useEffect(() => {
  //     // console.log({projectName, bloodSampleCount, tissueSampleCount, siteName})
  //     if (projectName && ((Number(bloodSampleCount) + Number(tissueSampleCount))>0) && siteName) {
  //         setSubmitDisabled(false);
  //     }
  //     else setSubmitDisabled(true);
  // }, [projectName, bloodSampleCount, tissueSampleCount, siteName])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ userDisplayName, projectName, researcherName, instituteName });
    setProjectName("");
    setInstituteName("");
  };

  const handleReset = (e: any) => {
    setProjectName(null);
    setInstituteName(null);
  };

  return (
    <div className="boxShadow">
      <h2 className="mainPageHeading mb-3">Raise Project Request</h2>
      <div className="flex alignCenter">
      <Button className={isNewRequest?'button1 buttonSelected':'button1 buttonNotSelected'} onClick={()=>setIsNewRequest(true)}>Raise New Request</Button>
      <Button className={isNewRequest?'button2 buttonNotSelected':'button2 buttonSelected'} onClick={()=>setIsNewRequest(false)}>Edit Existing Request</Button>
      </div>
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
        <Col xs={9}>
          <FormGroup as={Col} className="mb-3">
            <Form.Label for="projectName">Project Name: </Form.Label>
            <Form.Control
              type="text"
              name="projectName"
              id="projectName"
              placeholder="Enter project name"
              value={projectName}
              onChange={(e) =>
                setProjectName(e.target.value === "" ? null : e.target.value)
              }
            />
          </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3">
        <Col xs={6}>
            <Form.Group controlId="researcherName">
              <Form.Label>Researcher Name: </Form.Label>
              <Form.Control
                type="text"
                value={researcherName}
                placeholder="Enter Researcher Name"
                onChange={(e) =>
                  setResearcherName(
                    e.target.value === "" ? null : e.target.value
                  )
                }
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col xs={6}>
          <Form.Group as={Col}>
              <Form.Label>Institue Name:</Form.Label>
              <Form.Select value={instituteName} onChange={(e) =>
                    setInstituteName(e.target.value)
                  }>
                {instituteList}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        {/* sample select */}
        <SampleSelect></SampleSelect>
        <Row className="mb-3">
          <Col xs={{span:2,offset:4}}>
            <Button style={{width:'100%'}} variant="success" type="submit" disabled={false}>
              Submit
            </Button>
          </Col>
          <Col xs={2}>
            <Button style={{width:'100%'}} variant="primary" type="reset">
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProjectRequestForm;
