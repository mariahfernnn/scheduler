import React from "react";
// import classnames from 'classnames';
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const days = props.days.map(day => {
  return (
  <ul key={day.name}>
    <DayListItem 
      name={day.name} 
      spots={day.spots} 
      selected={day.name === props.day}
      setDay={props.setDay}  />
  </ul>
    );
  })
  return days;
}
