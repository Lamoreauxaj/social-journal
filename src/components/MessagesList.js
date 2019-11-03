import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PageLayout from './PageLayout.js';
import './MessagesList.scss';

class MessagesList extends Component {
  render() {
    return (
      <PageLayout title="Messages" className="messagesList">
        <ul className="collection avatar">
          <li className="collection-item" onClick={() => this.props.history.push('/messages/chat/1')}>
            <i className="material-icons circle userAvatar">face</i>
            <span className="title">Anonymous Squirrel</span>
          </li>
          <li className="collection-item" onClick={() => this.props.history.push('/messages/chat/2')}>
            <i className="material-icons circle userAvatar">face</i>
            <span className="title">Anonymous Squash</span>
          </li>
        </ul>
      </PageLayout>
    );
  }
}

export default withRouter(MessagesList);
