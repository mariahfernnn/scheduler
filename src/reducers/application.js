/*
Filling the Gaps - Interview Scheduler Assignment
*/


// assisted by Michael Fich(mentor) - added .day to line 22
export default function reducer(state, action) {
  const SET_DAY = "SET_DAY";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SCHED_API = "SCHED_API";

  if (action.type === SET_DAY) {
    return { ...state, day: action.payload.day };
  } else if (action.type === SET_INTERVIEW) {
    return {...state, appointments: action.appointments, days: action.days};
  } else if (action.type === SCHED_API) {
    return {...state, ...action.payload}
  } else {
    console.log(`Tried to reduce with unsupported action type: ${action.type}`)
  }
  return {
    SET_DAY,
    SET_INTERVIEW,
    SCHED_API
  }
}