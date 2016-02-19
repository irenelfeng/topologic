import React from 'react';
import ListFilter from './list-filter/list-filter';

export default class Panel extends React.Component {
  constructor() {
    super();
    this.state = {
      filterFn: () => true
      //plusFn: () => true
    };

    this.headerImgs = {
      tasks: ("./img/plus.png"),
      groups: ("./img/plus.png"),
      notifications: ("./img/sort.png"),
    }
  }

  setFilter(fn) {
    if (fn != this.state.filterFn) {
      this.setState({
        filterFn: fn
      });
    }
  }

  // setPlus(fn) {
  //   if (fn != this.state.plusFn) {
  //     this.setState({
  //       plusFn: fn
  //     });
  //   }
  // }

  render() {

    var href = this.headerImgs[this.props.active];
              // <ListContainer active={this.props.active} filterFn={this.state.filterFn} items={this.props.items[this.props.active]} />
    return (
      <div id="panel">
        <div id="panel-header-container">
          <div id="panel-header"> {this.props.active} </div>
          <img id="panel-plus" src={href} />
        </div>
        <ListFilter active={this.props.active} setFilter={this.setFilter.bind(this)} />
      </div>
    );
  }
}
