import styled from 'styled-components';
import Paper from '@mui/material/Paper'

export const Container = styled.main`
    box-sizing:border-box ;
    padding: 10px 10px ;
`
export const StatusHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap:7px 10px  ;
    box-sizing: border-box ;
    justify-content: space-between ;
    margin-top: 20px ;
    padding-bottom:20px ;
    border-bottom: 1px solid #d3d3d3;

    @media only screen and (max-width: 1024px) {
        display:grid ;
        grid-template-columns: repeat(1,1fr) ;
    }

`;

export const SectionCharts = styled.section`
    width:100% ;
    display:grid;
    grid-template-columns: 80% 20% ;
    grid-gap: 0.3rem ;
    border: 0px;
    padding:0px ;
    box-sizing:border-box ;
`
export const TitleCharts = styled.h4`
    margin-bottom: 28px ;
`
export const DescriptionCharts = styled.div`
    margin-top :15px ;
`
export const SectionLeftCharts = styled.div`
    width:100% ;
    box-sizing: border-box ;
    margin-right: 10px;
    border-radius: 15px ;
    padding: 1.3rem;
    border: 1px solid #c3c3c3;
    .titleCharts{
        margin:0px;
        padding:0px ;
    }
` 
export const SectionRightCharts = styled.div`
    width:100% ;
    box-sizing: border-box ;
    padding: 1.3rem;
    border-radius: 15px ;
    border: 1px solid #c3c3c3;

`
export const SectionTableEntrace = styled(Paper)`
    width: 100%;
    margin:30px 0px;
    box-sizing:border-box;
    padding:20px;
    display:block ;
    position:relative ;
`

export const TablePresents = styled.div`
    flex:1 ;
    height: 200px ;
    padding-bottom:20px ;
    overflow:auto ;
    scrollbar-width:thin;

`
export const ContainerTablePresents = styled.section`
    border:1px solid #c3c3c3;
    margin: 20px 0px;
    box-sizing: border-box ;
    padding: 20px;
    border-radius: 20px;
`
export const TitlePresents = styled.div`
    display:flex; 
    justify-content:space-between;
    align-items:center;
    padding-bottom:20px ;
    border-bottom:1px solid #e4e4e4;
`

export const EmptyClientsPresents = styled.div`
    height:100% ;
    display: flex ;
    align-items:center ;
    justify-content: center;
`

