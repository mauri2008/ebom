import React from 'react';
import { Container, IconLoading } from './style';
import imgLoading from '../../assets/images/loading-group.gif'
import { CircularProgress } from '@mui/material';


export default function Loading(){

    return(
        <Container>
            <CircularProgress/>
            <h3>Carregando...</h3>
        </Container>
    )

}