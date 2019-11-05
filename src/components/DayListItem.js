import React from "react";
import classnames from 'classnames';

import "components/DayListItem.scss";

// Assisted by Victoria Johns
export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });
  
  const formatSpots = function(number) {
    if ( number === 0) {
      return "no spots remaining";
    } else if (number === 1) {
      return `${number} spot remaining`;
    } else {
      return `${number} spots remaining`;
    }
  }

  return (
    <li 
    data-testid="day"
    className={dayClass}
    onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
