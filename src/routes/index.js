import React from "react";
import { Switch } from 'react-router-dom';

import Auth from "../pages/auth";
import Dashboard from "../pages/dashboard";
import CreateUser from "../pages/usuarios";
import Clients from "../pages/clients";
import Churchs from "../pages/churchs";
import Sales from  "../pages/sales";
import Financial from "../pages/financial";

import Route from './Route';

export default function ListRoutes(){
    return(
        <Switch>
            <Route path="/" exact component={Auth}/>

            <Route path="/dashboard" component={Dashboard} isPrivate/>
            <Route path="/usuarios" component={CreateUser} isPrivate/>
            <Route path="/participantes" component={Clients} isPrivate/>
            <Route path="/igrejas" component={Churchs} isPrivate/>
            <Route path="/compras" component={Sales} isPrivate/>
            <Route path="/financeiro" component={Financial} isPrivate/>
            
        </Switch>
    )
}