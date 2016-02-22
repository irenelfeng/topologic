import React from 'react';
var xRadius = 50;
var yRadius = 40;

export default class TaskCircle extends React.Component { 
  constructor() {
    super();
  }

  startDrag(ev) {
    var parent = ev.target.offsetParent.getBoundingClientRect();
    debugger;
    this.props.setDragging({
      from: {
        x: this.props.task.x + (xRadius / 2),
        y: this.props.task.y + (yRadius / 2)
      },
      to: {
        x: ev.clientX - parent.left,
        y: ev.clientY - parent.right
      }
    });
  }

  render() {
    return (
      <div className="task-circle" style={{left: this.props.task.x, top: this.props.task.y}} onMouseDown={this.startDrag.bind(this)} >

        <div className="task-description" >
          {this.props.task.title}
        </div>

      </div>
    );
  }
}
