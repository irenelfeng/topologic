import React from 'react';
import $ from 'jquery';
import TaskOrProject from '../form-components/task-or-project';
import Title from '../form-components/title';
import Deadline from '../form-components/deadline';
import Location from '../form-components/location';
import Description from '../form-components/description';
import GroupSelect from '../form-components/group-select';
import NotifySelect from '../form-components/notify-select';
import DeleteButton from '../form-components/delete-button';
import SaveButton from '../form-components/save-button';
import CancelButton from '../form-components/cancel-button';
import Stickies from '../form-components/stickies';
import ProjectSelect from '../form-components/project-select'


export default class TaskForm extends React.Component {
  constructor() {
    super();
    this.type = 'task';
    this.state = {
      type: 'new'
    };
  }

  setDeadline(checked) {
    this.setState({deadlineActivated: checked});
  }

  id(includeStar) {
    var id;
    if (this.props.form.projects.title) {
      id = this.props.form.projects.title.replace(/ /g,'_') + '-form';
    } else {
      id = 'new-task-form';
    }

    return includeStar ? '#' + id : id;
  }

  n() {
    return $(this.id(true));
  }

  save() {
    var data = {
      title: this.n().find('.form-title').val(),
      deadline: this.n().find('.date').val(),
      location: this.n().find('.form-location').val(),
      description: this.n().find('.task-description').val(),
      group: this.state.type == 'edit' ? this.n().find('#group-dropdown').html() :this.n().find('.simple-value').children(":first").html(),
      notify: this.notifySelect.getNotifyValue(),
      stickies: this.stickySelect.getStickies(),
      done: false,
      important: false
    };

    this.props.saveObject(data, this.type);
    this.props.setForm(null);
  }

  deleteTask(){
    var task = this.n().find('.form-title').val();
    this.props.deleteObject(task, this.type);
    this.props.setForm(null);
  }

  render() {
    var me = this.props.form.projects;
    var deadlineActivated = (this.state.deadlineActivated == null) ? (me.deadline != '' && me.deadline != null) : this.state.deadlineActivated;

    if (me.title == null) {
      return (
        <div className="form-container" id={this.id()}>

          <TaskOrProject type={this.type} changeForm={this.props.changeForm} />
          <Title />
          <ProjectSelect projects={this.props.items.projects}/>
          <Deadline deadlineActivated={deadlineActivated} setDeadline={this.setDeadline.bind(this)} />
          <Location />
          <Description />
          <GroupSelect groups={this.props.items.groups}/>
          <NotifySelect deadline={deadlineActivated} notify={{}} ref={(ref) => this.notifySelect = ref}/>
          <Stickies ref={(ref) => this.stickySelect = ref} stickies={[]} />

          <div className="form-group">
            <CancelButton setForm = {this.props.setForm} />
            <SaveButton onClick={this.save.bind(this)}/>
          </div>

        </div>
      );

    } else {
      this.state.type = 'edit';

      return (
          <div className="form-container" id={this.id()}>

            <Title title={me.title} />
            <Deadline deadline={me.deadline} deadlineActivated={deadlineActivated} setDeadline={this.setDeadline.bind(this)} />
            <Location location={me.location} />
            <Description description={me.description} />
            <GroupSelect group={me.group} groups={this.props.items.groups} type={this.state.type}/>

            <NotifySelect deadline={deadlineActivated} notify={me.notify}ref={(ref) => this.notifySelect = ref}/>
            <Stickies stickies={me.stickies} ref={(ref) => this.stickySelect = ref} taskTitle={me.title} />

            <div className="form-group">
              <DeleteButton onClick={this.deleteTask.bind(this)}/>
              <CancelButton setForm = {this.props.setForm} />
              <SaveButton onClick={this.save.bind(this)}/>
            </div>

          </div>
        );
    }
  }
}
