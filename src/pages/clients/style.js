import styled from 'styled-components';
import Modal from '@mui/material/Modal'

export const Container = styled.div`
    padding-bottom:30px ;
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

export const ContainerPrint = styled.div`
    width: 850px ;
    background: #fff;
    margin-top:500px;
    box-sizing: border-box;
    padding: auto;
    display:flex ;
    flex-direction:column ;
    justify-content: center;
    align-items: center ;
    

    @media print {
        .print{
            display: grid ;
            margin-top:-498px;
            margin-left:5px ;
           
        }
        .no-print{
            display: none ;
        }
    }
`

export const SectionPrint = styled.section`
    transform: scale(0.9) ; 
    width: 794px ;
    height: 1123px ;
    box-sizing: border-box ;
    border: 1px solid #c3c3c3;
    display: grid;
    grid-auto-rows: 211px ;
    grid-template-columns: 374px 374px;
    grid-row-start:1 ;
    grid-gap:1px 10px ;
    padding:30px 14px;


    @media print {
        
            width: 870px;
            height: 1243px ;
            grid-gap:1px 10px ;
            grid-auto-rows: 211px ;
            grid-template-columns: 384px 384px;
            grid-row-start:1 ;
            transform:scale(1) ;
            margin:0;
            background:red;
            


        
    }

`
export const Codes = styled.div`
    display: flex ;
    justify-content: center ;
    align-items:center ;
    flex-direction: column ;
    box-sizing: border-box ;
    /* background-color: red ; */
    border-radius: 5px ;
    & p{
        margin-bottom:10px;

    }
    @media print{


            background-color: red ;
        
    }
`
export const ToolsPrint = styled.div`
    width: 100% ;
    display: flex ;
    align-items: center ;
    justify-content:flex-end ;
    margin-top:20px;
    padding: 5px 25px ;
    box-sizing: border-box;

    & svg{
        margin-left: 20px;
    }
`
export const InputStart = styled.div`
    width:150px ;

`
