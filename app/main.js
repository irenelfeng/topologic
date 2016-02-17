import React from 'react';
import ReactDOM from 'react-dom';
import SidebarIcons from './components/sidebar/sidebar'

// import all of our javascript files

// components here. 

class Main extends React.Component { 
  constructor() {
    super();
    this.state = { activeIcon: "tasks" } ;
  }

  changeActive(activeIcon) {
    this.setState({activeIcon});
  }

  render() {
    return (
      <div>
        Clicked: {this.state.activeIcon}
        <SidebarIcons changeActive={this.changeActive.bind(this)} activeIcon={this.state.activeIcon}>
        </SidebarIcons>
      </div>
    ); //need semicolon
  }
} 



//do not change - changes the index.html file
ReactDOM.render(
  <Main/>,
  document.getElementById('example')
);