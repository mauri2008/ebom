import React, { useState, useContext, useEffect } from 'react';

import Header from '../../components/header';
import HeaderTable from '../../components/Table/header';
import Table from '../../components/Table';

import NotFoundData from '../../components/notFoundData';
import { errorNotification, successNotification } from '../../helpes/notification';

import UseApi from '../../services/api'
import Paginations from '../../components/pagination';

import { StateContext } from '../../context';

import Modal  from '@mui/material/Modal';
import TextField  from '@mui/material/TextField';
import FormControl  from '@mui/material/FormControl';
import InputLabel  from '@mui/material/InputLabel';
import Select  from '@mui/material/Select';
import MenuItem  from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Autocomplete  from '@mui/material/Autocomplete';
import Loading from '../../components/Loading'
import Add from '@mui/icons-material/Add';



import { useFormik } from 'formik';
import { handleDelete } from '../../services/actionsRest'


import { 
    Container, 
    Content ,
    ContainerBox,
    ContentBox,
    HeaderBox,
    CombineButton,

} from './style';

export default function Sales(){

    const ENDPOINT = 'sales';
    const PAGETITLE = 'compras'

    const [listData, setListData] = useState(false);
    const [countData, setCountdata] = useState(0);
    const [clientData, setClientData] = useState([])
    const [valueClient, setValueClient] = useState([])
    const [headerTable, setHeaderTable] = useState(false);
    const [modalNewElement, setModalNewElement ] = useState(false);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageNow, setPageNow] = useState(0);
    const [countPages, setCountPages] = useState(0);
    const {state, actions} = useContext(StateContext)


    const api = UseApi();

    const getData = async (search = false)=>{
        setLoading(true);
        setListData(false);
        let list = [];
        
        const offset = (pageNow-1)*10
        
        const response =search? await api.insert(`${ENDPOINT}/search`,{search}):await api.get(`${ENDPOINT}/${offset}`);
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
                Paticipante:data.client,
                Pagante: data.paid_sale === 'yes'? 'Sim':'Não',
                Valor: data.value_sale,
                Pago: data.paying_sale === 'yes'?'Sim':'Não',
                Forma: data.form_of_payment,
                Obs: data.note
             }
             list.push(obj);
             return '';
         })
        setCountPages(response.pages)
        setListData(list);
        setCountdata(response.total?? Object.keys(response.data).length);
        setLoading(false);       
    }
    const getClients = async()=>{
        let mergeDataclient = [];
        const response = await api.get('clients/all');
        if(response.status && response.status ==='error'){
            errorNotification(actions, response.message)
            return '';
        }
        if(Object.keys(response.data).length === 0){          
            return ''
        }
        response.data.map(element=>{
            let obj = {
                label:element.name_client,
                id:element.id
            }
            mergeDataclient.push(obj)

        })

        setClientData(mergeDataclient);

    }

    const handleShowModal = () => {
        setModalNewElement(!modalNewElement)
        handleCleanForm()
    }

    const handleCleanForm = ()=>{
        setValueClient([])
        formik.setValues({
            id:"",
            paid_sale:"",  
            paying_sale:"",
            value_sale: "50.00",
            form_of_payment:"",
            note:''
        });
        setUpdate(false)
    }

    const handleDeleteElement = (id)=>{
        handleDelete(id, actions,ENDPOINT,PAGETITLE)
        setTimeout(() => {
            getData()
        }, 500);
    }

    const handleShowUpdate = async (idClient)=>{
        setLoading(true)
        const response = await api.insert(`${ENDPOINT}/search`,{searchid:idClient})
        console.log(response)
        if(response && response.status ==='error')
        {
            setLoading(false);
            errorNotification(actions,'Ocorreu um erro interno, tente novamente')
        }
        const {id, paid_sale, paying_sale,value_sale, form_of_payment, note, name_client, id_client } = response.data;

            setValueClient({label:name_client, id:id_client})
            formik.setValues({
                id,
                paid_sale,  
                paying_sale,
                value_sale,
                form_of_payment,
                note 
            })
        setValueClient({label:name_client, id:id_client})
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
            id:"",
            paid_sale:"",  
            paying_sale:"",
            value_sale: "50.00",
            form_of_payment:"",
            note:'' 
        },

        onSubmit: async value =>{
            
            value.id_client = valueClient.id;

            const insertChurch = !update ? await api.insert(ENDPOINT,value) : await api.update(`${ENDPOINT}/update/${value.id}`,value);
            if(insertChurch && insertChurch['status'] && insertChurch['status'] ==='error')
            {
                setLoading(false);
                errorNotification(actions, 'Ocorreu um erro, tente novamente!')
            }
            getData()
            handleCleanForm()
            setLoading(false);
            successNotification(actions,'Ação registrada com sucesso!');
            setModalNewElement(false);
        }
    })

    const handlePagination= (event, value) => {     
        setPageNow(value)
    }
    useEffect(()=>{
        getData()
    },[pageNow])

    useEffect(()=>{
        setPageNow(1);
        getData()
        getClients()
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
                                    <div>
                                        <Table
                                            data={listData}
                                            head={headerTable}
                                            handleUpdate={handleShowUpdate.bind(this)}
                                            handleDelete={handleDeleteElement.bind(this)}
                                        />
                                        <Paginations count={countPages} page={pageNow} handleChange={handlePagination.bind(this)}/>
                                    </div>
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
                                    {JSON.stringify(valueClient)}                        
                                </HeaderBox>
                                <ContentBox>
                                    <form onSubmit={formik.handleSubmit}>
                                        <input type="hidden" name="id" value={formik.values.id}/>

                                        <Autocomplete 
                                            disablePortal
                                            value={valueClient}
                                            options={clientData}
                                            getOptionLabel={(option) => option.label || ''}
                                            onChange={(event, newValue)=>{
                                                setValueClient(newValue)
                                            }}
                                            renderInput={(params)=> <TextField {...params} label="Participante"/>}
                                        />
                                        

                                        <FormControl fullWidth sx={{marginTop:3}}>
                                            <InputLabel id="label-paid">Participante Pagante</InputLabel>
                                            <Select
                                                labelId='label-paid'
                                                label="Participante Pagante"
                                                name="paid_sale"
                                                value={formik.values.paid_sale??''}
                                                onChange={formik.handleChange}

                                            >
                                                <MenuItem value='yes'>Sim</MenuItem>
                                                <MenuItem value='no'>Não</MenuItem>
                                            </Select>
                                        </FormControl>



                                        <FormControl fullWidth sx={{marginTop:3,}}>
                                            <InputLabel id="label-paying">Pago</InputLabel>
                                            <Select
                                                labelId='label-paying'
                                                label="Pago"
                                                name="paying_sale"
                                                value={formik.values.paying_sale ?? ''}
                                                onChange={formik.handleChange}

                                            >
                                                <MenuItem value="yes">Sim</MenuItem>
                                                <MenuItem value="no">Não</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl fullWidth sx={{marginTop:3,}}>
                                            <InputLabel id="label-form-of-payment">Forma de pagamento</InputLabel>
                                            <Select
                                                labelId='label-form-of-payment'
                                                label="Forma de pagamento"
                                                name="form_of_payment"
                                                value={formik.values.form_of_payment ?? ''}
                                                onChange={formik.handleChange}

                                            >
                                                <MenuItem value="nao_pago">Não Pago</MenuItem>
                                                <MenuItem value="dinheiro">Dinheiro</MenuItem>
                                                <MenuItem value="cartão">Cartão</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <TextField
                                            name="value_sale"
                                            type="text"
                                            label="Valor"
                                            fullWidth
                                            size='normal'
                                            className="inputUser"
                                            value="50.00"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            disabled
                                            sx={{marginTop:3,}}
                                        />
                                        {formik.touched.value_sale && formik.errors.value_sale ? (
                                            <div className="messageError">{formik.errors.name_church}</div>
                                        ) : null}

                                        
                                        <TextField
                                            name="note"
                                            label="Observação"
                                            fullWidth
                                            size='normal'
                                            className="inputUser"
                                            multiline
                                            rows={5}
                                            value={formik.values.note}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}

                                            sx={{marginTop:1,}}
                                        />

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