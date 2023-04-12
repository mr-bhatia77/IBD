import * as React from 'react'
import { useState, useEffect } from "react";
import { Form, FormGroup, Button, Row, Col, Table,Modal, Alert } from "react-bootstrap";
import AxiosInstance from "../services/AxiosInstance";
import { instituteListCons, sampleListConst,projectListCons } from "../services/Constants";
import DeleteIcon from "../services/DeleteIcon";
import "./ProjectRequestForm.css";
import {
  instituteNameOptionsMaker,
  compare,
  findSampleTypes,
  sampleListOptionsMaker,
} from "../services/commonFunctions";

const RequestForm = () => {

  const [projectList, setProjectList] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [researcherName, setResearcherName] = useState("");
  const [projectNameAlreadyExists,setProjectNameAlreadyExists] = useState(false);
  const [projectListHashMap, setProjectListHashMap] = useState<any>({});
  const [instituteName, setInstituteName] = useState("");
  const [instituteList, setInstituteList] = useState([
    <option value="Select Institute" className="boldItalicText">
      Select Institute
    </option>,
  ]);
  const [allSampleList, setAllSampleList] = useState([]);
  const [allSampleType, setAllSampleType] = useState(["Select Type"]);
  const [projectSampleList, setProjectSampleList] = useState([]);
  const [newSampleType, setNewSampleType] = useState("sampleNameList Type");
  const [sampleNameList, setSampleNameList] = useState([
    <option value="Select Sample" className="boldItalicText">
      Select Sample
    </option>,
  ]);
  const [newSampleName, setNewSampleName] = useState("Select Sample");
  const [newSampleCount, setNewSampleCount] = useState(null);
  const [sampleDetailsHashMap, setSampleDetailsHashMap] = useState<any>({});
  const [isReadyForSubmit,setIsReadyForSubmit] = useState(false);
  const [show, setShow] = useState(false);


  useEffect(() => {
    // console.log('Request Form')
    // setInstituteList(instituteNameOptionsMaker(instituteListCons.sort((a,b)=>compare(a.instituteName,b.instituteName))));
    Promise.all([
      AxiosInstance.get("/projectList/fetchData"),
      AxiosInstance.get("/instituteList/fetchData"),
      AxiosInstance.get("/sampleInfoList/fetchData"),
    ])
      .then((res: any) => {
        setProjectList(res[0]?.data);
        setInstituteList(
          instituteNameOptionsMaker(
            res[1]?.data.sort((a: any, b: any) =>
              compare(a.instituteName, b.instituteName)
            )
          )
        );
        setAllSampleList(
          res[2]?.data.sort((a: any, b: any) =>
            compare(a.sampleName, b.sampleName)
          )
        );
      })
      .catch((error: any) => {
        setProjectList(projectListCons)
        setInstituteList(
          instituteNameOptionsMaker(
            instituteListCons.sort((a, b) =>
              compare(a.instituteName, b.instituteName)
            )
          )
        );
        setAllSampleList(
          sampleListConst.sort((a, b) => compare(a.sampleName, b.sampleName))
        );
        console.log(error);
      });
    // console.log(projectList);
  }, []);


  useEffect(()=>{
    // console.log(projectListHashMap)
    if(projectListHashMap[`${projectName}`] ===1) {
        setProjectNameAlreadyExists(true)
    }
    else setProjectNameAlreadyExists(false)
    // 
    if((projectListHashMap[`${projectName}`] !==1) && projectSampleList?.length>0 && instituteName !=="" && projectName !=="" && researcherName!=="")
    {
        setIsReadyForSubmit(true);
    }
    else 
    setIsReadyForSubmit(false)
  },[projectSampleList,instituteName,projectName,researcherName])

  useEffect(() => {
    const temp: any = {};
    allSampleList.forEach((sample) => {
      temp[`${sample.sampleName}`] = sample.sampleId;
    });
    setSampleDetailsHashMap(temp);
    // console.log(sampleDetailsHashMap)
    setAllSampleType(["Select Type", ...findSampleTypes(allSampleList)]);
  }, [allSampleList]);

  useEffect(() => {
    setSampleNameList(sampleListOptionsMaker(sampleListConst, newSampleType));
  }, [newSampleType]);

useEffect(()=>{
    const PLhash:{[key:string]:number} = {}
    projectList.forEach((project)=>{
        PLhash[`${project.projectName}`]=1;
    })
    setProjectListHashMap(PLhash);
},[projectList])

  const handleAdd = () => {
    // console.log(sampleDetailsHashMap);
    setProjectSampleList([
      ...projectSampleList,
      {
        sampleId: sampleDetailsHashMap[`${newSampleName}`],
        sampleType: newSampleType,
        sampleName: newSampleName,
        sampleCount: newSampleCount,
      },
    ]);
    setNewSampleType("Select Sample");
    setNewSampleCount("");
  };

  const deleteSample = (sampleName: string) => {
    const updatedProjectSampleList = projectSampleList.filter(
      (field) => field.sampleName !== sampleName
    );
    setProjectSampleList(updatedProjectSampleList);
  };

  const handleCountChange = (e: any, index: number) => {
    const newSampleList = [...projectSampleList];
    newSampleList[index].sampleCount = e.target.value;
    setProjectSampleList(newSampleList);
  };

  // const regex = /^[1-9]\d*$/; // define the regex pattern
  // const userInput = "42"; // get the user input from somewhere

  // if (regex.test(userInput)) {

  // useEffect(() => {
  //     // console.log({projectName, bloodSampleCount, tissueSampleCount, siteName})
  //     if (projectName && ((Number(bloodSampleCount) + Number(tissueSampleCount))>0) && siteName) {
  //         setSubmitDisabled(false);
  //     }
  //     else setSubmitDisabled(true);
  // }, [projectName, bloodSampleCount, tissueSampleCount, siteName])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payLoad = {
      projectName: projectName,
      researcherName: researcherName,
      instituteId: instituteName,
      sampleRequestList: projectSampleList,
    };
    AxiosInstance.post("/ibd/add/project", payLoad)
      .then((res: any) => {
        handleShow();
        setProjectName("");
        setInstituteName("");
        setResearcherName("");
        setProjectSampleList([]);
      })
      .catch((error) => {
        handleShow();
        // console.log(error);
        // console.log(payLoad);
        setProjectName("");
        setInstituteName("");
        setResearcherName("");
        setProjectSampleList([]);
      });
  };

  const handleReset = (e: any) => {
    setProjectName(null);
    setInstituteName(null);
    setResearcherName("");
    setProjectSampleList([]);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (<>
    <Form onSubmit={handleSubmit} className="my-form" onReset={handleReset}>
        {/* <Row>
          Welcome, {userDisplayName}
        </Row> */}
        <hr />
        <Row>
          <Col xs={6}>
            <FormGroup as={Col} className="mb-3">
              <Form.Label for="projectName">Project Name: </Form.Label>
              <Form.Control
                required
                type="text"
                name="projectName"
                id="projectName"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) =>
                  setProjectName(e.target.value === "" ? null : e.target.value)
                }
              />
              {projectNameAlreadyExists && <Form.Text className="text-muted colorRed">Project Name already exist !! Please select other Name.</Form.Text>}
            </FormGroup>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={6}>
            <Form.Group controlId="researcherName">
              <Form.Label>Researcher Name: </Form.Label>
              <Form.Control
                required
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
              <Form.Label>Institute Name:</Form.Label>
              <Form.Select
                value={instituteName}
                onChange={(e) => setInstituteName(e.target.value)}
              >
                {instituteList}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        {/* sample select */}
        <Row style={{ marginLeft: "0px" }}>
            <hr/>
            <h6>Add Samples:</h6>
          <Row className="mb-3">
            <Row className="mb-3">
              {/* <Col xs={{ span: 10, offset: 1 }}> */}
              <Table striped bordered hover>
                <thead style={{ backgroundColor: "blue", color: "white" }}>
                  <tr>
                    <th style={{width:'5%'}}>S.No</th>
                    <th style={{width:'15%'}}>Sample Type</th>
                    <th style={{width:'60%'}}>Sample Name</th>
                    <th style={{width:'10%'}}>No. of Samples</th>
                    <th style={{width:'10%'}}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projectSampleList?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.sampleType}</td>
                      <td>{item.sampleName}</td>
                      <td>
                        <input
                          type="text"
                          value={item.sampleCount}
                          onChange={(event) => handleCountChange(event, index)}
                        ></input>
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => deleteSample(item.sampleName)}
                        >
                          <DeleteIcon />
                        </Button>
                      </td>
                    </tr>
                  ))}
                  <tr key={projectSampleList?.length + 1}>
                    <td>{projectSampleList?.length + 1}</td>
                    <td>
                      <Form.Select
                        value={newSampleType}
                        onChange={(e) => setNewSampleType(e.target.value)}
                      >
                        {allSampleType.map((sampleType) => (
                          <option key={sampleType}>{sampleType}</option>
                        ))}
                      </Form.Select>
                    </td>
                    <td>
                      <Form.Select
                        value={newSampleName}
                        onChange={(e) => setNewSampleName(e.target.value)}
                      >
                        {sampleNameList}
                      </Form.Select>
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        min={1}
                        step={1}
                        value={newSampleCount}
                        onChange={(e) => setNewSampleCount(e.target.value)}
                      />
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={handleAdd}
                        disabled={
                          newSampleType === "Select Type" ||
                          newSampleName === "Select Sample" ||
                          Number(newSampleCount) < 1
                        }
                      >
                        + ADD
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>

              {/* </Col> */}
            </Row>
          </Row>
        </Row>
        <hr/>
        <Row className="mb-3">
          <Col xs={{ span: 2, offset: 4 }}>
            <Button
              style={{ width: "100%" }}
              variant="success"
              type="submit"
              disabled={!isReadyForSubmit}
            >
              Submit
            </Button>
          </Col>
          <Col xs={2}>
            <Button style={{ width: "100%" }} variant="primary" type="reset">
              Reset
            </Button>
          </Col>
        </Row>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Alert variant="danger">
            Request Submitted Successfully!.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  )
}

export default RequestForm