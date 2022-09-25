import React from 'react';
import { Container } from './style';
import { CircularProgress } from '@mui/material';


export default function Loading(){

    return(
        <Container>
            <CircularProgress/>
        </Container>
    )

}