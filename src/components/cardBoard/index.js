import React from 'react';
import { Container, Content , SessionLeft, SessionRight} from './style';



export default function CardBoard({title, subtitle, Icon, colorIcon}){


    
    return(
        <Container elevation={2} >
            <Content>
                <SessionLeft colorIcon={colorIcon}>
                    <Icon />
                </SessionLeft>
                <SessionRight>
                    <h4>{title}</h4>
                    <small>{subtitle}</small>
                </SessionRight>
            </Content>


        </Container>
    )
}