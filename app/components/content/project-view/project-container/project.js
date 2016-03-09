import React from 'react';
import d3 from 'd3';
import $ from 'jquery';
import TaskCircle from './task-circle';
import DragLine from './drag-line';
import common from './common';

var taskProps = 'title done important'.split(' ');
var numTicks = 10000;
var xRadius = common.xRadius;
var yRadius = common.yRadius;

export default class Project extends React.Component { 
  constructor() {
    super();
    this.force = d3.layout.force();
    this.state = {
      dragging: null,
      drawing: null
    };
    this.laidOut = false;
    this.taskCircles = {};
  }

  bringToFront(task) {
    var idx = this.props.project.tasks.indexOf(task);
    this.props.project.tasks.splice(idx, 1);
    this.props.project.tasks.push(task);
  }

  setDragging(item) {
    this.setState({dragging: item});
  }

  setDrawing(data) {
    this.setState({drawing: data});
  }

  onMouseMove(ev) {
    if (this.state.drawing) {
      var parent = document.querySelector(('#project-' + this.props.project.name).replace(' ','_')).getBoundingClientRect();
      var f = this.state.drawing.from;
      var t = {
        x: ev.clientX - parent.left,
        y: ev.clientY - parent.top
      };
      this.setState({drawing: {from: f, to: t}});
    }

    if (this.state.dragging) {
      var parent = document.querySelector(('#project-' + this.props.project.name).replace(' ','_')).getBoundingClientRect();
      this.state.dragging.x = ev.clientX - parent.left - xRadius / 2;
      this.state.dragging.y = ev.clientY - parent.top - yRadius / 2;
      this.forceUpdate();
    }
  }

  onMouseUp(ev) {
    if (this.state.drawing) {
      this.setState({drawing: null});
    }

    if (this.state.dragging) {
      this.setState({dragging: null});
    }
  }

  drawEnded(endTask) {
    if (this.state.drawing) {
      for (var tc in this.taskCircles) {
        this.taskCircles[tc].state.tooltip = null;
        this.taskCircles[tc].state.sticky = null;
      }

      this.setState({drawing: null});
      this.props.addLink(this.props.project.name, this.state.drawing.from, endTask);
    }
  }

  dragEnded() {
    this.setState({dragging: null});
  }

  configureData() {
    this.tasks = this.props.project.tasks;
    this.links = this.props.project.links;

    this.width = 400;
    this.height = 500;
  }

  configureForce() {
    this.force.size([this.width, this.height])
      .nodes(this.tasks)
      .links(this.links)
      .charge(-300)
      .gravity(0.01)
      .on('tick', (ev) => {
        this.tasks.forEach(t => {
          t.x = Math.max(xRadius / 2, Math.min(this.width - xRadius * 2, t.x));
          t.y = Math.max(yRadius / 2, Math.min(this.height - yRadius * 2, t.y));
        });
      });
  }

  runForce() {
    this.force.start();
    for (var i = 0; i < numTicks; i++) {
      this.force.tick();
    }

    this.force.stop();
  }

  taskWithTitle(title) {
    return this.tasks.filter(t => t.title == title)[0];
  }

  render() {
    console.log(this.laidOut);   
    if (!this.laidOut) {
      this.configureData();
      this.configureForce();
      this.runForce();
      this.laidOut = true;
    }

    var taskCircles = this.tasks.map(t => (
      <TaskCircle task={t} 
        key={'task-circle-' + t.title} 
        setDrawing={this.setDrawing.bind(this)} 
        setDragging={this.setDragging.bind(this)}
        drawEnded={this.drawEnded.bind(this)} 
        dragEnded={this.dragEnded.bind(this)}
        deleteObject={this.props.deleteObject}
        beingDragged={this.state.dragging == t} 
        forceProjectUpdate={this.props.forceProjectUpdate}
        setForm={this.props.setForm} 
        bringToFront={this.bringToFront.bind(this)} 
        ref={(ref) => this.taskCircles[t.title] = ref} />
    ));

    var arrows = this.links.map(l => {
      var idString = 'link-' + l.source.title + '-' + l.target.title;
      return (<DragLine source={l.source} target={l.target} key={idString} ref={idString} />);
    });

    var dragline = '';
    if (this.state.drawing) {
      dragline = (<DragLine source={this.state.drawing.from} target={this.state.drawing.to} />);
    }

    return (
      <div id={('project-' + this.props.project.name).replace(' ', '_')} className="project" style={{width: this.width - (xRadius / 2) , height: this.height - (yRadius / 2)}} onMouseMove={this.onMouseMove.bind(this)} onMouseUp={this.onMouseUp.bind(this)} >
        {taskCircles}
        {arrows}
        {dragline}
      </div>
    );
  }
}
