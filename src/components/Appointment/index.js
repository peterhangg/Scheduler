import React from 'react'

//COMPONENTS
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";

import "./styles.scss";

import useVisualMode from "hooks/useVisualMode";

//CONSTRANTS
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE ="CREATE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
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
          interviewers={[]}
          onSave={props.onSave}
          onCancel={back}
        />
      )}
    </article>
  );
}
