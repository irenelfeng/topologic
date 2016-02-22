import React from 'react';
import common from './common';
var xRadius = common.xRadius;
var yRadius = common.yRadius;

export default class TaskCircle extends React.Component { 
  constructor() {
    super();
  }

  startDrag(ev) {
    var parent = ev.target.offsetParent.getBoundingClientRect();
    this.props.setDragging({
      from: this.props.task,
      to: {
        x: ev.clientX - parent.left,
        y: ev.clientY - parent.top
      }
    });
  }

  endDrag(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    this.props.dragEnded(this.props.task);
  }

  render() {
    var important = this.props.task.important ? (<img src="./img/important.png" />) : '';

    return (
      <div className="task-circle" style={{left: this.props.task.x - (xRadius), top: this.props.task.y - (yRadius)}} onMouseDown={this.startDrag.bind(this)} onMouseUp={this.endDrag.bind(this)} >

        <div className="icons-container">
          <img className="person-container" src="./img/person.png"/>
          {important}
        </div>

        <div className="task-description" >
          {this.props.task.title}

          <div className="sticky-plus">
            <img src="./img/fatplus.png" />
          </div>
        </div>

      </div>
    );
  }
}
