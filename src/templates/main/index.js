import React, {useContext, useState, useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {  StateContext } from '../../context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    Container, 
    Nav, 
    Aside,
    Content, 
    Logo,
    Footer,
    Identifier,
    MoreOptions,
    ListOPtions
} from './style';

import DashboardIcon from '@mui/icons-material/Dashboard';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CalculateIcon from '@mui/icons-material/Calculate';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import AssignmentInd  from '@mui/icons-material/AssignmentInd';
import Church from '@mui/icons-material/Church';

import Loading from '../../components/Loading'

export default function Main({children}){

    const [more, setMore] = useState(true)
    const history = useHistory();
    const user = JSON.parse(sessionStorage.getItem('user'))

    const handleLogout = ()=>{
        sessionStorage.removeItem('token');
        history.push('/')
    }
    const {state, actions} = useContext(StateContext);
    const [showLoading, setShowLoading] = useState(false)


    const notify = (params)=> toast[params.type](
      params.text,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
  
    useEffect(()=>{
      if(state.isError.status){     
       notify({type:state.isError.type, text: state.isError.text})
    }

    },[state.isError]);
  
    useEffect(()=>{
        setShowLoading(state.loading);
    },[state.loading])

    useEffect(()=>{
        setMore(false)
    },[children])

    return(
        <Container>
                {
                    showLoading && <Loading />
                }
            <ToastContainer />

            <Aside>
                <div>
                    <Logo src='https://www.adisetoritapevi.com.br/apiebom/img/logo-ebom-rbg.png'  alt="Logo Tipo Ebom 2020"/>
                    <Nav>
                        
                        <ul>
                            <li>
                                <NavLink 
                                    to="/dashboard"
                                >
                                <DashboardIcon/>
                                Dashboard
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/participantes"
                                    className={isActive =>`${isActive ? 'select':''}`}
                                >
                                <AssignmentInd/>  
                                Participantes
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/compras"
                                    className={isActive =>`${isActive ? 'select':''}`}
                                >
                                <LoyaltyIcon/>  
                                Compras
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/igrejas"
                                    className={isActive =>`${isActive ? 'select':''}`}
                                >
                                <Church/>  
                                Igrejas
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/financeiro"
                                    className={isActive =>`${isActive ? 'select':''}`}
                                >
                                <CalculateIcon/>  
                                Financeiro
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/relatorios"
                                    className={isActive =>`${isActive ? 'select':''}`}
                                >
                                <FactCheckIcon/>  
                                Relatórios
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/usuarios"
                                    className={isActive =>`${isActive ? 'select':''}`}
                                >
                                <Person/>  
                                Usuários
                                </NavLink>
                            </li>


                        </ul>
                    </Nav>               
                </div>
                <Footer>
                    <Identifier>
                        <p>{user.name} </p>
                        <small>{user.email}</small>
                    </Identifier>
                    <MoreOptions>
                        <MoreVertIcon onClick={()=>setMore(!more)}/>
                        {
                            more &&
                            <ListOPtions>
                                <ul>
                                    <li>
                                        <NavLink to="/configurações">
                                            <SettingsIcon/>
                                            Configurações
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/" onClick={()=> handleLogout()}>
                                            <LogoutIcon/>
                                            Sair
                                        </NavLink>
                                    </li>
                                </ul>
                            </ListOPtions>
                        }
                    </MoreOptions>
                </Footer>

            </Aside>
            <Content>
                {children}
            </Content>
        </Container>
    )
}
