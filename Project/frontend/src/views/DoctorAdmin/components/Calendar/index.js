import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid
} from '@material-ui/core';
// import Calendar from 'react-awesome-calendar';

import './styles.css'

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import ruLocale from '@fullcalendar/core/locales/ru';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

import "@fullcalendar/core";
// import "@fullcalendar/core/main.css";
// import "@fullcalendar/daygrid/main.css";
// import "@fullcalendar/timegrid/main.css";

const useStyles = makeStyles(() => ({
  root: {} ,
}));

const CalendarContainer = props => {
  const classes = useStyles();
    const events = [ 
    { title: "All Day Event", start: getDate("YEAR-MONTH-01T16:00:00+00:00") },
    {
      title: "Long Event",
      start: getDate("YEAR-MONTH-07"),
      end: getDate("YEAR-MONTH-10")
    },
    {
      groupId: "999",
      title: "Repeating Event",
      start: getDate("YEAR-MONTH-28T10:30:00+00:00"),
      end: getDate("YEAR-MONTH-28T11:00:00+00:00")
    }
] 

  return (
    <Grid container style={{padding:'5rem'}}>
        
        {/* <Grid container direction='column' item md={12} xs={12} justify='center'alignItems='center' > */}
        <FullCalendar
            // plugins = { [bootstrapPlugin] }
            locale = {ruLocale}
            themeSystem = 'bootstrap'
            editable='true'   
            weekNumbers='false'   
            editable = 'true'
            initialView="timeGridWeek"
            headerToolbar={{
                left: "",
                center: "dayGridMonth,timeGridWeek,timeGridDay",
                right: "",
            }}
            footerToolbar={{
              left: "prev",
              center: "title",
              right: "next",
            }}
            allDaySlot ={false}
            slotMinTime = "08:00:00"
            slotMaxTime = "18:00:00"
            plugins={[googleCalendarPlugin,dayGridPlugin,timeGridPlugin ]}
            // events={events}
            googleCalendarApiKey = 'AIzaSyAaOH4Nl3HnXi8RmMBZgw-2C8MAiFlcUqY'
            events = {{
              googleCalendarId :'e34fh5nb0p90cskfeab5oim2rc@group.calendar.google.com'
            }}
          
            views= {{
              timeGridWeek:{
                titleFormat: { weekday: 'short', month: '2-digit', day: '2-digit' }
              }
            }}
            eventColor= '#378006'
        />
        {/* </Grid> */}
    </Grid>
  );
};

function getDate(dayString) {
    const today = new Date();
    const year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();
  
    if (month.length === 1) {
      month = "0" + month;
    }
  
    return dayString.replace("YEAR", year).replace("MONTH", month);
  }

  
CalendarContainer.propTypes = {
  className: PropTypes.string
};

export default CalendarContainer;
