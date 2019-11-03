import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Async } from 'react-async';
import JournalEntry from './JournalEntry.js';
import PageLayout from './PageLayout.js';

class JournalView extends Component {
  constructor() {
    super();
    this.getPost = this.getPost.bind(this);
  }
  render() {
    return (
      <PageLayout title="Journal">
        <div className="journalView">
          <Async promiseFn={this.getPost}>
            {({ data, error, isLoading }) => {
              if (isLoading) return "Loading...";
              if (error) return "Unable to load entry."
              if (data) {
                return (
                  <JournalEntry large title={data.title} prompt={data.prompt} date={data.date} text={data.text}/>
                );
              }
            }}
          </Async>
        </div>
      </PageLayout>
    );
  }
  getPost() {
    return new Promise((resolve, reject) => {
      let post = {
        id: 1,
        title: 'This is a title',
        date: 'October 12th, 2019',
        prompt: 'Write something about your day.',
        text: 'This is a short journal entry. We submitted Boggle today. Next time, assignment 6 is GOING to be different, no cap.'
      };
      resolve(post);
    });
  }
}

export default withRouter(JournalView);
