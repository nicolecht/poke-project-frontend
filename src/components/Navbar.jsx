import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import { Navbar, Nav, Container, Button } from "react-bootstrap";

const mainNavbar = ({ logout, isAuthenticated }) => {
  return (
    isAuthenticated && (
      <Navbar bg="light" expand="sm">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <>
                <Nav.Link href="/" onClick={logout}>
                  Logout
                </Nav.Link>
                <Nav.Link as={Link} to="/pokedex">
                  View Pokedex
                </Nav.Link>
              </>
            </Nav>
            <Button as={Link} to="/catchpokemon" variant="success">
              Catch Pokemon
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { logout })(mainNavbar);