import React, { Component } from 'react';
import PageLayout from './PageLayout.js';
import './Home.scss';

class Home extends Component {
  render() {
    return (
      <PageLayout title="feels">
        <div className="home">
          <h5>A Social Journaling Experience</h5>
          <h6>Features:</h6>
          <ul className="featureList">
            <li>Answer journaling prompts.</li>
            <li>Read anonymous journal entries by others.</li>
            <li>Track your mood.</li>
            <li>Message people whose entries you matched with.</li>
          </ul>
          <p>
            Anxiety is the top concern among college students (41.6 percent), followed by depression.
            Approximately 1 in 5 adults suffer from mental health problems.
          </p>
          <p>
            Sometimes journaling is a great method to put your thoughts to paper in order to benefit your mental health.
            Journaling is known to reduce stress and boost your mood.
            It even improves physical health as a result.
          </p>
          <p>
            Combining this with social interaction is our solution to help alleviate stress, lonliness, and lead to better mental health.
          </p>
          <button className="btn light-green darken-2">
            Get Started
          </button>
        </div>
      </PageLayout>
    );
  }
}

export default Home;