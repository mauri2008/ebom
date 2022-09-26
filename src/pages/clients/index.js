import React, { useState, useContext, useEffect } from 'react';
import Header from '../../components/header';
import HeaderTable from '../../components/Table/header';
import NotFoundData from '../../components/notFoundData';
import UseApi from '../../services/api'
import { StateContext } from '../../context';
import {
    TextField,
    Checkbox,
    Button,
    IconButton,
    MenuItem,
    Stack
} from '@mui/material';

import { handleDelete } from '../../services/actionsRest'
import Loading from '../../components/Loading'
import ViewClient from './view';
import { ListItens } from '../../components/ItemsList';

import { PrintQrcode } from './modals/printQrcode';

import { searchClient } from '../../helpes/functions'

import Add from '@mui/icons-material/Add';
import { 
    Container, 
    Content ,
    ContentList,
    ItensList,
    GroupBottomList,
    LabelItensList
} from './style';
import { Edit, Person, Delete } from '@mui/icons-material'
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
    const [ search, setSearch ] = useState('');
    const [ updateClient, setUpdateClient ] = useState(false);
    const [ idUserView, setIdUserView] = useState(0);
    const [ totalItens, setTotalItens ] = useState(10)
    
    const { actions, state } = useContext(StateContext)
    const api = UseApi();


    const getClients = async (itemSearch = false)=>{
        setLoading(true);
        const offset = (pageNow-1)*10;
        const response =itemSearch? await api.insert(`${ENDPOINT}/search`,{search:'list',value:itemSearch}, actions):await api.get(`${ENDPOINT}/${offset}/${totalItens}`, actions);

        if(Object.keys(response.data).length === 0){          
            setLoading(false)
            return ''
        }

        setlistClients(response?.data)
        setCountPages(response?.pages)
        setCountClient(response?.total ?? 0)
        setLoading(false);       
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


    const handleSearch = async (element) =>{
        if(element.key ==='Enter')
        {
            getClients(element.target.value !== '' ? element.target.value : false);               
        }
    }

    const handlePagination= (event, value) => {     
        setPageNow(value)
    }

    const handleQrCode= (element)=>{
        const idClient = parseInt(element.target.value)

        if(element.target.checked){
            const dataClient = listClient.find(item => parseInt(item.id) === idClient)
            console.log('console:',dataClient)
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

    const listButton = [
        {
            title: 'Editar',
            handle: idClient => handleOpenUpdate(idClient),
            icon:(<Edit/>)
        },
        {
            title:'Visualizar',
            handle: idClient => handleViewClient(idClient),
            icon:(<Person />)
        },
        {
            title:'Remover',
            handle:idClient => handleDeleteClients(idClient),
            icon:(<Delete/>)
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
            content:(<PrintQrcode clients={clientsSelects} />)
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

    function handleSetTotalItens ( element ) {
        setTotalItens(element.target.value)
    }
    
    useEffect(()=>{ getClients() },[pageNow, totalItens])

    useEffect(()=>{
        getClients()
    },[])

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
                <HeaderTable
                    title="Lista de participantes"
                    subtitle={`Total de participantes: ${countClient}`}
                    >
                    <Stack spacing={1} direction='row' sx={{ minWidth:'400px' }}>
                        <TextField
                            label='Qt. itens'
                            size='small'
                            value={totalItens}
                            onChange={handleSetTotalItens}
                            select
                            fullWidth
                        >
                            <MenuItem value='10'> 10 </MenuItem>
                            <MenuItem value='20'> 20 </MenuItem>
                            <MenuItem value='30'> 30 </MenuItem>
                        </TextField>

                        <TextField 
                            name="Pesquisar"
                            type="text"
                            label="Pesquisar"
                            size='small'
                            value={search}
                            onChange={(e)=> setSearch(e.target.value)}
                            onKeyUp={(e)=> handleSearch(e)}
                            fullWidth
                        />

                    </Stack>
                </HeaderTable>
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
                                    {listClient.map(client=> {
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
                                                            listButton.map(button => (
                                                                <IconButton  onClick={()=>button.handle(client.id)} title={button.title} key={button.title}>
                                                                    {button.icon}
                                                                </IconButton>
                                                            ))
                                                        }
                                                    </GroupBottomList>

                                                </ItensList>
                                            </ListItens>
                                        )
                                    })}
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