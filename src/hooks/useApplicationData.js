import { useReducer, useEffect } from "react";
import axios from "axios";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "../reducers/application";

export default function useApplicationData(props) {
  const checkDay = id => {
    let dayID = null;
    for (const obj of state.days) {
      if (obj.appointments.includes(id)) {
        dayID = obj.id;
      }
    }
    return dayID;
  };

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

  // adds the interview appointment to database when api endpoint is called
  function bookInterview(id, interview, remainingSpots = false) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    // when an interview is booked, 1 spot is deduced from that day
    const days = state.days.map(day => {
      return remainingSpots
        ? day.id === checkDay(id)
          ? { ...day, spots: day.spots - 1 }
          : { ...day }
        : { ...day };
    });
    return axios.put(`/api/appointments/${id}`, { interview }).then(res => {
      dispatch({
        type: SET_INTERVIEW,
        appointments,
        days
      });
    });
  }
  // delete selected interview appointment from database when called api endpoint is called
  function cancelInterview(id) {
    const interview = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: interview
    };

    // when an interview is deleted, 1 spot is added to that day
    const days = state.days.map(day => {
      return day.id === checkDay(id)
        ? { ...day, spots: day.spots + 1 }
        : { ...day };
    });

    return axios.delete(`/api/appointments/${id}`).then(res => {
      dispatch({
        type: SET_INTERVIEW,
        appointments,
        days
      });
    });
  }

  //update appointment spots post-render * similar to componentDidUpdate(). This is an alternative method to update spots, which calls the api when state.appointments changes state
  // useEffect(() => {
  //   axios
  //     .get("/api/days")
  //     .then(res => dispatch({ type: SET_DAYS, value: res.data }));
  // }, [state.appointments])

  return { state, setDay, bookInterview, cancelInterview };
}
