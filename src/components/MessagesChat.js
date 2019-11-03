import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Async from 'react-async';
import PageLayout from './PageLayout.js';
import './MessagesChat.scss';

class MessagesChat extends Component {
  constructor() {
    super();
    this.renderMessages = this.renderMessages.bind(this);
    this.getChatHistory = this.getChatHistory.bind(this);
  }
  render() {
    return (
      <PageLayout title="Anonymous Squirrel">
        <div className="messagesContainer">
          {this.renderMessages()}
          <div className="sendMessage">
            <input placeholder="Send a message..."></input>
            <i className="material-icons">send</i>
          </div>
        </div>
      </PageLayout>
    );
  }
  renderMessages() {
    return (
      <div>
        <Async promiseFn={this.getChatHistory}>
          {({ data, error, isLoading }) => {
            if (isLoading) return "Loading...";
            if (error) return "Unable to load chat.";
            if (data) {
              let messages = [];
              data.forEach((message) => {
                messages.push(
                  <div className={"message " + (message.me ? 'messageRight' : 'messageLeft')} key={message.id}>
                    {message.message}
                  </div>
                );
              })
              return messages;
            }
          }}
        </Async>
      </div>
    )
  }
  getChatHistory() {
    return new Promise((resolve, reject) => {
      const messages = [
        {
          id: 1,
          me: true,
          message: 'Hey, are you dreaming of Tetris?\nI have a problem now'
        },
        {
          id: 2,
          me: false,
          message: 'Kinda, but now Boggle is getting me!'
        },
        {
          id: 3,
          me: true,
          message: 'Thanks, at least I know somebody else is struggling!'
        }
      ];
      resolve(messages);
    });
  }
}

export default withRouter(MessagesChat);
