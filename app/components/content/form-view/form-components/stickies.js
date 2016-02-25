import React from 'react';
import $ from 'jquery';

export default class Stickies extends React.Component {
  constructor() {
    super();
    this.state = {
        oldStickies: [],
        addedStickies: []
    };

    this.taskTitle = null;
  }

  onKeyPress(e) {
    if (e.key == 'Enter') {
      var input = $('#sticky-val');
      this.state.addedStickies.push(input.val());
      this.forceUpdate();

      input.val('');
    }
  }

  removeSticky(sticky, e) {
    var propsIdx = this.props.stickies.indexOf(sticky);
    var addedIdx = this.state.addedStickies.indexOf(sticky);
    if (propsIdx > -1) 
      this.props.stickies.splice(propsIdx, 1);

    if (addedIdx > -1)
      this.state.addedStickies.splice(addedIdx, 1);

    this.forceUpdate();
  }

  getStickies() {
    return this.props.stickies.concat(this.state.addedStickies);
  }

  render() {
    var shouldClear = (this.taskTitle != null && this.taskTitle != this.props.taskTitle);
    
    this.taskTitle = this.props.taskTitle;
    if (shouldClear)
      this.state.addedStickies = [];

    var stickies = this.props.stickies.map(sticky => {
      return (
        <div key={sticky} className="form-aligned-col2-list-item">
          <div className="form-aligned-col2-check"> &bull; </div>
          <div  className="form-aligned-col2-pick sticky">
            <div> {sticky} </div>
            <img className="icon-img trash" src='./img/trash.png' onClick={this.removeSticky.bind(this, sticky)}/>
          </div>
        </div>
      );
    });

    var addedStickies = this.state.addedStickies.map(sticky => {
      return (
        <div key={sticky} className="form-aligned-col2-list-item">
          <div className="form-aligned-col2-check"> &bull; </div>
          <div  className="form-aligned-col2-pick sticky">
            <div> {sticky} </div>
            <img className="icon-img trash" src='./img/trash.png' onClick={this.removeSticky.bind(this, sticky)}/>
          </div>
        </div>
      );
    });

    if (this.state.addedStickies.length < 5) {
      var newSticky = (
        <div className="form-aligned-col2-list-item">
          <div className="form-aligned-col2-check"> &bull; </div>
          <input id="sticky-val" className="form-aligned-col2-text" placeholder="Type new sticky here" onKeyPress={this.onKeyPress.bind(this)} defaultValue={''} />
        </div>
      );
    } else newSticky = '';

    return (
      <div className="form-group" >
        <div className="form-aligned-col1"> Stickies: </div>
        <div className="form-aligned-col2-list">
          {stickies}
          {addedStickies}
          {newSticky}
        </div>
      </div>
    );
  }
}
