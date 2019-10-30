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
  const result = {};
  if(!interview) return null;
  for(let key in state.interviewers) {
    result.student = interview.student
    result.interviewer = state.interviewers[key]
  }
  return result;
}

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
  return result;
}

export { getAppointmentsForDay, getInterview, getInterviewersForDay }