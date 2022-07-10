import React, { useState, useContext, useEffect } from 'react';

import { errorNotification, successNotification } from '../../helpes/notification';
import UseApi from '../../services/api'
import { StateContext } from '../../context';

import Stack from '@mui/material/Stack';
import Typography  from '@mui/material/Typography';

import Header from '../../components/header';
import Loading from '../../components/Loading';

import Add from '@mui/icons-material/Add';
import { Container, Content } from './style';

export default function Reports(){

    const ENDPOINT = 'http://localhost:8000/api/reports';
    const PAGETITLE = 'relátórios'

    const [loading, setLoading] = useState(false);

    return (
        <Container> 
            <Header
                title={PAGETITLE}
                titleButton={`Adicionar ${PAGETITLE.toUpperCase()}`}
                handleShowModal={()=>{}}
                IconButton={Add}
            />
            <Content>
            {   
                !loading &&
                
                    <Stack spacing={3}> 
                        <a href={`${ENDPOINT}/client`} target="_blank">
                            <Typography variant='body1'>Lista de participantes</Typography>
                        </a> 
                        <Typography variant='body1'>Lista de presença</Typography>

                        
                    </Stack>
            }
            {
                loading &&
                <Loading/>
            }

            </Content>
        </Container>
    )
}