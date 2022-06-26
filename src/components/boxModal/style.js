import styled from 'styled-components';
import Modal from '@mui/material/Modal'

export const styleContainerModal = {
    position:'absolute',
    top:'50%',
    left:'50%',
    transform: 'translate(-50%, -50%)',
    width:500,
    bgcolor:'#fff',
    boxShadow:'24px',
    p:5
}

export const CloseModal = styled.div`
    width:100% ;
    display:flex;
    justify-content: flex-end ;

    svg{
        cursor:pointer ;
    }
`