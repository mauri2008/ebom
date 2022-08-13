import React, { useState, useContext, useEffect }from "react";
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton';
import {  useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { StateContext } from "../../context";
import UseApi from '../../services/api';
import { errorNotification } from '../../helpes/notification'

import { 
    Container, 
    Section , 
    Aside, 
    Main, 
    SectionButtom, 
    IForgotMyPassword,
    MessageErro
} from './style';




import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import KeyIcon from '@mui/icons-material/Key';

import logo from '../../assets/images/logo-rbg.png';

export default function Auth (){

    const [values, setValues] = useState({});
    const [loading, setLoading] = useState(false);
    const { state, actions } = useContext(StateContext);

    const history = useHistory();

    const formik  = useFormik({
        initialValues: {
            email: '',
            senha:''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Email invalido!').required('Informe um email'),
            senha: Yup.string().min(3,'Informe o valor valido').required('Informe uma senha')            
        }),
        onSubmit: async value => {
            setLoading(true)
            const api = UseApi();
            const requisitionLogin = await api.login(value.email, value.senha);
           
            if(requisitionLogin.status && requisitionLogin.status ==='error')
            {
                errorNotification(actions, 'Usuario ou senha incorreto')
                setLoading(false)    
                return '';
            }

            sessionStorage.setItem('token',requisitionLogin.token);
            sessionStorage.setItem('user',JSON.stringify({id:requisitionLogin.id, name: requisitionLogin.name, email: requisitionLogin.email})) 
            actions.setUser({
                name:requisitionLogin.name,
                email:requisitionLogin.email,
                token:requisitionLogin.token
            })

            history.push('/dashboard');

        }
    })

    
    return(
        <Container>
            <Section>
                <Aside>
                    
                    <h1>Ebom 2022</h1>
                    <small>Escola biblica Obreiros e Membros</small>
                    <img src={logo} alt="Logo tipo "/>
                </Aside>
                <Main>
                    <form onSubmit={formik.handleSubmit}>
                        <SectionButtom>
                            <AlternateEmailIcon  style={{position: 'absolute', right:10, top: 25, width: 20, height: 20, color:'#c3c3c3'}}/>
                            <TextField  
                                label="Email" 
                                name="email" 
                                type="email" 
                                fullWidth  
                                size="small" 
                                margin="normal" 
                                value={formik.values.email}  
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange} />
                                {formik.touched.email && formik.errors.email ? (
                                    <MessageErro>{formik.errors.email}</MessageErro>
                                ) : null}
                        </SectionButtom>
                       
                        <SectionButtom>
                            <KeyIcon style={{position: 'absolute', right:10, top: 18, width: 20, height: 20, color:'#c3c3c3'}}/>
                            <TextField  
                                label="Senha" 
                                name="senha" 
                                type="password" 
                                fullWidth  
                                size="small" 
                                margin="dense"  
                                value={formik.values.senha}
                                onBlur={formik.handleBlur}  
                                onChange={formik.handleChange} />
                            {formik.touched.senha && formik.errors.senha ? (
                                    <MessageErro>{formik.errors.senha}</MessageErro>
                                ) : null}
                        </SectionButtom>

                        <LoadingButton type="submit" variant="contained" size="medium" sx={{width:'100%', marginTop:1}} loading={loading}>
                        
                            Login
                        
                        </LoadingButton>    
                        
                        {/* <IForgotMyPassword>
                            <Link to="/">Esqueci minha senha.</Link>
                        </IForgotMyPassword> */}
                        
                    </form>
                </Main>
            </Section>
            
        </Container>
    )
} 