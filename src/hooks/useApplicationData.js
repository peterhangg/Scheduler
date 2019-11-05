import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_DAYS = "SET_DAYS";

function reducer(state, action) {
  // console.log("This is the current state ----->", state);
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.value };
    case SET_APPLICATION_DATA:
      return { 
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW: {
      return { ...state, appointments: action.value };
    }
    case SET_DAYS: {
      return { ...state, days: action.value };
    }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

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
