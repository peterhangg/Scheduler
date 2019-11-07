export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";
// export const SET_DAYS = "SET_DAYS";

export default function reducer(state, action) {
  // console.log("This is the current state ----->", state);
  switch (action.type) {
    // case SET_DAY:
    //   return { ...state, day: action.value };
    case SET_APPLICATION_DATA:
      return { 
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };
    case SET_INTERVIEW: {
      return { ...state, appointments: action.appointments, days: action.days };
    }
    // case SET_DAYS: {
    //   return { ...state, days: action.value };
    // }
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}