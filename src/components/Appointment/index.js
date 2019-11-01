import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import StatusSaving from "components/Appointment/StatusSaving";

import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  // props.bookInterview('id', 'interview')

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );
    
    function onAdd() {
      transition(CREATE)
    }
    function onCancel() {
      back()
    }
    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      }
      transition(SAVING)
      props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
    }
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      <div>
      {mode === EMPTY && <Empty onAdd={onAdd}/>}
      {mode === CREATE &&
        <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={onCancel}
        />
      }
      {mode === SAVING &&
        <StatusSaving 
        message="Saving"
        />
        }
      {mode === SHOW && props.interview && ( 
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      )}
      </div>
    </article>
  );
}

