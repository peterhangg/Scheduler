import React, { useState, useEffect } from "react";
import DayList from "./DayList"
import "components/Application.scss";
import Appointment from "components/Appointment";
import axios from "axios"



const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 2,
    time: "2pm",
  },
  {
    id: 3,
    time: "3pm",
    interview: {
      student: "Archie Cohen",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  // days is an array of day
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get(`/api/days`)
      .then(res => setDays(res.data))
  })
  // iterate over all appointments
  const allAppointment = appointments.map(appointment => {
    return (
      <Appointment 
        key={appointment.id} 
        {...appointment} 
      />
    )
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
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {allAppointment}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
