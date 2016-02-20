import React from 'react';
import TaskOrProject from '../form-components/task-or-project';
import Title from '../form-components/title';
import Deadline from '../form-components/deadline';
import Location from '../form-components/location';
import Description from '../form-components/description';
import GroupSelect from '../form-components/group-select';
import NotifySelect from '../form-components/notify-select';
import SaveButton from '../form-components/save-button';
import CancelButton from '../form-components/cancel-button';

export default class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.type = 'task';
    this.state = {
      deadline: false
    };
  }

  setDeadline(checked) {
    this.setState({deadline: checked});
  }

  save() {
    var data = {
      title: document.querySelector('#form-title').value,
      //deadline: document.querySelector('.form-title').value,
      //location: document.querySelector('#form-location').value,
      //description: document.querySelector('#task-description').value,
      //group: document.querySelector('#group-dropdown').value,
      //notify: document.querySelector('#notify-select').value
    };

    this.props.newTask(data);
    this.props.setForm(false);
  }

  render() {
    return (
      <div id="form-container">
        <TaskOrProject type = {this.type} changeForm={this.props.changeForm} />
        <Title />
        <Deadline deadline={this.state.deadline} setDeadline={this.setDeadline.bind(this)} />
        <Location />
        <Description />
        <GroupSelect />
        <NotifySelect deadline={this.state.deadline}/>
        <div className="form-group">
          <CancelButton setForm = {this.props.setForm} />
          <SaveButton onClick={this.save.bind(this)}/>
        </div>
      </div>
    );
  }
}
