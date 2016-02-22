import React from 'react';
import FormView from '../form-view/form-view';

export default class GroupView extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.form[this.props.active])
      return (<FormView saveObject={this.props.saveObject} setForm={this.props.setForm} type='group' members={this.props.members}/>);

    return (
      <div id="group-creation">
        
      </div>
    );
  }
}
