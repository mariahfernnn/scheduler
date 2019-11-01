import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import StatusSaving from "components/Appointment/StatusSaving";
// import Error from "components/Appointment/Error";
// import ErrorSaving from "components/Appointment/ErrorSaving";

import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );
    
    function onAdd() {
      transition(CREATE)
    }
    function onCancel() {
      back()
    }
    function onSave(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      }
      transition(SAVING)
      props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
    }
    function onDelete() {
      transition(DELETING)
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
    }
    function onEdit() {
      transition(EDIT)
    }
  
  return (
    <article className="appointment">
      <Header time={props.time}/>
      <div>
      {mode === EMPTY && <Empty onAdd={onAdd}/>}
      {mode === CREATE &&
        <Form
          interviewers={props.interviewers}
          onSave={onSave}
          onCancel={onCancel}
        />
      }
      {mode === EDIT && 
        <Form 
          name={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={onSave}
          onCancel={onCancel}
        />
      }
      {mode === CONFIRM && props.interview &&
        <Confirm
          message="Delete the appointment?"
          onConfirm={onDelete}
          onCancel={onCancel}
        />
      }
      {mode === SAVING &&
        <StatusSaving 
          message="Saving"
        />
      }
      {mode === DELETING &&
        <Status
          message="Deleting"
        />
      }
      {mode === SHOW && props.interview && 
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onEdit={onEdit}
          onDelete={() => transition(CONFIRM)}
        />
      }
      </div>
    </article>
  );
}

