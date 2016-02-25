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

    this.options = ['Turkey', 'Ebert', 'Sam', 'Samantha', 'Katrina', 'Rosemary'].map(val => {
      return {label: val, value: val};
    });

    this.state = {
      adding: false,
      removing:false,
      memberidx: -1,
      members: []
    }

    this.firstRender = true;
  }

  addMember() {
    var member = document.querySelector('.simple-value').firstChild.innerHTML;
    this.state.members.push(member);
    //this.forceUpdate();
    this.closeModal();
  }

  actuallyRemoveMember() {
    // this.props.removeMember(i);
    this.state.members.splice(this.state.memberidx, 1);
    this.state.memberidx = -1; //for safekeeping
    this.forceUpdate();
    this.closeModal();
  }

  removeMember(i, e) {
    debugger;
    this.setState({removing:true, memberidx: i});
    
  }

  openModal(){
    this.setState({adding:true});
  }

  closeModal(){
    this.setState({adding:false});
    this.setState({removing:false});
  }

  getMembers(){
    var members = this.state.members;
    this.setState({members: []});
    return members;
  }

  render() {
    var SimpleSelect = ReactSelectize.SimpleSelect;

    var members;

    this.state.members = this.props.members;

    if(this.props.members){
      members = this.props.members.map((m, i) => (<div key={m}>{m}<span className="remove-member" onClick={this.removeMember.bind(this, i)}>x</span></div>));
    }

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

    var removing = (<Modal isOpen={this.state.removing} onRequestClose={this.closeModal} style={this.customStyles}>
      Are you sure you want to remove {this.state.members[this.state.memberidx]}?
        <div className="form-group">
          <a className="form-button" onClick={this.closeModal.bind(this)}> No </a>
          <a className="form-button" onClick={this.actuallyRemoveMember.bind(this)}> Yes </a>
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
          {removing}
        </div>
      </div>
    );
  }
}
