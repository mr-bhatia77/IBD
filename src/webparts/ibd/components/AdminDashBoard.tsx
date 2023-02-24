import * as React from 'react'; 
import { useState } from 'react';
import { Table } from 'react-bootstrap';

function Dashboard() {
  const [data, setData] = useState([
    { id: 1, name: 'John Doe', age: 25, email: 'johndoe@example.com', checked: false },
    { id: 2, name: 'Jane Doe', age: 30, email: 'janedoe@example.com', checked: false },
    { id: 3, name: 'Bob Smith', age: 45, email: 'bobsmith@example.com', checked: false },
    { id: 4, name: 'Samantha Jones', age: 32, email: 'samanthajones@example.com', checked: false },
  ]);

  const handleCheckboxChange = (id:number) => {
    setData(
      data.map((item) => {
        if (item.id === id) {
          return { ...item, checked: !item.checked };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <Table striped bordered hover variant="blue">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
          <th>Checkbox</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.email}</td>
            <td>
              <input type="checkbox" checked={item.checked} onChange={() => handleCheckboxChange(item.id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Dashboard;
