import React from "react";
// import axios from 'axios';

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from "../helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();
  // const [state, setState] = useState({
  //   day: "Monday",
  //   days: [],
  //   appointments: {},
  //   interviewers: {}
  // });
  
  // const setDay = day => setState({ ...state, day });
  
  // useEffect(() => {
  //   // Use Promise.all to make both requests(for the days and the appointments data) before updating the state
  //   Promise.all([
  //     axios.get('/api/days'),
  //     axios.get('api/appointments'),
  //     axios.get('/api/interviewers'),
  //   ]).then((all) => {
  //     setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data  }));
  //   })
  // }, [])
  
  // function bookInterview(id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   return axios.put(`/api/appointments/${id}`, {interview})
  //   .then((response) => {
  //     setState({...state, appointments});
  //   })
  // }

  // function cancelInterview(id, interview) {
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: { interview : null }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   return axios.delete(`/api/appointments/${id}`, {interview})
  //   .then((response) => {
  //     setState({...state, appointments});
  //   })
    
  // }
  
  // Import the getAppointmentsForDay selector and use it to return an array of Appointment objs
  // const apps = getAppointmentsForDay(state, state.day);

  // const schedule = apps.map((app) => {
  //   const interviewers = getInterviewersForDay(state, state.day);
  //   const interview = getInterview(state, app.interview);

  //   return (
  //     <Appointment
  //       {...apps}
  //       key={app.id}
  //       id={app.id}
  //       time={app.time}
  //       interview={interview}
  //       interviewers={interviewers}
  //       bookInterview={bookInterview}
  //       cancelInterview={cancelInterview}
  //     />
  //   )
  // })

  const interviewers = getInterviewersForDay(state, state.day);
  // console.log("WHAT IS STATEEEEEEEEE", state)

  const apps = getAppointmentsForDay(state, state.day).map(
    app => {
      return (
        <Appointment
          key={app.id}
          id={app.id}
          time={app.time}
          // {...app}
          interview={getInterview(state, app.interview)}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    }
  );

    return (
      <main className="layout">
        <section className="sidebar">
        <img
    className="sidebar--centered"
    src="images/logo.png"
    alt="Interview Scheduler"
  />
  <hr className="sidebar__separator sidebar--centered" />
  <nav className="sidebar__menu">
  <DayList
    key={state.day}
    days={state.days}
    day={state.day}
    setDay={setDay}
  />
  </nav>
  <img
    className="sidebar__lhl sidebar--centered"
    src="images/lhl.png"
    alt="Lighthouse Labs"
  />
        </section>
        <section className="schedule">
          {apps}
          <Appointment key="last" time="5pm" />
        </section>
      </main>
  )
}
