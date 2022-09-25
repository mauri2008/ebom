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
    ItemStatusSales,
    StatusSales,
    TitleItemStatusSales,   
} from './style';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { AssignmentInd, AttachMoney, MoneyOff } from '@mui/icons-material';

export default function Sales(){

    const ENDPOINT = 'sales';
    const PAGETITLE = 'Compras'

    const [listData, setListData] = useState(false);
    const [countData, setCountdata] = useState(0);
    const [modalNewElement, setModalNewElement ] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageNow, setPageNow] = useState(0);
    const [countPages, setCountPages] = useState(0);
    const [controlModal, setControlModal] = useState('create');
    const [idPayDown, setIdPayDown] = useState('');
    const [orderby, setOrderBy] = useState('clients.name_client');
    const [directionOrderBy, setDirectionOrderBy] = useState('asc');
    const [ idUpdateSale, setIdUpdateSale ] = useState('');
    const [ statusList, setStatusLists ] = useState({});
    const [ activeStatus, setActiveStatus] = useState('full')
    const [ search, setSearch] = useState('');
    const [ limitData, setLimitData ] = useState(10)

    const {state, actions} = useContext(StateContext)
    const api = UseApi();


    const getData = async ()=>{
        setLoading(true);
        setListData(false);
        const listOptionsStatus ={
            open:'amountOpen',
            close:'amountClose',
            exempt:'amountExempt',
            full:'amountFull',
        } 
         
        const offset = (pageNow-1)*limitData
        const response =(search) ? 
                        await api.insert(`${ENDPOINT}/search`,{ search, orderby, offset, limit:limitData }, actions)
                        :
                        await api.get(`${ENDPOINT}/${offset}?limit=${limitData}&orderby=${orderby}&order=${directionOrderBy}`, actions);

        if(Object.keys(response.data).length === 0){          
            setLoading(false)
            return ''
        }

        const amountPages = Math.ceil(response.statusList[listOptionsStatus[activeStatus]] / limitData)

        setCountPages(amountPages)
        setListData(setDataTable(response.data, 
            [
                {key:'id', title:'id'},
                {key:'client', title:'Participane'},
                {key:'name_church', title:'Congregação'},
                {key:'value_sale', title:'Valor'},
                {key:'paying_sale', title:'Pagante'},
                {key:'paid_sale', title:'Pago'},
                {key:'form_of_payment', title:'Forma de Pagamento'},
                {key:'note', title:'Observação'},
            ]
        ));

        setStatusLists(response.statusList)



        setCountdata(response.statusList[listOptionsStatus[activeStatus]]);
        setLoading(false);       
    }

    const handleShowModalCreatePay = () => {
        setIdUpdateSale(false)
        setControlModal('create')
        setModalNewElement(!modalNewElement)

    }

    const handleDeleteElement = (id)=>{
        handleDelete(id, actions,ENDPOINT,PAGETITLE)

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

    function handleSetIdUpdateSale ( value ) {
        setIdUpdateSale(value)
        setControlModal('create')
        setModalNewElement(!modalNewElement)
    }

    function handleAlterStatusList ( status ) {
        setActiveStatus(status);
        setSearch(status!=='full'?status:'')
    }

    function handleSetLimitData ( value ) {
        setLimitData(value.target.value)
    }

    const modals = {
        create:(<FormSales  
                idUpdateSale={idUpdateSale}
                setCloseModal={setModalNewElement}
                />),
        downpay:(<FormDownPay
                    onClose={setModalNewElement}
                    id={idPayDown}
                    actions = {actions}

                />)
    }

    const ListLabelStatus = {
        full:'Lista de compras',
        open:'Lista de compras em aberto',
        close:'Lista de compras pagas',
        exempt:'Lista de compras isentas',
    }

    useEffect(()=>{
        getData()
    },[pageNow])

    useEffect(()=>{
        setPageNow(1);
        getData()
    },[
        orderby, 
        directionOrderBy, 
        search,
        limitData
    ])

    useEffect(()=>{
        if(state.reloadlist)
        {
            getData();
            actions.setReloadList(false)
        }
    },[state.reloadlist])

    return (
        <Container> 
            <Header
                title={PAGETITLE}
                titleButton={`Adicionar ${PAGETITLE.toUpperCase()}`}
                handleShowModal={handleShowModalCreatePay}
                IconButton={Add}
            />
            <Content>
                {
                    !loading &&
                    <>
                        <StatusSales>
                            <ItemStatusSales color='#e74c3c' onClick={()=>handleAlterStatusList('open')}>
                                <TitleItemStatusSales >
                                    <MoneyOff />
                                    <h3>
                                        Titulos em Aberto
                                    </h3>
                                </TitleItemStatusSales>
                                <h2>{statusList?.amountOpen??'0'}</h2>
                            </ItemStatusSales>

                            <ItemStatusSales color='#07bc0c' onClick={()=>handleAlterStatusList('close')}>
                                <TitleItemStatusSales >
                                    <AttachMoney/>
                                    <h3>
                                        Titulos Pagos
                                    </h3>
                                </TitleItemStatusSales>
                                <h2>{statusList?.amountClose??'0'}</h2>
                            </ItemStatusSales>

                            <ItemStatusSales color='#f1c40f' onClick={()=>handleAlterStatusList('exempt')}>
                                <TitleItemStatusSales>
                                    <AssignmentInd/>
                                    <h3>
                                        Titulos Isentos
                                    </h3>
                                </TitleItemStatusSales>
                                <h2>{statusList?.amountExempt??'0'}</h2>
                            </ItemStatusSales>
                            
                            <ItemStatusSales color='#3498db' onClick={()=>handleAlterStatusList('full')}>
                                <TitleItemStatusSales>
                                    <AssignmentInd/>
                                    <h3>
                                        Total de titulos
                                    </h3>
                                </TitleItemStatusSales>
                                <h2>{statusList?.amountFull??'0'}</h2>
                            </ItemStatusSales>
                        </StatusSales>

                        <HeaderTable
                            title={ListLabelStatus[activeStatus]}
                            subtitle={`Total de listados: ${countData}`}
                            >
                            <GroupFilter >
                                <TextField
                                    name='amountView'
                                    label='Qtd. itens'
                                    select
                                    sx={{width:'12rem'}}
                                    value={limitData}
                                    onChange={handleSetLimitData}
                                >
                                    <MenuItem value='10'>10</MenuItem>
                                    <MenuItem value='20'>20</MenuItem>
                                    <MenuItem value='30'>30</MenuItem>
                                    <MenuItem value='40'>40</MenuItem>
                                    <MenuItem value='50'>50</MenuItem>
                                </TextField>
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
                                            handleUpdate={handleSetIdUpdateSale}
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