import React from 'react';

export default class Stickies extends React.Component {
  constructor() {
    super();
    this.state = {
        currSticky: '',
        addedStickies: []
    }
  }

  onKeyPress(e) {
    if (e.key == 'Enter') {
      var addedStickies = this.state.addedStickies;
      this.state.addedStickies.push(this.state.currSticky);
      this.forceUpdate();

      this.setState({currSticky: ''});
    } else
      this.setState({currSticky: this.state.currSticky + e.key});
  }

  removeSticky(i, e) {
    this.state.addedStickies.splice(i, 1);
    this.forceUpdate();
  }

  render() {
    var addedStickies = this.state.addedStickies.map((sticky, i) =>
        (<div className="form-aligned-col2-list-item">
          <div className="form-aligned-col2-check"> &bull; </div>
          <div key={sticky} className="form-aligned-col2-pick sticky">
            <div> {sticky} </div>
            <img className="icon-img" src='./img/trash.png' onClick={this.removeSticky.bind(this, i)}/>
          </div>
        </div>));

    if (this.state.addedStickies.length < 5) {
      var newSticky =
        (<div className="form-aligned-col2-list-item">
          <div className="form-aligned-col2-check"> &bull; </div>
          <input className="form-aligned-col2-text" placeholder="Type new sticky here" onKeyPress={this.onKeyPress.bind(this)} value={this.state.currSticky} />
        </div>);
    } else newSticky = '';

    return (
      <div className="form-group">
        <div className="form-aligned-col1"> Stickies: </div>
        <div className="form-aligned-col2-list">
          {addedStickies}
          {newSticky}
        </div>
      </div>
    );
  }
}
