import React from 'react';
import FormView from '../form-view/form-view';

export default class GroupView extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.form)
      return (<FormView setForm = {this.props.setForm} type='newgroup' />);

    return (
      <div id="group-creation">
        {forms[this.props.type]}
      </div>
    );
  }
}
