import React from 'react';
import ReactSelectize from 'react-selectize';
import $ from 'jquery';

export default class NotifySelect extends React.Component {
  constructor() {
    super();
    this.state = {};

    this.options = ["minutes", "hours", "days"].map(function(val){
      return {label: val, value: val}
    });

  }

  getNotifyValue() {
    var vals = {
      onCompletion: this.state.onCompletion || this.props.notify.onCompletion || false,
      before: this.state.before || this.props.notify.before || false,
      beforeUnit: this.simpleSelect ? this.simpleSelect.state.value.value : null,
      beforeQuant: $('.notif-num').val()
    };
    console.log(vals);
    return vals;
  }

  toggleBefore(e) {
    this.setState({before: e.target.checked});
  }

  toggleCompletion(e) {
    this.setState({onCompletion: e.target.checked});
  }

  render() {
    var before = (this.state.before == null) ? this.props.notify.before : this.state.before;
    var onCompletion = (this.state.onCompletion == null) ? this.props.notify.onCompletion : this.state.onCompletion;

    var beforeUnitVal = this.props.notify.beforeUnit || 'minutes';
    var SimpleSelect = ReactSelectize.SimpleSelect;

    var deadlineEls ='';
    if (this.props.deadline) {
      deadlineEls = (<div className="form-aligned-col2-list-item">
          <input type="checkbox" className="form-aligned-col2-check" checked={before} onChange={this.toggleBefore.bind(this)}/>
          <div className="form-aligned-col2-notif">
            <input className="notif-num" placeholder="15" defaultValue={this.props.notify.beforeQuant} />
            <SimpleSelect
                defaultValue = {{label: beforeUnitVal, value: beforeUnitVal }}
                options = {this.options}
                placeholder = "Select a unit of time"
                ref={(ref) => this.simpleSelect = ref}
            />
            <div className="notif-text"> before the deadline </div>
          </div>
        </div>);
    }

    return (
      <div>
        <div id="notify-select" className="form-group">
          <div className="form-aligned-col1"> Notify me... </div>
          <div className="form-aligned-col2-list">
            <div className="form-aligned-col2-list-item">
              <input type="checkbox" className="form-aligned-col2-check" checked={onCompletion} onChange={this.toggleCompletion.bind(this)} />
              <div className="form-aligned-col2-text"> When task is completed </div>
            </div>
            { deadlineEls }
          </div>
        </div>
      </div>
    );
  }
}
