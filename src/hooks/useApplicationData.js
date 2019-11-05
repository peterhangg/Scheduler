import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW, SET_DAYS } from "../reducers/application";

export default function useApplicationData(props) {
  // Initialize state
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // set application data on load, *similar to componentDidMount()
  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data
      });
    });
  }, []);

  const setDay = day => dispatch({ type: SET_DAY, value: day });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // adds the interview appointment to database when api endpoint is called
    return axios.put(`/api/appointments/${id}`, { interview }).then(res => {
      dispatch({ type: SET_INTERVIEW, value: appointments });
    });
  }

  function cancelInterview(id) {
    const interview = {
      ...state.appointments[id],
      interview: null
    };
    
    const appointments = {
      ...state.appointments,
      [id]: interview
    };
    // delete selected interview appointment from database when called api endpoint is called
    return axios.delete(`/api/appointments/${id}`).then(res => {
      dispatch({ type: SET_INTERVIEW, value: appointments });
    });
  }

  //update appointment spots post-render * similar to componentDidUpdate()
  useEffect(() => {
    axios
      .get("/api/days")
      .then(res => dispatch({ type: SET_DAYS, value: res.data }));
  }, [state.appointments]) 

  return { state, setDay, bookInterview, cancelInterview };
}
