import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import JournalEntry from './JournalEntry.js';
import PageLayout from './PageLayout.js';
import axios from 'axios';

class Journal extends Component {
  constructor() {
    super();
    this.state = {
      entry: ''
    }
    this.onSaveEntry = this.onSaveEntry.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  renderSuggestions() {
    var suggestions = ["I worked for 2 hours on my business today", "I went for a run in the morning"];
    return suggestions.map(suggestion => <button className="btn gray-btn saveButton">{suggestion}</button>);
  }

  render() {
    return (
      <PageLayout title="Journal">
        <JournalEntry write prompt="Type a short journal entry below." text={this.state.entry} onChange={this.onChange}/>
        <button className="btn green-btn saveButton light-green darken-2" onClick={this.onSaveEntry}>Save Entry</button>
        {this.renderSuggestions()}
      </PageLayout>
    );
  }
  onChange(event) {
    this.setState({ entry: event.target.value });
  }
  async onSaveEntry() {
    var post = {"name": "erika", "email": "eatan18@gmail.com", "post": this.state.entry};
    await axios.post('http://localhost:8000/api/posts/', post);
    this.props.history.push('/journal');
  }
}

export default withRouter(Journal);
