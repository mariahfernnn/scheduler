export function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(days => days.name === day);
  const dayAppts = filteredDays[0];

  if (!dayAppts || dayAppts.length === 0) {
    return [];
  } else {
    const appt = dayAppts.appointments.map(id => 
      state.appointments[id]
    )
    return appt;
  }
}

/*
- Create a function getInterview(state, interview)
- Should return a new obj containing the interview data when we pass it an obj that contains the interviewer
- Otherwise - return null
*/

// Assisted by Guy Tonye(mentor)
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  return {
    student : interview.student,
    interviewer : state.interviewers[String(interview.interviewer)]
  }
}