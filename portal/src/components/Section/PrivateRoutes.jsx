import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import Context from "./Context"
import Display from "../Display";
import Menu from "../Menu";

const PrivateRoutes = ({component: Component, ...rest}) => {

  const { token } = useContext(Context);

  return (
    <>
    <Menu />
    <Display />
    <Route
      {...rest}
      render={() => token 
        ? <Component {...rest} />
        : <Redirect to="/login" />
      }
    />
    </>
  );
}

export default PrivateRoutes;
