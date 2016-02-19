import React from 'react';

export default class TaskItem extends React.Component { 
  constructor() {
    super();
  }

  render() {
    return (
      <div className="list-item task-item">
        <span> {this.props.task.title} </span>
      </div>
    );
  }
}