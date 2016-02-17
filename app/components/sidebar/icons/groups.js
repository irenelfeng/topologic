import React from 'react';

export default class GroupIcon extends React.Component { 
  constructor() {
    super();
      this.icon = "groups";
  }

  clicked(e) {
    console.log(this.icon_name);
    if(this.icon== this.props.activeIcon){
      // don't do anything, already clicked it
    }else{
      //pass to the sidebar
      this.props.changeActive(this.icon);
    }
  }
  
  render() {
    // var group;
    // console.log(group);
    // if(this.state.active)

    //   group = <button onClick={this.clicked.bind(this)}>Groups</button>;
    // else 
    //   group = <button onClick={this.clicked.bind(this)} {active ? null: style={{ color: 'blue' }} >Groups</button>;
    console.log("call rerender");
    return(
      <div>
        <button onClick={this.clicked.bind(this)} style={{ color: 'blue'}}>
          <img src="./img/groups.png" />
        </button>
      </div>
      )
  };
}
