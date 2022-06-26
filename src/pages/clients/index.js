import React, { useState, useContext, useEffect } from 'react';
import Header from '../../components/header';
import HeaderTable from '../../components/Table/header';
import Table from '../../components/Table';
import { successNotification } from '../../helpes/notification';
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
import Button from '@mui/material/Button';
import Print  from '@mui/icons-material/Print';
import Close from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LoadingButton  from '@mui/lab/LoadingButton';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { handleDelete } from '../../services/actionsRest'
import QRCode from 'react-qr-code'
import Loading from '../../components/Loading'
import BoxModal from '../../components/boxModal';
import ViewClient from './view';

import { setDataTable, searchClient } from '../../helpes/functions'

import Add from '@mui/icons-material/Add';
import { 
    Container, 
    Content ,
    ContainerBox,
    HeaderBox,
    ContainerPrint,
    ModalBox,
    SectionPrint,
    Codes,
    ToolsPrint,
    InputStart

} from './style';
import Paginations from '../../components/pagination'

export default function Clients(){

    const ENDPOINT = 'clients';

    const [listClient, setlistClients] = useState(false);
    const [countClient, setCountClient] = useState(0);
    const [churchs, setChurchs] = useState([])
    const [loading, setLoading] = useState(true);
    const [loadingButton, setLoadingButton] = useState(false);
    const [headerTable, setHeaderTable] = useState(false);
    const [isShepherd, setIsShepherd] = useState(false);
    const [update, setUpdate] = useState(false);
    const [idCodesSelect, setIdCodesSelect] = useState([])
    const [modalNewClient, setModalNewClient ] = useState(false);
    const [modalPrintQrcode, setModalPrintQrcode] = useState(false)
    const [modalViewClient, setModalViewClient] = useState(false)
    const [positionPrint, setPositionPrint] = useState(0)
    const [countPages, setCountPages] = useState(0);
    const [pageNow, setPageNow] = useState(1);
    const [dataViewClient, setDataViewClient] = useState({})
    
    const {state, actions} = useContext(StateContext)
    const api = UseApi();

    const valueFormikDefault = {
        id:'',
        name_client:'',
        id_church:'',
        email:'',
        phone:''
    }

    const getClients = async (search = false)=>{
        setLoading(true);

        const offset = (pageNow-1)*10;
        const response =search? await api.insert(`${ENDPOINT}/search`,{search}, actions):await api.get(`${ENDPOINT}/${offset}`, actions);
        let listClients = []

        if(Object.keys(response.data).length === 0){          
            setLoading(false)
            return ''
        }


        setlistClients(setDataTable(response.data,
            [            
                {key:'id', title:'id'},
                {key:'name_client', title:'Nome'},
                {key:'email', title:'Email'},
                {key:'phone', title:'Telefone'},
                {key:'name_church', title:'Igreja'},
                {key:'paidout',title:'paidout'}
            ]
            ))

        setCountPages(response.pages)
        setCountClient(response.totalClients ?? Object.keys(response.data.length))
        setLoading(false);       
    }

    const getChurch = async ()=>{
        const response = await api.get('church', actions);
        if(Object.keys(response).length === 0){          
            setLoading(false)
            return ''
        }
        setChurchs(response.data)
    }

    const handleShowModal = () => {
        setModalNewClient(!modalNewClient)
        handleCleanForm()
    }

    const handleSetIsShepherd = ()=>{
        setIsShepherd(!isShepherd);
    }

    const handleCleanForm = ()=>{
        formik.setValues(valueFormikDefault);
        setIsShepherd(false);
        setUpdate(false)
    }

    const handleDeleteClients = (id)=>{
            setLoading(true)
            handleDelete(id, actions,ENDPOINT,'Participante')
            setTimeout(() => {
                getClients()
            }, 500);
            setLoading(false)  
    }

    const handleShowUpdateClient = async (idClient)=>{

        const data = await searchClient({api,ENDPOINT,search:{searchid:idClient}})
        if(!data){
            return ''
        }
        const {id,name_client, id_church, email,phone,shepherd} = data;
        formik.setValues({
            id,
            name_client,
            id_church,
            email,
            phone
        })
        setIsShepherd(shepherd===1? true:false)
        setUpdate(true);
        setModalNewClient(true);
    }

    const handleSearch = async (element) =>{
        if(element.key ==='Enter')
        {
            getClients(element.target.value);
        }
    }

    const handlePagination= (event, value) => {     
        setPageNow(value)
    }

    const formik = useFormik({
        initialValues:valueFormikDefault,
        validationSchema: Yup.object({
            name_client: Yup.string().required('Informe um nome válido').min(3,'campo nome deve possuir mais de 3 caracteres').max(256),
            id_church: Yup.string().required('Selecione uma igreja'),
            email: Yup.string().nullable(),
            phone: Yup.string().nullable(),
        }),
        onSubmit: async value =>{
            setLoadingButton(true)
            value.shepherd = isShepherd?1:0;
            const insertClient = !update ? await api.insert(ENDPOINT,value, actions) : await api.update(`${ENDPOINT}/update/${value.id}`,value, actions);
            if(Object.keys(insertClient).length === 0){          
                setLoadingButton(false)
                return ''
            }
            getClients()
            handleCleanForm()
            setLoadingButton(false);
            successNotification(actions,'Cliente cadastrado com sucesso!');
            setModalNewClient(false);
        }
    })

    const RenderListQrcode = ()=>{
        const lengthCodeTotal = idCodesSelect.length;
        let sunQrCodeAndPositonPrint = parseInt(lengthCodeTotal)+ parseInt(positionPrint)

        if(sunQrCodeAndPositonPrint > 10)
        {
            alert('Valor acima do permitido! ')
            setPositionPrint(positionPrint-1);
            return ''
        } 

        const lengthCode = idCodesSelect.length;
        let pointerCode = 0
        const container = []
        for (let i = 0 ; i < 10; i++ )
        {
            
            if (i >= positionPrint){
                if(lengthCode > pointerCode  ){
                    
                    container.push(contentQrcode(pointerCode))
                    pointerCode += 1
                }
            }else{
                container.push(<Codes></Codes>)
            }
        }

        return container
    }

    const contentQrcode = (pointerCode)=>{
        let code = idCodesSelect[pointerCode];
        return(
            <Codes>
                {
                    <>
                        <p>{code.name.toUpperCase()}</p>
                        <QRCode value={`${code.id}`} size='150' title='Teste'/>
                    </>
                }
                     
            </Codes>
        )
    }

    const handleQrCode= (element)=>{

        if(element.target.checked){
            let dataClient = listClient.filter(item => parseInt(item.id) === parseInt(element.target.value))
            setIdCodesSelect([...idCodesSelect, {id:dataClient[0].id, name:dataClient[0].Nome}]);
        }else{
            let newIdList =idCodesSelect.filter(item => parseInt(item.id) !== parseInt(element.target.value));
            setIdCodesSelect(newIdList)  
        }
    
    }

    const handleClickPrint = () =>{
        const listcode = [];
        idCodesSelect.map(item =>{
            listcode.push(item.id)
        })

        
    }

    const handleCloseModalQrCode = ()=>{
        setModalPrintQrcode(false)
        setPositionPrint(0)
        setIdCodesSelect([])
    }

    const handleViewClient = async ( id ) => {
        const data = await searchClient({api,ENDPOINT,search:{search:id}})
        if(!data){
            return ''
        }

        setDataViewClient(data)
        setModalViewClient(true)
    }



    useEffect(()=>{ RenderListQrcode() },[positionPrint])
    
    useEffect(()=>{ getClients() },[pageNow])

    useEffect(()=>{
        getClients()
        getChurch()
    },[])

    return (
        <Container> 
            <Header
                title="Participantes"
                titleButton='Adicionar participantes'
                handleShowModal={handleShowModal}
                IconButton={Add}
            />
            {
                !loading &&
                <Content>
                    <HeaderTable
                        title="Lista de participantes"
                        subtitle={`Total de participantes: ${countClient}`}
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
                            idCodesSelect.length >0 &&
                                <Button onClick={()=> setModalPrintQrcode(true)}>
                                    Imprimir QR CODE
                                </Button>
                        }
                        {
                            listClient &&
                                <>
                                    <Table
                                        data={listClient}
                                        head={headerTable}
                                        handleView={handleViewClient.bind(this)}
                                        handleUpdate={handleShowUpdateClient.bind(this)}
                                        handleDelete={handleDeleteClients.bind(this)}
                                        handleQrCode={handleQrCode.bind(this)}
                                    />
                                    <Paginations count={countPages} page={pageNow} handleChange={handlePagination.bind(this)}/>
                                </>
                        }
                        {
                            !listClient &&
                                <NotFoundData/>
                        }
                    </div>
                    <ModalBox
                        open={modalNewClient}
                        onClose={()=>{}}
                    >
                        <ContainerBox>
                            <HeaderBox>
                                <h3>Novo Participantes</h3>                         
                            </HeaderBox>
                            <Box>
                                <input type="hidden" name="id" value={formik.values.id}/>
                                <form onSubmit={formik.handleSubmit}>
                                    <Stack spacing={2}>

                                        <FormControlLabel 
                                            control={
                                                <Checkbox name='shepherd' checked={isShepherd} onChange={handleSetIsShepherd}/>
                                            } 
                                            label="Participante é um pastor?" 
                                            sx={{display:'flex', justifyContent:'flex-end', marginTop:"20px", }}
                                        />
                                        <TextField
                                            name="name_client"
                                            type="text"
                                            label="Nome"
                                            fullWidth
                                            size='normal'
                                            className="inputUser"
                                            value={formik.values.name_client}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            helperText={formik.touched.name_client && formik.errors.name_client?formik.errors.name_client:''}
                                            error={formik.touched.name_client && formik.errors.name_client}
                                        />

                                        <TextField
                                            name="email"
                                            type="email"
                                            label="Email"
                                            fullWidth
                                            size='normal'
                                            className="inputUser"
                                            value={formik.values.email}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            error={formik.touched.email && formik.errors.email}
                                            helperText={formik.touched.email && formik.errors.email?formik.errors.email:''}
                                        />

                                        <TextField
                                            name="phone"
                                            type="text"
                                            label="Telefone"
                                            fullWidth
                                            size='normal'
                                            className="inputUser"
                                            value={formik.values.phone}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            error={formik.touched.phone && formik.errors.phone}
                                            helperText={formik.touched.phone && formik.errors.phone?formik.errors.phone:''}
                                        />

                                        <FormControl fullWidth>
                                            <InputLabel id="label-church">Igreja</InputLabel>
                                            <Select
                                                labelId='label-church'
                                                label="Igreja"
                                                name="id_church"
                                                value={formik.values.id_church}
                                                onChange={formik.handleChange}
                                                error={formik.touched.id_church && formik.errors.id_church}
                                                helperText={formik.touched.id_church && formik.errors.id_church?formik.errors.id_church:''}

                                            >
                                                <MenuItem value=""></MenuItem>
                                                {
                                                    churchs &&
                                                        churchs.map(
                                                            church =>(
                                                                <MenuItem value={church.id} key={church.id}>{church.name_church}</MenuItem>
                                                            )
                                                        )
                                                }
                                            </Select>
                                        </FormControl>

                                            
                                        <Stack direction='row' justifyContent='flex-end' spacing={3} sx={{paddingTop:'1rem'}}>
                                            <LoadingButton type="submit" loading={loadingButton}  variant='outlined'>Salvar</LoadingButton>
                                            <Button color="error" onClick={()=>handleShowModal()} variant='outlined'>Cancelar</Button>
                                        </Stack>
                                    </Stack>
                                </form>
                            </Box>
                        </ContainerBox>
                    </ModalBox>

                    {/* Gerador de QRCODE */}

                    <ModalBox
                        open={modalPrintQrcode}
                        onClose={()=>handleCloseModalQrCode()}
                    >
                        <ContainerPrint >
                            <ToolsPrint className='no-print'>
                            <InputStart>
                                <TextField  name='inicio' type="number" size='small' label="Iniciar a partir" value={positionPrint} onChange={(e)=>setPositionPrint(e.target.value)} inputProps={{min:0, max:9}}  fullWidth/>         
                            </InputStart>
                            <Print onClick={()=>window.print()}/>
                            <Close onClick={()=>handleCloseModalQrCode()}/>
                            </ToolsPrint>
                            <SectionPrint className='print'>
                                {
                                    RenderListQrcode()
                                }
                            </SectionPrint>                   
                        </ContainerPrint>

                    </ModalBox>

                    {/*Visualizado de Informaçoes do client */}

                    <ModalBox
                        open={modalViewClient}
                        onClose={()=>setModalViewClient()}
                    >
                        <BoxModal
                            titleModal={dataViewClient?.name_client ?? ''}
                            handleClose={()=>setModalViewClient()}
                        >
                            <ViewClient client={dataViewClient} handleClose={setModalViewClient.bind()}/>
                        </BoxModal>
                    </ModalBox>

                </Content>

            }

            {
                loading&&
                <Loading/>
            }
        </Container>
    )
}