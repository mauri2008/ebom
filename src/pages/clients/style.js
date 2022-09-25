import styled from 'styled-components';
import Modal from '@mui/material/Modal'

export const Container = styled.div`
    padding-bottom:30px ;
    box-sizing: border-box ;
`
export const Content = styled.main`
    display: flex ;
    flex-direction: column;
`
export const ContainerBox = styled.div`
    background:#fff ;
    width: 800px;
    box-sizing: border-box;
    padding:20px 20px 2rem 20px;

    .inputUser{
        margin-bottom: 20px;
    }
`;

export const HeaderBox = styled.header`
    padding: 15px 0px ;
    border-bottom: 1px solid rgba(0,0,0,0.1);
`

export const ContentBox = styled.main`
    padding: 20px 0px;
    margin-top:20px;

`

export const CombineButton = styled.div`
    display:flex ;
    justify-content: flex-end ;
    margin-top:20px;

    button{
        font-size:14px;
        text-align:center ;
        margin-left: 10px ;
    }

`

export const ModalBox = styled(Modal)`
    display: flex;
    justify-content: center ;
    align-items:center ;
    overflow-x:auto ;
    padding: 20px 0px;
    
`

export const ContentList = styled.article`
    box-sizing: border-box ;
    width: 100% ;
`

export const ItensList = styled.div`
    display:grid;
    grid-template-columns: 3.5% repeat(6,15.3%);
    gap:0.5rem;
    text-align: left;
    margin-bottom: 0.5rem;
    padding:1.5rem;
    border:1px solid var(--bs-gray-500);
    border-radius:5px;
    align-items: center ;
    box-sizing:border-box ;
    width:100%;
`

export const GroupBottomList = styled.div`
    width:100% ;
    display: flex ;
    justify-content: flex-end ;
    box-sizing:border-box ;

    button{
        svg{
            font-size:1.2rem ;
        }
    }
`