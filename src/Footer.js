import React, { Component } from "react";
import "./App.css";
// import logo from "./styles/assets/logo.png";

import { NavLink } from "react-router-dom";

class Footer extends Component {

  render() {

    
    return (
      <div className="Footer">
        <div className="wrapper">
            <p className="Footer__copy">
              Paths and Podcasts  |  Copyright 2019  |  Russell Bentulan, Alissa Cheng,
              Corey Derouin and James Lewis
            </p>
        </div>
      </div>
    );
  }
}

// EXPORT ========================================
export default Footer;
