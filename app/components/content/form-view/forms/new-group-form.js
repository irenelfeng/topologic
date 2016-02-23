import React from 'react';
import Title from '../form-components/title';
import Description from '../form-components/description';
import GroupSelect from '../form-components/group-select';
import NotifySelect from '../form-components/notify-select';
import SaveButton from '../form-components/save-button';
import CancelButton from '../form-components/cancel-button';
import GroupAvatar from  '../form-components/group-avatar';
import Members from  '../form-components/members';

export default class NewGroupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      avatar: ''
    }
  }

  save() {
    var data = {
      name: document.querySelector('#form-title').value,
      description: document.querySelector('#task-description').value,
      avatar: this.state.avatar,
      members: this.membersRef.getMembers(),

    };

    this.props.saveObject(data, 'group');
    this.props.setForm(null);

  }

  addMember(member) { 
    this.state.members.push(member);
    this.forceUpdate();
  }

  removeMember(idx){

    this.state.members.splice(idx, 1);
    this.forceUpdate();
  }

  fileUpload(upload){
    this.state.avatar = upload;
    this.props.form['avatar'] = upload;
    this.forceUpdate(); 
  }


  render() {
    debugger; 

    if(Object.keys(this.props.form['groups']).length == 0){
      //if new form
      return (
      <div id="form-container">
        <Title />
        <Description />
        <GroupAvatar object={this.props.form} fileUpload={this.fileUpload.bind(this)} />
        <Members members={this.state.members} addMember={this.addMember.bind(this)} removeMember={this.removeMember.bind(this)} />
        <div className="form-group">
          <CancelButton setForm = {this.props.setForm} />
          <SaveButton onClick={this.save.bind(this)} setForm = {this.props.setForm} />
        </div>
      </div>
      );
    }
    return (
      //if edit form
      <div id="form-container">
        <Title title={this.props.form['groups'].name} />
        <Description desc={this.props.form['groups'].description} />
        <GroupAvatar avatar={this.props.form['groups'].avatar} fileUpload={this.fileUpload.bind(this)} />
        <Members ref={(ref) => this.membersRef = ref} members={this.props.form['groups'].members} addMember={this.addMember.bind(this)} removeMember={this.removeMember.bind(this)} />
        <div className="form-group">
          <CancelButton setForm = {this.props.setForm} />
          <SaveButton onClick={this.save.bind(this)} setForm = {this.props.setForm} />
        </div>
      </div>
        
    );
  }
}
