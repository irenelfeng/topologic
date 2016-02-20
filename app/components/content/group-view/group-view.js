import React from 'react';
<<<<<<< HEAD
import FormView from '../form-view/form-view';
=======
import NewGroupForm from '../form-view/forms/new-group-form';
>>>>>>> c83224238df75305cdb8d1a1962b5e95f23aaffe

export default class GroupView extends React.Component {
  constructor() {
    super();
  }

  render() {
<<<<<<< HEAD
    if (this.props.form)
      return (<FormView setForm = {this.props.setForm} type='newgroup' />);
=======
    var forms = {
      'newgroup': (<NewGroupForm setForm={this.props.setForm} />)
    };
>>>>>>> c83224238df75305cdb8d1a1962b5e95f23aaffe

    return (
      <div id="group-creation">
        {forms[this.props.type]}
      </div>
    );
  }
}
