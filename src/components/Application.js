import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

// const appointments = [
//   {
//     id: 1,
//     time: "12pm",
//   },
//   {
//     id: 2,
//     time: "1pm",
//     interview: {
//       student: "Lydia Miller-Jones",
//       interviewer: {
//         id: 1,
//         name: "Sylvia Palmer",
//         avatar: "https://i.imgur.com/LpaY82x.png",
//       }
//     }
//   },
//   {
//     id: 3,
//     time: "2pm",
//     interview: {
//       student: "Elizabeth James",
//       interviewer: {
//         id: 1,
//         name: "Tori Malcolm",
//         avatar: "https://i.imgur.com/Nmx0Qxo.png",
//       }
//     }
//   },
//   {
//     id: 4,
//     time: "3pm",
//   },
//   {
//     id: 5,
//     time: "4pm",
//     interview: {
//       student: "Hallie Parker",
//       interviewer: {
//         id: 1,
//         name: "Mildred Nazir",
//         avatar: "https://i.imgur.com/T2WwVfS.png",
//       }
//     }
//   }
// ];

export default function Application(props) {
  
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
      console.log("all 0", all[0].data, "all 1", all[1].data, "all 2", all[2].data)
      setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data  }));
    })
  }, [])

  
  // Import the getAppointmentsForDay selector and use it to return an array of Appointment objs
  const apps = getAppointmentsForDay(state, state.day);
  
  const schedule = apps.map((app) => {
    const interview = getInterview(state, app.interview);

    return (
      <Appointment
        {...apps}
        key={app.id}
        id={app.id}
        time={app.time}
        interview={interview}
      />
    )
  })
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
          {schedule}
          <Appointment key="last" time="5pm" />
        </section>
      </main>
  )
}
