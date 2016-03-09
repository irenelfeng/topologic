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
      drawing: null,
      hoveringOver: null
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
    var parent = document.querySelector(('#project-' + this.props.project.name).replace(' ','_')).getBoundingClientRect();
    var mousePos = {
      x: ev.clientX - parent.left,
      y: ev.clientY - parent.top
    };

    if (this.state.drawing) {
      var f = this.state.drawing.from;
      this.setState({drawing: {from: f, to: mousePos}});
    }

    if (this.state.dragging) {
      this.state.dragging.x = mousePos.x ;
      this.state.dragging.y = mousePos.y;
      this.forceUpdate();
    }

    var hoveringOver = null;
    this.tasks.forEach(t => {
      if (t.x + t.radius > mousePos.x && t.x - t.radius < mousePos.x 
        && t.y + t.radius > mousePos.y && t.y - t.radius < mousePos.y) {
        hoveringOver = t;
      }
    });

    this.setState({hoveringOver});
  }

  onMouseUp(ev) {
    if (this.state.dragging) {
      this.setState({dragging: null});
    }

    if (this.state.drawing) {
      if (this.state.hoveringOver) {
        this.drawEnded(this.state.hoveringOver);
      } else {
        this.setState({drawing: null});
      }
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
        hover={this.state.hoveringOver == t}
        ref={(ref) => this.taskCircles[t.title] = ref} />
    ));

    var arrows = this.links.map(l => {
      var idString = 'link-' + l.source.title + '-' + l.target.title;
      return (<DragLine source={l.source} target={l.target} key={idString} ref={idString} />);
    });

    var dragline = null;
    if (this.state.drawing) {
      dragline = (<DragLine source={this.state.drawing.from} target={this.state.drawing.to} />);
    }

    return (
      <svg id={('project-' + this.props.project.name).replace(' ', '_')} className="project" onMouseMove={this.onMouseMove.bind(this)} onMouseUp={this.onMouseUp.bind(this)} >
        {dragline}
        {arrows}
        {taskCircles}

        <defs> 
          <marker id="arrow" viewBox="0 -5 10 10" refX="5" refY="0" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" className="arrowHead" /> 
          </marker>
        </defs>
      </svg>
    );
  }
}
