import { useReducer, useEffect } from "react";
import axios from "axios";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";




export default function useApplicationData(props) {
  
  function reducer(state, action) {
    switch (action.type) {
      case SET_DAY:
        return { ...state, day: action.day }
        case SET_APPLICATION_DATA:
          return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
          case SET_INTERVIEW: {
            const appointment = {
              ...state.appointments[action.id],
              interview: { ...action.interview }
            };
            const appointments = {
              ...state.appointments,
              [action.id]: appointment
            };
            return {
              ...state, appointments 
            }
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
        })
        
        // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });



  const setDay = day => dispatch({ type: SET_DAY, day });

  const bookInterview = (id, interview) => {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: { ...interview }
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    return axios({
      method: 'PUT',
      url: `/api/appointments/${id}`,
      data: { interview }
    })
    .then(() => dispatch({ type: SET_INTERVIEW, id, interview }))
  };

  const cancelInterview = (id) => {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null 
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    return axios({
      method: 'DELETE',
      url: `/api/appointments/${id}`,
    })
    .then(() => dispatch({ type: SET_INTERVIEW, interview: null }))
  }

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ])
  .then(all => dispatch({ type: SET_APPLICATION_DATA, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
  },[])
  return  { state, setDay, bookInterview, cancelInterview }
}
