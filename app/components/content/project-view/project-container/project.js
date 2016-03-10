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

    this.width = 600;
    this.height = 700;
  }

  configureForce() {
    this.force.size([this.width, this.height])
      .nodes(this.tasks)
      .links(this.links)
      .charge(-175)
      .linkStrength(0.05)
      .gravity(0)
      .on('tick', this.constraints.bind(this));
  }

  runForce() {
    this.force.start();
  }

  /*
  * calculates constraints for each node (task)
  */
  constraints(ev) {
    var percent = 10 * ev.alpha;

    var roots = this.tasks.slice();

    // constrain the hierarchy
    this.links.forEach(l => {
      l.source.y += percent * ((l.target.y + 150) - l.source.y);
      // remove source from roots
      if(roots.indexOf(l.source) > -1)
        roots.splice(roots.indexOf(l.source), 1);
    });

    // make roots at the top
    roots.forEach(t => {
      t.y = 0;
    });

    // constrain to window
    this.tasks.forEach(t => {
      t.x = Math.max(xRadius, Math.min(this.width - xRadius * 2, t.x));
      t.y = Math.max(yRadius, Math.min(this.height - yRadius * 2, t.y));
    });

    this.forceUpdate();
  }


  taskWithTitle(title) {
    return this.tasks.filter(t => t.title == title)[0];
  }

  deleteLink(source, target) {
    this.props.deleteLink(this.props.project.name, source, target);
  }

  getTasksThisDependsOn(task) {
    var thingsThatPointToMe = new Set(this.props.project.links.filter(l => l.target == task).map(l => l.source));
    var result = new Set(Array.from(thingsThatPointToMe));

    thingsThatPointToMe.forEach(thing => {
      result = union(result, this.getTasksThisDependsOn(thing))
    });
    return result;
  }

  render() {
    if (!this.laidOut) {
      this.configureData();
      this.configureForce();
      this.runForce();
      this.laidOut = true;
    }

    this.force.start();

    var taskCircles = this.tasks.map(t => (
      <TaskCircle task={t} 
        key={'task-circle-' + t.title} 
        setDrawing={this.setDrawing.bind(this)} 
        setDragging={this.setDragging.bind(this)}
        drawEnded={this.drawEnded.bind(this)} 
        dragEnded={this.dragEnded.bind(this)}
        deleteObject={this.props.deleteObject}
        beingDragged={this.state.dragging == t}
        getTasksThisDependsOn={this.getTasksThisDependsOn.bind(this)}
        forceProjectUpdate={this.props.forceProjectUpdate}
        setForm={this.props.setForm} 
        bringToFront={this.bringToFront.bind(this)} 
        hover={this.state.hoveringOver == t}
        ref={(ref) => this.taskCircles[t.title] = ref} />
    ));

    var arrows = this.links.map(l => {
      var idString = 'link-' + l.source.title + '-' + l.target.title;
      return (<DragLine source={l.source} target={l.target} key={idString} ref={idString} deleteLink={this.deleteLink.bind(this)} />);
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
          <marker className="arrowHead" orient="auto" id="arrow" viewBox="0 -5 10 10" refX="5" refY="0" markerWidth="4" markerHeight="4" >
            <path d="M0,-5L10,0L0,5z" orient="auto" /> 
          </marker>
        </defs>
      </svg>
    );
  }
}

function union(setA, setB) {
  return new Set([...setA, ...setB]);
}

function intersection(setA, setB) {
  return new Set([...setA].filter(x => setB.has(x)));
}
