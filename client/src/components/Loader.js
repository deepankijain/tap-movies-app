import { Spinner } from "react-bootstrap";

function Loader() {
  return (
    <div className="mt-1 w-100 d-flex justify-content-center">
      <Spinner animation="border" />;
    </div>
  );
}

export default Loader;
