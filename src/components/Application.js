import React, { useState, useEffect } from "react";
import axios from 'axios';

import "components/Application.scss";

import DayList from "components/DayList";
import Appointment from "components/Appointment";

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Elizabeth James",
      interviewer: {
        id: 1,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
    interview: {
      student: "Hallie Parker",
      interviewer: {
        id: 1,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      }
    }
  }
];

export default function Application(props) {
  const [day, setDay] = useState("Monday");
  // Assisted by Guy Tonye(mentor) - How to properly render the days on the page
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get('/api/days')
    .then(body => console.log(body))
    // .then(body => body.data.map(obj => ({
    //   name: obj.name,
    //   spots: obj.spots
    // })))
    // .then(week => {
    //   // console.log(week)
    //   setDays(week)
    // })
  }, [])
  
  const apps = appointments.map(apps => {
    return (
      <Appointment
      key={apps.id}
      {...apps}
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
    key={day}
    days={days}
    day={day}
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
