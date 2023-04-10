import * as React from "react";
import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import DeleteIcon from "../services/DeleteIcon";
import {
  compare,
  findSampleTypes,
  sampleListOptionsMaker,
} from "../services/commonFunctions";
import { sampleListConst } from "../services/Constants";

const SampleSelect = () => {
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

  useEffect(() => {
    //call for sample list & remove the other useEffect to find sample types
    setAllSampleList(
      sampleListConst.sort((a, b) => compare(a.sampleName, b.sampleName))
    );
  }, []);

  useEffect(() => {
    setAllSampleType(["Select Sample Type", ...findSampleTypes(allSampleList)]);
  }, [allSampleList]);

  useEffect(() => {
    setSampleNameList(sampleListOptionsMaker(sampleListConst, newSampleType));
  }, [newSampleType]);

  useEffect(() => {
    console.log(projectSampleList);
  }, [projectSampleList]);

  const handleAdd = () => {
    setProjectSampleList([
      ...projectSampleList,
      { type: newSampleType, name: newSampleName, count: newSampleCount },
    ]);
    setNewSampleType("Select Sample");
    setNewSampleCount("");
  };

  const deleteSample = (type: string) => {
    const updatedProjectSampleList = projectSampleList.filter(
      (field) => field.type !== type
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
  return (
    <div>
      <Row className="mb-3 sampleListBorder">
        <Row className="mb-3 sampleListHeader">
          <Row className="mb-3">
            <Col xs={3}>
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
            <Col xs={7}>
              <Form.Group as={Col}>
                <Form.Label>Sample Name:</Form.Label>
                <Form.Select
                  value={newSampleName}
                  onChange={(e) => setNewSampleName(e.target.value)}
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
          </Row>
          <Row className="mb-3">
            <Col xs={{ span: 2, offset: 5 }}>
              <Button
              style={{width:'100%'}}
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
        </Row>
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
                    <td>{item.type}</td>
                    <td>{item.name}</td>
                    <td>
                      <input
                        type="text"
                        value={item.count}
                        onChange={(event) => handleCountChange(event, index)}
                      ></input>
                    </td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => deleteSample(item.type)}
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
              <h5>No samples are selected !</h5>
            </div>
          )}
          {/* </Col> */}
        </Row>
      </Row>
    </div>
  );
};

export default SampleSelect;
