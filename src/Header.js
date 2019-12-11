import React, { Component } from 'react';
import "./styles/App.scss";
import logo from './styles/assets/logo.png'

class Header extends Component {
    render() {
        return (
          <div className="Header">
            <div className="Header__displayArea">
              <div className="Header__headerContent">
                <div className="wrapper">
                  <div className="Header__linksAndLogo">
                    <img
                      className="Header__logo"
                      src={logo}
                      alt="Paths and Podcasts Logo"
                      title="Paths and Podcasts"
                    />
                  </div>

                  <h2 className="Header__tagline">
                    Who said your commute has to be boring?
                  </h2>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

// EXPORT ========================================
export default Header;
