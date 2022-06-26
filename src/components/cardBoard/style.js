import styled from 'styled-components'
import Paper from '@mui/material/Paper'

export const Container = styled(Paper)`
    min-width:30% ;
    
`
export const Content = styled.div`
    display: flex ;
    padding: 10px;
`

export const SessionLeft = styled.section`
    padding: 20px ;
    border-right: 1px solid #e3e3e3 ; 

    svg{
        font-size: 40px ;
        color: ${props=> props.colorIcon?? '#0E1795'};
    }
`
export const SessionRight = styled.div`
    min-width: 150px ;
    padding:10px ;
    display: flex ;
    justify-content: center ;
    flex-direction:column ;
    h4{
        color: #0E1795;
    }

    small{
        color:#a3a3a3;
    }
`