import styled from 'styled-components';


export const Container = styled.main`
    width: 56.25rem;
    margin: calc(0.05* 100vh) auto ;
    background: var(--bs-white);
    border:none;
    padding:1.5rem ;
    box-sizing:border-box ;
    border-radius:5px;
`
export const Header = styled.header`
    padding-bottom:1rem ;
    margin-bottom:0.5rem ;
    border-bottom:1px solid var(--bs-gray-300);

    @media print {
        display:none ;
    }

`
export const TitleAndClose = styled.div`
    display: flex ;
    justify-content: space-between ;
    align-items: flex-start;

    div{

        span{
            color:var(--bs-gray-500)
        }
    }

    svg {
        cursor:pointer ;
        font-size: 25px ;
        transition: color 0.2s ;
        :hover{
            color:var(--bs-gray-500)
        }
    }
`
export const Content = styled.article`

`
