import React from "react";

import "components/Appointment/styles.scss";

import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import StatusSaving from "components/Appointment/StatusSaving";
import Error from "components/Appointment/Error";
import ErrorSaving from "components/Appointment/ErrorSaving";

import useVisualMode from "hooks/useVisualMode";


export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

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
      .catch(() => transition(ERROR_SAVE, true));
    }
    function onDelete() {
      transition(DELETING, true)
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
    }
    function onEdit() {
      transition(EDIT)
    }
  return (
    <article className="appointment" data-testid="appointment">
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
          interviewer={props.interviewers && props.interview.interviewer.id}
          onSave={onSave}
          onCancel={onCancel}
        />
      }
      {mode === CONFIRM && props.interview &&
        <Confirm
          message="Delete the appointment?"
          onConfirm={onDelete}
          onCancel={() => transition(SHOW)}
        />
      }
      {mode === SAVING &&
        <StatusSaving 
          message="Saving"
        />
      }
      {mode === ERROR_SAVE &&
        <ErrorSaving 
          message="Could not save appointment!"
          onClose={() => transition(EMPTY)}
        />
      }
      {mode === DELETING &&
        <Status
          message="Deleting"
        />
      }
      {mode === ERROR_DELETE &&
        <Error
          message="Could not delete appointment."
          onClose={() => transition(CONFIRM)}
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

