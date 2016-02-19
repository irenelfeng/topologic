import React from 'react';

export default class GroupItem extends React.Component { 
  constructor() {
    super();
  }

  render() {
    return (
      <div className="list-item group-item">
        <span> {this.props.group.name} </span>
      </div>
    );
  }
}