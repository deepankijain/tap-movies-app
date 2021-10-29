import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Alert, Card } from "react-bootstrap";
import moment from "moment";

import Loader from "../components/Loader";

const MovieDetails = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [details, setDetails] = useState({});

  const { movieId } = useParams();

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      const response = await axios({
        method: "GET",
        url: `http://localhost:4000/api/movies/${movieId}`,
      });
      setLoading(false);
      setDetails(response.data.movie);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  console.log(details);
  return (
    <Card className="w-75 m-auto">
      {error && <Alert variant="danger">{error}</Alert>}
      {loading ? (
        <Loader />
      ) : (
        <>
          <Card.Header className="movie-details-card-header text-white">
            <h1>{details.title}</h1>
          </Card.Header>
          <Card.Body>
            <Card.Img variant="top" src={details.poster} />
            <Card.Text className="mt-3">Plot : {details.plot}</Card.Text>
            <Card.Text>
              Rating: <span className="fw-bold"> {details.rating}</span>
            </Card.Text>
            <Card.Text>
              Created At:{" "}
              <span className="fw-bold">
                {moment(details.createdAt).format("DD-MMM-YYYY")}
              </span>
            </Card.Text>
            <Card.Text>
              Updated At:{" "}
              <span className="fw-bold">
                {" "}
                {moment(details.updatedAt).format("DD-MMM-YYYY")}
              </span>
            </Card.Text>
          </Card.Body>
        </>
      )}
    </Card>
  );
};

export default MovieDetails;
