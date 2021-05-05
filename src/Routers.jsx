import { BrowserRouter, Switch, Route } from "react-router-dom";
import Provider from "./components/Section/Provider";
import PrivateRoutes from "./components/Section/PrivateRoutes"
import Home from "./pages/Home";
import Tracking from "./pages/Tracking";
import Admin from "./pages/Admin";
import Notify from "./pages/Notify";
import Travel from "./pages/Travel";
import Login from "./pages/Login";
import Trucker from "./pages/Trucker"

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
                    <Tracking name="Sandra Cunha" code="polybrasilio0001sp" destination="POLYBRASIL LTDA - AV SABUGUEIRO DE MILHO 1029 GALPÃO 3 - 01203455, CENTRO - SÃO PAULO/SP" dateLastNotify="13:50" messageLastNotify="O MOTORISTA SEGUIU A VIAGEM" datePenultimateNotify="13:26" messagePenultimateNotify="O MOTORISTA REALIZOU UMA PARADA" value="120,00" trucker="WALDESIO DA SILVA P." truck="BAÚ HIUNDAY BRANCO 01" travelDetails="POLYBRASILIO0001SP" details="12 Chapas pvc" detailsDate="02/03" detailsLastLog="13:50" />
                </PrivateRoutes>
                <PrivateRoutes path="/new-analyst">
                    <Admin name="Admin" />
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