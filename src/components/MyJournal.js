import React, { Component } from 'react';
import { Async } from 'react-async';
import { withRouter } from 'react-router-dom';
import JournalEntry from './JournalEntry.js';
import PageLayout from './PageLayout.js';
import './MyJournal.scss';

class MyJournal extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    }

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
            if (isLoading) return "Loading...";
            if (error) return "Unable to load entries.";
            if (data) {
              let renderedPosts = [];
              data.forEach((post, index) => renderedPosts.push(this.renderPost(post, index)))
              console.log(renderedPosts);
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
        <JournalEntry title={post.title} date={post.date} text={post.text} prompt={post.prompt}/>
      </div>
    );
  }
  getPosts() {
    return new Promise((resolve, reject) => {
      let posts = [
        {
          id: 1,
          title: 'This is a title',
          date: 'October 12th, 2019',
          prompt: 'Write something about your day.',
          text: 'This is a short journal entry. We submitted Boggle today. Next time, assignment 6 is GOING to be different, no cap.'
        },
        {
          id: 2,
          title: 'Another Entry',
          date: 'October 10th, 2019',
          prompt: 'How have you been feeling?',
          text: 'I have been dreaming of Tetris a bit much. I think it\'s becoming a problem.'
        }
      ];
      resolve(posts);
    });
  }
  onNewEntry(event) {
    this.props.history.push('/journal/write');
  }
  onViewEntry(post) {
    this.props.history.push(`/journal/view/${post.id}`)
  }
}

export default withRouter(MyJournal);
