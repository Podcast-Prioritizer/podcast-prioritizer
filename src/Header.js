import React, { Component } from 'react';
import './App.css';

import { NavLink } from "react-router-dom";

class Header extends Component {
    render() {
        return (
          <div className="Header">
            <nav>
              <NavLink activeClassName="active" to="/home">
                Home
              </NavLink>
              <NavLink activeClassName="active" to="/about">
                About
              </NavLink>
            </nav>

            <h1>Paths and Podcasts</h1>
            
          </div>
        );
    }
}

// EXPORT ========================================
export default Header;
