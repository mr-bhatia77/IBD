import * as React from 'react';
import  { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const DynamicTable = () => {
  const [rows, setRows] = useState([{ col1: '', col2: '' }]);

  const handleAddRow = () => {
    const newRow = { col1: '', col2: '' };
    setRows([...rows, newRow]);
  };

  const handleCol1Change = (event:any, index:number) => {
    const newRows = [...rows];
    newRows[index].col1 = event.target.value;
    setRows(newRows);
  };

  const handleCol2Change = (event:any, index:number) => {
    const newRows = [...rows];
    newRows[index].col2 = event.target.value;
    setRows(newRows);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                {index === rows.length - 1 ? (
                  row.col1
                ) : (
                  <select value={row.col1} onChange={(e) => handleCol1Change(e, index)}>
                    <option value="">Select an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                )}
              </td>
              <td>
                {index === rows.length - 1 ? (
                  row.col2
                ) : (
                  <select value={row.col2} onChange={(e) => handleCol2Change(e, index)}>
                    <option value="">Select an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={handleAddRow}>Add Row</Button>
    </>
  );
};

export default DynamicTable;