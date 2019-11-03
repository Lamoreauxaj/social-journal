import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Async from 'react-async';
import PageLayout from './PageLayout.js';
import './MessagesChat.scss';
import axios from 'axios';

class MessagesChat extends Component {
  constructor() {
    super();

    this.state = {
      message: '',
      messages: []
    };

    this.renderMessages = this.renderMessages.bind(this);
    this.getChatHistory = this.getChatHistory.bind(this);
    this.onSendMessage = this.onSendMessage.bind(this);
  }
  render() {
    return (
      <PageLayout title="Anonymous Squirrel">
        <div className="messagesContainer">
          {this.renderMessages()}
          <div className="sendMessage">
            <input placeholder="Send a message..." value={this.state.message} onChange={event => this.setState({message: event.target.value})}></input>
            <i className="material-icons" onClick={this.onSendMessage}>send</i>
          </div>
        </div>
      </PageLayout>
    );
  }
  renderMessages() {
    return (
      <div className="messages">
        <Async promiseFn={this.getChatHistory}>
          {({ data, error, isLoading, reload }) => {
            this.reloadChat = reload;
            if (isLoading) return "Loading...";
            if (error) return "Unable to load chat.";
            if (data) {
              let msgs = data.data.data;
              let messages = [];
              msgs.forEach((message) => {
                messages.push(
                  <div className={"message " + (message.sender === 'admin' ? 'messageRight' : 'messageLeft')} key={message.id}>
                    {message.messages}
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
  async onSendMessage() {
    const msg = { sender: 'admin', receiver: 'squirrel', messages: this.state.message };
    await axios.post('http://localhost:8000/api/msgs/', msg);
    this.setState({ message: '' });
    this.reloadChat();
  }
  getChatHistory() {
    return axios.get("http://localhost:8000/api/msgs/admin");
  }
}

export default withRouter(MessagesChat);
