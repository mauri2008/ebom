import React from 'react';
import { Container, IconLoading } from './style';
import imgLoading from '../../assets/images/loading-group.gif'


export default function Loading(){

    return(
        <Container>
            <IconLoading>
                <img src={imgLoading} alt="Imagem de loading"/>
            </IconLoading>
            <h3>Carregando...</h3>
        </Container>
    )

}