import styled from 'styled-components'

export const ContainerPrint = styled.div`
    width:100%;
    box-sizing: border-box;
    padding: auto;
    display:flex ;
    flex-direction:column ;
    justify-content: center;
    align-items: center ;
    /* padding: 2rem ; */
  

    @media print {
        .print{
            width: 820px  ;
            height: 1126px ;
            display: grid ;
            padding:0px;
            /* margin-top:-15px;
            margin-left:-5px ; */

            /* margin-top:-498px;
            margin-left:5px ;  */
            /* transform:scale(1) ;  */
           
        }
        .no-print{
            display: none ;
        }
    }
`

export const SectionPrint = styled.section`
    /* transform: scale(0.9) ;  */
    /* width: 794px ;
    height: 1123px ; */
    width: 100% ;
    box-sizing: border-box ;
    border: 1px solid #000;
    padding:1.5rem;
    display: grid;
    grid-auto-rows: 144px ;
    grid-template-columns: 240px 240px 240px;
    grid-row-start:1 ;
    grid-gap:1px 10px ;
    margin-top: 20px ;
    margin-left:-5px;

    /* padding:30px 14px; */


    @media print {
        
            grid-auto-rows: 4.25cm ;
            grid-gap:0px 0.25cm ;
            grid-template-columns: 7.04cm 7.04cm 7.04cm;
            grid-row-start:1 ;
            /* margin-top:-15px !important;
            margin-left:-5px !important; */
            padding:0 ;
            border:none;
            
    }

`
export const Codes = styled.div`
    display: flex ;
    justify-content: center ;
    align-items:center ;
    flex-direction: column ;
    box-sizing: border-box ;
    border:1px solid #e2e2e2;
    /* background-color: red ; */
    border-radius: 5px ;
    & p{
        margin-bottom:10px;
        font-size:12px ;
    }

    @media print{
        border:1px solid #e9e9e9;
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
        background:red;
        print-color-adjust: exact;
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