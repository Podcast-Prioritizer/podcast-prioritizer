import React, { Component } from 'react';
import './App.css';
import logo from './styles/assets/logo.png'

import { NavLink } from "react-router-dom";

class Header extends Component {
    render() {
        return (
          <div className="Header">

            <div className="Header__displayArea">
              
              <img className="Header__logo" src={ logo } alt="Paths and Podcasts Logo"/>

              <div className="Header__headerContent">

                <h1 className="Header__mainHeader">Paths and Podcasts</h1>

                <p className="Header__tagline">
                  Who said your commute has to be boring?
                </p>

              </div>

            </div>
          </div>
        );
    }
}

// EXPORT ========================================
export default Header;
