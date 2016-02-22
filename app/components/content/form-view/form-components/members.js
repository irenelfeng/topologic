import React from 'react';

import ReactSelectize from 'react-selectize';
export default class Members extends React.Component {
  constructor() {
    super();
    this.state = {
      adding: false
    }
    this.options = ["Person", "Jimmy", "Choose a Person", "Lilly", "Frederik"].map(function(val){
                return {label: val, value: val}
            });
  }

  addMember() {
    this.setState({adding:true});
  }

  removeMember(i, e){
    this.props.removeMember(i);
  }

  selectedMember(m) {
    debugger;
    this.props.addMember(m);
  }

  render() {
    var members;
    var add = "Add Member";
    var SimpleSelect = ReactSelectize.SimpleSelect;
    if(this.props.members)
      members = this.props.members.map((m, i) => (<div>{m}<span className="remove-member" onClick={this.removeMember.bind(this, i)}>x</span></div>));

    if(this.state.adding)
      add = (<SimpleSelect options = {this.options} placeholder = "Select a person" onValueChange={(m) => this.selectedMember.bind(this, m)}/>);

    return (
      <div>
        <div className="add-box" onClick={this.addMember.bind(this)} >
          {add} 
        </div>
        <div id="members-box">
          {members}
        </div>
      </div>
    );
  }
}
