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
      sticky: null
    };

    this.customStyles = {
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
    var removing = (
      <Modal isOpen={this.state.removing} onRequestClose={this.closeModal.bind(this)} style={this.customStyles}>
      Are you sure you want to delete? 
        <div className="form-group">
          <a className="form-button" onClick={this.closeModal.bind(this)}> No </a>
          <a className="form-button" onClick={this.deleteTask.bind(this)}> Yes </a>
        </div> 
      </Modal>
    );

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

            <div className="item delete" onClick={this.openModal.bind(this)}>
              <img src="./img/trash.png" draggable="false"/>
            </div>
          </div>

        </div>
      );
    }

    var stickies = '';
    if (this.props.task.stickies.length > 0) {
      stickies = this.props.task.stickies.map((sticky, idx) => {
        return (
          <div className="sticky-bullet" data={sticky} key={idx} onClick={this.stickyView.bind(this)} > • </div>
        );
      });
    }

    var stickyTooltip = '';
    if (this.state.sticky) {
      stickyTooltip = (
        <StickyView sticky={$(this.state.sticky).attr('data')} 
          parent={this.state.sticky}
          deleteSticky={this.deleteSticky.bind(this)} 
          addSticky={this.addSticky.bind(this)} 
          cancelSticky={this.cancelSticky.bind(this) }/>
      );
    }

    var stickyPlus = (
      <div >
        <img src="./img/fatplus.png" draggable="false"/>
      </div>
    );
    if (stickies.length >= 5) stickyPlus = '';

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

          <div className="sticky-plus" onClick={this.stickyView.bind(this)}>
            {stickies}
            {stickyPlus}
          </div>
        </div>

        <div className="icons-container">
          {done}
        </div>

        {tooltip}
        {stickyTooltip}
        {removing}
      </div>
    );
  }
}
