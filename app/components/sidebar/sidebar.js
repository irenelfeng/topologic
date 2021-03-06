import React from 'react';
import Icon from './icon'

export default class Sidebar extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div id='sidebar'>
        <Icon setActive ={this.props.setActive} active={this.props.active} icon='projects'/>
        <Icon setActive ={this.props.setActive} active={this.props.active} icon='groups'/>
        <Icon setActive ={this.props.setActive} active={this.props.active} icon='notifications' notifications={this.props.notifications}/>
        <Icon setActive ={this.props.setActive} active={this.props.active} icon='tutorials'/>
      </div>
    );
  }
}
