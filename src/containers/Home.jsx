import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Home = ({ isAuthenticated }) => {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div
        className="card card-body p-5 bg-light border-0 shadow rounded-3"
        style={{ maxWidth: "500px" }}
      >
        <h1 className="display-4">Pokemon Project</h1>
        <p className="lead">Gotta catch 'em all!</p>
        <hr className="mb-3 mt-0" />
        <div className="text-center">
          <Link
            className="btn btn-success w-100 my-2"
            to="/login"
            role="button"
          >
            Login
          </Link>
          <Link
            className="btn btn-success w-100 my-2"
            to="/signup"
            role="button"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Home);
