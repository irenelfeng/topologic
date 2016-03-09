import React from 'react';
import $ from 'jquery';
import StickyView from './sticky-view';
import Modal from 'react-modal';
import common from './common';
var xRadius = common.xRadius;
var yRadius = common.yRadius;

export default class TaskCircle extends React.Component { 
  constructor() {
    super();
    this.state = {
      tooltip: null,
      sticky: null,
      hover: false
    };

    this.stickyStyle = {
      content : {
        position                   : 'absolute',
        top                        : '50%',
        left                       : '50%',
        background                 : '#29C8E1',
        borderRadius               : '10px',
        outline                    : 'none',
        height                     : '100px',
        width                      : '150px'
      }
    };
  }

  onMouseDown(ev) {
    this.props.bringToFront(this.props.task);
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

  deleteTask() {
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

  stickyView (ev) {
    if (this.state.sticky) {
      if (this.state.sticky != ev.target)
        this.setState({sticky: ev.target});
      else
        this.setState({sticky: null});
    } else {
      this.setState({sticky: ev.target});
    }
  }

  deleteSticky (sticky) {
    var idx = this.props.task.stickies.indexOf(sticky);
    if (idx > -1) {
      this.props.task.stickies.splice(idx, 1);
      this.setState({sticky: null, removing: false});
      this.props.forceProjectUpdate();
    }
  }

  addSticky (sticky) {
    this.props.task.stickies.push(sticky);
    this.setState({sticky: null});
    this.props.forceProjectUpdate();
  }

  cancelSticky() {
    this.setState({sticky: null});
  }

  openModal(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    this.setState({removing:true});
  }

  closeModal() {
    this.setState({removing:false});
  }

  render() {
    this.props.task.radius = 50;

    var removing = (
      <Modal isOpen={this.state.removing} onRequestClose={this.closeModal.bind(this)} style={this.stickyStyle}>
      Are you sure you want to delete? 
        <div className="form-group">
          <a className="form-button" onClick={this.closeModal.bind(this)}> No </a>
          <a className="form-button" onClick={this.deleteTask.bind(this)}> Yes </a>
        </div> 
      </Modal>
    );

    var iconSize = 30;

    var tooltip = null;
    if (this.state.tooltip) {
      tooltip = (
        <g className="tooltip" transform="translate(20,20)">
          <rect height={iconSize * 2} width={iconSize * 2} rx="20" ry="20" style={{fill:'white',stroke:'black', strokeWidth:2}}>
          </rect>

          <g className="item done" onClick={this.markDone.bind(this)}>
            <rect rx="20" ry="20" height={iconSize} width={iconSize} style={{fill: 'none', stroke:'black', strokeWidth:2}}/>
            <image xlinkHref="img/done.png" height="30px" width="30px" />
          </g>

          <g className="item important" onClick={this.markImportant.bind(this)} transform="translate(0,20)">
            <rect rx="20" ry="20" height={iconSize} width={iconSize} style={{fill: 'none', stroke:'black', strokeWidth:2}}/>
            <image xlinkHref="img/important.png" height="30px" width="30px" />
          </g>

          <g className="item drag" onMouseDown={this.startDraw.bind(this)} transform="translate(20,0)">
            <rect rx="20" ry="20" height={iconSize} width={iconSize} style={{fill: 'none', stroke:'black', strokeWidth:2}}/>
            <image xlinkHref="img/projects.png" height="30px" width="30px" />
          </g>

          <g className="item delete" onClick={this.openModal.bind(this)} transform="translate(20,20)">
            <rect rx="20" ry="20" height={iconSize} width={iconSize} style={{fill: 'none', stroke:'black', strokeWidth:2}}/>
            <image xlinkHref="img/trash.png" height="30px" width="30px" />
          </g>
        </g>
      );
    }

    var stickies = null;
    if (this.props.task.stickies.length > 0) {
      stickies = this.props.task.stickies.map((sticky, idx) => {
        return (
          <g className="sticky-bullet" data={sticky} key={idx} >
            <text> • </text>
          </g>
        );
      });
    }

    var stickyTooltip = null;
    if (this.state.sticky) {
      stickyTooltip = (
        <StickyView sticky={$(this.state.sticky).attr('data')} 
          parent={this.state.sticky}
          deleteSticky={this.deleteSticky.bind(this)} 
          addSticky={this.addSticky.bind(this)} 
          cancelSticky={this.cancelSticky.bind(this) }/>
      );
    }

    /**
     * Icons and what not
     */
    var stickyPlus = (
      <g className="sticky-plus" onClick={this.stickyView.bind(this)} >
        <image xlinkHref="img/fatplus.png" height="20px" width="20px"/>
      </g>
    );
    if (stickies && stickies.length >= 5) stickyPlus = null;

    var groupType;
    if(this.props.task.group == "Personal"){
      groupType = (<image className="person-container" xlinkHref="img/person.png" height="30px" width="30px" />);
    }else{
      groupType = (<image className="person-container" xlinkHref="img/groups.png" height="30px" width="30px" />);
    }

    var important = this.props.task.important ? (<image xlinkHref="img/important.png" height="30px" width="30px"/>) : null;
    var done = this.props.task.done ? (<image xlinkHref="img/done.png" height="30px" width="30px"/>) : null;

    stickyTooltip = null;
  
    var fill = "white";
    var stroke = "#1569C7";
    var strokeWidth = 2;

    if (this.props.hover) {
      fill = '#CCC';
      stroke = "#2554C7";
      strokeWidth += 1;
    }

    return (
      <g transform={`translate(${this.props.task.x},${this.props.task.y})`}>
        <circle className="task-circle"
          r={this.props.task.radius}
          onMouseDown={this.onMouseDown.bind(this)} 
          onDoubleClick={this.onDoubleClick.bind(this)} 
          fill={fill}
          stroke={stroke}
          strokeWidth={strokeWidth}>
        </circle>

        <g className="icons-container" transform="translate(-40, -50)">
          <g transform="translate(-20, 0)">{groupType}</g>
          <g transform="translate(0, 0)">{important}</g>
        </g>

        <g className="task-description" >
          <text textAnchor="middle">{this.props.task.title}</text>
        </g>

        <g className="stickies" onClick={this.stickyView.bind(this)} transform="translate(0, 20)">
          {stickies}
          {stickyPlus}
        </g>

        <g className="done-container" transform="translate(30, -50)">
          {done}
        </g>

        {tooltip}
        {removing}
        {stickyTooltip}
      </g>
    );
  }
}
