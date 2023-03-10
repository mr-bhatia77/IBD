import * as React from 'react';
// import { useState } from 'react';
// import { Table } from 'react-bootstrap';
import { Form, Row, Col } from 'react-bootstrap';

const projectOptions = ['Select Project','Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];

function Dashboard() {
  // const [data, setData] = useState([
  //   { id: 1, sampleId:'S1', type: 'blood', checked: false },
  //   { id: 2, sampleId:'S2', type: 'tissue', checked: false },
  //   { id: 3, sampleId:'S3', type: 'blood', checked: false },
  //   { id: 4, sampleId:'S4', type: 'tissue', checked: false },
  //   { id: 5, sampleId:'S5', type: 'blood', checked: false },
  //   { id: 6, sampleId:'S6', type: 'tissue', checked: false },
  //   { id: 7, sampleId:'S7', type: 'blood', checked: false },
  //   { id: 8, sampleId:'S8', type: 'tissue', checked: false },
  // ]);

  // const handleCheckboxChange = (id: number) => {
  //   setData(
  //     data.map((item) => {
  //       if (item.id === id) {
  //         return { ...item, checked: !item.checked };
  //       } else {
  //         return item;
  //       }
  //     })
  //   );
  // };

  return (
    <>
      <Form>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId="projectName">
            <Form.Label>Project Name:</Form.Label>
            <Form.Select>
              {projectOptions.map(option => (
                <option key={option}>{option}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="projectStatus">
            <Form.Label>Project Status:</Form.Label>
            <Form.Control type="text" disabled />
          </Form.Group>

          <Form.Group as={Col} controlId="siteName">
            <Form.Label>Site name:</Form.Label>
            <Form.Control type="text" disabled />
          </Form.Group>

        </Row>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId="sampleType">
            <Form.Label>Sample type:</Form.Label>
            <Form.Select>
              <option>Select Sample Type</option>
              <option>blood</option>
              <option>tissue</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="sampleCount">
            <Form.Label>Sample count:</Form.Label>
            <Form.Control type="text" disabled />
          </Form.Group>
        </Row>
      </Form>
      {/* <Table striped bordered hover >
        <thead style={{ backgroundColor: 'blue', color: 'white' }}>
          <tr>
            <th>S.No</th>
            <th>Sample ID</th>
            <th>Sample Type</th>
            <th>Assign to Project</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.sampleId}</td>
              <td>{item.type}</td>
              <td>
                <input type="checkbox" checked={item.checked} onChange={() => handleCheckboxChange(item.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table> */}
    </>
  );
}

export default Dashboard;
