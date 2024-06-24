import styled from 'styled-components';
import { lighten } from 'polished'


export const Container = styled.div`
    padding-bottom: 30px;
`
export const Content = styled.main`
    display: flex ;
    flex-direction: column;
    height:100% ;
`
export const ContainerBox = styled.div`
    background:#fff ;
    width: 800px;
    box-sizing: border-box;
    padding:5px 20px;

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

export const GroupFilter = styled.div`
    width: 40rem;
    display: flex ;
    gap:1rem;
`

export const StatusSales = styled.div`
    display: grid ;
    grid-template-columns: repeat(4,1fr)  ;
    gap:1.2rem;
    margin-bottom:2.3rem ;

`

export const ItemStatusSales = styled.button`
    width:100%;
    display: flex ;
    background: ${props => lighten(0.4, props.color )} ;
    flex-direction: column ;
    justify-content: center ;
    align-items:center ;
    gap:0.5rem;
    padding: 1rem ;
    border-radius: 8px ;
    cursor: pointer;
    color: ${props => props.color ?? '#333'};
    border:2px solid ${props => props.color ?? '#333'};
    transition: all ease .2s ;
    & h2{
        font-size: 2rem ;
    }
    
    &:hover{
        background: ${props => props.color ?? '#333'};
        color:var(--bs-gray-100);
    }


`
export const TitleItemStatusSales = styled.div`
    display: flex ;
    justify-content: center ;
    align-items: center ;
    gap:1rem;
    & svg{
        font-size: 2rem ;
    }
`