import React from "react";
import classnames from 'classnames';
import "components/InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const interviewerClass = classnames("interviewers__item", {
    "interviewers__item--selected": props.selected
    // "interviewers__item--full": props.spot === 0
  });

  const setInterviewer = function(id) {
    if (props.selected === true) {
      return props.id;
    }
  }

  return (
    <li 
    className={interviewerClass}
    >
      <img
        className={setInterviewer}
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  )
}