import "./global.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1>Oops! Page not found.</h1>
      <p>
        We couldn't find the page you're looking for. It might have been removed
        or the URL might be incorrect.
      </p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
};

export default PageNotFound;
