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

  }


  render() {
    return (
      <div id="form-container" >
          <TaskOrProject changeForm = {this.props.changeForm}/>
        <Title />
        <Description />
        <GroupSelect />
        <NotifySelect />
        <div className="form-group">
          <CancelButton setForm = {this.props.setForm} />
          <SaveButton setForm = {this.props.setForm} />
        </div>
      </div>
    );
  }
}
