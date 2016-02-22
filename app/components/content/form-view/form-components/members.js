import React from 'react';

export default class Members extends React.Component {
  constructor() {
    super();
  }

  addMember() {
    var test = "member 1";
    this.props.addMember(test);
  }

  render() {
    var members;
    if(this.props.members)
      members = this.props.members.map((m, i) => (<div>{m}<span className="remove-member" onClick={this.props.removeMember(i)}>x</span></div>));

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
