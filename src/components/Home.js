import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PageLayout from './PageLayout.js';
import './Home.scss';
// import { ReactComponent as Prompts } from "../assets/prompts.svg";

class Home extends Component {
  render() {
    return (
      <PageLayout wide title="feels">
        <div className="home">
          <h3>A Social Journaling Experience</h3>
            <img width="50%" src="prompts.svg" alt="Answer journaling prompts"></img>
            <h4>Answer journaling prompts.</h4>
            <p>Sometimes journaling is a great method to put your thoughts to paper in order to benefit your mental health. 
              Journaling is known to reduce stress, boost your mood, and improve physical health. 
              Our journal also has an auto-complete feature where it helps you record the events of your day.
            </p>
            <img width="50%" src="mood.svg" alt="Track your mood."></img>
            <h4>Track your mood.</h4>
            <p>
              Our backend analyzes the sentiment of your diary entries to track your mood changes from day to day.
              This way, you'll be able to gauge the range of your emotions and prevent yourself from sinking into a rabbithole.
            </p>
            <img width="50%" src="read_anon.svg" alt="Read anonymous journal entries by others."></img>
            <h4>Read anonymous journal entries by others.</h4>
            <p>
              Sometimes the easiest way to get over rough emotions is to hear how others are going through them.
              Combining diary entries with social interaction is our solution to help alleviate stress, loneliness, and lead to better mental health.
            </p>
            <img width="50%" src="message.svg" alt="Message people whose entries you matched with."></img>
            <h4>Message people whose entries you matched with.</h4>
            <p>
              After reading another person's diary entry with similar sentiments, you'll have the opportunity to anonymously and directly message them.
              This way, you can form a support system while still maintaining anonymity. 
            </p>
          <button className="btn light-green darken-2" onClick={() => this.props.history.push('/journal/write')}>
            Get Started
          </button>
        </div>
      </PageLayout>
    );
  }
}

export default withRouter(Home);