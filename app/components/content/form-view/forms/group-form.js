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

  fileUpload(upload){
    this.state.avatar = upload;
    this.props.form['avatar'] = upload;
    this.forceUpdate(); 
  }


  render() {

    //make a copy of members to pass 

    if(Object.keys(this.props.form['groups']).length == 0){
      //if new form
      return (

      <div id="form-container">
        <div id="new-container">
         <div className="text-container">New Group </div>
         </div>
        <Title />
        <Description />
        <GroupAvatar object={this.props.form} fileUpload={this.fileUpload.bind(this)} />
        <Members ref={(ref) => this.membersRef = ref} members={[]} />
        <div className="form-group">
          <CancelButton setForm = {this.props.setForm} />
          <SaveButton onClick={this.save.bind(this)} setForm = {this.props.setForm} />
        </div>
      </div>
      );
    }

    var members = this.props.form['groups'].members.slice();
    return (
      //if edit form
      <div id="form-container">
        <Title title={this.props.form['groups'].name} />
        <Description desc={this.props.form['groups'].description} />
        <GroupAvatar avatar={this.props.form['groups'].avatar} fileUpload={this.fileUpload.bind(this)} />
        <Members ref={(ref) => this.membersRef = ref} members={members} />
        <div className="form-group">
          <CancelButton setForm = {this.props.setForm} />
          <SaveButton onClick={this.save.bind(this)} setForm = {this.props.setForm} />
        </div>
      </div>
        
    );
  }
}
