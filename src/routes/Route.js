import React, { useContext, useEffect }from "react";
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import AuthLayout from "../templates/auth";
import Main from '../templates/main';

import { StateContext } from "../context";

function isAuthenticated(){
    const token = sessionStorage.getItem('token');
    return(token)? true : false;
}

export default function RouteWrapper({
    component: Component,isPrivate,...rest
}){

    const { state, actions } = useContext(StateContext);


    const isSigned = isAuthenticated();
    
    if(!isSigned && isPrivate){
         return <Redirect to="/"/>
    }

    if(isSigned && !isPrivate){
        return <Redirect to="/dashboard"/>
    }
 
    const Layout = (isPrivate && isSigned)? Main: AuthLayout;

    return(<Route {...rest} render ={props =>(
                <Layout>
                     <Component {...props}/> 
                </Layout>
            )
        }/>
    )

}
RouteWrapper.prototype= {
    isPrivate: PropTypes.bool,
    compornent: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  };
  
  RouteWrapper.defaultProps = {
    isPrivate: false,
  }