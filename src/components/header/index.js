import React from 'react';
import { Container } from './style';
import Button  from '@mui/material/Button';

export default function Header ({title,titleButton='', handleShowModal, IconButton}){
    return (
        <Container>
            <h2>{title}</h2>
            {
                titleButton &&
                    <Button onClick={handleShowModal} startIcon={<IconButton/>} >
                        {titleButton}
                    </Button>

            }
        </Container>
    )
}