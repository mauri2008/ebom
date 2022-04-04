import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import Header from '../../components/header';
import HeaderTable from '../../components/Table/header';
import Table from '../../components/Table';
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
import Button from '@mui/material/Button';
import Print  from '@mui/icons-material/Print';
import Close from '@mui/icons-material/Close';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { handleDelete } from '../../services/actionsRest'
import QRCode from 'react-qr-code'
import Loading from '../../components/Loading'

import Add from '@mui/icons-material/Add';
import { 
    Container, 
    Content ,
    ContainerBox,
    ContentBox,
    HeaderBox,
    CombineButton,
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
    const [loading, setLoading] = useState(true)
    const [headerTable, setHeaderTable] = useState(false);
    const [modalNewClient, setModalNewClient ] = useState(false);
    const [isShepherd, setIsShepherd] = useState(false);
    const [update, setUpdate] = useState(false);
    const [idCodesSelect, setIdCodesSelect] = useState([])
    const [modalPrintQrcode, setModalPrintQrcode] = useState(false)
    const [positionPrint, setPositionPrint] = useState(0)
    const [countPages, setCountPages] = useState(0);
    const [pageNow, setPageNow] = useState(1);
    
    const {state, actions} = useContext(StateContext)
    const api = UseApi();

    const getClients = async (search = false)=>{
        setLoading(true);
        setlistClients(false);
        let listClient = [];
        const offset = (pageNow-1)*10;
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
        response.data.map(client => {
            let obj={
                id:client.id,
                Nome:client.name_client,
                Email:client.email,
                Telefone:client.phone,
                Titulo:client.shepherd ===0? 'Membro':"Pastor",
                Igreja:client.name_church,
                
            }
            listClient.push(obj);
            return '';
        })
        setCountPages(response.pages)
        setCountClient(response.totalClients ?? Object.keys(response.data.length))
        setlistClients(listClient);
        setLoading(false);       
    }

    const getChurch = async ()=>{
        const response = await api.get('church');
        if(response.status && response.status ==='error'){
            errorNotification(actions, response.message)
            return '';
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
        formik.setValues({
            name_client:'',
            id_church:'',
            email:'',
            phone:''
        });
        setIsShepherd(false);
        setUpdate(false)
    }

    const handleDeleteClients = (id)=>{
        
            handleDelete(id, actions,ENDPOINT,'Participante')
            setTimeout(() => {
                getClients()
            }, 500);
        
    }

    const handleShowUpdateClient = async (idClient)=>{
        setLoading(true)
        const response = await api.insert(`${ENDPOINT}/search`,{searchid:idClient})
        if(response && response.status ==='error')
        {
            setLoading(false);
            errorNotification(actions,'Ocorreu um erro interno, tente novamente')
        }
        const {id,name_client, id_church, email,phone,shepherd} = response.data;
        formik.setValues({
            id,
            name_client,
            id_church,
            email,
            phone
        })
        setIsShepherd(shepherd===1? true:false)
        setUpdate(true);
        setLoading(false);
        setModalNewClient(true);
    }

    const handleSearch = async (element) =>{
        if(element.key ==='Enter')
        {
            getClients(element.target.value);
        }

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

    const handlePagination= (event, value) => {     
        setPageNow(value)
    }

    const handleClickPrint = () =>{
        const listcode = [];
        idCodesSelect.map(item =>{
            listcode.push(item.id)
        })

        
    }

    const formik = useFormik({
        initialValues:{
            id:'',
            name_client:'',
            id_church:'',
            email:'',
            phone:''
        },
        validationSchema: Yup.object({
            name_client: Yup.string().required('Informe um nome valido').min(3).max(256),
            id_church: Yup.string().required('Selecione uma igreja'),
            email: Yup.string().nullable(),
            phone: Yup.string().nullable(),
        }),
        onSubmit: async value =>{
            value.shepherd = isShepherd?1:0;
            const insertChurch = !update ? await api.insert(ENDPOINT,value) : await api.update(`${ENDPOINT}/update/${value.id}`,value);
            if(insertChurch && insertChurch['status'] && insertChurch['status'] ==='error')
            {
                setLoading(false);
                errorNotification(actions, 'Ocorreu um erro ao adicionar usuario, tente novamente!')
            }
            getClients()
            handleCleanForm()
            setLoading(false);
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
        console.log('Lenght', lengthCode)
        for (let i = 0 ; i < 10; i++ )
        {
            console.log(`variavel lenthg = ${lengthCode} positionPrint = ${pointerCode} pointerPrint = ${positionPrint}`)
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

    const handleCloseModalQrCode = ()=>{
        setModalPrintQrcode(false)
        setPositionPrint(0)
        setIdCodesSelect([])

    }

    useEffect(()=>{
        
       RenderListQrcode()
        
    },[positionPrint])
    
    useEffect(()=>{
        getClients()
    },[pageNow])

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
                            <ContentBox>
                                <input type="hidden" name="id" value={formik.values.id}/>
                                <form onSubmit={formik.handleSubmit}>
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
                                    />
                                    {formik.touched.name_client && formik.errors.name_client ? (
                                        <div className="messageError">{formik.errors.name_client}</div>
                                    ) : null}

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
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="messageError">{formik.errors.email}</div>
                                    ) : null}

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
                                    />
                                    {formik.touched.phone && formik.errors.phone ? (
                                        <div className="messageError">{formik.errors.phone}</div>
                                    ) : null}

                                    <FormControl fullWidth>
                                        <InputLabel id="label-church">Igreja</InputLabel>
                                        <Select
                                            labelId='label-church'
                                            label="Igreja"
                                            name="id_church"
                                            value={formik.values.id_church}
                                            onChange={formik.handleChange}
                                            

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
                                        {formik.touched.id_church && formik.errors.id_church ? (
                                            <div className="messageError">{formik.errors.id_church}</div>
                                        ) : null}

                                        <FormControlLabel 
                                            control={
                                                <Checkbox name='shepherd' checked={isShepherd} onChange={handleSetIsShepherd}/>
                                            } 
                                            label="Pastor" 
                                            sx={{display:'flex', justifyContent:'flex-end', marginTop:"20px", }}
                                        />
                                        
                                        <CombineButton>
                                            <Button type="submit">Salvar</Button>
                                            <Button color="error" onClick={()=>handleShowModal()}>Cancelar</Button>
                                        </CombineButton>
                                </form>
                            </ContentBox>
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

                </Content>

            }

            {
                loading&&
                <Loading/>
            }
        </Container>
    )
}