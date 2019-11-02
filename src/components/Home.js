import React, { Component } from 'react';
import './Home.scss';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <h3>Feels</h3>
        <h6>A Social Journaling Experience</h6>
        <p>
          Features:
          <ul className="featureList">
            <li>Answer journaling prompts.</li>
            <li>Read anonymous journal entries by others.</li>
            <li>Track your mood.</li>
            <li>Message people whose entries you matched with.</li>
          </ul>
        </p>
        <p>
          Anxiety is the top concern among college students (41.6 percent), followed by depression.
          Approximately 1 in 5 adults suffer from mental health problems.
        </p>
        <p>
          Sometimes journaling is a great method to put your thoughts to paper in order to benefit your mental health.
          Journaling is known to reduce stress and boost your mood.
          It even improves physical health as a result.
        </p>
        <button className="btn light-green darken-2">
          Get Started
        </button>
      </div>
    );
  }
}

export default Home;