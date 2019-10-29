import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "components/InterviewerListItem";

export default function InterviewerList(props) {
  const interviewers = props.interviewers.map(interviewer => {
  return (
    <InterviewerListItem
      key={interviewer.id}
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.name === props.interviewer}
      setInterviewer={() => props.setInterviewer(interviewer.id)}/>
    );
  })
  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">{props.name}</h4>
    <ul className="interviewers__list">{interviewers}</ul>
  </section>
  )
}