import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="my-5">
      <div className="card card-body bg-light">
        <h1 className="display-4">Hello Reluvate!</h1>
        <p className="lead">This is a simple example of a Bootstrap jumbotron.</p>
        <hr className="my-4" />
        <p>
          Click the Login button to proceed.
        </p>
        <Link className="btn btn-primary btn-lg" to="/login" role="button">
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
