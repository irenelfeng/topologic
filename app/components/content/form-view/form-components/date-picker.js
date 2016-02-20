import React from 'react';

export default class Deadline extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <input placeholder="Pick a date" readOnly />
    );
  }
}
