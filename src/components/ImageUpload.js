import React, { Component } from "react";
import { Storage } from "aws-amplify";
import { Button } from "@material-ui/core";
import { firebase } from "@firebase/app";
class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0,
      message: ""
    };
    this.onChange = this.onChange.bind(this);
    this.upload = this.upload.bind(this);
  }
  upload = () => {
    const { image } = this.state; // const image = this.state.image?
    const uploadTask = firebase
      .storage()
      .ref(image.name)
      .put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        //progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        const message = error.message;
        this.setState({ message });
      },
      complete => {
        const getTask = firebase
          .storage()
          .ref()
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            const message = url;
            this.setState({ message });
          });
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
        <progress value={this.state.progress} max="100" />
        <br />
        <input
          type="file"
          accept="image/png"
          onChange={e => this.onChange(e)}
        />
        <Button onClick={this.upload}>Upload</Button>
        <a href={this.state.message}>{this.state.message}</a>
      </div>
    );
  }
}
export default ImageUpload;
