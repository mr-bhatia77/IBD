import * as React from 'react';
import { useState } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

export default function MyForm() {
    const [fields, setFields] = useState([
        { id: 1, options: ['Option 1', 'Option 2', 'Option 3'] }
    ]);

    const addField = () => {
        const newField = { id: fields.length + 1, options: ['Option 1'] };
        setFields([...fields, newField]);
    };

    const updateOptions = (id: number, newOptions: string[]) => {
        const updatedFields = fields.map(field =>
            field.id === id ? { ...field, options: newOptions } : field
        );
        setFields(updatedFields);
    };

    const deleteField = (id: number) => {
        const updatedFields = fields.filter(field => field.id !== id);
        setFields(updatedFields);
    };

    return (
        <>
        <label className="button-label">Button 1</label>
<input type="radio" id="button1" name="buttons" className="button-input" />

<label className="button-label">Button 2</label>
<input type="radio" id="button2" name="buttons" className="button-input" />

        <Form>
            {fields.map(field => (
                <FormGroup key={field.id} controlId={`formSelect${field.id}`}>
                    <Form.Label>Select a value:</Form.Label>
                    <div className="d-flex align-items-center">
                        <FormControl as="select" className="me-3" onChange={e => updateOptions(field.id, e.target.value.split(','))}>
                            {field.options.map(option => (
                                <option key={option}>{option}</option>
                            ))}
                        </FormControl>
                        <Button variant="danger" onClick={() => deleteField(field.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                            </svg>
                        </Button>
                    </div>
                </FormGroup>
            ))}
            <Button variant="primary" onClick={addField}>
                Add Field
            </Button>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </>
    );
}