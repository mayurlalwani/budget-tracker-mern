import React, { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase";
import firebaseAuth from "./firebase/firebaseConfig";
import Dashboard from "./Components/Dashboard";
import { getUserDetailsAction } from "./actions/userAction";
import { connect } from "react-redux";

function App({ getUserDetails }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState("");
  firebaseAuth.auth().onAuthStateChanged((user) => {
    return user
      ? setIsSignedIn(true) && setUserId(user.uid)
      : setIsSignedIn(false);
  });
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      // firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccess: () => false,
    },
  };
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
      if (user.uid !== "") {
        setUserId(user.uid);
        getUserDetails(user.uid);
      }
    });
  }, []);

  return (
    <div className="App">
      {isSignedIn ? (
        <span>
          <div>Signed In!</div>
          <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
          <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
          <img
            alt="profile picture"
            src={firebase.auth().currentUser.photoURL}
          />
          <Dashboard isSignedIn={isSignedIn} userId={userId} />
        </span>
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  ...state.Dashboard,
  userId: state.User.userId,
});

const mapDispatchToProps = (dispatch) => ({
  getUserDetails: (payload) => dispatch(getUserDetailsAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
