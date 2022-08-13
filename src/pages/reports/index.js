import React, { useState, useContext, useEffect } from 'react';

import {Stack, Box, Select, FormControl, MenuItem , InputLabel, Button}from '@mui/material';
import Typography  from '@mui/material/Typography';

import Header from '../../components/header';
import Loading from '../../components/Loading';
import { StateContext } from '../../context';


import { Container, Content, SectionLeft, AsideRight } from './style';
import UseApi from '../../services/api'

export default function Reports(){

    const ENDPOINT = 'http://localhost:8000/api/reports';
    const PAGETITLE = 'relátórios'
    const api = UseApi();

    const {state, actions} = useContext(StateContext);

    const [loading, setLoading] = useState(false);
    const [churchs, setChurchs] = useState([]);
    const [selectForm, setSelectForm] = useState('')
    const [optionsReports, setOptionsReports] = useState(false)
    const [selectOption, setSelectOption]= useState('')

    let PageR = '';

    const getChurch = async (search = false)=>{
        const response =await api.get('church', actions);
        
        if(Object.keys(response.data).length === 0){ return ''}

        setChurchs(response.data);
    }


    const FormChurch = () => (
           <Stack spacing={4}>    
                <Typography variant='h6'> Selecione uma congregação  </Typography>
                <FormControl fullWidth>
                    <InputLabel id="name-congregation">Congregação</InputLabel>
                    <Select 
                        labelId="name-congregation"
                        label='Congregação'
                        value={selectOption}
                        onChange={(e)=>setSelectOption(e.target.value)}
                    >
                        {
                            churchs && 
                                churchs.map(church =>(
                                   <MenuItem value={church.id}>{church.name_church}</MenuItem> 
                                ))
                        }

                    </Select>
                </FormControl>
                <Button variant='contained' onClick={()=>{window.open(`${ENDPOINT}/${reports[selectForm].uri}${selectOption}`, '_blank')}}>Gerar relatório</Button>
           </Stack>  
        )
    

    const reports = {
        'church':{uri:'?report=congregation&idchur='}
    }

    const openOptionsReport = (report) =>{
        setSelectForm(report)
        setOptionsReports(true)
    }

    useEffect(()=>{
        getChurch()
    },[])


    return (
        <Container> 
            <Header
                title={PAGETITLE}
            />
            <Content>
                <SectionLeft>
                    <Stack spacing={3}> 
                        <a href={`${ENDPOINT}?report=client`} target="_blank">
                            <Typography variant='body1'>Lista de participantes</Typography>
                        </a> 
                        <Typography variant='body1' onClick={()=>openOptionsReport('church')}>Participates x congregação</Typography>
                        
                    </Stack>

                </SectionLeft>
                <AsideRight>
                        {
                            optionsReports &&
                                <FormChurch queryParams="church"/>
                        }
                </AsideRight>            
            </Content>
        </Container>
    )
}