import * as React from "react";
import { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Button,
  Row,
  Col,
  Table,
  Modal,
  Alert,
} from "react-bootstrap";
import AxiosInstance from "../services/AxiosInstance";
import DeleteIcon from "../services/DeleteIcon";
import "./ProjectRequestForm.css";
import {
  instituteNameOptionsMaker,
  compare,
  findSampleTypes,
  sampleListOptionsMaker,
} from "../services/commonFunctions";

interface IRequestForm {
  projectList: any;
  instituteList: any;
  allSampleList: any;
  setErrorState:any;
}
const RequestForm: React.FunctionComponent<IRequestForm> = (props) => {
  const [projectList, setProjectList] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [researcherName, setResearcherName] = useState("");
  const [projectNameAlreadyExists, setProjectNameAlreadyExists] =
    useState(false);
  const [projectListHashMap, setProjectListHashMap] = useState<any>({});
  const [instituteName, setInstituteName] = useState("");
  const [instituteList, setInstituteList] = useState([
    <option value="Select Institute" className="boldItalicText">
      Select Institute
    </option>,
  ]);
  const [allSampleList, setAllSampleList] = useState(props.allSampleList);
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
  const [show, setShow] = useState({state:false,message:''});
  const [results, setResults] = useState([]);
  const [sampleIdToDetailsHashmap ,setSampleIdToDetailsHashmap] = useState<any>({});
  const [showProjectError, setShowProjectError] = useState(false);

  useEffect(() => {
    const searchResults = onSearch(projectName);
    setResults(searchResults);
  }, [projectName]);

  useEffect(() => {
    // console.log(props)
    setProjectList(props.projectList);
    setInstituteList(
      instituteNameOptionsMaker(
        props.instituteList.sort((a: any, b: any) =>
          compare(a.instituteName, b.instituteName)
        )
      )
    );
    setAllSampleList(props.allSampleList);
  }, [props]);

  useEffect(() => {
    // console.log(projectListHashMap)
    if (projectListHashMap[`${projectName?.toLowerCase()}`] === 1) {
      setProjectNameAlreadyExists(true);
    } else setProjectNameAlreadyExists(false);
    //
    if (
      !projectNameAlreadyExists &&
      projectSampleList?.length > 0 &&
      !!instituteName &&
      !!projectName &&
      !!researcherName
    ) {
      setIsReadyForSubmit(true);
    } else setIsReadyForSubmit(false);
  }, [projectSampleList, instituteName, projectName, researcherName,projectNameAlreadyExists]);

  useEffect(() => {
    const temp: any = {};
    allSampleList?.forEach((sample: any) => {
      temp[`${sample.sampleName}`] = sample.sampleId;
    });
    setSampleDetailsHashMap(temp);
    // console.log(sampleDetailsHashMap)
    setAllSampleType(["Select Type", ...findSampleTypes(allSampleList)]);
  }, [allSampleList]);

  useEffect(() => {
    setSampleNameList(sampleListOptionsMaker(allSampleList, newSampleType));
  }, [newSampleType]);

  useEffect(() => {
    const PLhash: { [key: string]: number } = {};
    projectList?.forEach((project: any) => {
      PLhash[`${project?.projectName.toLowerCase()}`] = 1;
    });
    setProjectListHashMap(PLhash);
  }, [projectList]);

  useEffect(() => {
    const sampleIdToDetails: any = {};
    allSampleList?.forEach((sample:any) => {
      sampleIdToDetails[`${sample.sampleId}`] = {
        sampleType: sample.sampleType,
        sampleName: sample.sampleName,
      };
    });
    setSampleIdToDetailsHashmap(sampleIdToDetails);
    // console.log(sampleNameToIdHashMap)
    setAllSampleType(["Select Type", ...findSampleTypes(allSampleList)]);
  }, [allSampleList]);

  const handleAdd = () => {
    // console.log(sampleDetailsHashMap);
    setProjectSampleList([
      ...projectSampleList,
      {
        sampleId: sampleDetailsHashMap[`${newSampleName}`],
        sampleCount: newSampleCount,
      },
    ]);
    setNewSampleType("Select Sample");
    setNewSampleCount("");
  };

  const deleteSample = (sampleName: string) => {
    const updatedProjectSampleList = projectSampleList.filter(
      (field) => field?.sampleName !== sampleName
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

  const onSearch = (projectName: string) => {
    const results = [...Object.keys(projectListHashMap)];

    const filteredResults = [];

    for (let i = 0; i < results.length; i++) {
      const result = results[i];

      if (result?.toLowerCase().indexOf(projectName?.toLowerCase()) !== -1) {
        filteredResults.push(result);
      }
    }

    return filteredResults;
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payLoad = {
      projectName: projectName,
      researcherName: researcherName,
      instituteId: instituteName,
      sampleRequestList: projectSampleList,
    };
    AxiosInstance.post("/add/project", payLoad)
      .then((res: any) => {
        handleShow('Request Submitted Successfully!');
        setProjectName("");
        setInstituteName("");
        setResearcherName("");
        setProjectSampleList([]);
        setAllSampleType(["Select Type", ...findSampleTypes(allSampleList)]);
        setNewSampleCount(null);
        setSampleNameList([
          <option value="Select Sample" className="boldItalicText">
            Select Sample
          </option>,
        ]);
        AxiosInstance.get("/projectList/fetchData").then((res) => {
          setProjectList(res?.data);
        })
        .catch((error)=>{
          console.log(error);
          props.setErrorState(true)
        })
      })
      .catch((error) => {
        handleShow('Something Went Wrong. please try again');
      });
  };

  const handleReset = (e: any) => {
    setProjectName(null);
    setNewSampleCount(null);
    setInstituteName(null);
    setResearcherName("");
    setProjectSampleList([]);
    setAllSampleType(["Select Type", ...findSampleTypes(allSampleList)]);
    setSampleNameList([
      <option value="Select Sample" className="boldItalicText">
        Select Sample
      </option>,
    ]);
  };

  const handleClose = () => setShow({state:false,message:''});
  const handleShow = (message:string) => setShow({state:true,message:message});

  return (
    <>
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
               onFocus={()=>setShowProjectError(true)}
               onBlur={()=>setShowProjectError(false)}
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
              {showProjectError && projectNameAlreadyExists && !!projectName && (
                <Row className="dropDown">
                  <p className="boldItalicText">Already in use: </p>
                  <ul className="noDots">
                    {results.map((result, index) => (
                      <li key={index}>{result}</li>
                    ))}
                  </ul>
                </Row>
              )}
            </FormGroup>
          </Col>
          <Col xs={6} className="alignMessageCenter">
            {projectNameAlreadyExists && (
              <span className="colorRed">
                * Project Name already exist !! Please select other Name.
              </span>
            )}
            {showProjectError && !projectNameAlreadyExists && !!projectName && (
              <span className="colorGreen">Project Name is available!</span>
            )}
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
                onChange={(e) =>
                  setInstituteName(
                    e.target.value === "Select Institute"
                      ? null
                      : e.target.value
                  )
                }
              >
                {instituteList}
              </Form.Select>
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
                    <td>
                      {
                        sampleIdToDetailsHashmap[`${item?.sampleId}`]
                          ?.sampleType
                      }
                    </td>
                    <td>
                      {
                        sampleIdToDetailsHashmap[`${item?.sampleId}`]
                          ?.sampleName
                      }
                    </td>
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
                          <option
                            key={sampleType}
                            className={
                              sampleType === "Select Type"
                                ? "boldItalicText"
                                : ""
                            }
                          >
                            {sampleType}
                          </option>
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
        <hr />
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
      <Modal show={show?.state} onHide={handleClose}>
        <Modal.Body>
          <Alert variant={show?.message === 'Request Submitted Successfully!'?"success":"danger"}>{show?.message}</Alert>
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

export default RequestForm;
