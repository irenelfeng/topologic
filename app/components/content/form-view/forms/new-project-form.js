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
      name: document.querySelector('#form-title').value,
      //description: document.querySelector('#task-description').value,
      group: document.querySelector(".simple-value").firstChild.innerHTML,
      //notify: document.querySelector('#notify-select').value
    };

    this.props.saveObject(data, this.type);
    this.props.setForm(null);
  }


  render() {

    if (this.props.form.isEmpty){
      var toggleTask = (<TaskOrProject type={this.type} changeForm = {this.props.changeForm}/>);
    }
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
