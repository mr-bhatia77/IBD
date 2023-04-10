import * as React from "react";
import { useState, useEffect } from "react";
import { Form, FormControl, Row } from "react-bootstrap";

export function SearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const searchResults = onSearch(query);
    setResults(searchResults);
  }, [query]);

  const onSearch = (query: string) => {
    // In this example, we're simply returning an array of search results that match the query.
    // You can replace this code with your own search logic that returns search results from a database or API.

    const results = [
      "Apple",
      "Banana",
      "Cherry",
      "Durian",
      "Elderberry",
      "Fig",
      "Grape",
      "Honeydew",
      "Kiwi",
      "Lemon",
      "Mango",
      "Nectarine",
      "Orange",
      "Papaya",
      "Quince",
      "Raspberry",
      "Strawberry",
      "Tangerine",
      "Ugli fruit",
      "Vanilla bean",
      "Watermelon",
      "Xigua (Chinese watermelon)",
      "Yellow passionfruit",
      "Zucchini",
    ];

    const filteredResults = [];

    for (let i = 0; i < results.length; i++) {
      const result = results[i];

      if (result.toLowerCase().indexOf(query.toLowerCase()) !== -1) {
        filteredResults.push(result);
      }
    }

    return filteredResults;
  };

  return (
    <Form>
      <FormControl
        type="text"
        placeholder="Search"
        className="mr-sm-2"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <Row>
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </Row>
    </Form>
  );
}
