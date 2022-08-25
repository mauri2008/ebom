import React, { useState, useContext, useEffect } from 'react';

import Header from '../../components/header';
import HeaderTable from '../../components/Table/header';
import Table from '../../components/Table';
import { useParams } from 'react-router-dom'

import NotFoundData from '../../components/notFoundData';

import { searchClient, setDataTable } from '../../helpes/functions'

import UseApi from '../../services/api'

import { StateContext } from '../../context';

import Modal  from '@mui/material/Modal';
import TextField  from '@mui/material/TextField';

import Loading from '../../components/Loading'
import Add from '@mui/icons-material/Add';
import FormSales from './Form'
import BoxModal from '../../components/boxModal'
import { handleDelete } from '../../services/actionsRest'
import FormDownPay from '../../components/FormDownPay'

import { 
    Container, 
    Content, 
    GroupFilter,   
} from './style';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function Sales(){

    const paramsURL = useParams()
    const ENDPOINT = 'sales';
    const PAGETITLE = 'Compras'

    const [listData, setListData] = useState(false);
    const [countData, setCountdata] = useState(0);
    const [clientData, setClientData] = useState([])
    const [updateClient, setUpdateClient] = useState(false)
    const [modalNewElement, setModalNewElement ] = useState(false);
    const [update, setUpdate] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageNow, setPageNow] = useState(0);
    const [countPages, setCountPages] = useState(0);
    const [validIdURL, setValidIdURL] = useState(true)
    const [clearForm, setClearForm] = useState(false)
    const [dataClienURL, setDataClientURL] = useState({label:'', id:''})
    const [controlModal, setControlModal] = useState('create');
    const [idPayDown, setIdPayDown] = useState('');
    const [search, setSearch] = useState('');
    const [orderby, setOrderBy] = useState('clients.name_client');
    const [directionOrderBy, setDirectionOrderBy] = useState('asc')

    const {state, actions} = useContext(StateContext)

    const api = UseApi();


    const getData = async (search = false)=>{
        setLoading(true);
        setListData(false);
        
        const offset = (pageNow-1)*10
        const response =search? await api.insert(`${ENDPOINT}/search`,{ search, orderby }, actions):await api.get(`${ENDPOINT}/${offset}?orderby=${orderby}&order=${directionOrderBy}`, actions);

        if(Object.keys(response.data).length === 0){          
            setLoading(false)
            return ''
        }
        
        setCountPages(response.pages)
        setListData(setDataTable(response.data, 
            [
                {key:'id', title:'id'},
                {key:'client', title:'Participane'},
                {key:'value_sale', title:'Valor'},
                {key:'paying_sale', title:'Pagante'},
                {key:'paid_sale', title:'Pago'},
                {key:'form_of_payment', title:'Forma de Pagamento'},
                {key:'note', title:'Observação'},
            ]
        ));

        setCountdata(response.total?? Object.keys(response.data).length);
        setLoading(false);       
    }

    const getClients = async()=>{
        let mergeDataclient = [];
        const response = await api.get('clients/all',actions);

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
        setClearForm(true)
        setControlModal('create')
        setModalNewElement(!modalNewElement)

    }

    const handleDeleteElement = (id)=>{
        handleDelete(id, actions,ENDPOINT,PAGETITLE)
        setTimeout(() => {
            getData()
        }, 500);
    }

    const handleSearch = async (element) =>{
        if(element.key ==='Enter')
        {
            getData(element.target.value);
        }
    }

    const handleDownPay = async (id) =>{
        setIdPayDown(id)
        setControlModal('downpay');
        setModalNewElement(true)
        
    }


    const handlePagination= (event, value) => {     
        setPageNow(value)
    }

    const getdataClientURL = async()=>{
        if(validIdURL && paramsURL?.idclient){
            console.log('teste')
            const dataClient = await searchClient({api,ENDPOINT:'clients',search:{searchid:paramsURL.idclient}})
            if(!dataClient){return ''}
            
            setDataClientURL({label:dataClient.name_client, id:paramsURL.idclient}) 
            setModalNewElement(true)
            setValidIdURL(false)
        }else{
            setDataClientURL(false)
        }
    }

    const modals = {
        create:(<FormSales  
                clients={clientData} 
                clientUpdate={updateClient}
                clientURL = {dataClienURL}
                update={update}
                setCloseModal={setModalNewElement.bind()}
                setCleanForm={setClearForm.bind()}
                cleanForm={clearForm}

                />),
        downpay:(<FormDownPay
                    onClose={setModalNewElement}
                    id={idPayDown}
                    actions = {actions}

                />)
        
            

    }

    useEffect(()=>{
        getData()
    },[pageNow])

    useEffect(() => {
        if(!modalNewElement){
            getData()
        }
    }, [modalNewElement]);

    useEffect(()=>{
        setPageNow(1);
        getData()
        getClients()
        getdataClientURL()

    },[orderby, directionOrderBy])

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
                            <GroupFilter >
                                <FormControl sx={{width:'15rem',}} >
                                        <InputLabel id="label-form-of-payment">Ordenar Por</InputLabel>
                                        <Select
                                            labelId='label-form-of-payment'
                                            label="Forma de pagamento"
                                            name="form_of_payment"
                                            value={orderby}
                                            onChange={(e)=>setOrderBy(e.target.value)}
                                        >
                                            <MenuItem value="clients.name_client">Nome</MenuItem>
                                            <MenuItem value="sales.paid_sale">Pagamento</MenuItem>
                                            <MenuItem value="sales.paying_sale">Pagantes</MenuItem>
                                            <MenuItem value="sales.form_of_payment">Forma de pagamento</MenuItem>
                                        </Select>
                                    </FormControl>
                                <FormControl sx={{width:'10rem',}}>
                                        <InputLabel id="label-form-of-payment">Ordem</InputLabel>
                                        <Select
                                            labelId='label-form-of-payment'
                                            label="Forma de pagamento"
                                            name="form_of_payment"
                                            value={directionOrderBy}
                                            onChange={(e)=>setDirectionOrderBy(e.target.value)}
                                        >
                                            <MenuItem value="asc">Crescente</MenuItem>
                                            <MenuItem value="desc">Decrescente</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <TextField 
                                        name="Pesquisar"
                                        type="text"
                                        label="Pesquisar"
                                        value={search}
                                        onChange={(e)=>setSearch(e.target.value)}
                                        onKeyUp={(e)=> handleSearch(e)}
                                    />
                                    
                            </GroupFilter>
                        </HeaderTable>
                        <div>
                            {
                               (!loading && listData) &&
                                    <div>
                                        <Table
                                            data={listData}                                           
                                            handleDelete={handleDeleteElement.bind(this)}
                                            countPagination={countPages}
                                            page={pageNow}
                                            handlePagination={handlePagination.bind(this)}
                                            handleDownPay={handleDownPay}
                                        />
                                    </div>
                            }
                            {
                                (!loading && !listData) &&
                                    <NotFoundData/>
                            }
                        </div>
                        <Modal
                            open={modalNewElement}
                        >
                            <BoxModal titleModal={controlModal ==='create'? 'Adicionar Compra ':'Baixar compra'} handleClose={()=>setModalNewElement.bind()}>
                                {modals[controlModal]}                                
                            </BoxModal>
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