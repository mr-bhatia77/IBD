import * as React from "react";
import {useState, useEffect} from 'react';
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import DeleteIcon from "../services/DeleteIcon";

const sampleOptions = [
  "Select Sample",
  "Blood - 1",
  "Blood - 2",
  "Blood - 3",
  "Tissue - 1",
  "Tissue - 2",
  "Tissue - 3"
];

// const data = [
//   { id: 1, sampleId: "S1", type: "blood", checked: false },
//   { id: 2, sampleId: "S2", type: "tissue", checked: false },
//   { id: 3, sampleId: "S3", type: "blood", checked: false },
//   { id: 4, sampleId: "S4", type: "tissue", checked: false },
//   { id: 5, sampleId: "S5", type: "blood", checked: false },
//   { id: 6, sampleId: "S6", type: "tissue", checked: false },
//   { id: 7, sampleId: "S7", type: "blood", checked: false },
//   { id: 8, sampleId: "S8", type: "tissue", checked: false },
// ];

const SampleSelect = () => {


    const [projectSampleList,setProjectSampleList] = useState([]);
    const [newSampleType, setNewSampleType] = useState('Select Sample');
    const [newSampleCount, setNewSampleCount] = useState(null);

    useEffect(() => {
        // setProjectSampleList([{type:'sample 1',count:5}])
    }, [])

    useEffect(() => {
        console.log(projectSampleList)
      
    }, [projectSampleList])
    

    const handleAdd =()=>{
        setProjectSampleList([...projectSampleList,{type:newSampleType,count:newSampleCount}])
        setNewSampleType('Select Sample')
        setNewSampleCount('')
    }

    const deleteSample = (type: string) => {
        const updatedProjectSampleList = projectSampleList.filter(field => field.type !== type);
        setProjectSampleList(updatedProjectSampleList);
    };

    const handleCountChange = (e:any,index:number) =>{
        const newSampleList = [...projectSampleList]
        newSampleList[index].count = e.target.value;
        setProjectSampleList(newSampleList)       
    }



// const regex = /^[1-9]\d*$/; // define the regex pattern
// const userInput = "42"; // get the user input from somewhere

// if (regex.test(userInput)) {
  return (
    <div>
      <Row className="mb-3 sampleListBorder">
        <Row className="mb-3 sampleListHeader">
          <Col xs={6}>
            <Form.Group as={Col}>
              <Form.Label>Sample type:</Form.Label>
              <Form.Select value={newSampleType} onChange={(e) =>
                    setNewSampleType(e.target.value)
                  }>
                {sampleOptions.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={4}>
            <Form.Group as={Col}>
              <Form.Label>Sample Count:</Form.Label>
              <Form.Control type="number" min={1} step={1} value={newSampleCount} onChange={(e) =>
                    setNewSampleCount(e.target.value)}/>
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button variant="primary" onClick={handleAdd} disabled ={newSampleType==='Select Sample' || Number(newSampleCount)<1}>+ ADD</Button>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={{ span: 10, offset: 1 }}>
            {projectSampleList.length?<Table striped bordered hover>
              <thead style={{ backgroundColor: "blue", color: "white" }}>
                <tr>
                  <th>S.No</th>
                  <th>Sample Type</th>
                  <th>No. of Samples</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {projectSampleList?.map((item,index) => (
                  <tr key={index}>
                    <td>{index + 1 }</td>
                    <td>{item.type}</td>
                    <td><input type='text' value={item.count} onChange={(event)=>handleCountChange(event,index)}></input></td>
                    <td><Button variant="danger" onClick={()=>deleteSample(item.type)}><DeleteIcon/></Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>:<div className="flex alignCenter"><h5>No samples are selected !</h5></div>}
          </Col>
        </Row>
      </Row>
    </div>
  );
};

export default SampleSelect;
