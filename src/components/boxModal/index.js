import  React from 'react';
import { Container, Content } from './style'; 


export default function BoxModal({children}){
    return (
        <Container>
            <Content>
                {children}
            </Content>
        </Container>
    )
}