import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Nav from './Nav.js';
import Home from './Home.js';
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
