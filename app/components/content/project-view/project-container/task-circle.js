import React from 'react';

export default class TaskCircle extends React.Component { 
  constructor() {
    super();
  }

  render() {
    return (
      <div className="task-circle" style={{left: this.props.task.x, top: this.props.task.y}}>

        <div className="task-description" >
          {this.props.task.title}
        </div>

      </div>
    );
  }
}
