import React, { Component } from 'react';
import PageLayout from './PageLayout.js';
import Calendar from 'react-calendar';
import { Async } from 'react-async';
import axios from 'axios';

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

  getPosts() {
    return axios.get("http://localhost:8000/api/posts");
  }

  renderCalendarDay(date, view) {
    return (<Async promiseFn={this.getPosts}>
          {({ data, error, isLoading}) => {
            if (error) return (
              <span className="calendarDay">
              <i className="material-icons small">fiber_manual_record</i>
              </span>
            );

            if (data) {
              let posts = data.data.data;
              let renderedDate = (
              <i className="material-icons small">fiber_manual_record</i>
              );
              posts.forEach((post, index) => {
                
                var postDate = new Date(post.date);
                postDate = new Date(postDate.toDateString());
                console.log(post.date);

                if (date.toDateString() === postDate.toDateString()) {
                  if (post.sentiment > 0.7) {
                      renderedDate = (<i className="material-icons small">sentiment_very_satisfied</i>)
                  } else if (post.sentiment > 0.9) {
                      renderedDate = (<i className="material-icons small">sentiment_very_satisfied</i>)
                  } else {
                      renderedDate = (<i className="material-icons small">sentiment_dissatisfied</i>)
                  }
                }
              });
              return (
                <span className="calendarDay">
                  {renderedDate}
                </span>
              );
            }
          }}
        </Async>);

    // const ran = Math.random();
    // if (ran < .25) {
    //   return (
    //     <span className="calendarDay">
    //       <i className="material-icons small">exposure_neg_1</i>
    //     </span>
    //   );
    // }
    // else if (ran < .75) {
    //   return (
    //     <span className="calendarDay">
    //       <i className="material-icons small">exposure_plus_1</i>
    //     </span>
    //   );
    // }
    // else {
    //   return (
    //     <span className="calendarDay">
    //       <i className="material-icons small">exposure_plus_2</i>
    //     </span>
    //   );
    // }
  }
}

export default UserPage;
