import React, { Component } from "react";
import { Storage } from "aws-amplify";
import { Button } from "@material-ui/core";
import storage from "../index";
class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: ""
    };
    this.onChange = this.onChange.bind(this);
    this.upload = this.upload.bind(this);
  }
  upload = () => {
    const { image } = this.state; // const image = this.state.image?
    const uploadTask = storage.ref(image.name).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        //progress
      },
      error => {
        console.log(error);
      },
      complete => {
        console.log(complete);
      }
    );
  };
  onChange = e => {
    const file = e.target.files[0];
    if (file) {
      const image = file;
      this.setState(() => ({ image }));
    }
  };

  render() {
    const style = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    };
    return (
      <div style={style}>
        <input
          type="file"
          accept="image/png"
          onChange={e => this.onChange(e)}
        />
        <Button onClick={this.upload}>Upload</Button>
      </div>
    );
  }
}
export default ImageUpload;
