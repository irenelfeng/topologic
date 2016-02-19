import React from 'react';

export default class SaveButtonComponent extends React.Component { 
  constructor() {
    super();
  }

  render() {
    return (
      <a onClick={this.props.onClick} className="form-button" id="save-button">
        Save
      </a>
    );
  }
}