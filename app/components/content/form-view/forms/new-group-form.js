import React from 'react';
import Title from '../form-components/title';
import Description from '../form-components/description';
import GroupSelect from '../form-components/group-select';
import NotifySelect from '../form-components/notify-select';
import SaveButton from '../form-components/save-button';
import CancelButton from '../form-components/cancel-button';
import GroupAvatar from  '../form-components/group-avatar';
import Members from  '../form-components/members';

export default class NewGroupForm extends React.Component {
  constructor() {
    super();

  }


  render() {
    return (
      <div id="form-container">
        <Title />
        <Description />
        <GroupAvatar /> 
        <div className="form-group">
          <CancelButton setForm = {this.props.setForm} />
          <SaveButton setForm = {this.props.setForm} />
        </div>
      </div>
    );
  }
}
