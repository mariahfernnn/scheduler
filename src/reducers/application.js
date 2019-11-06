/*
Filling the Gaps - Interview Scheduler Assignment
*/

export const SET_DAY = "SET_DAY";
export const SET_INTERVIEW = "SET_INTERVIEW";
export const SCHED_API = "SCHED_API";

// assisted by Michael Fich(mentor) - added .day to line 22
export default function reducer(state, action) {

  if (action.type === SET_DAY) {
    return { ...state, day: action.payload.day };
  } else if (action.type === SET_INTERVIEW) {
    return {...state, appointments: action.appointments, days: action.days};
  } else if (action.type === SCHED_API) {
    return {...state, ...action.payload}
  } else {
    throw new Error ("Tried to reduce with unsupported action type")
  }
  // return {
  //   SET_DAY,
  //   SET_INTERVIEW,
  //   SCHED_API
  // }
}