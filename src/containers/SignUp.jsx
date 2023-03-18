import React, { useState, useEffect } from "react";
import { Link, redirect } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../actions/auth";


const SignUp = ({ signup, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [retypePassword, setRetypePassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    re_password: "",
  });

  const { username, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      signup(username, password, re_password);
      setAccountCreated(true);
    } else setRetypePassword(true);
  };

  let navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated || accountCreated) {
      navigate("/");
    }
  }, [isAuthenticated, accountCreated, navigate]);

  return (
    <div className="card card-body mt-5">
      <h1>Sign Up</h1>
      <p>Create your Account</p>
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
        <div className="form-group my-3">
          <input
            className="form-control"
            type="password"
            placeholder="Retype Password"
            name="re_password"
            value={re_password}
            onChange={(e) => onChange(e)}
            minLength={6}
            required
          />
        </div>
        <div>
          {retypePassword ? (
            <div>
              <p className="text-danger">*Password does not match</p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
        <p className="mt-3">
          Already have an account? <Link to="/login">Login Now</Link>
        </p>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signup })(SignUp);
