import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

class MapQuestSearch extends Component {
    constructor() {
        super();
        this.setState = {
            userDirectionInput: '',
            userStartingPoint: '',
            userEndPoint: ''
        };
    }
// FUNCTION ====================================
//WATCH FORM FOR CHANGE WHEN USER ENTERS SOMETHING
//PASS TO PARENT COMPONENT FOR AXIOS CALL
   
    render() {

        const startingPointFunction = (event) =>
        this.props.getUserStartingPointProp(event, this.state.userStartingPoint)

        const endPointFunction = (event) => this.props.getUserEndPointProp(event, this.state.userEndPoint)

//RETURN ========================================== 
// CREATE FORM FOR USER TO INPUT ADDRESSES

        return (
          <div className="MapQuest__container">
            <div className="wrapper">
              <h2 className="MapQuest__mainHeading">
                Input your starting point and desired destination
              </h2>
              <div className="MapQuest__infoArea">
                <form action="" className="MapQuest__form">
                  <label
                    className="visuallyHidden"
                    htmlFor="MapQuest__startingPoint"
                  >
                    Starting Point
                  </label>
                  <input
                    className="MapQuest__startingPoint"
                    id="MapQuest__startingPoint"
                    type="text"
                    autoFocus={true}
                    placeholder="Enter address"
                  />

                  <label
                    className="visuallyHidden"
                    htmlFor="MapQuest__endPoint"
                  >
                    Destination
                  </label>
                  <input
                    className="MapQuest__endPoint"
                    id="MapQuest__endPoint"
                    type="text"
                    autoFocus={true}
                    placeholder="Enter address"
                    /> 
                
                  <button type="submit" className="MapQuest__submitBtn" 
                  onClick={event => {
                          this.props.mapQuestSearchRequest(event, this.state.userDirectionInput);
                          console.log("yay! you clicked!");
                      }} 
                    >Submit
                  </button>
                </form>
                 
              </div>
            </div>
          </div>
        );
    }
}

// EXPORT =====================================
export default MapQuestSearch;
