import React from 'react';
import $ from 'jquery';

export default class GroupAvatar extends React.Component {
  constructor() {
    super();
    this.state = {
      fileURL: './img/groups.png'
    }
  }

  /*
  * changes the group avatar
  */ 
  changeAvatar(e) {
    var form = $('#group-avatar');
    var img = form.find('#avatar-link').val();
    this.setState=({fileURL: img});
  }

  render() {
    // if(this.props.object){
    //   this.state.fileURL = this.props.object.avatar;
    // }
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
