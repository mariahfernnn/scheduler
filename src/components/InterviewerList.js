import React from "react";
import PropTypes from "prop-types";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

/* 
Validating Props:
- validate that value = a Number 
- and onChange = a function that is required
*/

InterviewerList.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired
}

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewer => {
  return (
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.value}
      setInterviewer={() => props.onChange(interviewer.id)}/>
    )
  })
  return (
  <section className={interviewers}>
    <p>Interviewer</p>
    <h4 className="interviewers__header text--light">{props.name}</h4>
    <ul className="interviewers__list">{interviewers}</ul>
  </section>
  )
}