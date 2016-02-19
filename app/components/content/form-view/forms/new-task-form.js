import React from 'react';
import TitleComponent from '../form-components/title-component';
import DeadlineComponent from '../form-components/deadline-component';
import LocationComponent from '../form-components/location-component';
import DescriptionComponent from '../form-components/description-component';
import GroupSelectComponent from '../form-components/group-select-component';
import NotifySelectComponent from '../form-components/notify-select-component';
import SaveButtonComponent from '../form-components/save-button-component';
import CancelButtonComponent from '../form-components/cancel-button-component';

export default class NewTaskForm extends React.Component { 
  constructor() {
    super();
  }

  render() {
    return (
      <div id="form-container">
        <TitleComponent />
        <DeadlineComponent />
        <LocationComponent />
        <DescriptionComponent />
        <GroupSelectComponent />
        <NotifySelectComponent />
        <div className="form-group">
          <SaveButtonComponent setForm = {this.props.setForm} />
          <CancelButtonComponent setForm = {this.props.setForm} />
        </div>
      </div>
    );
  }
}
