import React from "react";
import DayList from "./DayList";
import "components/Application.scss";
import Appointment from "components/Appointment";

// Helper functions 
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay
} from "../helpers/selectors";

// Reducer hook for state management 
import useApplicationData from "../hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  // Retrieve an array of appointments for each day
  const appointments = getAppointmentsForDay(state, state.day);
  // Retrieve an array of interviewers for each day
  const interviewers = getInterviewersForDay(state, state.day);
  //
  const schedule = appointments.map(appointment => {
    // generate a list of appointments
    const interview = getInterview(state, appointment.interview);

    return (
      // returns all appointment component for every appointment from the schedule array we mapped
      <Appointment
        key={appointment.id}
        // id={appointment.id}
        // time={appointment.time}
        {...appointment}
        interviewers={interviewers}
        interview={interview}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
          {schedule}
          <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
