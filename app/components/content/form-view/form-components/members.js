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
      members = this.props.members.map((m) => (<div>{m}</div>));

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
