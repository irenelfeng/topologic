import React from 'react';

export default class DeleteButton extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <a onClick={this.props.onClick} className="form-button" id="delete-button">
        Delete Task
      </a>
    );
  }
}
