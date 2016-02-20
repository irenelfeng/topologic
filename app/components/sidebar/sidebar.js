import React from 'react';
import Icon from './icon'

export default class Sidebar extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div id='sidebar'>
        <Icon setActive ={this.props.setActive} active={this.props.active} icon='tasks'/>
        <Icon setActive ={this.props.setActive} active={this.props.active} icon='groups'/>
        <Icon setActive ={this.props.setActive} active={this.props.active} icon='notifications'/>
      </div>
    );
  }
}
