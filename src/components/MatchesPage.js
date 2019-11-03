import React, { Component } from 'react';
import { Async } from 'react-async';
import PageLayout from './PageLayout.js';
import JournalEntry from './JournalEntry.js';
import axios from 'axios';
import './MatchesPage.scss';

class MatchesPage extends Component {
  render() {
    return (
      <PageLayout title="Other Journals">
        <div>
          <Async promiseFn={this.getMatches}>
            {({ data, isLoading}) => {
              if (isLoading) return "Loading...";
              if (data) {
                let matches = data.data;
                return (
                  <JournalEntry large title={matches.title} date={matches.date} prompt={matches.prompt} text={matches.post}>
                  </JournalEntry>
                );
              }
            }}
          </Async>
        </div>
      </PageLayout>
    );
  }
  getMatches() {
    return axios.get('/api/match/admin');
  }
}

export default MatchesPage;