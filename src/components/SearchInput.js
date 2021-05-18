import React, { Component } from "react";

export default class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = { searchQuery: "" };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ searchQuery: event.target.value });
  }

  handleSubmit(event) {
    console.log(event.target.value);

    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          value={this.state.searchQuery}
          onChange={this.handleChange}
          type="text"
          placeholder="Sök här"
        />
      </form>
    );
  }
}
