import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Async } from 'react-async';
import JournalEntry from './JournalEntry.js';
import PageLayout from './PageLayout.js';
import axios from 'axios';
import './Journal.scss';

class Journal extends Component {
  constructor() {
    super();
    this.state = {
     title: 'Short title', prompt: 'Type a short journal entry below.', post: '' 
    }
    this.onSaveEntry = this.onSaveEntry.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addSuggestion = this.addSuggestion.bind(this);
  }

  renderSuggestions() {
    //fetch these suggestions from the code Erika and Virrag wrote
    return (
      <Async promiseFn={this.fetchSuggestions}>
        {({data, error, isLoading}) => {
          if (isLoading) return "Loading...";
          if (data) {
            const suggestions = data.data;
           return suggestions.map((suggestion, index) => <button key={index} onClick={this.addSuggestion} className="btn gray-btn saveButton">{suggestion}</button>);
          }
        }}
      </Async>
    );
    // return suggestions.map(suggestion => <button key={suggestion} onClick={this.addSuggestion} className="btn gray-btn saveButton">{suggestion}</button>);
  }

  addSuggestion(event) {
    //TODO: add filtering on props
    this.setState({
      post: this.state.post + " " + event.currentTarget.textContent
    }, () => {
      this.forceUpdate();
    });
  }

  render() {
    return (
      <PageLayout title="Journal">
        <div className="journalContainer">
          <JournalEntry write prompt={this.state.prompt} post={this.state.post} title={this.state.title} onChange={this.onChange}/>
          <button className="btn green-btn saveButton light-green darken-2" onClick={this.onSaveEntry}>Save Entry</button>
          {this.renderSuggestions()}
        </div>
      </PageLayout>
    );
  }
  onChange(value) {
    console.log(value);
    this.setState({ ...value });
  }
  async onSaveEntry() {
    var post = {"name": "admin", ...this.state};
    await axios.post('/api/posts/', post);
    this.props.history.push('/journal');
  }

  async fetchSuggestions() {
    return await axios.get('/api/suggestions');
  }
}

export default withRouter(Journal);
