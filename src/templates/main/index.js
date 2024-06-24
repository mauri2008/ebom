import React, {useContext, useState, useEffect} from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {  StateContext } from '../../context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
    Container, 
    Aside,
    Content, 
    Logo,
    Footer,
    Identifier,
    MoreOptions,
    ListOPtions,
    LogoType 
} from './style';

import Menu from './menu';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import logoSystem from '../../assets/images/logo-rbg.png'

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
                    <LogoType>
                        <Logo src={logoSystem}  alt="Logo Tipo controlpass"/>
                        <p>ControlPass</p>
                    </LogoType>

                    <Menu/>
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
