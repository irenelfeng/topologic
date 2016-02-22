import React from 'react';

import ReactSelectize from 'react-selectize';
export default class Members extends React.Component {
  constructor() {
    super();
  }

  addMember() {
    var test = "member 1";
    this.props.addMember(test);
  }

  removeMember(i, e){
    this.props.removeMember(i);
  }

  render() {
    var members;
    if(this.props.members)
      members = this.props.members.map((m, i) => (<div>{m}<span className="remove-member" onClick={this.removeMember.bind(this, i)}>x</span></div>));

    return (
      <div>
        <div className="add-box" onClick={this.addMember.bind(this)} >
          Add Member
        </div>
        <div id="members-box">
          {members}
        </div>
      </div>
    );
  }
}
