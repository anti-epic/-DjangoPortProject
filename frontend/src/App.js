import React, { Component } from "react";
import { render } from "react-dom";
import { Routes ,Route } from 'react-router-dom';
import './App.css';
import HomePage from "./components/HomePage";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
function App() {
    return (
        <>
          <Navigation />
          <Routes>
          <Route path='/' element={<HomePage/>} />
          </Routes>
          <Footer />

      </>
    );
}

export default App;
