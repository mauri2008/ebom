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
    Content ,   
} from './style';

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
    const [idPayDown, setIdPayDown] = useState('')

    const {state, actions} = useContext(StateContext)

    const api = UseApi();


    const getData = async (search = false)=>{
        setLoading(true);
        setListData(false);
        
        const offset = (pageNow-1)*10
        const response =search? await api.insert(`${ENDPOINT}/search`,{search}, actions):await api.get(`${ENDPOINT}/${offset}`, actions);

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
                {key:'note', title:'Observa????o'},
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

    const handleShowUpdate = async (idClient)=>{

        const response = await api.insert(`${ENDPOINT}/search`,{searchid:idClient}, actions)
        
        if(Object.keys(response).length === 0){          
            setLoading(false)
            return ''
        }
        const {client, id_client, ...dataUpdate } = response.data;
            
   
        setUpdateClient({label:client, id:id_client})
        setUpdate(dataUpdate);
        setModalNewElement(true);
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
                               (!loading && listData) &&
                                    <div>
                                        <Table
                                            data={listData}                                           
                                            handleUpdate={handleShowUpdate.bind(this)}
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