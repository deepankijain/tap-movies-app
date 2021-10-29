import { useEffect, useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  const history = useHistory();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await axios(
        `http://localhost:4000/api/movies?searchText=${searchText}`
      );
      setLoading(false);
      setMovies(response.data);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const onClickViewMovie = ({ id }) => {
    history.push(`/${id}`);
  };
  return (
    <>
      <SearchBar fetchMovies={fetchMovies} setSearchText={setSearchText} />
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Loader />
      ) : (
        <div className="d-flex flex-wrap">
          {movies.map((movie) => {
            const { id, title } = movie;
            return (
              <Card className="m-2 movie-card" key={id}>
                <Card.Body>
                  <Card.Title className="movie-title">{title}</Card.Title>
                  <Card.Text>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  </Card.Text>
                  <Button
                    onClick={() => onClickViewMovie(movie)}
                    variant="success"
                  >
                    View Movie
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Home;
