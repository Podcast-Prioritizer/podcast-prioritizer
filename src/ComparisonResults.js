import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";
import cyclist from "./styles/assets/cyclist.png";
import pedestrian from "./styles/assets/pedestrian.png";

class ComparisonResults extends Component {

  transportSuggestion = (transportationMethod) => {
    const allMethods = {
      cycling: "ComparisonResults__item",
      pedestrian: "ComparisonResults__item"
    };
    const { podcastTime, walkingTime, bikingTime } = this.props.results;

    const parsedPodcastTime = parseFloat(podcastTime);
    const parsedBikingTime = parseFloat(bikingTime);
    const parsedWalkingTime = parseFloat(walkingTime);

    console.log(`Parsed pocast time: ${parsedPodcastTime}`);
    console.log(`Parsed biking time: ${parsedBikingTime}`);
    console.log(`Parsed walking time: ${parsedWalkingTime}`);

    if (
      parsedWalkingTime - parsedPodcastTime >
      parsedBikingTime - parsedPodcastTime
    ) {
      allMethods.cycling =
        "ComparisonResults__item ComparisonResults__item--selected";
      console.log("cycle");
    } else {
      allMethods.pedestrian =
        "ComparisonResults__item ComparisonResults__item--selected";
      console.log("walk");
    }
    
    return allMethods[transportationMethod]
  }

  render() {
    const { results, closeResultsProp } = this.props;
    return (
      <>
        <CSSTransition
          in={results.podcastTime}
          timeout={400}
          classNames="show-modal"
          component={null}
          mountOnEnter
          unmountOnExit
        >
          <div className="ModalContainer">
            <section className="ComparisonResults">
              <button
                aria-label="close"
                className="ComparisonResults__button--close"
                onClick={closeResultsProp}
              >
                Close
              </button>
              <ul className="ComparisonResults__list">
                <li className={this.transportSuggestion('cycling')}>
                  <img
                    className="ComparisonResults__icon"
                    src={cyclist}
                    alt="A cyclist"
                  />
                </li>
                <li className={this.transportSuggestion('pedestrian')}>
                  <img
                    className="ComparisonResults__icon"
                    src={pedestrian}
                    alt="A pedestrian"
                  />
                </li>
              </ul>

              <p>Biking time: {results.bikingTime}</p>
              <p>Walking time: {results.walkingTime}</p>
              <p>Podcast time: {results.podcastTime}</p>

              <p className="ComparisonResults__disclaimer">
                We don't advise taking your life in your hands by biking and
                podcasting.
              </p>
            </section>
          </div>
        </CSSTransition>
      </>
    );
  }
}

export default ComparisonResults;
