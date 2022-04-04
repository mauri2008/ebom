import React, { useEffect, useState, useContext} from 'react';
import Table from '../../components/Table';
import HeaderTable from '../../components/Table/header';
import UseAPI from '../../services/api';
import Button  from '@mui/material/Button';
import PersonAddAlt from '@mui/icons-material/PersonAddAlt';
import { errorNotification, successNotification } from '../../helpes/notification';
import Modal from '@mui/material/Modal';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';
import Header from '../../components/header';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { StateContext } from '../../context';
import { useFormik } from 'formik';
import Loading from '../../components/Loading'
import * as Yup from 'yup'

import Delete  from '@mui/icons-material/Delete';


import {
    Container,
    Content,
    ListUsers,
    ContainerBox,
    ContentBox,
    HeaderBox,
    CombineButton,


} from './style';


export default function CreateUser(){
    const api = UseAPI();
    const {state, actions} = useContext(StateContext)
    const [modalNewUser, setModalNewUser] = useState(false);
    const [update, setUpdate] = useState(false);
    const [checked , setChecked] = useState(false);
    const [restoration, setRestoration] = useState(false)
    const [loading, setLoading] = useState(false);


    const[listUsers, setListUsers] = useState(false);
    const[countUser, setCountUser] = useState(0);

    const headerTable = {
        id:'ID',
        nome: 'Nome',
        email: 'Email',
    }
    
    const getUsers = async ()=>{
        setLoading(true)
        setListUsers(false)
        let listUser =[] 
        const response = checked? await  api.insert('users/search',{action:0}) : await api.get('users');
        if(response.status && response.status==='error'){
            errorNotification(actions, response.message)
            setLoading(false)
            return '';
        }
        response.data.map(user=>{
            let obj={
                id:user.id,
                nome:user.name,
                email:user.email
            }
            listUser.push(obj);
            return'';
        })
        setListUsers(listUser)
        setCountUser(listUser.length)
        setLoading(false)
    }

    const handleClearForm = ()=>{
        formik.resetForm({
            name:'',
            email:'',
            password:''
        })
        return'';
    }

    const handleShowModal = () =>{
        setModalNewUser(!modalNewUser);
        setUpdate(false);
        handleClearForm()
    }

    const handleShowUpdateModal = async (id) =>{
        
        const response = await api.insert('users/search',{id});
        if(response && response.status ==='error')
        {          
            errorNotification(actions, 'Ocorreu um erro ao adicionar usuario, tente novamente!')
        }
        const { name, email } = response.data
        formik.setValues({
            id,
            name,
            email,
            password:''
        })
        setUpdate(true);
      
        setModalNewUser(!modalNewUser);

    }   

    const handleDeleteUser = (id) =>{
        setLoading(true);
        const response = api.update(`users/${id}`);
        if(response['status']  && response['status'] === 'error'){
            setLoading(false);
            errorNotification(actions, 'Ocorreu um erro ao remover');
        }
        successNotification(actions, 'Usuario removido com sucesso!')
        getUsers()
        setLoading(false);
    }

    const handleSeletcUsersType = (event)=>{
        setChecked(event.target.checked)
    } 

    const handleRestorationCheckBox = (event)=>{
        setRestoration(event.target.checked);
    }

    const formik = useFormik({
        initialValues: {
            id:'',
            name:'',
            email:'',
            password:''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Informa um nome').min(3).max(256),
            email: Yup.string().email('Informe um email válido').required('Informe um email')
        }),
        onSubmit: async value=>{

            if(!update){
                setLoading(true);
                const insertUser = await api.insert('users', value);
                if(insertUser && insertUser['status'] && insertUser['status'] ==='error')
                {
                    setLoading(false);
                    errorNotification(actions, 'Ocorreu um erro ao adicionar usuario, tente novamente!')
                }
                
                successNotification(actions,'Usuario cadastrado com sucesso!');
                setModalNewUser(false);
                handleClearForm()
                setLoading(false)
                getUsers()
            }else{
                setLoading(true);

                if(restoration){ value.action = 1;}
                
                const updateUser = await api.update(`users/update/${value.id}`, value);
                
                if(updateUser && updateUser['status'] && updateUser['status'] ==='error')
                {
                    setLoading(false);
                    errorNotification(actions, 'Ocorreu um erro ao adicionar usuario, tente novamente!')
                }
                successNotification(actions,'Usuario atualizado com sucesso!');
                setModalNewUser(false);
                handleClearForm()
                setLoading(false)
                getUsers()

            }
                      
        }
    })

    useEffect(()=>{  
         getUsers()
    },[checked])

    return(
        <Container>
            <Content>
            <Header 
                    title="Usuários" 
                    titleButton="Novo usuário"
                    IconButton={PersonAddAlt}
                    handleShowModal={handleShowModal}
            />

            {
                !loading &&
                

                <>
                <div>
                    <ListUsers>
                        <HeaderTable 
                            title="Lista de usuários"
                            subtitle={`Total de usuários: ${countUser}`}
                        >
                            <FormControlLabel control={<Switch color="warning" onChange={handleSeletcUsersType}/>}label={<Delete/>} sx={{color:`${checked?'#ff0000':'var(--bs-gray-400)'}`}}/>                   
                        </HeaderTable>

                        { listUsers && <Table
                            data={listUsers}
                            head={headerTable}
                            handleUpdate={handleShowUpdateModal.bind(this)}
                            handleDelete={handleDeleteUser.bind(this)}
                        />}
                    
                    </ListUsers>       
                </div>

                <Modal
                    open={modalNewUser}
                    onClose={handleShowModal}
                    sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
                >
                    <ContainerBox>
                        <HeaderBox>
                            <h3>Novo usuário</h3>
                        </HeaderBox>
                        <ContentBox>
                            <form onSubmit={formik.handleSubmit}>
                                <input type="hidden" name="id" value={formik.values.id}/>
                                {
                                    checked &&
                                    <div style={{'display':'flex', 'justifyContent':'flex-end'}}>
                                        <FormControlLabel control={<Checkbox onChange={handleRestorationCheckBox} />} label="Restaurar" sx={{marginBottom:'20px;'}}/>
                                    </div>
                                }
                                <TextField 
                                    name="name" 
                                    type="text" 
                                    label="Nome" 
                                    fullWidth 
                                    size='normal' 
                                    className="inputUser" 
                                    value={formik.values.name}
                                    onBlur={formik.handleBlur}  
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="messageError">{formik.errors.name}</div>
                                ) : null}

                                <TextField 
                                    name="email" 
                                    type="email" 
                                    label="Email" 
                                    fullWidth size='normal' 
                                    className="inputUser"
                                    autoComplete="username"
                                    value={formik.values.email}
                                    onBlur={formik.handleBlur}  
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="messageError">{formik.errors.email}</div>
                                ) : null}
                                <TextField 
                                    name="password" 
                                    type="password" 
                                    label="Senha" 
                                    fullWidth size='normal' 
                                    className="inputUser"
                                    autoComplete="current-password"
                                    value={formik.values.password}
                                    onBlur={formik.handleBlur}  
                                    onChange={formik.handleChange}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="messageError">{formik.errors.password}</div>
                                ) : null}
                                <CombineButton>
                                    <Button type="submit"> Salvar</Button>
                                    <Button color="error" onClick={()=>handleShowModal()}>Cancelar</Button>   
                                </CombineButton>
                            </form>
                        </ContentBox>
                    </ContainerBox> 
                </Modal>
            </>
            }
            {
                loading &&
                <Loading />
            }

            </Content>
        </Container>
    )
}