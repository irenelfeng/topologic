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
      members: [],
    }
  }

  save() {
    var data = {
      name: document.querySelector('#form-title').value,
      description: document.querySelector('#task-description').value,
      members: this.state.members,

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


  render() {
    return (
      <div id="form-container">
        <Title />
        <Description />
        <GroupAvatar />
        <Members members={this.state.members} addMember={this.addMember.bind(this)} removeMember={this.removeMember.bind(this)} />
        <div className="form-group">
          <CancelButton setForm = {this.props.setForm} />
          <SaveButton onClick={this.save.bind(this)} setForm = {this.props.setForm} />
        </div>
      </div>
    );
  }
}
