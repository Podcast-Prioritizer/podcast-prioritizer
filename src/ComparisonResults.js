import React, { Component } from "react";
import { CSSTransition } from "react-transition-group";

class ComparisonResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showResults: false
    };
  }

  // Development function to add the results
  addResultsElement = () => {
    this.setState({
      showResults: true
    });
  };

  // Remove this component
  removeResultsElement = () => {
    this.setState({
      showResults: false
    });
  };

  handleModalClick = e => {
    console.log(e.target);
  };

  render() {
    const { showResults } = this.state;

    return (
      <>
        <button onClick={this.addResultsElement}>
          Click me for results (Development)
        </button>
        <CSSTransition
          in={showResults}
          timeout={400}
          classNames="show-modal"
          component={null}
          mountOnEnter
          unmountOnExit
        >
          <div className="ModalContainer">
            <section
              className="ComparisonResults"
              onClick={this.handleModalClick}
            >
              <button
                aria-label="close"
                className="ComparisonResults__button--close"
                onClick={this.removeResultsElement}
              >
                X
              </button>
              <h2 className="ComparisonResults__heading">
                "Should I walk or bike?"
              </h2>
              <ul className="ComparisonResults__list">
                <li className="ComparisonResults__item">Walk</li>
                <li className="ComparisonResults__item ComparisonResults__item--selected">
                  Bike
                </li>
              </ul>
            </section>
          </div>
        </CSSTransition>
      </>
    );
  }
}

export default ComparisonResults;
