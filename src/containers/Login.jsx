import React, { useState, useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    login(username, password);
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/pokedex");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card card-body p-5 bg-light border-0 shadow rounded-3" style={{ maxWidth: "500px" }}>
        <h1>Sign In</h1>
        <p>Sign into your account</p>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group my-3">
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength={6}
              required
            />
          </div>
          <button className="btn btn-success" type="submit">
            Login
          </button>
          <p className="mt-3">
            Don't have an account? <Link to="/signup">Register Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
