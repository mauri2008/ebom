import React, { useState} from 'react';

import {Stack}from '@mui/material';
import Typography  from '@mui/material/Typography';
import Header from '../../components/header';
import { 
    Container, 
    Content, 
    SectionLeft, 
    AsideRight,
    HeaderViewOptionsReports
} from './style';
import { Close } from '@mui/icons-material';
import { paramsSystem } from '../../helpes/paramsSystem';

// Reports

import { ReportChurchs } from './PagesReports/ReportChurchs';

export default function Reports(){

    const ENDPOINT = 'http://localhost:8000/api/reports';
    const PAGETITLE = 'Relátórios'

    const [ selectForm, setSelectForm] = useState('')
    const [ optionsReports, setOptionsReports] = useState(false)

    const reportsList = {
        'church': <ReportChurchs />,
    }

    const openOptionsReport = (report) =>{
        setSelectForm(report)
        setOptionsReports(true)
    }

    return (
        <Container> 
            <Header
                title={PAGETITLE}
            />
            <Content>
                <SectionLeft>
                    <Stack spacing={3}> 
                        <a href={`${paramsSystem.URLBASE}reports?report=client`} target="_blank" rel='noreferrer'>
                            <Typography variant='body1'>Lista de participantes</Typography>
                        </a> 
                        <Typography variant='body1' onClick={()=>openOptionsReport('church')}>Participates x congregação</Typography>
                        
                    </Stack>

                </SectionLeft>
                <AsideRight>
                        {
                            optionsReports &&
                                <>
                                    <HeaderViewOptionsReports>
                                        <Close onClick={()=>setOptionsReports(false)}/>
                                    </HeaderViewOptionsReports>
                                    {
                                        reportsList[selectForm]
                                    }
                                    
                                </>
                        }
                </AsideRight>            
            </Content>
        </Container>
    )
}