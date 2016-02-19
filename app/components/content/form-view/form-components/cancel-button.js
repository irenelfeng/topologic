import React from 'react';

export default class CancelButton extends React.Component { 
  constructor() {
    super();
  }

  render() {
    return (
      <a onClick={this.props.onClick} className="form-button" id="cancel-button">
        Cancel
      </a>
    );
  }
}
