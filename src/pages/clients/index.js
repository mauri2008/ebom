import React, { useState, useContext, useEffect } from 'react';
import Header from '../../components/header';
import NotFoundData from '../../components/notFoundData';
import UseApi from '../../services/api'
import { StateContext } from '../../context';
import { useFormik } from 'formik';
import {
    TextField,
    Checkbox,
    Button,
    IconButton,
    MenuItem,
} from '@mui/material';

import { handleDelete } from '../../services/actionsRest'
import Loading from '../../components/Loading'
import ViewClient from './view';
import { ListItens } from '../../components/ItemsList';

import { PrintQrcode } from './modals/printQrcode';

import Add from '@mui/icons-material/Add';
import { 
    Container, 
    Content ,
    ContentList,
    ItensList,
    GroupBottomList,
    LabelItensList,
    HeaderContent,
    TitleHeaderContent,
    FormFilterHeader
} from './style';
import { Edit, Person, Delete, QrCode, Search } from '@mui/icons-material'
import Paginations from '../../components/pagination'
import { ModalDefault } from '../../components/Modal';
import { RegisterClient } from './modals/registerClient';

export default function Clients(){

    const ENDPOINT = 'clients';

    const [ listClient, setlistClients] = useState(false);
    const [ countClient, setCountClient] = useState(0);
    const [ loading, setLoading] = useState(true);
    const [ clientsSelects, setClientsSelects] = useState([])
    const [ modalNewClient, setModalNewClient ] = useState(false);
    const [ modalPrintQrcode, setModalPrintQrcode] = useState(false)
    const [ modalViewClient, setModalViewClient] = useState(false)
    const [ countPages, setCountPages] = useState(0);
    const [ pageNow, setPageNow] = useState(1);
    const [ updateClient, setUpdateClient ] = useState(false);
    const [ idUserView, setIdUserView] = useState(0);
    const [ totalItens, setTotalItens ] = useState(10);
    const [ listChurchs, setListChurchs ] = useState([]);
    const [ isSearch, setIsSearch ] = useState('')
    const [ qtdView, setQtdView ] = useState(10)
    
    const { actions, state } = useContext(StateContext)
    const api = UseApi();


    const getClients = async ()=>{
        setLoading(true);
        const offset = isSearch.length ? (pageNow-1)*qtdView  : (pageNow-1)*10;
        const response = isSearch.length ? 
                            await api.get(`${ENDPOINT}/filter${isSearch}&page=${offset}`, actions)
                            :
                            await api.get(`${ENDPOINT}/${offset}/10`, actions);

        if(!response?.data){ 

            setLoading(false)
            return ''
        }

        setlistClients(response?.data)
        setCountPages(response?.pages)
        setCountClient(response?.total ?? 0)
        setLoading(false);       
    }

    async function getListChurchs () {
        const responseChurchs = await api.get('church',actions);

        if(responseChurchs?.data)
        {
            const listOptionsChuchs = responseChurchs.data.map(church => {return {value:church.id, label: church.name_church}})

            setListChurchs(listOptionsChuchs);
        }
    }

    const handleDeleteClients = (id)=>{
        const filterClient = listClient.find(client => client.id === id);

        handleDelete({ 
            id, 
            actions,
            endPoint:ENDPOINT,
            successMessage:'Participante',
            messageAlert:`Tem certeza que deseja remover ${ filterClient.name_client ? filterClient.name_client : 'este participante'} ?`
        })

    }

    const handlePagination= (event, value) => {     
        setPageNow(value)
    }

    const handleQrCode= (element)=>{
        const idClient = parseInt(element.target.value)

        if(element.target.checked){
            const dataClient = listClient.find(item => parseInt(item.id) === idClient)
            setClientsSelects([...clientsSelects, {id:dataClient.id, name:dataClient.name_client}]);
        }else{
            let newIdList =clientsSelects.filter(item => parseInt(item.id) !== parseInt(element.target.value));
            setClientsSelects(newIdList)  
        }
    
    }

    const handleViewClient = async ( id ) => {

            setIdUserView(id)
            setModalViewClient(true)
        
    }

    function handleOpenUpdate (idupdate) {
        setModalNewClient(true);
        setUpdateClient(idupdate)   
    }

    function handleCloseModalPrint () {
        setModalPrintQrcode(false)
        setClientsSelects([]);
        getClients()
    }

    const listButton = [
        {
            title: 'Editar',
            handle: idClient => handleOpenUpdate(idClient),
            icon:(<Edit/>),
            color:'warning'
        },
        {
            title:'Visualizar',
            handle: idClient => handleViewClient(idClient),
            icon:(<Person />),
        },
        {
            title:'Remover',
            handle:idClient => handleDeleteClients(idClient),
            icon:(<Delete/>),
            color:'error'
        }
    ]

    const listModals = [
        {
            open:modalPrintQrcode,
            onclose:setModalPrintQrcode,
            infoheader:{
                title:'Impressão de QrCodes',
                subtitle:`Para Imprimir as etiquetas com qrcode 
                primeiramente selecione a possição inicial.`
            },
            content:(<PrintQrcode clients={clientsSelects} onclose={handleCloseModalPrint} />)
        },
        {
            open:modalNewClient,
            onclose:setModalNewClient,
            infoheader:{
                title:updateClient?'Editar Participante':'Novo Participante',
                subtitle:''
            },
            content:(<RegisterClient onClose={setModalNewClient} idUpdate={updateClient} onUpdateId={setUpdateClient}/>)
        },
        {
            open:modalViewClient,
            onclose:setModalViewClient,
            infoheader:{
                title: 'Visualizar Participante',
                subtitle:''
            },
            content:(<ViewClient 
                idClient={idUserView} 
                onclose = {setModalViewClient}
                updateViewUser={handleViewClient}         
            />)
        }
    ]

    function handleNewClient () {
        setUpdateClient(false)
        setModalNewClient(true)
    }

    const formik = useFormik({
        initialValues:{
            idChurch:'0',
            statusPay:'0',
            qtdItens:'10',
            search:''
        },
        onSubmit: values=>{
            let queryString = `?limit=${values.qtdItens}`;

            if(values.idChurch !== '0') queryString = `${queryString}&idchurch=${values.idChurch}`;
            if(values.statusPay !== '0') queryString = `${queryString}&statuspay=${values.statusPay}`;
            if(values.search !== '') queryString = `${queryString}&search=${values.search}`;

            setIsSearch(queryString)
            setQtdView(values.qtdItens)
        }
    })
    
    useEffect(()=>{ getClients() },[pageNow, totalItens])

    useEffect(()=>{
        getClients()
        if(!isSearch.length){
            getListChurchs()
        }
    },[isSearch])

    useEffect(()=>{
        
        if(state.reloadlist){
            getClients();
            actions.setReloadList(false)
        }
    },[state.reloadlist])

    return (
        <Container> 

            <Header
                title="Participantes"
                titleButton='Adicionar participantes'
                handleShowModal={handleNewClient}
                IconButton={Add}
            />
            <Content>
                <HeaderContent>
                    <TitleHeaderContent>
                        <h4>Lista de participantes</h4>
                        <span>{`Total de participantes: ${countClient}`}</span>
                    </TitleHeaderContent>
                    <FormFilterHeader onSubmit={formik.handleSubmit}>
  
                            <TextField
                                label='Congregação'
                                size='small'
                                name='idChurch'
                                select
                                value={formik.values.idChurch}
                                onChange={formik.handleChange}
                            >
                                <MenuItem value='0'>Todas</MenuItem>
                                {
                                    listChurchs &&
                                        listChurchs.map(church =>(
                                            <MenuItem value={church.value} >{church.label}</MenuItem>
                                        ))
                                }
                            </TextField>

                            <TextField
                                select
                                label='Status Pagamento'
                                name='statusPay'
                                value={formik.values.statusPay}
                                onChange={formik.handleChange}
                                size='small'
                            >
                                <MenuItem value='0'>Todos</MenuItem>
                                <MenuItem value='yes'>Pago</MenuItem>
                                <MenuItem value='no'>Em aberto</MenuItem>4
                                <MenuItem value='isento'>Isento</MenuItem>
                            </TextField>


                            <TextField
                                label='Qt. itens'
                                size='small'
                                name='qtdItens'
                                value={formik.values.qtdItens}
                                onChange={formik.handleChange}
                                select
                                
                            >
                                <MenuItem value='10'> 10 </MenuItem>
                                <MenuItem value='30'> 30 </MenuItem>
                                <MenuItem value='50'> 50 </MenuItem>
                            </TextField>

                            <TextField 
                                name="search"
                                type="text"
                                label="Pesquisar"
                                size='small'
                                value={formik.values.search}
                                onChange={formik.handleChange}                                
                            />

                            <Button
                                size='small'
                                variant='contained'
                                type='submit'
                            >   
                                <Search/>
                                Filtrar
                            </Button>

                    </FormFilterHeader>
                </HeaderContent>
                <div>
                    {
                        clientsSelects.length >0 &&
                            <Button onClick={()=> setModalPrintQrcode(true)}>
                                Imprimir QR CODE
                            </Button>
                    }
                    {
                        loading&&
                        <Loading/>
                    }
                    {
                        listClient && !loading &&
                            <>
                                <ContentList>

                                    {
                                        listClient.length ?
                                            listClient.map(client=> {
                                                return (
                                                    <ListItens key={client.id}>
                                                        <ItensList>
                                                            <Checkbox 
                                                                value={client.id}
                                                                onClick={handleQrCode}
                                                                disabled={ !client.paid_sale || client.paid_sale === 'no'}
                                                            />
                                                                <LabelItensList>
                                                                    <p>{client.name_client??'-'}</p>
                                                                </LabelItensList>
                                                                <LabelItensList>
                                                                    <p>{client.email??'-'}</p>
                                                                </LabelItensList>
                                                                <LabelItensList>
                                                                    <p>{client.name_church??'-'}</p>
                                                                </LabelItensList>
                                                                <LabelItensList>
                                                                    <p>{client.paying_sale === 'yes' ? 'Pagante':'Isento' }</p>
                                                                </LabelItensList>
                                                            <GroupBottomList>
                                                                {
                                                                    !!client.print &&
                                                                        <IconButton color='success' title='QrCode impresso'>
                                                                            <QrCode/>
                                                                        </IconButton>
                                                                }
                                                                {
                                                                    listButton.map(button => (
                                                                        <IconButton color={button?.color?? 'primary'}  onClick={()=>button.handle(client.id)} title={button.title} key={button.title}>
                                                                            {button.icon}
                                                                        </IconButton>
                                                                    ))
                                                                }
                                                            </GroupBottomList>

                                                        </ItensList>
                                                    </ListItens>
                                                )
                                            })
                                        : <NotFoundData/>
                                        
                                    }
                                </ContentList>
                                <Paginations count={countPages} page={pageNow} handleChange={handlePagination.bind(this)}/>
                            </>
                    }
                    {
                        !listClient && !loading &&
                            <NotFoundData/>
                    }
                </div>

            </Content>

          
            {
                listModals.map(modal=>(
                    <ModalDefault
                        key={modal.infoheader.title}
                        open={modal.open}
                        onClose={modal.onclose}
                        infoheader={modal.infoheader}
                    >
                        {modal.content}
                    </ModalDefault>

                ))
            }

        </Container>
    )
}