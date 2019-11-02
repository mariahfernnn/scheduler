/*
Separation of Concerns - Interview Scheduler Assignment
*/
import { useEffect, useReducer } from "react";
import axios from 'axios';

function reducer(state, action) {
  console.log("What is state?", state)
  if (action.type === "SET_DAY") {
    return { ...state, day : action.payload };
  }
  if (action.type === "BOOK_INTERVIEW") {
    return {...state, appointments : action.payload };
  }
  if (action.type === "CANCEL_INTERVIEW") {
    return {...state, appointments : action.payload };
  }
  if (action.type === "SCHED_API") {
    return {...state, ...action.payload}
  }
}

export default function useApplicationData(props) {
  const initialState = {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  };

  const SET_DAY = "SET_DAY";
  const BOOK_INTERVIEW = "BOOK_INTERVIEW";
  const CANCEL_INTERVIEW = "CANCEL_INTERVIEW";
  const SCHED_API = "SCHED_API";

  // dispatch({ type: SET_DAY, day });
  // dispatch({ type: SET_APPLICATION_DATA, days, appointments, interviewers });
  // dispatch({ type: SET_INTERVIEW, id, interview });
  // dispatch({ type: SET_INTERVIEW, id, interview: null });

  const [state, dispatch] = useReducer(reducer, initialState);
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });
  
  const setDay = day => dispatch({
    type: SET_DAY,
    payload: { day }
  })
  
  useEffect(() => {
    // Use Promise.all to make both requests(for the days and the appointments data) before updating the state
    Promise.all([
      axios.get('/api/days'),
      axios.get('api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      dispatch({
        type: SCHED_API,
        payload: (prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    })
  }, [])
  })

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
      dispatch({
        type: BOOK_INTERVIEW,
        payload: ({...state, appointments})
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
    return axios.delete(`/api/appointments/${id}`, {interview})
    .then((response) => {
      dispatch({
        type: CANCEL_INTERVIEW,
        payload: ({...state, appointments})
      })
    })
  }
  return { state, setDay, bookInterview, cancelInterview }
}

  


    

 
