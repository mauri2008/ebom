import React from 'react';
import { Container } from './style';
import Button  from '@mui/material/Button';

export default function Header ({title,titleButton='', handleShowModal, IconButton, colorButton}){
    return (
        <Container>
            <h2>{title}</h2>
            {
                titleButton &&
                    <Button onClick={handleShowModal} startIcon={<IconButton/>} color={colorButton??'primary'} >
                        {titleButton}
                    </Button>

            }
        </Container>
    )
}