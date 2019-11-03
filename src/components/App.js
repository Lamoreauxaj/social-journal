import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Nav from './Nav.js';
import Home from './Home.js';
import MyJournal from './MyJournal.js';
import JournalView from './JournalView.js';
import Journal from './Journal.js';
import MessagesList from './MessagesList.js';
import MessagesChat from './MessagesChat.js';
import NotFound from './NotFound.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <Nav>
            <div className="content">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/journal" component={MyJournal}/>
                <Route exact path="/journal/write" component={Journal}/>
                <Route exact path="/journal/view/:id" component={JournalView}/>
                <Route exact path="/messages" component={MessagesList}/>
                <Route exact path="/messages/chat/:id" component={MessagesChat}/>
                <Route exact path="/404" component={NotFound}/>
                <Redirect to="/404"/>
              </Switch>
            </div>
          </Nav>
        </Router>
      </div>
    )
  }
}

export default App;
