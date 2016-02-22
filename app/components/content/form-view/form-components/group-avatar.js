import React from 'react';

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
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      self.setState({
          fileURL:upload.target.result,
        });
    }

    reader.readAsDataURL(file);
  }

  render() {
    return (
      <div id="group-avatar" className="form-group">
        <div className="form-aligned-col1"> Group Avatar: </div>
        <img className="hoverInput avatar-img" src={this.state.fileURL} >
        </img>
        <input type="file" onChange={this.changeAvatar.bind(this)} id="avatar" accept="image/*" />
      </div>
    );
  }
}
