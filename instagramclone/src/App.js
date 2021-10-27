import React, { useState } from "react";
import Login from "./Components/Login/Login";
import { auth } from "./firebase";
import Profile from "./Components/Profile/Profile";
import { Redirect } from "react-router";
import { BrowserRouter as Router, Switch, Route,Link } from "react-router-dom";
import Main from "./Components/Main.js/Main";

import UserNotExist from "./Components/Profile/UserNotExist";
import reactDom from "react-dom";
import ModalIg from "./ModalIg";

const App = () => {
  const [modalState, setModalState] = useState(false);
  const [authStatus, setAuthStatus] = useState(true);
  const [following, setFollwing] = useState();
  
  auth.onAuthStateChanged((user) => {
    if (user) {
      setAuthStatus(false);
    } else {
      setAuthStatus(true);
    }
  });

  return (
    <>
    
      {modalState &&
        reactDom.createPortal(<ModalIg />, document.getElementById("modal"))}
      <Router>
        <Switch>
          <Route path="/NotExist" exact>
            <UserNotExist />
          </Route>
          <Route path="/" exact>
            
            {authStatus ? <Login /> : <Main onModalState={setModalState} />}
          </Route>

          <Route path="/:username" exact>
            {authStatus === false && (
              <Profile onModalState={setModalState} onFollwing={setFollwing} />
            )}
          
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
