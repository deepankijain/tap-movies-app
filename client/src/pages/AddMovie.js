import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useHistory } from "react-router";
import axios from "axios";

const AddMovie = () => {
  const [formValues, setFormValues] = useState({});
  const [error, setError] = useState(null);

  const history = useHistory();

  const onChangeFormField = (event) => {
    const { value, name, type } = event.target;

    setFormValues({
      ...formValues,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const onClickSubmit = async () => {
    try {
      await axios({
        method: "POST",
        url: "http://localhost:4000/api/movies",
        data: formValues,
      });
      setError(null);
      history.push("/");
    } catch (error) {
      setError(error.message);
    }
    console.log(formValues);
  };
  return (
    <Card>
      {error && <Alert>{error}</Alert>}
      <Card.Header>
        <h4>Add Movie</h4>
      </Card.Header>
      <Card.Body>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Movie Title</Form.Label>
          <Form.Control type="text" name="title" onChange={onChangeFormField} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="rating">
          <Form.Label>Movie Rating</Form.Label>
          <Form.Control
            type="number"
            name="rating"
            onChange={onChangeFormField}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="plot">
          <Form.Label>Movie Plot</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="plot"
            onChange={onChangeFormField}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="poster">
          <Form.Label>Movie Poster</Form.Label>
          <Form.Control
            type="text"
            name="poster"
            onChange={onChangeFormField}
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={onClickSubmit}>
          Submit
        </Button>
      </Card.Body>
    </Card>
  );
};

export default AddMovie;
