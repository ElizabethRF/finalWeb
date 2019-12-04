import React, { Component } from "react";
import { Auth, Cache } from "aws-amplify";
import FacebookIcon from "@material-ui/icons/Facebook";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// To federated sign in from Facebook
class SignInWithFacebook extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.state = {
      user_name: ""
    };
  }

  componentDidMount() {
    if (!window.FB) this.createScript();
  }

  signIn() {
    const fb = window.FB;
    fb.getLoginStatus(response => {
      if (response.status === "connected") {
        this.getAWSCredentials(response.authResponse);
      } else {
        fb.login(
          response => {
            if (!response || !response.authResponse) {
              return;
            }
            this.getAWSCredentials(response.authResponse);
          },
          {
            // the authorized scopes
            scope: "public_profile,email"
          }
        );
      }
    });
  }

  signOut() {
    const fb = window.FB;
    fb.logout(
      response => {
        if (!response || !response.authResponse) {
          return;
        }
        this.getAWSCredentials(response.authResponse);
      },
      {
        // the authorized scopes
        scope: "public_profile,email"
      }
    );
  }

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

      this.setState({ user_name: user.name });
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
        <p>{this.state.user_name}</p>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={this.signIn}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={this.signOut}
        >
          <ExitToAppIcon />
        </IconButton>
      </div>
    );
  }
}

export default SignInWithFacebook;
