import React from 'react';
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
    this.state = {
      deadline: false
    };
  }

  setDeadline(checked) {
    this.setState({deadline: checked});
  }

  render() {
    return (
      <div id="form-container">
        <Title />
        <Deadline deadline={this.state.deadline} setDeadline={this.setDeadline.bind(this)} />
        <Location />
        <Description />
        <GroupSelect />
        <NotifySelect deadline={this.state.deadline}/>
        <div className="form-group">
          <SaveButton setForm = {this.props.setForm} />
          <CancelButton setForm = {this.props.setForm} />
        </div>
      </div>
    );
  }
}
