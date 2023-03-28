import { useState, React } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import SignUp from "./containers/SignUp";
import Pokedex from "./containers/Pokedex";
import Layout from "./hocs/Layout";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CatchPokemon from "./containers/CatchPokemon";
import { createPopper } from '@popperjs/core';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <div className="container">
            <ToastContainer
              position="bottom-right"
              autoClose={2000}
              closeOnClick
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/pokedex" element={<Pokedex />} />
              <Route path="/catchpokemon" element={<CatchPokemon />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;