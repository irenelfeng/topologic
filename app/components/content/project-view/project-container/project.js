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
      dragging: null
    };
    this.laidOut = false;
  }

  setDragging(data) {
    this.setState({dragging: data});
  }

  onMouseMove(ev) {
    if (this.state.dragging) {
      var parent = document.querySelector(('#project-' + this.props.project.name).replace(' ','_')).getBoundingClientRect();
      var f = this.state.dragging.from;
      var t = {
        x: ev.clientX - parent.left,
        y: ev.clientY - parent.top
      };
      this.setState({dragging: {from: f, to: t}});
    }
  }

  onMouseUp(ev) {
    if (this.state.dragging) {
      this.setState({dragging: null});
    }
  }

  dragEnded(endTask) {
    if (this.state.dragging) {
      this.setState({dragging: null});
      this.props.addLink(this.props.project.name, this.state.dragging.from, endTask);
    }
  }

  configureData() {
    this.tasks = this.props.project.tasks;
    this.links = this.props.project.links;

    this.width = 400;
    this.height = 500;
  }

  configureForce() {
    // ok, assuming everything configured correctly
    // var parentDiv = document.querySelector('#project-box-' + this.props.project.name);
    // var width = parentDiv.offsetWidth;
    // var height = parentDiv.offsetHeight;
    // somehow we need to wait until the enclosing box is rendered before i am
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
    // compute the static layout
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
    if (!this.laidOut) {
      this.configureData();
      this.configureForce();
      this.runForce();
      this.laidOut = true;
    }

    var taskCircles = this.tasks.map(t => (<TaskCircle task={t} key={'task-circle-' + t.title} setDragging={this.setDragging.bind(this)} dragEnded={this.dragEnded.bind(this)} deleteObject={this.props.deleteObject} />));

    var arrows = this.links.map(l => {
      var idString = 'link-' + l.source.title + '-' + l.target.title;
      return (<DragLine source={l.source} target={l.target} key={idString} ref={idString} />);
    });

    var dragline = '';
    if (this.state.dragging) {
      dragline = (<DragLine source={this.state.dragging.from} target={this.state.dragging.to} />);
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
