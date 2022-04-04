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
    display:flex;
    justify-content: space-between ;
    width:100% ;

    border: 0px;
    padding:0px ;
    box-sizing:border-box ;
`
export const SectionLeftCharts = styled.div`
    width:80% ;
    max-height:173px ;
    box-sizing: border-box ;
    margin-right: 10px;
    .titleCharts{
        margin:0px;
        padding:0px ;
    }
` 
export const SectionRightCharts = styled.div`
    width:25% ;
    box-sizing: border-box ;

`
export const SectionTableEntrace = styled(Paper)`
    width: 100%;
    height:300px ;
    margin:30px 0px;
    box-sizing:border-box;
    padding:20px;
    overflow:auto ;
    scrollbar-width:thin;

`