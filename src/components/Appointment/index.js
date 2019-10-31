import React from 'react'

//COMPONENTS
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";


import "./styles.scss";

import useVisualMode from "hooks/useVisualMode";

//CONSTRANTS
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING"
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  //Save the interview object 
  const save = async (name, interviewer) => {
    transition(SAVING);
    const interview = { student: name, interviewer };
    await props.bookInterview(props.id, interview);
    transition(SHOW);
  };

  const onDelete = async () => {
    transition(DELETING);
    await props.cancelInterview(props.id)
    transition(EMPTY);

  } 
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          name={props.name}
          interviewer={props.interviewer}
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back}
        />
      )}
      { mode === SAVING && <Status message="Saving" /> }
      { mode === DELETING && <Status message="Deleting" /> }
      { mode === CONFIRM && (
        <Confirm  
          message="Are you sure you would like to delete?" 
          onConfirm={onDelete}
          onCancel={back}
        />
      )}
    </article>
  );
}
