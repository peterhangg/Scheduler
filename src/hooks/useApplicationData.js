import { useReducer, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_DAYS = "SET_DAYS";

  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.value };
      case SET_APPLICATION_DATA:
        return { ...state, ...action.value };
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

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then(all => {
      dispatch({
        type: SET_APPLICATION_DATA,
        value: {
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }
      });
    });
  }, []);

  const setDay = day => dispatch({ type: SET_DAY, value: day });

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(res => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };

      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      dispatch({ type: SET_INTERVIEW, value: appointments });
    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then(res => {
      const interview = {
        ...state.appointments[id],
        interview: null
      };

      const appointments = {
        ...state.appointments,
        [id]: interview
      };

      dispatch({ type: SET_INTERVIEW, value: appointments });
    });
  }

  //update appointment spots
  useEffect(() => {
    axios
      .get("/api/days")
      .then(res => dispatch({ type: SET_DAYS, value: res.data }));
  }, [state.appointments]);

  return { state, setDay, bookInterview, cancelInterview };
}
