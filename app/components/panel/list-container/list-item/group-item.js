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
    return (
      <div className={'list-item group-item ' + this.props.selected} onClick={this.selected.bind(this)} >
        <div className="icons-container">
          <img className="person-container" src={this.props.group.avatar}/>
        </div>
        <div className="text-container">
          <span className="group-title"> {this.props.group.name} </span>
          {this.props.group.members}
        </div>
      </div>
    );
  }
}
