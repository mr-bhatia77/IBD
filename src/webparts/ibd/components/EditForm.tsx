import * as React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table, Modal, Alert } from "react-bootstrap";
import AxiosInstance from "../services/AxiosInstance";
import {
  projectListCons,
  projectDetailsCons,
  sampleListConst,
  projectDetailsCons2,
} from "../services/Constants";
import DeleteIcon from "../services/DeleteIcon";
import "./ProjectRequestForm.css";
import {
  compare,
  findSampleTypes,
  sampleListOptionsMaker,
  projectNameOptionsMaker,
} from "../services/commonFunctions";

const EditForm = () => {
  const [projectList, setProjectList] = useState([
    <option value="Select Project" className="boldItalicText">
      Select Project
    </option>,
  ]);
  const [projectDetails, setProjectDetails] = useState<any>({});
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
  const [isReadyForSubmit, setIsReadyForSubmit] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // console.log('EditForm')
    // setInstituteList(instituteNameOptionsMaker(instituteListCons.sort((a,b)=>compare(a.instituteName,b.instituteName))));
    Promise.all([
      AxiosInstance.get("/projectList/fetchData"),
      AxiosInstance.get("/sampleInfoList/fetchData"),
    ])
      .then((res: any) => {
        setProjectList(
          projectNameOptionsMaker(
            res[0]?.data.sort((a: any, b: any) =>
              compare(a.projectName, b.projectName)
            )
          )
        );
        setAllSampleList(
          res[1]?.data.sort((a: any, b: any) =>
            compare(a.sampleName, b.sampleName)
          )
        );
      })
      .catch((error: any) => {
        setProjectList(
          projectNameOptionsMaker(
            projectListCons.sort((a, b) =>
              compare(a.projectName, b.projectName)
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

  useEffect(() => {
    console.log(projectDetails);
    console.log(
      JSON.stringify({ sampleList: projectDetails?.sampleRequestList })
    );
    console.log(JSON.stringify({ sampleList: projectSampleList }));
    if (
      JSON.stringify({
        sampleList: projectDetails?.sampleRequestList || [],
      }) !== JSON.stringify({ sampleList: projectSampleList })
    )
      setIsReadyForSubmit(true);
    else setIsReadyForSubmit(false);
  }, [projectSampleList]);

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

  const deleteSample = (deleteIndex: number) => {
    const updatedProjectSampleList = projectSampleList.filter(
      (field, index) => index !== deleteIndex
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payLoad = {
      projectId: projectDetails?.projectId,
      sampleRequestList: projectSampleList,
    };
    AxiosInstance.put("/update/project", payLoad)
      .then((res: any) => {
        handleShow();
        AxiosInstance.get(`/projectInfo/${projectDetails?.projectId}/fetchData`)
          .then((res) => {
            setProjectDetails(res?.data);
            setProjectSampleList(res?.data?.sampleRequestList);
          })
          .catch((error) => {
            if (projectDetails?.projectId == 1) {
              setProjectDetails(projectDetailsCons);
              setProjectSampleList(projectDetailsCons.sampleRequestList);
            } else {
              setProjectDetails(projectDetailsCons2);
              setProjectSampleList(projectDetailsCons2.sampleRequestList);
            }
          });
      })
      .catch((error) => {
        handleShow();
        console.log(error);
        if (projectDetails?.projectId == 1) {
          setProjectDetails(projectDetailsCons);
          setProjectSampleList(projectDetailsCons.sampleRequestList);
        } else {
          setProjectDetails(projectDetailsCons2);
          setProjectSampleList(projectDetailsCons2.sampleRequestList);
        }
      });
  };

  const getProjectDetails = (e: any) => {
    AxiosInstance.get(`/projectInfo/${e.target.value}/fetchData`)
      .then((res) => {
        setProjectDetails(JSON.parse(JSON.stringify(res?.data)));
        setProjectSampleList([...res?.data?.sampleRequestList]);
      })
      .catch((error) => {
        if (e.target.value == 1) {
          setProjectDetails(JSON.parse(JSON.stringify(projectDetailsCons)));
          setProjectSampleList(
            JSON.parse(JSON.stringify(projectDetailsCons)).sampleRequestList
          );
        } else {
          setProjectDetails(JSON.parse(JSON.stringify(projectDetailsCons2)));
          setProjectSampleList(
            JSON.parse(JSON.stringify(projectDetailsCons2)).sampleRequestList
          );
        }
      });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Form onSubmit={handleSubmit} className="my-form">
        {/* <Row>
          Welcome, {userDisplayName}
        </Row> */}
        <hr />
        <Row className="mb-3">
          <Col xs={6}>
            <Form.Group as={Col}>
              <Form.Label>Project Name:</Form.Label>
              <Form.Select onChange={getProjectDetails}>
                {projectList}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={6}>
            <Form.Group controlId="researcherName">
              <Form.Label>Researcher Name: </Form.Label>
              <Form.Control
                disabled
                type="text"
                value={
                  projectDetails?.researcherName
                    ? projectDetails?.researcherName
                    : ""
                }
              ></Form.Control>
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group controlId="instituteName">
              <Form.Label>Institute Name: </Form.Label>
              <Form.Control
                disabled
                type="text"
                value={
                  projectDetails?.instituteName
                    ? projectDetails?.instituteName
                    : ""
                }
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
        {/* sample select */}
        <Row style={{ marginLeft: "0px" }}>
          <hr />
          <h6>Add Samples:</h6>
          <Row className="mb-3">
            <Row className="mb-3">
              {/* <Col xs={{ span: 10, offset: 1 }}> */}
              <Table striped bordered hover>
                <thead style={{ backgroundColor: "blue", color: "white" }}>
                  <tr>
                    <th style={{ width: "5%" }}>S.No</th>
                    <th style={{ width: "15%" }}>Sample Type</th>
                    <th style={{ width: "60%" }}>Sample Name</th>
                    <th style={{ width: "10%" }}>No. of Samples</th>
                    <th style={{ width: "10%" }}>Action</th>
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
                          onClick={() => deleteSample(index)}
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
                        disabled={!projectSampleList?.length}
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
                        disabled={!projectSampleList?.length}
                        value={newSampleName}
                        onChange={(e) => setNewSampleName(e.target.value)}
                      >
                        {sampleNameList}
                      </Form.Select>
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        disabled={!projectSampleList?.length}
                        required
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
          <hr />
        </Row>
        <Row className="mb-3">
          <Col xs={{ span: 2, offset: 5 }}>
            <Button
              style={{ width: "100%" }}
              variant="success"
              type="submit"
              disabled={!isReadyForSubmit}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <Alert variant="danger">Request Updated Successfully!.</Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditForm;
