import React from 'react';
import common from './common';
var xRadius = common.xRadius;
var yRadius = common.yRadius;

export default class TaskCircle extends React.Component { 
  constructor() {
    super();
    this.state = {
      tooltip: false
    };
  }

  onMouseDown(ev) {
    if (ev.nativeEvent.which == 1) {
      this.startDrag(ev);
    } else if (ev.nativeEvent.which == 3) {
      ev.preventDefault();
      this.setState({tooltip: true});
    }
  }

  onMouseUp(ev) {
    this.endDrag(ev);
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

  addSticky(e){

  }

  deleteTask(){
    this.props.deleteObject(this.props.task.title, 'task');
  }


  render() {
    var important = this.props.task.important ? (<img src="./img/important.png" />) : '';

    var tooltip = '';
    if (this.state.tooltip) {
      tooltip = (
        <div className="tooltip">

          <div className="column">
            <div className="item done">
              <img src="./img/"/>
            </div>

            <div className="item important">
              <img src="./img/important.png"/>
            </div>
          </div>

          <div className="column">
            <div className="item drag">
              <img src="./img/"/>
            </div>

            <div className="item delete" onClick={this.deleteTask.bind(this)}>
              <img src="./img/trash.png"/>
            </div>
          </div>

        </div>
      );
    }

    return (
      <div oncontextmenu="return false;" className="task-circle" style={{left: this.props.task.x - (xRadius), top: this.props.task.y - (yRadius)}} onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)} >

        <div className="icons-container">
          <img className="person-container" src="./img/person.png"/>
          {important}
        </div>

        <div className="task-description" >
          {this.props.task.title}

          <div className="sticky-plus">
            <img src="./img/fatplus.png" onClick={this.addSticky.bind(this)} />
          </div>
        </div>

        {tooltip}

      </div>
    );
  }
}
