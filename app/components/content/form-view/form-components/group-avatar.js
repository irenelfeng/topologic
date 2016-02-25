import React from 'react';
import $ from 'jquery';

const default_img = './img/groups.png';

export default class GroupAvatar extends React.Component {
  constructor() {
    super();
    this.state = {
      fileURL: default_img
    }
    this.groupTitle = null;
  }

  /*
  * changes the group avatar
  */
  changeAvatar(e) {

    var form = $('#group-avatar');
    var img = form.find('#avatar-link').val();
    this.state.fileURL = img; 
    this.forceUpdate();
  }

  getAvatar() {
    return this.state.fileURL;
  }


  render() {

    var shouldClear = (this.groupTitle != null && this.groupTitle != this.props.groupTitle);
    this.groupTitle = this.props.groupTitle;   
    if (shouldClear){
      var form = $('#group-avatar');
      form.find('#avatar-link').val('');
      this.state.fileURL = default_img;
    }

    if(this.state.fileURL == default_img){
      this.state.fileURL = this.props.avatar;
    }

    return (
      <div id="group-avatar" className="form-group">
        <div className="form-aligned-col1"> Group Avatar: </div>
        <input id="avatar-link" placeholder="Type a link to an image from the web..." />
        <button className="form-button" onClick={this.changeAvatar.bind(this)}>Upload image</button>
        <img className="avatar-img" src={this.state.fileURL}/>
        
      </div>
    );
  }
}
