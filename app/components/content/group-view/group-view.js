import React from 'react';
import FormView from '../form-view/form-view';

export default class GroupView extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.form[this.props.active])
      return (<FormView form={this.props.form} saveObject={this.props.saveObject} setForm={this.props.setForm} type='group'/>);

    return (
      <div id="group-view">
        Select a group on the panel to view.... 
      </div>
    );
  }
}
