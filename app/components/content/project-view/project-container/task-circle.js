import React from 'react';
import $ from 'jquery';
import common from './common';
var xRadius = common.xRadius;
var yRadius = common.yRadius;

export default class TaskCircle extends React.Component { 
  constructor() {
    super();
    this.state = {
      tooltip: null
    };
  }

  onMouseDown(ev) {
    if (ev.nativeEvent.which == 1) {
      this.startDrag(ev);

      if ($(ev.target).hasClass('task-circle'))
        this.setState({tooltip: null});

    } else if (ev.nativeEvent.which == 3) {
      ev.preventDefault();
      ev.stopPropagation();
      this.setState({tooltip: {x: ev.clientX, y: ev.clientY} });
    }
  }

  onMouseUp(ev) {
    if (this.props.beingDragged) {
      this.endDrag(ev);
    } else {
      this.endDraw(ev);
    }
  }

  onDoubleClick(ev) {
    this.props.setForm(this.props.task);
  }

  startDrag(ev) {
    if (!this.state.tooltip)
      this.props.setDragging(this.props.task);
  }

  endDrag(ev) {
    this.props.setDragging(null);
  }

  startDraw(ev) {
    var parent = ev.target.offsetParent.getBoundingClientRect();
    this.props.setDrawing({
      from: this.props.task,
      to: {
        x: ev.clientX - parent.left,
        y: ev.clientY - parent.top
      }
    });
  }

  endDraw(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    this.props.drawEnded(this.props.task);
  }

  deleteTask(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    this.props.deleteObject(this.props.task.title, 'task');
    this.props.forceProjectUpdate();
    this.setState({tooltip: null});
  }

  markImportant(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    this.props.task.important = !this.props.task.important;
    this.props.forceProjectUpdate();
    this.setState({tooltip: null});
  }

  markDone(ev) {
    ev.stopPropagation();
    ev.preventDefault();    
    this.props.task.done = !this.props.task.done;
    this.props.forceProjectUpdate();
    this.setState({tooltip: null});
  }

  addSticky(e){

  }

  render() {
    var important = this.props.task.important ? (<img src="./img/important.png" draggable="false"/>) : '';
    var done = this.props.task.done ? (<img src="./img/done.png" draggable="false"/>) : '';

    var tooltip = '';
    if (this.state.tooltip) {
      tooltip = (
        <div className="tooltip" style={{top: this.state.tooltip.y, left: this.state.tooltip.x }}>

          <div className="column">
            <div className="item done" onClick={this.markDone.bind(this)}>
              <img src="./img/done.png" draggable="false"/>
            </div>

            <div className="item important" onClick={this.markImportant.bind(this)}>
              <img src="./img/important.png"draggable="false"/>
            </div>
          </div>

          <div className="column">
            <div className="item drag" onMouseDown={this.startDraw.bind(this)}>
              <img src="./img/projects.png" draggable="false"/>
            </div>

            <div className="item delete" onClick={this.deleteTask.bind(this)}>
              <img src="./img/trash.png" draggable="false"/>
            </div>
          </div>

        </div>
      );
    }

    return (
      <div className="task-circle" 
        style={{left: this.props.task.x - (xRadius), top: this.props.task.y - (yRadius)}} 
        onMouseDown={this.onMouseDown.bind(this)} 
        onMouseUp={this.onMouseUp.bind(this)} 
        onDoubleClick={this.onDoubleClick.bind(this)} >

        <div className="icons-container">
          <img className="person-container" src="./img/person.png" draggable="false"/>
          {important}
        </div>

        <div className="task-description" >
          {this.props.task.title}

          <div className="sticky-plus">
            <img src="./img/fatplus.png" onClick={this.addSticky.bind(this)} draggable="false"/>
          </div>
        </div>

        <div className="icons-container">
          {done}
        </div>

        {tooltip}

      </div>
    );
  }
}
