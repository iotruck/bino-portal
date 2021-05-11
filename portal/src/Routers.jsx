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
import conn from "./service/conn"

function Routes() {
    

    return (
        <BrowserRouter>
        <Provider>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>

                <PrivateRoutes path="/new-collaborator">
                    <Trucker />
                </PrivateRoutes>

                <PrivateRoutes path="/new-travel">
                    <Travel />
                </PrivateRoutes>

                <PrivateRoutes path="/tracking">
                    <Tracking name="Sandra Cunha" />
                </PrivateRoutes>

                <PrivateRoutes path="/new-analyst">
                    <Admin name="Sandra Cunha" />
                </PrivateRoutes>

                <PrivateRoutes path="/notify">
                    <Notify name="Sandra Cunha" />
                </PrivateRoutes>

                <PrivateRoutes path="/">
                    <Home name="Sandra Cunha" number_trucks="10" number_drivers="25" />
                </PrivateRoutes>
            </Switch>
        </Provider>   
        </BrowserRouter>
    )
}

export default Routes;