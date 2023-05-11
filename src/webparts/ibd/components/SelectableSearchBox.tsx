import * as React from "react";
import { useState } from "react";
import { Form, ListGroup } from "react-bootstrap";

interface ISelectableSearchBox {
  options: any;
  setInstituteName: any;
}

const SelectableSearchBox: React.FC<ISelectableSearchBox> = ({
  options,
  setInstituteName,
}) => {
  const [searchText, setSearchText] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showList, setShowList] = useState(false);

  React.useEffect(()=>{
    setFilteredOptions(options)
  },[options])

  const handleSearchChange = (event: any) => {
    console.log(event.target.value)
    const searchText = event.target.value;
    setSearchText(searchText);

    const filteredOptions = options.filter((option: any) =>
      option.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredOptions(filteredOptions);
  };

  const handleSelect = (option?: any) => {
    if(option)
    {setSearchText(option);
    setInstituteName(option);
    }
    setShowList(false);
  };

  console.log(showList,filteredOptions)

  return (
    <>
      <Form.Group controlId="instituteName">
        <Form.Label>Institute Name: </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Institute Name"
          value={searchText}
          onChange={handleSearchChange}
          onFocus={() => setShowList(true)}
          onBlur={()=>handleSelect()}
        />
        {showList && (
          <ListGroup className="searchList">
            {filteredOptions.map((option: any) => (
              <ListGroup.Item
                className="searchListItem"
                key={option}
                active={option === searchText}
                onMouseDown={() => handleSelect(option)}
              >
                {option}
              </ListGroup.Item>
            ))}
            {!filteredOptions?.length && <ListGroup.Item className="blueItalicText">
                No matches Found! This Institute Name will be added as a new entry!
              </ListGroup.Item>}
          </ListGroup>
        )}
      </Form.Group>
    </>
  );
};

export default SelectableSearchBox;
