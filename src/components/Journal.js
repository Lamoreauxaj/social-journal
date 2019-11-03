import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import JournalEntry from './JournalEntry.js';
import PageLayout from './PageLayout.js';
import axios from 'axios';
import './Journal.scss';

class Journal extends Component {
  constructor() {
    super();
    this.state = {
      obj: { title: 'Short title', prompt: 'Type a short journal entry below.', post: '' }
    }
    this.onSaveEntry = this.onSaveEntry.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addSuggestion = this.addSuggestion.bind(this);
  }

  renderSuggestions() {
    //fetch these suggestions from the code Erika and Virrag wrote
    var suggestions = ["I worked for 2 hours on my business today", "I went for a run in the morning"];
    return suggestions.map(suggestion => <button key={suggestion} onClick={this.addSuggestion} className="btn gray-btn saveButton">{suggestion}</button>);
  }

  addSuggestion(event) {
    //TODO: add filtering on props
    this.setState({
      obj: {
        ...this.state.obj,
        post: this.state.obj.post + " " + event.currentTarget.textContent
      }
    });
  }

  render() {
    return (
      <PageLayout title="Journal">
        <div className="journalContainer">
          <JournalEntry write prompt={this.state.obj.prompt} post={this.state.obj.post} onChange={this.onChange}/>
          <button className="btn green-btn saveButton light-green darken-2" onClick={this.onSaveEntry}>Save Entry</button>
          {this.renderSuggestions()}
        </div>
      </PageLayout>
    );
  }
  onChange(value) {
    this.setState({ obj: value });
  }
  async onSaveEntry() {
    var post = {"name": "admin", ...this.state.obj};
    await axios.post('/api/posts/', post);
    this.props.history.push('/journal');
  }
}

export default withRouter(Journal);
