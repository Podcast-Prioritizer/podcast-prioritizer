import React from "react";
import readableTime from "./readableTime";
import cyclist from "./styles/assets/cyclist.png";
import pedestrian from "./styles/assets/pedestrian.png";
import { CSSTransition } from "react-transition-group";

function CommuteSidebar(props) {
  const { bikingTime, walkingTime } = props;
  return (
    <CSSTransition
      in={walkingTime ? true : false}
      timeout={400}
      classNames="show-sidebar"
      component={null}
      mountOnEnter
      unmountOnExit
    >
      <aside className="CommuteSidebar">
        <div className="CommuteSidebar__textContainer">
          <p className="CommuteSidebar__time">
            <span className="CommuteSidebar__icon">
              <img
                src={cyclist}
                alt="biking commute length"
                className="CommuteSidebar__img"
              />
            </span>
            {readableTime(bikingTime)}
          </p>

          <p className="CommuteSidebar__time">
            <span className="CommuteSidebar__icon">
              <img
                src={pedestrian}
                alt="walking commute length"
                className="CommuteSidebar__img"
              />
            </span>
            {readableTime(walkingTime)}
          </p>
        </div>
      </aside>
    </CSSTransition>
  );
}

export default CommuteSidebar;
