import React from 'react';
import Modal from 'react-modal';
import d3 from 'd3';

export default class DragLine extends React.Component { 
  constructor() {
    super();

    this.modalStyle = {
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

    this.state = {
      removing: false
    };
  }

  deleteMe() {
    this.props.deleteLink(this.props.source, this.props.target);
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
    var removing = null;
    if (this.state.removing) {
      removing = (
        <Modal isOpen={this.state.removing} onRequestClose={this.closeModal.bind(this)} style={this.modalStyle}>
        Do you want to delete this dependency?
          <div className="form-group">
            <a className="form-button" onClick={this.closeModal.bind(this)}> Cancel </a>
            <a className="form-button" onClick={this.deleteMe.bind(this)}> Delete </a>
          </div> 
        </Modal>
      );
    }

    var radius = 50;
    var s = this.props.source, t = this.props.target;
    
    var left = Math.min(s.x, t.x);
    var top = Math.min(s.y, t.y);
    var right = Math.max(s.x, t.x);
    var bottom = Math.max(s.y, t.y);

    var width = right - left;
    var height = bottom - top;

    var incY = radius;

    if (s.y < t.y)
      incY = incY * -1;

    return (
      <g>
        <line onClick={this.openModal.bind(this)} className="dependency" x1={s.x} y1={s.y} x2={t.x} y2={t.y + incY} markerEnd="url(#arrow)"/>
        {removing}
      </g>
    );
  }
}
