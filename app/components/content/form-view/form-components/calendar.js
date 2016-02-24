import React from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'rc-time-picker';
import GregorianCalendar from 'gregorian-calendar';
import DateTimeFormat from 'gregorian-calendar-format';
import Modal from 'react-modal';

export default class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      picker: false,
      timePicker: false,
      date: '',
      time: ''
    }
    this.customStyles = {
      content : {
        position                   : 'absolute',
        top                        : '20%',
        left                       : '40%',
        right                      : '20%',
        bottom                     : '20%',
        background                 : '#29C8E1',
        borderRadius               : '10px',
        outline                    : 'none'
      }
    }
    this.formatter = new DateTimeFormat('HH:mm');
  }

  onDateTimeCheck(e) {
    this.setState({picker: true});
  }

  onDateChange(date) {
    this.setState({date: date + ", "});
  }

  onTimeCheck(e) {
    this.setState({timePicker: e.target.checked});
  }

  onTimeChange(value) {
    this.setState({time: value && this.formatter.format(value)});
  }

  doneClick() {
    this.setState({picker: false});
  }


  render() {
    if (this.state.picker) {
      var date = (<DatePicker hideFooter={true} navPrev={"<<"} navNext={">>"} onChange={this.onDateChange.bind(this)}/>);
      var addTime =
        (<div className="form-group">
          <input type="checkbox" className="form-aligned-col2-check" onClick={this.onTimeCheck.bind(this)}/>
          <div className="form-aligned-col2-text">Add time</div>
        </div>);

      if (this.state.timePicker)
        var time = (<TimePicker showSecond={false} formatter={this.formatter} onChange={this.onTimeChange.bind(this)}/>);
      else time = '';

      var done =
        (<div className="form-group">
          <a className="form-button" onClick={this.doneClick.bind(this)}>
            Done
          </a>
        </div>);

      var pickerEls = (<Modal isOpen={this.state.picker} onRequestClose={this.closeModal} style={this.customStyles}> {date} {addTime} {time} {done} </Modal>);
    }
    else pickerEls = '';

    return (
      <div className="form-aligned-col2-pick">
        <input id="date" placeholder="Pick a date" value={this.state.date + this.state.time} />
        <img className="icon-img" onClick={this.onDateTimeCheck.bind(this)} src='./img/calendar.png' />
        {pickerEls}
      </div>
    );
  }
}
