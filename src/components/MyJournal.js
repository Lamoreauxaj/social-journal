import React, { Component } from 'react';
import { Async } from 'react-async';
import { withRouter } from 'react-router-dom';
import JournalEntry from './JournalEntry.js';
import PageLayout from './PageLayout.js';
import './MyJournal.scss';
import axios from 'axios';

class MyJournal extends Component {
  constructor() {
    super();

    this.renderPosts = this.renderPosts.bind(this);
    this.renderPost = this.renderPost.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.onNewEntry = this.onNewEntry.bind(this);
  }
  render() {
    return (
      <PageLayout className="myJournal" title="My Journal">
        <button onClick={this.onNewEntry} className="newEntryButton btn green-btn light-green darken-2">Write a new entry</button>
        <h5>My Entries</h5>
        {this.renderPosts()}
      </PageLayout>
    );
  }
  renderPosts() {
    return (
      <div className="posts">
        <Async promiseFn={this.getPosts}>
          {({ data, error, isLoading}) => {
            if (isLoading) return <span>"Loading..."</span>;
            if (error) return "Unable to load entries.";
            if (data) {
              let posts = data.data.data;
              let renderedPosts = [];
              posts.forEach((post, index) => renderedPosts.push(this.renderPost(post, index)));
              return (
                <div>
                  {renderedPosts}
                </div>
              );
            }
          }}
        </Async>
      </div>
    );
  }
  renderPost(post, key) {
    return (
      <div onClick={() => this.onViewEntry(post)} key={key} className="post">
        <JournalEntry title={post.title} date={post.date} text={post.post} prompt={post.prompt}/>
      </div>
    );
  }
  getPosts() {
    return axios.get("http://localhost:8000/api/posts");
  }
  onNewEntry(event) {
    this.props.history.push('/journal/write');
  }
  onViewEntry(post) {
    this.props.history.push(`/journal/view/${post.id}`)
  }
}

export default withRouter(MyJournal);
