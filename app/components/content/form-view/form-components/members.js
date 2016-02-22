import React from 'react';

import ReactSelectize from 'react-selectize';
import Modal from 'react-modal';

export default class Members extends React.Component {
  constructor() {
    super();

    this.customStyles = {
      content : {
        position                   : 'absolute',
        top                        : '20%',
        left                       : '40%',
        right                      : '20%',
        bottom                     : '20%',
        background                 : '#29C8E1',
        borderRadius               : '10px',
        outline                    : 'none'
      }
    };

    this.options = ["Turkey", "Ebert", "Sam", "Samantha", "Katrina", "Rosemary"].map(function(val){
                return {label: val, value: val}
            });
    this.state = {
      adding: false

    }
  }

  addMember() {
    var member = document.querySelector(".simple-value").firstChild.innerHTML;
    this.props.addMember(member);
    this.closeModal();
  }

  removeMember(i, e){
    this.props.removeMember(i);
  }

  openModal(){
    this.setState({adding:true});
  }

  closeModal(){
    this.setState({adding:false});
  }

  render() {
    var SimpleSelect = ReactSelectize.SimpleSelect;
    var members;
    if(this.props.members)
      members = this.props.members.map((m, i) => (<div>{m}<span className="remove-member" onClick={this.removeMember.bind(this, i)}>x</span></div>));

    if(this.state.adding)
      var adding = (<Modal isOpen={this.state.adding} onRequestClose={this.closeModal} style={this.customStyles}> 
        <div className="form-group">
        <SimpleSelect 
            options = {this.options} 
            placeholder = "Add Member" />
        <a className="form-button" onClick={this.addMember.bind(this)}>Add</a>
        <a className="form-button" onClick={this.closeModal.bind(this)}>Cancel</a>
        </div>
       </Modal>);
    return (
      <div>
        <div className="add-box" onClick={this.openModal.bind(this)} >
          Add Member
          {adding}
        </div>
        <div id="members-box">
          {members}
        </div>
      </div>
    );
  }
}
