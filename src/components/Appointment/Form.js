import React, { useState } from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, toggleError] = useState(false);

  // Assisted by Vasily Klimkin(mentor)
  const onSave = () => {
    if (name && interviewer) {
      props.onSave(name, interviewer)
    } else {
      toggleError(true)
  }
}

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
      {error && <h3><font color="red">
        You're missing something!
        </font></h3>}
      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        value={name}
        type="text"
        placeholder="Enter Student Name"
        onChange={e => setName(e.target.value)}
        /*
          This must be a controlled component
        */
      />
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
      <Button confirm onClick={() => onSave()}>Save</Button>
    </section>
  </section>
</main>
  ); 
}