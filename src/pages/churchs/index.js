import React, { useState, useContext, useEffect } from 'react';

import { errorNotification, successNotification } from '../../helpes/notification';

import UseApi from '../../services/api'
import { StateContext } from '../../context';

import Modal  from '@mui/material/Modal';
import TextField  from '@mui/material/TextField';
import Button from '@mui/material/Button';

import NotFoundData from '../../components/notFoundData';
import Table from '../../components/Table';
import Header from '../../components/header';
import HeaderTable from '../../components/Table/header';
import Loading from '../../components/Loading';

import { setDataTable } from '../../helpes/functions'

import { useFormik } from 'formik';
import * as Yup from 'yup'
import { handleDelete } from '../../services/actionsRest'

import Add from '@mui/icons-material/Add';

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
    const [headerTable, setHeaderTable] = useState(false);
    const [modalNewElement, setModalNewElement ] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isShepherd, setIsShepherd] = useState(false);
    const [update, setUpdate] = useState(false);

    const {state, actions} = useContext(StateContext)

    const api = UseApi();

    const valueDefaultFormik = {
        id:'',
        name_church:'',
        responsible_church:'',
    }

    const getData = async (search = false)=>{
        setLoading(true);

        const response =search? await api.insert(`${ENDPOINT}/search`,{search}, actions):await api.get(ENDPOINT, actions);

        if(Object.keys(response.data).length === 0){          
            setLoading(false)
            return ''
        }

        setListData(setDataTable(response.data,
            [
                {key:'id',title:'id'},
                {key:'name_church',title:'Igreja'},
                {key:'responsible_church',title:'Pastor'},
            ]
            ))

        setCountdata(listData.length);
        setLoading(false);       
    }

    const handleShowModal = () => {
        setModalNewElement(!modalNewElement)
        handleCleanForm()
    }

    const handleCleanForm = ()=>{
        formik.setValues(valueDefaultFormik);
        setUpdate(false)
    }

    const handleDeleteElement = (id)=>{
        setLoading(true)
        handleDelete(id, actions,ENDPOINT,'Igreja')
        setTimeout(() => {
            getData()
        }, 500);
        setLoading(false)
    }

    const handleShowUpdate = async (idClient)=>{
        setLoading(true)
        const response = await api.insert(`${ENDPOINT}/search`,{searchid:idClient}, actions)

        if(Object.keys(response).length === 0){          
            setLoading(false)
            return ''
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
        initialValues:valueDefaultFormik,
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