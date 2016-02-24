import React from 'react';
import $ from 'jquery';
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
      name: $(this.id()).find('.form-title').val(),
      description: $(this.id()).find('.task-description').val(),
      group: $(this.id()).find('.simple-value').firstChild.innerHTML,
      //notify: document.querySelector('#notify-select').value
    };

    this.props.saveObject(data, this.type);
    this.props.setForm(null);
  }

  id() {
    return '#' + this.props.form.projects.name.replace(/ /g,'_') + '-form';
  }


  render() {

    if (this.props.form.isEmpty){
      var toggleTask = (<TaskOrProject type={this.type} changeForm = {this.props.changeForm}/>);
    }
    return (
      <div className="form-container" id={this.id()} >
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
