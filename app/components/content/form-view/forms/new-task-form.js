import React from 'react';
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

export default class NewTaskForm extends React.Component {
  constructor() {
    super();
    this.type = 'task';
    this.state = {
      deadline: false,
      type: 'new'
    };
  }

  setDeadline(checked) {
    this.setState({deadline: checked});
  }

  save() {
    var data = {
      title: document.querySelector('#form-title').value,
      deadline: document.querySelector('#date') ? document.querySelector('#date').value : '',
      location: document.querySelector('#form-location') ? document.querySelector('#form-location') : '',
      description: document.querySelector('#task-description') ? document.querySelector('#task-description').value : '',
      group: document.querySelector(".simple-value").firstChild.innerHTML,
      //notify: document.querySelector('#notify-select').value
      done: false,
      important: false
    };

    this.props.saveObject(data, this.type);
    this.props.setForm(null);
  }

  render() {
    if(Object.keys(this.props.form['projects']).length == 0){
      return (
        <div id="form-container">
          <TaskOrProject type={this.type} changeForm={this.props.changeForm} />
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
    }else{
      this.state.type = 'edit';
      return (
          <div id="form-container">
            <Title title={this.props.form['projects'].title} />
            <Deadline deadline={this.state.deadline} setDeadline={this.setDeadline.bind(this)} />
            <Location />
            <Description desc={this.props.form['projects'].description} />
            <GroupSelect type={this.state.type}/>
            <NotifySelect deadline={this.state.deadline}/>
            <Stickies />
            <div className="form-group">
              <DeleteButton />
              <CancelButton setForm = {this.props.setForm} />
              <SaveButton onClick={this.save.bind(this)}/>
            </div>
          </div>
        );
    }
  }
}
