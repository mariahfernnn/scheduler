/*
Separation of Concerns - Interview Scheduler Assignment
*/
import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });
    
  useEffect(() => {
    // Use Promise.all to make both requests(for the days and the appointments data) before updating the state
    Promise.all([
      axios.get('/api/days'),
      axios.get('api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data  }));
    })
  }, [])
  
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then((response) => {
       setState({...state, appointments});
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
    return axios.delete(`/api/appointments/${id}`, {interview})
    .then((response) => {
    setState({...state, appointments});
    })
  }
  return { state, setDay, bookInterview, cancelInterview }
}