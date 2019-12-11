import React, { Component } from "react";
import readableTime from './readableTime';
import { CSSTransition } from "react-transition-group";

import cyclist from "./styles/assets/cyclist.png";
import pedestrian from "./styles/assets/pedestrian.png";

class ComparisonResults extends Component {

  render() {
    const { results, closeResultsProp } = this.props;
    const { podcastTime, bikingTime, walkingTime, map } = results;

    // Adds the '--selected' modifier to the transportation method that's closest to the travel time
    function transportSuggestion(transportationMethod) {
      // Map the classnames that will be output onto the element
      const allTransportMethods = {
        cycling: "ComparisonResults__option",
        pedestrian: "ComparisonResults__option"
      };

      if (
        Math.abs(podcastTime - walkingTime) > Math.abs(podcastTime - bikingTime)
      ) {
        allTransportMethods.cycling =
          "ComparisonResults__option ComparisonResults__option--selected";
      } else {
        allTransportMethods.pedestrian =
          "ComparisonResults__option ComparisonResults__option--selected";
      }

      // Return the appropriate classnames
      return allTransportMethods[transportationMethod];
    }

    // Takes the travel time and compares it to the podcast length
    const printTimeDifference = transportMethod => {
      const timeDifference = transportMethod - podcastTime;

      if (transportMethod === podcastTime) {
        return (
          <span className="ComparisonResults__timeDifference ComparisonResults__timeDifference--exact">
            EXACT MATCH
          </span>
        );
      } else if (timeDifference < 0) {
        return (
          <span className="ComparisonResults__timeDifference ComparisonResults__timeDifference--lower">
            -{readableTime(timeDifference)}
          </span>
        );
      } else {
        return (
          <span className="ComparisonResults__timeDifference ComparisonResults__timeDifference--higher">
            +{readableTime(timeDifference)}
          </span>
        );
      }
    };

    return (
      <>
        <CSSTransition
          in={podcastTime ? true : false}
          timeout={400}
          classNames="show-modal"
          component={null}
          mountOnEnter
          unmountOnExit
        >
          <div className="ModalContainer">
            <section className="ComparisonResults">
              <div className="wrapper">
                <button
                  aria-label="close modal"
                  className="ComparisonResults__button--close"
                  onClick={closeResultsProp}
                >
                  Close
                </button>

                <h2 className="ComparisonResults__heading">
                  You should{" "}
                  {Math.abs(podcastTime - walkingTime) >
                  Math.abs(podcastTime - bikingTime)
                    ? "cycle"
                    : "walk"}
                </h2>

                <section className="ComparisonResults__options">
                  <div className={transportSuggestion("cycling")}>
                    <img
                      className="ComparisonResults__icon"
                      src={cyclist}
                      alt="A cyclist"
                    />
                    {printTimeDifference(bikingTime)}
                  </div>

                  <div className="ComparisonResults__details">
                    <p>Podcast length: {readableTime(podcastTime)}</p>
                    <p>Biking time: {readableTime(bikingTime)}</p>
                    <p>Walking time: {readableTime(walkingTime)}</p>
                  </div>

                  <div className={transportSuggestion("pedestrian")}>
                    <img
                      className="ComparisonResults__icon"
                      src={pedestrian}
                      alt="A pedestrian"
                    />
                    {printTimeDifference(walkingTime)}
                  </div>
                </section>

                <section className="ComparisonResults__map">
                  <img src={map} alt="" />
                </section>

                <p className="ComparisonResults__disclaimer">
                  We don't advise taking your life in your hands by biking and
                  podcasting.
                </p>
              </div>
            </section>
          </div>
        </CSSTransition>
      </>
    );
  }
}

export default ComparisonResults;
