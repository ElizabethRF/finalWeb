import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBKEalOnkku0LNPNNDSb66qNfqJ1Wk27HU",
  authDomain: "finalweb-52515.firebaseapp.com",
  databaseURL: "https://finalweb-52515.firebaseio.com",
  projectId: "finalweb-52515",
  storageBucket: "finalweb-52515.appspot.com",
  messagingSenderId: "1027483197926",
  appId: "1:1027483197926:web:989a1ca1d4f4e42079b627",
  measurementId: "G-H30V2QH2N3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
const storage = firebase.storage();
const auth = firebase.auth();
export { firebase, storage, auth as default };

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
