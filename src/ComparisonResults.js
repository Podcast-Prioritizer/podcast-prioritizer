import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import cyclist from "./styles/assets/cyclist.png";
import pedestrian from "./styles/assets/pedestrian.png";

class ComparisonResults extends Component {
  render() {
    const { results, closeResultsProp } = this.props;
    const { podcastTime, bikingTime, walkingTime } = results;

    const formattedPodcastTime = podcastTime
      .split(":")
      .reduce((acc, time) => 60 * acc + +time);
    const formattedWalkingTime = walkingTime
      .split(":")
      .reduce((acc, time) => 60 * acc + +time);
    const formattedBikingTime = bikingTime
      .split(":")
      .reduce((acc, time) => 60 * acc + +time);

    function transportSuggestion(transportationMethod) {
      // Map the classnames that will be output onto the element
      const allTransportMethods = {
        cycling: "ComparisonResults__option",
        pedestrian: "ComparisonResults__option"
      };

      if (
        Math.abs(formattedPodcastTime - formattedWalkingTime) >
        Math.abs(formattedPodcastTime - formattedBikingTime)
      ) {
        allTransportMethods.cycling =
          "ComparisonResults__option ComparisonResults__option--selected";
      } else {
        allTransportMethods.pedestrian =
          "ComparisonResults__option ComparisonResults__option--selected";
      }

      // Return the appropriate classnames
      return allTransportMethods[transportationMethod];
    };

    function printTimeDifference(transportMethod) {
      console.log("transport method", transportMethod);
      console.log("podcast time", formattedPodcastTime);

      const timeDifference = transportMethod - formattedPodcastTime;

      const timeDifferenceMinutes = Math.floor(Math.abs(timeDifference) / 60);
      const timeDifferenceSeconds =
        Math.abs(timeDifference) - timeDifferenceMinutes * 60;

      const pluralize = (count, noun, suffix = "s") =>
        `${count} ${noun}${count !== 1 ? suffix : ""}`;

      const minutesString = timeDifferenceMinutes
        ? pluralize(timeDifferenceMinutes, "minute")
        : "";
      const secondsString = timeDifferenceSeconds
        ? pluralize(timeDifferenceSeconds, "second")
        : "";

      if (transportMethod === formattedPodcastTime) {
        return (
          <span className="ComparisonResults__timeDifference ComparisonResults__timeDifference--exact">
            EXACT MATCH
          </span>
        );
      } else if (timeDifference < 0) {
        return (
          <span className="ComparisonResults__timeDifference ComparisonResults__timeDifference--lower">
            {`-${minutesString} ${secondsString}`}
          </span>
        );
      } else {
        return (
          <span className="ComparisonResults__timeDifference ComparisonResults__timeDifference--higher">
            {`${minutesString} ${secondsString}`}
          </span>
        );
      }
    };

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
                    {printTimeDifference(formattedBikingTime)}
                  </div>

                  <div className="ComparisonResults__details">
                    <p>Podcast length: {podcastTime}</p>
                    <p>Biking time: {bikingTime}</p>
                    <p>Walking time: {walkingTime}</p>
                  </div>

                  <div className={transportSuggestion("pedestrian")}>
                    <img
                      className="ComparisonResults__icon"
                      src={pedestrian}
                      alt="A pedestrian"
                    />
                    {printTimeDifference(formattedWalkingTime)}
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
