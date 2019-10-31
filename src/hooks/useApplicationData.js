import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios({
      method: 'PUT',
      url: `/api/appointments/${id}`,
      data: { interview }
    })
    .then(() => setState({ ...state, appointments }))
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null 
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios({
      method: 'DELETE',
      url: `/api/appointments/${id}`,
    })
    .then(() => setState({ ...state, appointments }))
  }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ])
    .then(all => setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data })));
  },[])
  return  { state, setDay, bookInterview, cancelInterview }
}
