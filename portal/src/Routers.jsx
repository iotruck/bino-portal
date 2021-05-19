import { BrowserRouter, Switch, Route } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import Provider from "./components/Section/Provider"
import PrivateRoutes from "./components/Section/PrivateRoutes"
import Home from "./pages/Home"
import Tracking from "./pages/Tracking"
import Admin from "./pages/Admin"
import Notify from "./pages/Notify"
import Travel from "./pages/Travel"
import Login from "./pages/Login"
import Trucker from "./pages/Trucker"


function Routes() {
    

    return (
        <BrowserRouter>
        <Provider>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <PrivateRoutes path="/new-collaborator" component = {Trucker} />
                <PrivateRoutes path="/new-travel" component = {Travel} />
                <PrivateRoutes path="/tracking" component = {Tracking} />
                <PrivateRoutes path="/new-analyst" component = {Admin} />
                <PrivateRoutes path="/notify" component = {Notify} />
                <PrivateRoutes path="/" component = {Home} />
            </Switch>
          </Provider>   
        </BrowserRouter>
    )
}

export default Routes;