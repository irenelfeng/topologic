import React from 'react';
import Modal from 'react-modal';

export default class DeleteButton extends React.Component {
  constructor() {
    super();
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
    }
    this.state = {
      removing: false
    }
  }

  openModal(){
    this.setState({removing:true});
  }

  closeModal(){
    this.setState({removing:false});
  }

  remove(){
    this.props.onClick();
  }

  render() {
    var removing = (
      <Modal isOpen={this.state.removing} onRequestClose={this.closeModal.bind(this)} style={this.customStyles}>
      Are you sure you want to delete? 
        <div className="form-group">
          <a className="form-button" onClick={this.closeModal.bind(this)}> No </a>
          <a className="form-button" onClick={this.remove.bind(this)}> Yes </a>
        </div> 
      </Modal>
    );

    return (
      <div className="form-button">
        <a onClick={this.openModal.bind(this)} id="delete-button">
          Delete
        </a>
        {removing}
      </div>
    );
  }
}
