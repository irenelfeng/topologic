import React from 'react';

export default class DatePicker extends React.Component {
  constructor() {
    super();
    this.state = {
      picker: false
    }
  }

  onClick(e) {
    this.setState({picker: !this.state.picker})
  }

  render() {
    if (this.state.picker)
      var pickerEls = 'picked me!';
    else pickerEls = '';

    return (
      <div className="form-aligned-col2-pick">
        <input className="record-text" placeholder="Pick a date" readOnly />
        <img className="icon-img" onClick={this.onClick.bind(this)} src='./img/calendar.png' />
        { pickerEls }
      </div>
    );
  }
}
