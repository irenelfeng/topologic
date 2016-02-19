import React from 'react';
import ListFilter from './list-filter/list-filter';
import ListContainer from './list-container/list-container';

export default class Panel extends React.Component {
  constructor() {
    super();
    this.state = {
      filterFn: () => true
    };
  }

  setFilter(fn) {
    if (fn != this.state.filterFn) {
      this.setState({
        filterFn: fn
      });
    }
  }

  resetFilter() {
    this.setState({
      filterFn: () => true
    });
  }

  render() {
    var itemsToPass = this.props.items[this.props.active];
    return (
      <div id="panel">
        <div id="panel-header-container">
          <div id="panel-header"> {this.props.active} </div>
          <img id="panel-plus" src="./img/plus.png" />
        </div>
        <ListFilter active={this.props.active} setFilter={this.setFilter.bind(this)} />
        <ListContainer active={this.props.active} filterFn={this.state.filterFn} items={itemsToPass} />
      </div>
    );
  }
}
