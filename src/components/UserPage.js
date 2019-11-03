import React, { Component } from 'react';
import PageLayout from './PageLayout.js';
import Calendar from 'react-calendar';
import './UserPage.scss';

class UserPage extends Component {
  render() {
    return (
      <PageLayout title="Palash Taneja">
        <div className="userContainer">

          <span>You have journaled for the last three days!</span>

          <div className="sentimentCalendar">
            <h5>Sentiment Calendar</h5>
            <Calendar className="calendar" tileContent={
              ({ date, view }) => this.renderCalendarDay(date, view)
            }>
            </Calendar>
          </div>
        </div>
      </PageLayout>
    );
  }
  renderCalendarDay(date, view) {
    const ran = Math.random();
    if (ran < .25) {
      return (
        <span className="calendarDay">
          <i className="material-icons small">exposure_neg_1</i>
        </span>
      );
    }
    else if (ran < .75) {
      return (
        <span className="calendarDay">
          <i className="material-icons small">exposure_plus_1</i>
        </span>
      );
    }
    else {
      return (
        <span className="calendarDay">
          <i className="material-icons small">exposure_plus_2</i>
        </span>
      );
    }
  }
}

export default UserPage;
