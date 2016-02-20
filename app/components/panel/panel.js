import React from 'react';
import ListFilter from './list-filter/list-filter';
import ListContainer from './list-container/list-container';

export default class Panel extends React.Component {
  constructor() {
    super();
    this.state = {
      filterFn: () => true
      //plusFn: () => true
    };

    this.headerImgs = {
      projects: ("./img/plus.png"),
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

  resetFilter() {
    this.setState({
      filterFn: () => true
    });
  }

  // on click for the header panel image
  onClick() {
    this.props.setForm(true);
  }

  render() {
    var itemsToPass = this.props.items[this.props.active];
    var href = this.headerImgs[this.props.active];
    
    return (
      <div id="panel">
        <div id="panel-header-container">
          <div id="panel-header"> {this.props.active} </div>
          <img id="panel-plus" src={href} onClick={this.onClick.bind(this)} />
        </div>
        <ListFilter active={this.props.active} setFilter={this.setFilter.bind(this)} />
        <ListContainer active={this.props.active} filterFn={this.state.filterFn} items={itemsToPass} />
      </div>
    );
  }
}
