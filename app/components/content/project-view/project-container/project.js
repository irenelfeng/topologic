import React from 'react';
import d3 from 'd3';
import TaskCircle from './task-circle';
import DragLine from './drag-line';

var taskProps = 'title done important'.split(' ');
var numTicks = 10000;
var xRadius = 50;
var yRadius = 40;

export default class ProjectContainer extends React.Component { 
  constructor() {
    super();
    this.force = d3.layout.force();
    this.state = {
      dragging: null
    };
    this.laidOut = false;
  }

  setDragging(data) {
    console.log('Got dragging data:'); console.log(data);
    this.setState({dragging: data});
  }

  configureTasks() {
    this.tasks = this.props.project.tasks.map((t, idx) => {
      var copy = {};
      taskProps.forEach(prop => copy[prop] = t[prop]);
      copy.x = idx * 5; copy.px = idx * 5;
      copy.y = idx * 5; copy.py = idx * 5;
      return copy;
    });

    this.links = []; // TO DO – figure out how dependencies are stored and make them edges
    this.width = 400;
    this.height = 800;
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

  render() {
    if (!this.laidOut) {
      this.configureTasks();
      this.configureForce();
      this.runForce();
      this.laidOut = true;
    }

    var taskCircles = this.tasks.map(t => (<TaskCircle task={t} key={'task-circle-' + t.title} setDragging={this.setDragging.bind(this)} />));

    var arrows = this.links.map(l => {
      var f = {
        x: l.source.x,
        y: l.source.y
      };
      var t = {
        x: l.target.x,
        y: l.target.y
      };
      return (<DragLine from={f} to={t} />);
    });

    var dragline = '';
    if (this.state.dragging) {
      dragline = (<DragLine from={this.state.dragging.from} to={this.state.dragging.to} />);
    }

    return (
      <div className="project" style={{width: this.width - (xRadius / 2) , height: this.height - (yRadius / 2)}}>
        {taskCircles}
        {arrows}
        {dragline}
      </div>
    );
  }
}
