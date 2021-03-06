import React from 'react';
import Title from '../form-components/title';
import Description from '../form-components/description';
import GroupSelect from '../form-components/group-select';
import NotifySelect from '../form-components/notify-select';
import SaveButton from '../form-components/save-button';
import CancelButton from '../form-components/cancel-button';
import GroupAvatar from  '../form-components/group-avatar';
import Members from  '../form-components/members';
import DeleteButton from '../form-components/delete-button';
import $ from 'jquery';

export default class GroupForm extends React.Component {
  constructor() {
    super();
    this.type = 'group';

  }

  save() {
    var form = $('#form-container');
    var data = {
      name: form.find('.form-title').val(),
      description: form.find('.task-description').val(),
      avatar: this.avatarRef.getAvatar(),
      members: this.membersRef.getMembers(),

    };

    var errors = this.props.saveObject(data, this.type);
    // show errors
    this.props.setForm(null);
  }

  delete(){
    var form = $('#form-container');
    var group = form.find('.form-title').val();
    this.props.deleteObject(group, this.type);
    this.props.setForm(null);
  }

  render() {
    if (Object.keys(this.props.form['groups']).length == 0) {
      return (
        <div id="form-container">
          <div id="new-container">
           <div className="text-container">New Group </div>
           </div>
          <Title />
          <Description />
          <GroupAvatar ref={(ref) => this.avatarRef = ref} object={this.props.form} />
          <Members ref={(ref) => this.membersRef = ref} members={[]} />
          <div className="form-group">
            <CancelButton setForm = {this.props.setForm} />
            <SaveButton onClick={this.save.bind(this)} setForm = {this.props.setForm} />
          </div>
        </div>
      );
    }

    var members = this.props.form.groups.members.slice();

    return (
      <div id="form-container">

        <Title title={this.props.form['groups'].name} />
        <Description description={this.props.form['groups'].description} />
        <GroupAvatar ref={(ref) => this.avatarRef = ref} avatar={this.props.form['groups'].avatar} groupTitle={this.props.form['groups'].name}/>
        <Members ref={(ref) => this.membersRef = ref} members={members} />
        <div className="form-group">
          <DeleteButton onClick={this.delete.bind(this)}/>
          <CancelButton setForm = {this.props.setForm} />
          <SaveButton onClick={this.save.bind(this)} setForm = {this.props.setForm} />
        </div>

      </div>
    );
  }
}
