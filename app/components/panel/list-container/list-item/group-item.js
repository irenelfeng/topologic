import React from 'react';

export default class GroupItem extends React.Component {
  constructor() {
    super();
    this.type = 'group'
  }

  selected(e) {
    var item = this.props.group;
    this.props.editItem(this.props.group.name, item, this.type);
  }

  render() {
    var maxChars = 40;
    var theChosenOnes = [];
    var truncated = 0;
    this.props.group.members.forEach(m => {
      if (theChosenOnes.join(', ').length <= maxChars)
        theChosenOnes.push(m);
      else
        truncated++;
    });

    if (truncated > 0)
      theChosenOnes.push('+' + truncated.toString() + ' more');

    return (
      <div className={'list-item group-item ' + this.props.selected} onClick={this.selected.bind(this)} >
        <div className="icons-container">
          <img className="person-container" src={this.props.group.avatar}/>
        </div>
        <div className="text-container">
          <span className="group-title"> {this.props.group.name} </span>
          {theChosenOnes.join(', ')}
        </div>
      </div>
    );
  }
}
