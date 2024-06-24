import React, { useState, useContext, useEffect }from "react";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import {  useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { StateContext } from "../../context";
import UseApi from '../../services/api';

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
            const api = UseApi();
            const requisitionLogin = await api.login(value.email, value.senha);
           
            if(requisitionLogin.response && requisitionLogin.response ==='error')
            {
                actions.setIsError({
                    status:true,
                    text:'Usuario ou senha incorreto',
                    type:'error'
                });
                return '';
            }

            sessionStorage.setItem('token',requisitionLogin.token);
            actions.setUser({
                name:requisitionLogin.name,
                token:requisitionLogin.token
            })

            history.push('/dashboard');
            // alert(JSON.stringify(value, null, 2));
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
                            <p>Informe seu email</p>
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
                       


                        <Button type="submit" variant="contained" size="medium" sx={{width:'100%', marginTop:1}}>Login</Button>    
                        
                        <IForgotMyPassword>
                            <Link to="/">Esqueci minha senha.</Link>
                        </IForgotMyPassword>
                        
                    </form>
                </Main>
            </Section>
            
        </Container>
    )
} 