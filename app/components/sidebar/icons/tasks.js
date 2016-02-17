import React from 'react';

export default class TaskIcon extends React.Component { 
  constructor() {
    super();
      this.icon = "tasks";
  }

  clicked(e) {
    if(this.icon== this.props.activeIcon){
      //collapse 
    }else{
      //pass to the sidebar
      this.props.changeActive(this.icon);
    }
  }
  render() {

    return(
      <div>
        <button onClick={this.clicked.bind(this)} style={{ color: 'blue'}}>
          <img src="./img/tasks.png" />
        </button>
      </div>
      )
  };
}
