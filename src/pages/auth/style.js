import styled from "styled-components";

export const Container = styled.div`
    display:flex;
    align-items:center;
    justify-content:center;
    width:100%;
    height:100vh;

`

export const Section = styled.section`
    display:flex ;
    width: 700px ;
    height: 450px ;
    border-radius:15px;
    box-shadow: 0px 0px 20px rgba(0,0,0,0.2);
    

`

export const Aside = styled.aside`
    display:flex ;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    width:350px ;
    height:100% ;
    background: var(--bs-blue) ;
    border-radius: 15px 0px 0px 15px;

    & h1{
        font-size:35px;
        font-weight:bold;
        font-family: sans-serif;
        color: #fff;
    }

    & small{
        color:#fff;
    }
    
    & img{
        width:300px ;
    }


`

export const Main = styled.main`
    display:flex ;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    width:350px ;
    height:100% ;
    padding:0px 50px;
    box-sizing: border-box ;
    background: var(--bs-white);
    border-radius: 0px 15px 15px 0px;

`

export const SectionButtom = styled.div`
    position: relative;
    display : inline-block;
    width: 100%;
`

export const IForgotMyPassword = styled.div`
    margin-top:12px;
    display:flex ;
    align-items:center;
    justify-content: center ;

    a{
        text-decoration: none;
    }
`

export const MessageErro = styled.div`
    font-size:12px;
    color: var(--bs-danger);
    font-family:'roboto', sans-serif ;
`
