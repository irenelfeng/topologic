import React from 'react';

export default class Title extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="form-title-container">
        <input id="form-title" placeholder="Title" />
      </div>
    );
  }
}
