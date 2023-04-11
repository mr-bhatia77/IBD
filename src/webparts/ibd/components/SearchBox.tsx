import * as React from "react";
import Select from "react-select";
import { Form } from "react-bootstrap";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
  { value: "peach", label: "Peach" },
  { value: "pear", label: "Pear" }
];

function SearchBox() {
  return (
    <Form.Group>
      <Select options={options} isSearchable />
    </Form.Group>
  );
}

export default SearchBox;
