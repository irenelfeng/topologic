import React from 'react';
import $ from 'jquery';

export default class GroupAvatar extends React.Component {
  constructor() {
    super();
    const default_img = './img/groups.png';
    this.state = {
      fileURL: default_img
    }
    this.GroupTitle = '';
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
    var shouldClear = (this.groupTitle != null && this.groupTitle != this.props.groupTitle);
    
    this.groupTitle = this.props.groupTitle;
    if (shouldClear)
      this.state.fileURL = default_img;

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
