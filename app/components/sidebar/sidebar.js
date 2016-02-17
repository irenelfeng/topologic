import React from 'react';
//import Sidebar from 'react-sidebar';

// import icons 
import GroupIcon from './icons/groups'
import TaskIcon from './icons/tasks'

export default class SidebarIcons extends React.Component { 

  constructor() {
    super();
    //this.state = {sidebarDocked: true};
  }

  render() {

    // var sidebarContent = <div><b>Sidebar content</b><GroupIcon /></div>;

    return(
      
      // downloaded sidebar let's not do that
      // <Sidebar sidebar={sidebarContent}
      //   children="MAIN CONTENT"
      //   docked={this.state.sidebarDocked} />
      <div>
        <b>Sidebar content</b>
        <GroupIcon changeActive ={this.props.changeActive} activeIcon={this.props.activeIcon}/>
        <TaskIcon changeActive = {this.props.changeActive} activeIcon={this.props.activeIcon}/>
      </div>
    );
  };
} 