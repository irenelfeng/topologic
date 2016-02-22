import React from 'react';
import TaskOrProject from '../form-components/task-or-project';
import Title from '../form-components/title';
import Description from '../form-components/description';
import GroupSelect from '../form-components/group-select';
import NotifySelect from '../form-components/notify-select';
import SaveButton from '../form-components/save-button';
import CancelButton from '../form-components/cancel-button';

export default class NewProjectForm extends React.Component {
  constructor() {
    super();
    this.type = 'project';

  }

  save() {
    var data = {
      title: document.querySelector('#form-title').value,
      //description: document.querySelector('#task-description').value,
      //group: document.querySelector('#group-dropdown').value,
      //notify: document.querySelector('#notify-select').value
    };

    this.props.saveObject(object, this.type);
    this.props.setForm(null);
  }


  render() {
    return (
      <div id="form-container" >
          <TaskOrProject type={this.type} changeForm = {this.props.changeForm}/>
        <Title object={this.props.form} />
        <Description object={this.props.form} />
        <GroupSelect object={this.props.form} />
        <NotifySelect object={this.props.form} />
        <div className="form-group">
          <CancelButton setForm = {this.props.setForm} object={this.props.form} />
          <SaveButton onClick={this.save.bind(this)} setForm = {this.props.setForm} object={this.props.form} />
        </div>
      </div>
    );
  }
}
