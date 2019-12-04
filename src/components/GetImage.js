import React, { Component } from "react";
import { Storage } from "aws-amplify";
import { Button } from "@material-ui/core";
import storage from "../index";
class GetImage extends Component {
  constructor(props) {
    super(props);
    this.get = this.get.bind(this);
    this.state = {
      url: ""
    };
  }
  get() {
    const getTask = storage
      .ref()
      .child("WaterCityGabriel.png")
      .getDownloadURL()
      .then(url => {
        const newUrl = url;
        this.setState(() => ({ newUrl }));
      });
  }
  render() {
    return (
      <div>
        <Button onClick={this.get}>Get Image</Button>
        <img
          src={this.state.url}
          alt="Stored Image"
          height="300"
          width="400"
        ></img>
      </div>
    );
  }
}

export default GetImage;
