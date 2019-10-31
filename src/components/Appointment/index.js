import React from 'react'

//COMPONENTS
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";


import "./styles.scss";

import useVisualMode from "hooks/useVisualMode";

//CONSTRANTS
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";


export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  //Save the interview object 
  async function save(name, interviewer) {
    const interview = { student: name, interviewer };
    transition(SAVING);
    await props.bookInterview(props.id, interview);
    transition(SHOW);
  };

  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* { props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} />  : <Empty /> } */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
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
      { mode === SAVING && <Status /> }
    </article>
  );
}
