import React from 'react';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import styled from 'styled-components';

const Container = styled.div`
    width:100% ;
    display: flex ;
    justify-content: center ;
    align-items: center ;
    margin-top: 30px;
`


export default function Paginations({count,page, handleChange}){
    return(
        <Container>
            <Stack spacing={2}>
                <Pagination count={count} page={page} onChange={handleChange}/>
            </Stack>
        </Container>
    )
}