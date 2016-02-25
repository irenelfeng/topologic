import React from 'react';

export default class GroupAvatar extends React.Component {
  constructor() {
    super();

  }

  /*
  * changes the group avatar
  */
  changeAvatar(e) {
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      // self.setState({
      //     fileURL:upload.target.result,
      //   });
      self.props.fileUpload(upload.target.result);
    }

    reader.readAsDataURL(file);
  }

  render() {
    var fileURL = './img/groups.png'
    if(this.props.object){
      fileURL = this.props.object.avatar;
    }
    return (
      <div id="group-avatar" className="form-group">
        <div className="form-aligned-col1"> Group Avatar: </div>
        <img className="hoverInput avatar-img" src={fileURL} >
        </img>
        <input type="file" onChange={this.changeAvatar.bind(this)} id="avatar" accept="image/*" />
      </div>
    );
  }
}
