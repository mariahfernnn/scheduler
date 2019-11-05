/*
Separation of Concerns - Interview Scheduler Assignment
*/
import { useEffect, useReducer } from "react";
import axios from 'axios';

const SET_DAY = "SET_DAY";
// const SET_INTERVIEW = "SET_INTERVIEW";
const SCHED_API = "SCHED_API";

export default function useApplicationData(props) {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };

  // assisted by Michael Fich(mentor) - added .day to line 22
  function reducer(state, action) {
    if (action.type === SET_DAY) {
      return { ...state, day: action.payload.day };
    // } else if (action.type === "SET_INTERVIEW") {
    //   return {...state, appointments : {...state.appointments, ...action.payload }};
    } else if (action.type === SCHED_API) {
      return {...state, ...action.payload}
    } else {
      console.log(`Tried to reduce with unsupported action type: ${action.type}`)
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  
  const setDay = day => dispatch({
    type: SET_DAY, 
    payload: { day }
  })
  
  useEffect(() => {
    // Use Promise.all to make both requests(for the days and the appointments data) before updating the state
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
    .then((all) => {
      let days = all[0].data;
      let appointments = all[1].data;
      let interviewers = all[2].data;
      dispatch({
        type: SCHED_API,
        payload: { days, appointments, interviewers }
      })
    })
   }, [])
  

  function bookInterview(id, interview) {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: { ...interview }
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then((response) => {
      // dispatch({
      //   type: SET_INTERVIEW,
      //   payload: { appointments }
      // })
      Promise.all([
        axios.get('/api/days'),
        axios.get('api/appointments'),
        axios.get('/api/interviewers'),
      ])
      .then((all) => {
        let days = all[0].data;
        let appointments = all[1].data;
        let interviewers = all[2].data;
        dispatch({
          type: SCHED_API,
          payload: { days, appointments, interviewers }
        })
      })
    })
  }

  function cancelInterview(id, interview) {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: { interview : null }
    // };
    // const appointments = {
    //   ...state.appointments,
    //   [id]: appointment
    // };
    return axios.delete(`/api/appointments/${id}`, {interview})
    .then((response) => {
      // dispatch({
      //   type: SET_INTERVIEW,
      //   payload: { appointments }
      // })
      Promise.all([
        axios.get('/api/days'),
        axios.get('api/appointments'),
        axios.get('/api/interviewers'),
      ])
      .then((all) => {
        let days = all[0].data;
        let appointments = all[1].data;
        let interviewers = all[2].data;
        dispatch({
          type: SCHED_API,
          payload: { days, appointments, interviewers }
        })
      })
    })
  }
  return { state, setDay, bookInterview, cancelInterview }
}