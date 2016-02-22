import React from 'react';

export default class GroupItem extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="list-item group-item">
        <div className="icons-container">
          <img className="person-container" src={this.props.group.imgSrc}/>
        </div>
        <div className="text-container">
          <span className="group-title"> {this.props.group.name} </span>
          <span className="group-members"> {this.props.group.members} </span>
        </div>
      </div>
    );
  }
}
