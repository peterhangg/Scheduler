import React, { useState } from "react";
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState(false);
  
  // reset form
  const reset = () => {
    setName("");
    setInterviewer(null);
  };
  
  //cancel form
  const cancel = () => {
    reset();
    props.onCancel();
  };

  // error handling on form submission, user must fill out both name and select interviewer
  const validation = () => {
    if (name && interviewer) {
      setError( prev => {
        props.onSave(name, interviewer);
        return false
      })
    } else {
      setError(true);
    }
  };

  return (
    <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit = {event => event.preventDefault()}>
        { error && (<p>Error, please fill out the entire form!</p>)}
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          type="text"
          placeholder="Enter Student Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </form>
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={() => validation()}>Save</Button>
      </section>
    </section>
  </main>  
  );
} 