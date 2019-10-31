const getAppointmentsForDay = (state, day) => {
  const result = [];
  const filteredDay = state.days.filter(days => days.name === day);
  if(filteredDay.length > 0) {
    filteredDay[0].appointments.forEach(appt => {
      if(state.appointments[appt]) {
        result.push(state.appointments[appt])
      }
    });
  }
  return result;
}

const getInterview = (state, interview) => {
  let result = {};
  if(!interview) return null;
  for(let key in state.interviewers) {
    if(Number(key) === interview.interviewer) {
      result = {
        "student": interview.student,
        "interviewer": {
          "id": Number(key),
          "name": state.interviewers[key].name,
          "avatar": state.interviewers[key].avatar
        }
      }
    }
  }
  console.log("This is the interview obj:",result)
  return result;
}

// const getInterview = (state, interview) => {
//   let interviewObj;
//   if (interview) {
//     interviewObj = {...interview, interviewer: state.interviewers[interview.interviewer]};
//   }
//   return interviewObj;
// }

const getInterviewersForDay = (state, day) => {
  const result = [];
  const filteredDay = state.days.filter(days => days.name === day);
  if(filteredDay.length > 0) {
    filteredDay[0].interviewers.forEach(interviewer => {
      if(state.interviewers[interviewer]) {
        result.push(state.interviewers[interviewer])
      }
    });
  }
  console.log("This is all the interviewers:",result)
  return result;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay }
