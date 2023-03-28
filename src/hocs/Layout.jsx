import React, { useEffect } from "react";
import MainNavbar from "../components/Navbar";
import { connect } from "react-redux";
import { checkAuthenticated, load_user } from "../actions/auth";

const Layout = (props) => {
  useEffect(() => {
    props.checkAuthenticated();
    props.load_user();
  }, []);

  return (
    <div>
      <MainNavbar />
      {props.children}
    </div>
  );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
