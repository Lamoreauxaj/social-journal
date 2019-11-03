import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Async } from 'react-async';
import JournalEntry from './JournalEntry.js';
import PageLayout from './PageLayout.js';
import axios from 'axios';

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
                data = data.data.data[0];
                return (
                  <JournalEntry large title={data.title} prompt={data.prompt} date={data.date} text={data.post}/>
                );
              }
            }}
          </Async>
        </div>
      </PageLayout>
    );
  }
  getPost() {
    return axios.get(`/api/posts/${this.props.match.params.id}`)
  }
}

export default withRouter(JournalView);
