import React, { Component } from "react";
import { Auth, Cache } from "aws-amplify";
import FacebookIcon from "@material-ui/icons/Facebook";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import auth from "../index";
import { firebase } from "@firebase/app";
// To federated sign in from Facebook
class SignInWithFacebook extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.state = {
      auth: false,
      user: {
        displayName: "Sign In"
      }
    };
  }
  componentDidMount() {
    this.authListener();
    //if (!window.FB) this.createScript();
  }
  authListener() {
    auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.setState({
          user,
          auth: true
        });
        localStorage.setItem("user", user.uid);
      } else {
        this.setState({
          user: {
            displayName: "Sign In"
          },
          auth: false
        });
        localStorage.removeItem("user");
      }
    });
  }

  signIn = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider);
  };

  signOut = () => {
    auth.signOut();
  };

  getAWSCredentials(response) {
    const { accessToken, expiresIn } = response;
    const date = new Date();
    const expires_at = expiresIn * 1000 + date.getTime();
    if (!accessToken) {
      return;
    }

    const fb = window.FB;
    fb.api("/me", { fields: "name,email" }, response => {
      const user = {
        name: response.name,
        email: response.email
      };

      console.log("name TT", user.name);
      console.log("email", user.email);
      console.log("accessToken", accessToken);
      console.log("expires_at", expires_at);

      this.setState({ user: user.name });
      console.log("USER", user);
    });
  }

  createScript() {
    // load the sdk
    window.fbAsyncInit = this.fbAsyncInit;
    const script = document.createElement("script");
    script.src = "https://connect.facebook.net/en_US/sdk.js";
    script.async = true;
    script.onload = this.initFB;
    document.body.appendChild(script);
  }

  initFB() {
    const fb = window.FB;
    console.log("FB SDK inited");
  }

  fbAsyncInit() {
    // init the fb sdk client
    const fb = window.FB;
    fb.init({
      appId: "469721507012226",
      cookie: false,
      xfbml: true,
      version: "v2.11"
    });
  }

  render() {
    return (
      <div>
        <p>{this.state.user.displayName}</p>
        {this.state.auth && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={this.signOut}
          >
            <ExitToAppIcon />
          </IconButton>
        )}
        {!this.state.auth && (
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={this.signIn}
          >
            <FacebookIcon />
          </IconButton>
        )}
      </div>
    );
  }
}

export default SignInWithFacebook;
