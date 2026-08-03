import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>404</h1>
      <p>Page Not Found</p>

      <Link to="/login">
        Go to Login
      </Link>
    </div>
  );
}

export default NotFound;