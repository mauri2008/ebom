import React, { useState, useContext, useEffect } from 'react';

import Header from '../../components/header';
import HeaderTable from '../../components/Table/header';
import Table from '../../components/Table';
import Modal  from '@mui/material/Modal';
import { errorNotification, successNotification } from '../../helpes/notification';
import NotFoundData from '../../components/notFoundData';
import UseApi from '../../services/api'
import { StateContext } from '../../context';
import TextField  from '@mui/material/TextField';
import FormControl  from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel  from '@mui/material/InputLabel';
import Select  from '@mui/material/Select';
import MenuItem  from '@mui/material/MenuItem';
import Loading from '../../components/Loading';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { handleDelete } from '../../services/actionsRest'

import Add from '@mui/icons-material/Add';
import Search from '@mui/icons-material/Search'

import { 
    Container, 
    Content ,
    ContainerBox,
    ContentBox,
    HeaderBox,
    CombineButton,

} from './style';

export default function Churchs(){

    const ENDPOINT = 'church';
    const PAGETITLE = 'igrejas'

    const [listData, setListData] = useState(false);
    const [countData, setCountdata] = useState(0);
    const [churchs, setChurchs] = useState([])
    const [headerTable, setHeaderTable] = useState(false);
    const [modalNewElement, setModalNewElement ] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isShepherd, setIsShepherd] = useState(false);
    const [update, setUpdate] = useState(false);

    const {state, actions} = useContext(StateContext)
    const api = UseApi();

    const getData = async (search = false)=>{
        setLoading(true);
        setListData(false);
        let list = [];
        const response =search? await api.insert(`${ENDPOINT}/search`,{search}):await api.get(ENDPOINT);
        if(response.status && response.status ==='error'){
            errorNotification(actions, response.message)
            setLoading(false)
            return '';
        }
        if(Object.keys(response.data).length === 0){          
            setLoading(false)
            return ''
        }
        response.data.map(data => {
            let obj={
                id:data.id,
                Igreja:data.name_church,
                Responsavel:data.responsible_church,
            }
            list.push(obj);
            return '';
        })
        setListData(list);
        setCountdata(listData.length);
        setLoading(false);       
    }

    const handleShowModal = () => {
        setModalNewElement(!modalNewElement)
        handleCleanForm()
    }

    const handleCleanForm = ()=>{
        formik.setValues({
            name_church:'',
            responsible_church:'',
        });
        setUpdate(false)
    }

    const handleDeleteElement = (id)=>{
        handleDelete(id, actions,ENDPOINT,'Igreja')
        setTimeout(() => {
            getData()
        }, 500);
    }

    const handleShowUpdate = async (idClient)=>{
        setLoading(true)
        const response = await api.insert(`${ENDPOINT}/search`,{searchid:idClient})
        if(response && response.status ==='error')
        {
            setLoading(false);
            errorNotification(actions,'Ocorreu um erro interno, tente novamente')
        }
        const {id,name_church, responsible_church} = response.data;
        formik.setValues({
            id,
            name_church,
            responsible_church,
        })
        setUpdate(true);
        setLoading(false);
        setModalNewElement(true);
    }

    const handleSearch = async (element) =>{
        if(element.key ==='Enter')
        {
            getData(element.target.value);
        }

    }

    const formik = useFormik({
        initialValues:{
            id:'',
            name_church:'',
            responsible_church:'',
        },
        validationSchema: Yup.object({
            name_church: Yup.string().required('Informe nome da igreja').min(3).max(256),
            responsible_church: Yup.string().required('Informe o responsavel pela igreja'),

        }),
        onSubmit: async value =>{
            value.shepherd = isShepherd?1:0;
            const insertChurch = !update ? await api.insert(ENDPOINT,value) : await api.update(`${ENDPOINT}/update/${value.id}`,value);
            if(insertChurch && insertChurch['status'] && insertChurch['status'] ==='error')
            {
                setLoading(false);
                errorNotification(actions, 'Ocorreu um erro, tente novamente!')
            }
            getData()
            handleCleanForm()
            setLoading(false);
            successNotification(actions,'Igreja cadastrado com sucesso!');
            setModalNewElement(false);
        }
    })

    useEffect(()=>{
        getData()
    },[])

    return (
        <Container> 
            <Header
                title={PAGETITLE}
                titleButton={`Adicionar ${PAGETITLE.toUpperCase()}`}
                handleShowModal={handleShowModal}
                IconButton={Add}
            />
            <Content>
            {   
                !loading &&
                <>
                    <HeaderTable
                        title={`Lista de ${PAGETITLE.toLowerCase()}`}
                        subtitle={`Total de participantes: ${countData}`}
                        >
                        <div>
                            <TextField 
                                name="Pesquisar"
                                type="text"
                                label="Pesquisar"
                                size='small'
                                onKeyUp={(e)=> handleSearch(e)}
                            />
                        </div>
                    </HeaderTable>
                    <div>
                        {
                            listData &&
                                <Table
                                    data={listData}
                                    head={headerTable}
                                    handleUpdate={handleShowUpdate.bind(this)}
                                    handleDelete={handleDeleteElement.bind(this)}
                                />
                        }
                        {
                            !listData &&
                                <NotFoundData/>
                        }
                    </div>
                    <Modal
                        open={modalNewElement}
                        onClose={()=>{}}
                        sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
                    >
                        <ContainerBox>
                            <HeaderBox>
                                <h3>Novo Participantes</h3>                         
                            </HeaderBox>
                            <ContentBox>
                                <input type="hidden" name="id" value={formik.values.id}/>
                                <form onSubmit={formik.handleSubmit}>
                                    <TextField
                                        name="name_church"
                                        type="text"
                                        label="Nome"
                                        fullWidth
                                        size='normal'
                                        className="inputUser"
                                        value={formik.values.name_church}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.name_church && formik.errors.name_church ? (
                                        <div className="messageError">{formik.errors.name_church}</div>
                                    ) : null}

                                    <TextField
                                        name="responsible_church"
                                        type="text"
                                        label="Pastor responsavel"
                                        fullWidth
                                        size='normal'
                                        className="inputUser"
                                        value={formik.values.responsible_church}
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                    />
                                    {formik.touched.responsible_church && formik.errors.responsible_church ? (
                                        <div className="messageError">{formik.errors.responsible_church}</div>
                                    ) : null}

                                    <CombineButton>
                                        <Button type="submit">Salvar</Button>
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
                <Loading/>
            }

            </Content>
        </Container>
    )
}