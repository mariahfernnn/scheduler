/*
Separation of Concerns - Interview Scheduler Assignment
*/
import { useEffect, useReducer } from "react";
import axios from 'axios';

import reducer, { SET_DAY, SET_INTERVIEW, SCHED_API } from "reducers/application";

export default function useApplicationData(props) {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };

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
        payload: {appointments, interviewers, days }}
      )
    })
   }, [])
  
  // Code from Ha/ Juan(students)
  const checkDay = (id) => {
    let dayID = null;
    for (const obj of state.days) {
      if (obj.appointments.includes(id)) {
        dayID = obj.id;
      }
    }
    return dayID;
  }

  function bookInterview(id, interview, createInterview = false) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // Code from Ha/ Juan(students)
    const days = state.days.map( day => {
      return (createInterview ? day.id === checkDay(id) ? { ...day, spots: day.spots - 1 } : { ...day } : { ...day })
    });
    return axios.put(`/api/appointments/${id}`, {interview})
    .then((response) => {
      dispatch({
        type: SET_INTERVIEW,
        appointments, 
        days
      })
    })
  }

  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { interview : null }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // Code from Ha/ Juan(students)
    const days = state.days.map( day => {
      return (day.id === checkDay(id) ? { ...day, spots: day.spots + 1 } : { ...day })
    });
    return axios.delete(`/api/appointments/${id}`, {interview})
    .then((response) => {
      dispatch({
        type: SET_INTERVIEW,
        appointments, days
      })
    })
  }
  return { state, setDay, bookInterview, cancelInterview }
}