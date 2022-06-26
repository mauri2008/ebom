import React from 'react';
import { Container, Content , SessionLeft, SessionRight} from './style';
import Skeleton  from '@mui/material/Skeleton';



export default function CardBoard({title, subtitle, Icon, colorIcon, loading}){


    
    return(
        <Container elevation={2} >
            <Content>
                <SessionLeft colorIcon={colorIcon}>
                    <Icon />
                </SessionLeft>
                {
                    !loading &&
                    <SessionRight>
                        <h4>{title}</h4>
                        <small>{subtitle}</small>
                    </SessionRight>
                }
                {
                    loading &&
                        <SessionRight>
                            <Skeleton/>
                            <Skeleton/>
                        </SessionRight>
                }
            </Content>


        </Container>
    )
}