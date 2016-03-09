import React from 'react';
import $ from 'jquery';

export default class StickyView extends React.Component {
  constructor() {
    super();
  }

  saveSticky() {
    var sticky = $('.sticky-form').find('textarea').val();
    if (sticky != '')
      this.props.addSticky(sticky);
  }

  deleteSticky() {
    this.props.deleteSticky(this.props.sticky);
  }

  onKeyPress(ev) {
    if (ev.key == 'Enter') {
      this.saveSticky()
    }
  }

  render() {
    var pos = $(this.props.parent).offset();

    var main1, main2 = '';
    if (this.props.sticky == '' || this.props.sticky == null) {
      main1 = (
        <div className="sticky-form">
          <textarea placeholder="Write new sticky note..." onKeyPress={this.onKeyPress.bind(this)} />
        </div>
      );

      main2 = (
        <div className="sticky-buttons">
          <div className="sticky-cancel" onClick={this.props.cancelSticky}> Cancel </div>
          <div className="sticky-done" onClick={this.saveSticky.bind(this)}> Done </div>
        </div>
      );

      return (
        <div className="sticky-view" style={{top: pos.top, left: pos.left}}>
          {main1} {main2}
        </div>);

    } else {
      main1 = (
        <div className="sticky-text">
          {this.props.sticky}
        </div>
      );

      main2 = (
        <div className="sticky-delete" onClick={this.deleteSticky.bind(this)}>
          <img src="./img/trash.png" />
        </div>
      );

      var sticky = (
        <div className="sticky-view" style={{top: pos.top, left: pos.left}}>
          {main1}
          <div className="sticky-buttons">
            {main2} <div className="sticky-cancel" onClick={this.props.cancelSticky}> OK </div>
          </div>
        </div>
      );

      return (
        <div className="sticky-view-container">{sticky}</div>
      );
    }
  }
}
