import React from "react";
import { 
    Container, 
    StatusHeader, 
    SectionCharts,
    SectionLeftCharts,
    SectionRightCharts,
    SectionTableEntrace
} from './style'

import Header from  '../../components/header'
import Table from  '../../components/Table'

import CardBoard from "../../components/cardBoard";
import AssignmentInd from '@mui/icons-material/AssignmentInd';
import CoPresent from "@mui/icons-material/CoPresent";
import DoNotDisturbOff from '@mui/icons-material/DoNotDisturbOff';
import Paper from  '@mui/material/Paper';
import Add from '@mui/icons-material/Add';
import TextField  from '@mui/material/TextField';

import Charts from "../../components/chartsLine";
import ChartsDoughnut from '../../components/chartsDoughnut'



export default function Dashboard(){

    const data = [
        {
            nome:'Mauri jose da costa',
            Igreja: 'São João novo',
            Pastor: 'Sadrac',
            Entrada: '23/03/2022 18:00'
        },
        {
            nome:'Julio Augusto Santana',
            Igreja: 'Santa Rita ',
            Pastor: 'Vagner',
            Entrada: '23/03/2022 18:01'
        },
        {
            nome:'Julio Augusto Santana',
            Igreja: 'Santa Rita ',
            Pastor: 'Vagner',
            Entrada: '23/03/2022 18:01'
        },
        {
            nome:'Julio Augusto Santana',
            Igreja: 'Santa Rita ',
            Pastor: 'Vagner',
            Entrada: '23/03/2022 18:01'
        },
        {
            nome:'Julio Augusto Santana',
            Igreja: 'Santa Rita ',
            Pastor: 'Vagner',
            Entrada: '23/03/2022 18:01'
        },
        {
            nome:'Julio Augusto Santana',
            Igreja: 'Santa Rita ',
            Pastor: 'Vagner',
            Entrada: '23/03/2022 18:01'
        },
    ]

    return (
        <Container>
            <Header 
            title='Dashboard'
            titleButton='Adicionar participantes'
            handleShowModal={()=>{}}
            IconButton={Add}
            
            />
             
            
            <StatusHeader>
                <CardBoard  title="Usuários Cadastrados" subtitle="10 usuarios" Icon={AssignmentInd}/>
                <CardBoard  title="Usuários Presentes" subtitle="5 usuarios" Icon={CoPresent}/>
                <CardBoard  title="Usuários Ausentes" subtitle="5 usuarios" Icon={DoNotDisturbOff}/>
                
            </StatusHeader>
            <h3 style={{margin:"20px 0px"}}>Analises</h3>

            <SectionCharts>
                <SectionLeftCharts>
                    <Paper elevation={2} sx={{padding:'20px'}}>
                        <p className="titleCharts">Presenças diárias</p>
                        <Charts/>
                    </Paper>
                </SectionLeftCharts>
                <SectionRightCharts>
                    <Paper elevation={2} sx={{padding:'20px'}}>
                        <p>Porcetagem de presença</p>
                        <ChartsDoughnut/>
                    </Paper>
                </SectionRightCharts>
            </SectionCharts>

            <SectionTableEntrace elevation={2}>
                <div style={{display:"flex", justifyContent:'space-between', alignItems:'center'}}>
                    <p>
                        Lista de Presença
                    </p>
                    <TextField 
                        label="Buscar" 
                        size="small"
                    />
                </div>          
                <Table data={data}/>
            </SectionTableEntrace>

        </Container>
    )
}