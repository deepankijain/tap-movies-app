import { Form, Button } from "react-bootstrap";

const SearchBar = ({ fetchMovies, setSearchText }) => {
  const onChangeSearchText = (event) => {
    setSearchText(event.target.value);
  };

  const onKeyPressSearchText = (event) => {
    if (event.charCode === 13) {
      fetchMovies();
    }
  };

  return (
    <div className="d-flex">
      <Form.Control
        type="text"
        placeholder="Search for a movie..."
        onChange={onChangeSearchText}
        onKeyPress={onKeyPressSearchText}
      />
      <Button variant="primary" className="ms-2" onClick={fetchMovies}>
        Search
      </Button>
      <Button variant="success" className="ms-2" onClick={fetchMovies}>
        Refresh
      </Button>
    </div>
  );
};

export default SearchBar;
