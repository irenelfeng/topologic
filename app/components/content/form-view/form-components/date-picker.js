import React from 'react';
import DatePicker from 'react-date-picker';

export default class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      picker: false,
      date: ''
    }
  }

  onClick(e) {
    this.setState({picker: !this.state.picker});
  }

  onChange(date) {
    this.setState({date});
  }

  render() {
    if (this.state.picker)
      var pickerEls = (<DatePicker hideFooter={true} navPrev={"<<"} navNext={">>"} onChange={this.onChange.bind(this)}/>);
    else pickerEls = '';

    return (
      <div className="form-aligned-col2-pick">
        <input id="date" placeholder="Pick a date" value={this.state.date}/>
        <img className="icon-img" onClick={this.onClick.bind(this)} src='./img/calendar.png' />
        {pickerEls}
      </div>
    );
  }
}
