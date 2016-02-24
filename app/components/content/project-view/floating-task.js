import React from 'react';

export default class FloatingTask extends React.Component { 
  constructor() {
    super();
  }

  render() {
    var important = this.props.task.important ? (<img src="./img/important.png" />) : '';

    return (
      <div className="task-circle" >

        <div className="icons-container">
          <img className="person-container" src="./img/person.png"/>
          {important}
        </div>

        <div className="task-description" >
          {this.props.task.title}

          <div className="sticky-plus">
            <img src="./img/fatplus.png" />
          </div>
        </div>

      </div>
    );
  }
}
