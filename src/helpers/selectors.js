export default function getAppointmentsForDay(state, day) {
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