import React from 'react';

export default class Deadline extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <input className="form-aligned-col2-text" placeholder="Pick a date" readOnly />
    );
  }
}
