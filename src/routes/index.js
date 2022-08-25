import React from "react";
import { Switch } from 'react-router-dom';

import Auth from "../pages/auth";
import Dashboard from "../pages/dashboard";
import CreateUser from "../pages/usuarios";
import Clients from "../pages/clients";
import Churchs from "../pages/churchs";
import Sales from  "../pages/sales";
import Financial from "../pages/financial";
import Reports from "../pages/reports"
import { PrizeDraw } from "../pages/prizeDraw";

import Route from './Route';

export default function ListRoutes(){
    return(
        <Switch>
            <Route path="/" exact component={Auth}/>

            <Route path="/dashboard" component={Dashboard} isPrivate/>
            <Route path="/usuarios" component={CreateUser} isPrivate/>
            <Route path="/participantes" component={Clients} isPrivate/>
            <Route path="/igrejas" component={Churchs} isPrivate/>
            <Route path="/compras" exact component={Sales} isPrivate/>
            <Route path="/compras/:idclient" component={Sales} isPrivate/>
            <Route path="/financeiro" component={Financial} isPrivate/>
            <Route path="/relatorios" component={Reports} isPrivate/>
            <Route path="/sorteio" component={PrizeDraw} isPrivate/>
                
        </Switch>
    )
}