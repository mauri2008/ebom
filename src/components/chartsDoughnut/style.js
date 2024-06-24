import styled from "styled-components";

export const DescriptionCharts = styled.section`
    margin-top: 20px ;
`

export const ItemDescription = styled.div`
    display:flex;
    align-items: center ;
    margin-top:3px ;
`
export const ColorDescription = styled.div`
    width:12px ;
    height:12px ;
    background-color:${props=> props.color} ;
    border-radius:50% ;
    margin-right: 5px ;
`


