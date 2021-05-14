import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import Context from "./Context"
import Display from "../Display";
import Menu from "../Menu";

const PrivateRoutes = ({ component: Component, ...rest }) => {


  const id = localStorage.getItem("@login-app/user");

  return (

    <>
      <Menu />
      <Display />
      <Route
        {...rest}
        render={props =>
          id ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )}
      />
    </>
  );
}

export default PrivateRoutes;
