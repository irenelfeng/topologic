import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from './components/sidebar/sidebar'

class Main extends React.Component { 
  constructor() {
    super();
    this.state = { 
      active: 'tasks' 
    };
  }

  setActive(icon) {
    this.setState({active: icon});
  }

  render() {
    return (
      <div>
        Clicked: {this.state.active}
        <Sidebar setActive={this.setActive.bind(this)} active={this.state.active} />
      </div>
    );
  }
} 

//do not change - changes the index.html file
ReactDOM.render(
  <Main/>,
  document.getElementById('app')
);
