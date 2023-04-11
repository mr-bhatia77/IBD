import * as React from "react";
import { useState, useEffect } from "react";
import { Form, FormGroup, Button, Row, Col, Table } from "react-bootstrap";
import AxiosInstance from "../services/AxiosInstance";
import { instituteListCons, sampleListConst } from "../services/Constants";
import DeleteIcon from "../services/DeleteIcon";
import "./ProjectRequestForm.css";
import {
  instituteNameOptionsMaker,
  compare,
  findSampleTypes,
  sampleListOptionsMaker,
} from "../services/commonFunctions";
interface IProjectRequestForm {
  userDisplayName: string;
}

const ProjectRequestForm: React.FunctionComponent<IProjectRequestForm> = ({
  userDisplayName,
}) => {
  const [projectList, setProjectList] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [researcherName, setResearcherName] = useState("");
  const [instituteName, setInstituteName] = useState("Select Institute");
  const [instituteList, setInstituteList] = useState([
    <option value="Select Institute" className="boldItalicText">
      Select Institute
    </option>,
  ]);
  const [isNewRequest, setIsNewRequest] = useState<boolean>(true);
  // const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  const [allSampleList, setAllSampleList] = useState([]);
  const [allSampleType, setAllSampleType] = useState(["Select Sample Type"]);
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


  useEffect(() => {
    //call for sample list & remove the other useEffect to find sample types
    setAllSampleList(
      sampleListConst.sort((a, b) => compare(a.sampleName, b.sampleName))
    );
  }, []);

  useEffect(() => {
    const temp:any ={}
    allSampleList.forEach((sample)=>{
      temp[`${sample.sampleName}`]=sample.sampleId;
    })
    setSampleDetailsHashMap(temp);
    // console.log(sampleDetailsHashMap)
    setAllSampleType(["Select Sample Type", ...findSampleTypes(allSampleList)]);
  }, [allSampleList]);

  useEffect(() => {
    setSampleNameList(sampleListOptionsMaker(sampleListConst, newSampleType));
  }, [newSampleType]);

  // useEffect(()=>{
  //   allSampleList.forEach((sample)=>{
  //     sampleDetailsHashMap[sample.sampleName]=sample.sampleId;
  //   })
  //   console.log(sampleDetailsHashMap)
  // },[allSampleList])


  useEffect(() => {
    console.log(projectSampleList);
  }, [projectSampleList]);

  const handleAdd = () => {
    console.log(sampleDetailsHashMap)
    setProjectSampleList([
      ...projectSampleList,
      {
        sampleId:sampleDetailsHashMap[`${newSampleName}`],
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
    newSampleList[index].count = e.target.value;
    setProjectSampleList(newSampleList);
  };

  // const regex = /^[1-9]\d*$/; // define the regex pattern
  // const userInput = "42"; // get the user input from somewhere

  // if (regex.test(userInput)) {

  useEffect(() => {
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
    console.log(projectList);
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
    const payLoad = {
      projectName: projectName,
      researcherName: researcherName,
      instituteId: instituteName,
      sampleRequestList: projectSampleList,
    };
    AxiosInstance.post("/ibd/add/project", payLoad)
      .then((res: any) => {
        setProjectName("");
        setInstituteName("");
        setResearcherName("");
        setProjectSampleList([]);
      })
      .catch((error) => {
        console.log(error);
        console.log(payLoad);
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

  return (
    <div className="boxShadow">
      <h2 className="mainPageHeading mb-3">Raise Project Request</h2>
      <div className="flex alignCenter">
        <Button
          className={
            isNewRequest
              ? "button1 buttonSelected"
              : "button1 buttonNotSelected"
          }
          onClick={() => setIsNewRequest(true)}
        >
          Raise New Request
        </Button>
        <Button
          className={
            isNewRequest
              ? "button2 buttonNotSelected"
              : "button2 buttonSelected"
          }
          onClick={() => setIsNewRequest(false)}
        >
          Edit Existing Request
        </Button>
      </div>
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
        <Row>
          <Row className="mb-3 sampleListBorder">
           
            <Row className="mb-3">
              {/* <Col xs={{ span: 10, offset: 1 }}> */}
              {projectSampleList.length ? (
                <Table striped bordered hover>
                  <thead style={{ backgroundColor: "blue", color: "white" }}>
                    <tr>
                      <th>S.No</th>
                      <th>Sample Type</th>
                      <th>Sample Name</th>
                      <th>No. of Samples</th>
                      <th>Delete</th>
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
                            onChange={(event) =>
                              handleCountChange(event, index)
                            }
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
                  </tbody>
                </Table>
              ) : (
                <div className="flex alignCenter">
                  <h6>No samples are selected ! Please add samples.</h6>
                </div>
              )}
              {/* </Col> */}
            </Row>
            <Row className="mb-3 sampleListHeader">
              <Row className="mb-3">
                <Col xs={2}>
                  <Form.Group as={Col}>
                    <Form.Label>Sample type:</Form.Label>
                    <Form.Select
                      value={newSampleType}
                      onChange={(e) => setNewSampleType(e.target.value)}
                    >
                      {allSampleType.map((sampleType) => (
                        <option key={sampleType}>{sampleType}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={6}>
                  <Form.Group as={Col}>
                    <Form.Label>Sample Name:</Form.Label>
                    <Form.Select
                      value={newSampleName}
                      onChange={(e)=>setNewSampleName(e.target.value)}
                    >
                      {sampleNameList}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col xs={2}>
                  <Form.Group as={Col}>
                    <Form.Label>Count:</Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      step={1}
                      value={newSampleCount}
                      onChange={(e) => setNewSampleCount(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={2}>
                  <Button
                    style={{ width: "100%" }}
                    variant="primary"
                    onClick={handleAdd}
                    disabled={
                      newSampleType === "Select Sample Type" ||
                      newSampleName === "Select Sample" ||
                      Number(newSampleCount) < 1
                    }
                  >
                    + ADD
                  </Button>
                </Col>
              </Row>
              {/* <Row className="mb-3">
                
              </Row> */}
            </Row>
          </Row>
        </Row>
        <Row className="mb-3">
          <Col xs={{ span: 2, offset: 4 }}>
            <Button
              style={{ width: "100%" }}
              variant="success"
              type="submit"
              disabled={false}
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
    </div>
  );
};

export default ProjectRequestForm;
