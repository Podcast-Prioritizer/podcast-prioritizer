import React, { Component } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

import "./App.css";

class MapQuestSearch extends Component {
  displayMap = (userStart, userEnd) => {
    return Axios({
      url: "https://www.mapquestapi.com/staticmap/v5/map",
      params: {
        key: this.props.apiKey,
        format: "png",
        start: userStart,
        end: userEnd,
        size: "300,200@2x",
        zoom: 12,
        routeColor: "24b62c",
        routeArc: true
      }
    }).then(data => {
      this.props.mapProp(data.request.responseURL);
    });
  };

  // On form submit, take both user inputs and make axios call to retrieve travel time (walking and biking)
  getMapInfo = event => {
    event.preventDefault();

    Axios.all(
      [
        this.makeAxiosCallBike(
          this.refs.userStart.value,
          this.refs.userDestination.value
        ),
        this.makeAxiosCallWalk(
          this.refs.userStart.value,
          this.refs.userDestination.value
        )
      ]
      // When axios data is returned, set locations and formatted time to state
    )
      .then(responseArray => {
        const returnLocationInfo = responseArray[0].data.route.locations;

        let locationObject = {
          startAddress: returnLocationInfo[0].street,
          startCity: returnLocationInfo[0].adminArea5,
          endAddress: returnLocationInfo[1].street,
          endCity: returnLocationInfo[1].adminArea5
        };

        let formattedBikeSeconds = responseArray[0].data.route.formattedTime
          .split(":")
          .reduce((acc, time) => 60 * acc + +time);

        let formattedPedestrianSeconds = responseArray[1].data.route.formattedTime
          .split(":")
          .reduce((acc, time) => 60 * acc + +time);

        this.props.setLocationsProp(locationObject);
        this.props.setBikeTimeProp(formattedBikeSeconds);
        this.props.setWalkTimeProp(formattedPedestrianSeconds);

        this.displayMap(
          returnLocationInfo[0].street,
          returnLocationInfo[1].street
        );
      })
      .catch(error => {
        if (error) {
          Swal.fire({
            title: "Uh-oh!",
            text:
              "Looks like you're not too sure where you're going.  Make sure you have included both a start and a destination address",
            imageUrl: require("./styles/assets/nounAngry.png"),
            imageWidth: 100,
            confirmButtonText: "Let me try again",
            padding: "2rem"
          });
        } else if (error.request) {
          Swal.fire({
            title: "Uh-oh!",
            text:
              "Looks like you're not too sure where you're going.  Make sure you have included both a start and a destination address",
            imageUrl: require("./styles/assets/nounAngry.png"),
            imageWidth: 100,
            confirmButtonText: "Let me try again",
            padding: "2rem"
          });
        } else if (
          this.props.stateProp.bikingTime === "00:00:00" ||
          this.props.stateProps.walkingTime === ""
        ) {
          Swal.fire({
            title: "Uh-oh!",
            text:
              "Looks like you're not too sure where you're going.  Make sure you have included both a start and a destination address",
            imageUrl: require("./styles/assets/nounAngry.png"),
            imageWidth: 100,
            confirmButtonText: "Let me try again",
            padding: "2rem"
          });
        }
      });
  };

  makeAxiosCallBike = (userStart, userDestination) => {
    return Axios({
      url: "https://www.mapquestapi.com/directions/v2/route",
      method: "GET",
      dataType: "json",
      params: {
        key: this.props.apiKey,
        from: userStart,
        to: userDestination,
        routeType: "bicycle"
      }
    });
  };

  makeAxiosCallWalk = (userStart, userDestination) => {
    return Axios({
      url: "https://www.mapquestapi.com/directions/v2/route",
      method: "GET",
      dataType: "json",
      params: {
        key: this.props.apiKey,
        from: userStart,
        to: userDestination,
        routeType: "pedestrian"
      }
    });
  };

  // Autocomplete axios call on input keydown (US only 😫)
  autoCompleteDestination = () => {
    return Axios({
      url: "http://www.mapquestapi.com/search/v3/prediction",
      method: "GET",
      dataType: "json",
      params: {
        key: this.props.apiKey,
        q: this.refs.userDestination.value,
        collection: "address"
      }
    }).then(data => {
      let slicedSuggestionArray = data.data.results.slice(0, 5);

      slicedSuggestionArray.map(suggestion => {
        console.log(suggestion.displayString);
      });
    });
  };

  componentDidMount = () => {
    window.placeSearch({
      key: this.props.apiKey,
      container: document.querySelector("#userStart")
    });

    window.placeSearch({
      key: this.props.apiKey,
      container: document.querySelector("#userDestination")
    });
  };

  render() {
    return (
      <div className="MapQuest__searchArea">
        <div className="wrapper">
          <div className="MapQuest__introContent">
            <h2>Hit the road</h2>
            <p>
              Find the best way to reach your destination. Enter your start
              location and your desired destination.
            </p>
          </div>

          <form className="MapQuest__form" onSubmit={this.getMapInfo}>
            <label htmlFor="userStart" className="visuallyHidden">
              Enter Your Location
            </label>
            <input
              type="search"
              id="userStart"
              placeholder="Enter Your Location"
              ref="userStart"
            />
            <label htmlFor="userDestination" className="visuallyHidden">
              Enter Your Destination
            </label>
            <input
              type="search"
              id="userDestination"
              placeholder="Enter Your Location"
              ref="userDestination"
            />
            <button className="MapQuest__submitBtn" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default MapQuestSearch;
