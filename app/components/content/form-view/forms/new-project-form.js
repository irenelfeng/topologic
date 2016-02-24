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
    this.state = {
      type: 'new'
    }
  }

  id(includeStar) {
    var id;
    if (this.props.form.projects.name) {
      id = this.props.form.projects.name.replace(/ /g,'_') + '-form'; 
    } else {
      id = 'new-project-form';
    }
    
    return includeStar ? '#' + id : id;
  }

  n() {
    return $(this.id(true));
  }

  save() {
    var data = {
      name: this.n().find('.form-title').val(),
      description: this.n().find('.task-description').val(),
      group: this.state.type == 'edit' ? this.n().find('#group-dropdown').html() : this.n().find('.simple-value').children(":first").html(),
      //notify: document.querySelector('#notify-select').value
      tasks: [],
      links: []
    };

    this.props.saveObject(data, this.type);
    this.props.setForm(null);
  }

  render() {
    var me = this.props.form.projects;

    if (me.name == null) {
      return (
        <div className="form-container" id={this.id()} >
          <TaskOrProject type={this.type} changeForm = {this.props.changeForm}/>
          <Title />
          <Description />
          <GroupSelect groups={this.props.items.groups} />
          <NotifySelect />
          <div className="form-group">
            <CancelButton setForm = {this.props.setForm} object={this.props.form} />
            <SaveButton onClick={this.save.bind(this)} setForm = {this.props.setForm} object={this.props.form} />
          </div>
        </div>
      );

    } else {
      this.state.type = 'edit';

      return (
        <div className="form-container" id={this.id()} >
          <TaskOrProject type={this.type} changeForm = {this.props.changeForm}/>
          <Title title={me.title} />
          <Description description={me.description} />
          <GroupSelect group={me.group} groups={this.props.items.groups} />
          <NotifySelect object={this.props.form} />
          <div className="form-group">
            <CancelButton setForm = {this.props.setForm} object={this.props.form} />
            <SaveButton onClick={this.save.bind(this)} setForm = {this.props.setForm} object={this.props.form} />
          </div>
        </div>
      );
    }
  }
}
