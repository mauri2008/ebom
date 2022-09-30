import styled from 'styled-components'

export const ContainerPrint = styled.div`

    width: 21.0cm !important;
    height: 29.7cm !important;
    box-sizing: border-box !important;
    padding-top:1cm !important;
    padding-left:0.65cm !important;
    padding-bottom:0cm !important;
    padding-right: 0cm !important;

`

export const SectionPrint = styled.section`


    display: grid ;
    box-sizing: border-box ;
    grid-auto-rows: 3.81cm ; 
    grid-template-columns: 6.35cm 6.35cm 6.35cm ;
    column-gap:0.06cm;
    border:none;
    margin: 0 !important;


`
export const Codes = styled.div`
    display: flex ;
    flex-direction: column ;
    justify-content: center ;
    align-items: center ;
    box-sizing: border-box ;
    border:1px solid #e2e2e2;
    border-radius: 5px ;
    & p{
        margin-bottom:10px;
        font-size:12px ;
    }
`
export const ToolsPrint = styled.div`
    width:100% ;
    margin-bottom: 2rem ;
    display:inline-block ;
    box-sizing: border-box;

    svg{
        margin-left: 20px;
        transition: color 0.2s ;
    }
    @media print{
        position: absolute ;
        z-index:-10;
        display:none;
    }
`
export const InputStart = styled.div`
    display:flex;
    justify-content: flex-end ;
    align-items: center ;
    
    & svg {
        margin-top:-1.3rem ;
        font-size:2rem ;
        cursor:pointer;

        &:hover{
            color: var(--bs-primary);
        }
    }
`