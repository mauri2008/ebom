import { useState, useEffect, useContext } from "react";
import { parseISO } from 'date-fns'
import { 
    Container, 
    StatusHeader, 
    SectionCharts,
    SectionLeftCharts,
    SectionRightCharts,
    SectionTableEntrace,
    TitleCharts,
    DescriptionCharts,
    ItemDescriptionCharts,
    ColorDescriptionCharts,
    TablePresents,
    TitlePresents,
    EmptyClientsPresents
} from './style'

import Header from  '../../components/header'
import Table from  '../../components/Table'

import CardBoard from "../../components/cardBoard";
import AssignmentInd from '@mui/icons-material/AssignmentInd';
import CoPresent from "@mui/icons-material/CoPresent";
import DoNotDisturbOff from '@mui/icons-material/DoNotDisturbOff';
import Add from '@mui/icons-material/Add';
import TextField  from '@mui/material/TextField';

import Charts from "../../components/chartsLine";
import ChartsDoughnut from '../../components/chartsDoughnut'

import UseApi from '../../services/api'
import { StateContext } from '../../context';
import { setDataTable, updateDataGrid, setDateTimeBr } from '../../helpes/functions'
import Loading from "../../components/Loading";

import Echo from 'laravel-echo'
import Pusher from 'pusher-js';



export default function Dashboard(){

    const api = UseApi()
    let dataCheckins = [];

    const {actions} = useContext(StateContext);
    const [checkins, setCheckins] = useState([]);
    const [reports, setReports] = useState({});
    const [doughnutData, setDoughnutData] = useState([
        {name:'Ausentes', color:'rgba(255, 99, 132, 1)', value:0},
        {name:'Presentes', color:'rgba(54, 162, 235, 1)', value:0},
        {name:'Isentos Presente', color:'rgba(3, 187, 133, 1)', value:0},
    ])
    const [lineData, setLineData] = useState([])

    

    const convertDataTable = ( data ) => {
        
        setCheckins(
            setDataTable(data,[
                {key:'name_client',title:'Nome'},
                {key:'name_church',title:'Igreja'},
                {key:'responsible_church',title:'Pastor'},
                {key:'data_checkin',title:'Entrada'},
                
            ])
        )
    }

    const convertDate = ( data ) => {
        const convertDataCheckins = updateDataGrid(
            data,[{action:'dateTime', object:'data_checkin'}]
        )
        return convertDataCheckins
    }

    const setValueCharts = (reports) =>{

        const reportsDougnut= [
            {name:'Ausentes', color:'rgba(255, 99, 132, 1)', value:reports.totalAbserts},
            {name:'Presentes', color:'rgba(54, 162, 235, 1)', value:reports.present},
            {name:'Isentos Presente', color:'rgba(3, 187, 133, 1)', value:reports.notPaying},
        ]
        
        console.log(reports)

        setDoughnutData(reportsDougnut);
        reports?.presentsDay && setLineData(reports.presentsDay);
    }


    const getCheckins = async ( page ) => {
         
        const response = await api.get(`checkin/${page??0}`,actions);

        if(Object.keys(response.data).length > 0){ 

            dataCheckins = convertDate(response.data);
            convertDataTable(response.data);
        }   
    }

    const getReports = async () => {

        const response = await api.get('checkin/reports', actions);
        setReports(response);
        setValueCharts(response)
        
    }


    const addClientListPresents = ( client )=>{

        dataCheckins.unshift( client );
        convertDataTable( dataCheckins )
    }



    async function listenMessages() {
        window.Pusher = Pusher;

        let PusherClient = new Pusher("62e84dc40e506", {
          cluster: "mt1",
          wsHost: "localhost",
          wsPort: "6001",
          enabledTransports: ["ws", "wss"],
          forceTLS: false,
          encrypted: false,

        });
    
        let echo = new Echo({
          broadcaster: "pusher",
          client: PusherClient,
        });
    
        echo.channel(`chat`).listen(".App\\Events\\SendMessage", (e) => {
            console.log(e)
            if(e.message?.client){
                const newClient = e.message.client;
                newClient.data_checkin = setDateTimeBr(parseISO(newClient.data_checkin))
                addClientListPresents(newClient)
                setReports(e.message.reports)
                setValueCharts(e.message?.reports);
            }

        });
    }

    useEffect(()=>{
        getCheckins()
        getReports()
        listenMessages()
    },[])
  
    return (
        <Container>
            <Header 
            title='Dashboard'
            titleButton='Adicionar participantes'
            handleShowModal={()=>{}}
            IconButton={Add}
            
            />

            <StatusHeader>
                <CardBoard  title="Usuários Cadastrados" subtitle={reports?.totalClient? `${reports.totalClient} usúarios`:"0 usuarios"} Icon={AssignmentInd}/>
                <CardBoard  title="Usuários Presentes" subtitle={reports?.present? `${reports.present} usúarios`:"0 usuarios"} Icon={CoPresent}/>
                <CardBoard  title="Usuários Ausentes" subtitle={reports?.totalAbserts? `${reports.totalAbserts} usúarios`:"0 usuarios"} Icon={DoNotDisturbOff}/>
                
            </StatusHeader>
                <h3 style={{margin:"20px 0px"}}>Analises</h3>

            <SectionCharts>
                <SectionLeftCharts>
                    <TitleCharts>Presenças diárias</TitleCharts>
                    {
                        lineData.length >0 &&
                            <Charts dataCharts={lineData}/>
                    }
                    {
                        lineData.length === 0 &&
                            <Loading/>
                    }
                </SectionLeftCharts>
                <SectionRightCharts>
                    <TitleCharts>Média de presenças</TitleCharts>
                    <ChartsDoughnut dataChart={doughnutData}/>
                    <DescriptionCharts>
                        {
                            doughnutData.map((description,index) =>(
                                <ItemDescriptionCharts key={`${description.name}-${index}`}>
                                    <ColorDescriptionCharts color={description.color}></ColorDescriptionCharts>
                                    <p>{description.name}</p>
                                </ItemDescriptionCharts>
                            ))
                        }
                    </DescriptionCharts>
                </SectionRightCharts>
            </SectionCharts>

            <SectionTableEntrace elevation={2}>
                <TitlePresents>
                    <p>
                        Lista de Presença
                    </p>
                    <TextField 
                        label="Buscar" 
                        size="small"
                    />
                </TitlePresents>   
                <TablePresents>
                    {
                        checkins.length > 0 &&
                            <Table data={checkins}/>
                    }
                    {
                        checkins.length===0 &&
                        <EmptyClientsPresents>
                            <h4>Não há participantes presentes no momento</h4>
                        </EmptyClientsPresents>

                    }
                </TablePresents>       
            </SectionTableEntrace>

        </Container>
    )
}