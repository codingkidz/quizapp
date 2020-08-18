import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";

import {
  Login,
  Register,
  Welcome,
  PasswordReset,
  Units,
  Quiz,
  UploadPage,
} from "pages";

import { Navbar, PrivateRoute, PublicRoute } from "components";

import { auth } from "services/firebase";
import { useForcedUpdate } from "services/customHooks";

const App: React.FC = () => {
  const forceUpdate = useForcedUpdate();

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (process.env.NODE_ENV !== "production") {
        if (userAuth) {
          console.log("detected user log in");
        } else {
          console.log("detected user log out");
        }
      }

      forceUpdate();
    });
    /*
    NOTE
    by including forceUpdate as a dependency it runs infinitely instead of just on auth changes
    I think it still works because react-router-dom probably triggers re-renders when going 
    to a new path, updating the navbar as well
  */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <Switch>
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
        <Route exact path="/" component={Welcome} />
        <Route exact path="/passwordreset" component={PasswordReset} />
        <Route exact path="/upload/:unit" component={UploadPage} />
        <PrivateRoute exact path="/units" component={Units} />
        <PrivateRoute exact path="/quiz/:unitID" component={Quiz} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
};
export default App;
