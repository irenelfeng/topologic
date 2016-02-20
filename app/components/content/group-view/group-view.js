import React from 'react';
import NewGroupForm from '../form-view/forms/new-group-form';

export default class GroupView extends React.Component {
  constructor() {
    super();
  }

  render() {
    var forms = {
      'newgroup': (<NewGroupForm setForm={this.props.setForm} />)
    };

    return (
      <div id="group-creation">
        {forms[this.props.type]}
      </div>
    );
  }
}
