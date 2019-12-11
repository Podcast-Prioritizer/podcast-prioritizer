import React, { Component } from 'react';
import "./styles/App.scss";
import logo from './styles/assets/logo.png'

class Header extends Component {
    render() {
        return (
          <div className="Header">
            <div className="Header__displayArea">
              
              <div className="wrapper">
                <div className="Header__linksAndLogo">
                  <img className="Header__logo" src={ logo } alt="Paths and Podcasts Logo"/>
                </div>
              </div>

              <div className="Header__headerContent">

                <div className="wrapper">
                  <h1 className="Header__mainHeader">Paths and Podcasts</h1>
  
                  <p className="Header__tagline">
                    Who said your commute has to be boring?
                  </p>
                </div>

              </div>
            </div>
          </div>
        );
    }
}

// EXPORT ========================================
export default Header;
