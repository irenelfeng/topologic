import React from 'react';
import Icon from './icon'

export default class Sidebar extends React.Component { 

  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <b>Sidebar content</b>
        <Icon setActive ={this.props.setActive} active={this.props.active} icon='tasks'/>
        <Icon setActive ={this.props.setActive} active={this.props.active} icon='groups'/>
      </div>
    );
  }
}
