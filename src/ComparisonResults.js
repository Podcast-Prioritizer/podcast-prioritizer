import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import cyclist from "./styles/assets/cyclist.png";
import pedestrian from "./styles/assets/pedestrian.png";

class ComparisonResults extends Component {
  readableMinutes = (seconds, suffix = "s") => {
    const minutes = Math.round(Math.abs(seconds) / 60);
    return `${minutes} minute${minutes !== 1 ? suffix : ""}`;
  };

  render() {
    const { results, closeResultsProp } = this.props;
    console.log(results);
    const { podcastTime, bikingTime, walkingTime } = results;

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

    const printTimeDifference = (transportMethod) => {
      const timeDifference = transportMethod - podcastTime;

      const minutesDifference = this.readableMinutes(timeDifference);

      if (transportMethod === podcastTime) {
        return (
          <span className="ComparisonResults__timeDifference ComparisonResults__timeDifference--exact">
            EXACT MATCH
          </span>
        );
      } else if (timeDifference < 0) {
        return (
          <span className="ComparisonResults__timeDifference ComparisonResults__timeDifference--lower">
            {`-${minutesDifference}`}
          </span>
        );
      } else {
        return (
          <span className="ComparisonResults__timeDifference ComparisonResults__timeDifference--higher">
            {`${minutesDifference}`}
          </span>
        );
      }
    }

    return (
      <>
        <CSSTransition
          in={podcastTime}
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
                    <p>Podcast length: {this.readableMinutes(podcastTime)}</p>
                    <p>Biking time: {this.readableMinutes(bikingTime)}</p>
                    <p>Walking time: {this.readableMinutes(walkingTime)}</p>
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
