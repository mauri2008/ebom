import styled from "styled-components";
import Card from '@mui/material/Card'
export const Container = styled.main``

export const CardsInfo = styled.section`
    display: grid ;
    grid-template-columns:repeat(4, 1fr) ;
    grid-gap:7px 10px;
`
export const Content = styled.section`
    margin-top: 10px ;
    padding: 30px 0px;
`
export const ContentTable = styled(Card)`
    margin-top: 10px ;
    padding: 20px;
`
export const ContentButtom = styled.div`
    display: flex ;
    justify-content: flex-end ;
`
