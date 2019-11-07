import React, { useState } from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer, props.isSave);
  }

  /*
  This version prevents the user from booking an interview if either:
    - The student name is missing
    - An interviewer has not been selected
    
    function validate() {
      if (name && interviewer) {
        setError("");
        props.onSave(name, interviewer, props.isSave);
      } else {
        setError("Must enter a name and select an interviewer!");
      }
    }
  */
    
  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  const cancel = () => {
    reset(props.onCancel())
  }
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        value={name}
        type="text"
        placeholder="Enter Student Name"
        onChange={e => setName(e.target.value)}
        data-testid="student-name-input"
        /*
          This must be a controlled component
        */
      />
      <section className="appointment__validation">{error}</section>
    </form>
    <InterviewerList 
      interviewers={props.interviewers} 
      value={interviewer} 
      onChange={setInterviewer}
      selected={props.interviewer} 
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={cancel} danger>Cancel</Button>
      <Button confirm onClick={() => validate()}>Save</Button>
    </section>
  </section>
</main>
  ); 
}