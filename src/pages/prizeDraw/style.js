import styled, { keyframes } from 'styled-components'
import fundo from '../../assets/images/fundo-sorteio.gif'
import ganhadorGif from '../../assets/images/ganhador.png'

const animateView = keyframes`
    0% { 
        opacity:0;
        margin-top:-1000px;
    }
    50%{
        opacity: 0.2;
    }
    100%{ 
        opacity:1;
        margin-top:0px;
    }
`

export const Container = styled.main`
    width:100vw;
    height: 100vh;
    top:0 ;
    left:0;
    position: fixed ;
    background: #fff;
    background-image: url(${fundo}) ;
    background-repeat: no-repeat ;
    background-size:cover;
    box-sizing: border-box ;

    .animateview{
        padding-top:5rem ;
        animation-name: ${animateView} ;
        animation-duration: 8s;
        animation-iteration-count: 1;
    }
`
export const Header = styled.header`
    display: flex;
    justify-content: space-between ;
    padding: 0.2rem 1.2rem ;

    svg {
        font-size:35px ;
        cursor:pointer;
        margin-top:1rem ;
    }

    img {
        width: 150px ;
    }
`
export const Content =  styled.article`

    margin-top: 1.5rem ;
    display:flex;
    justify-content:center ;

    & button{
        margin-top: 15rem ;
    }
`

export const ViewResult = styled.div`
    width:60%;
    padding:20px 0px;
    height:auto ;
    text-align:center;

    h1{
        font-size:5rem ;
        padding: 20px 0;
    } 
    h2 {
        font-size: 3.5rem ;
        color:rgb(107,114,128);
    } 
    h3{
        font-size:2.5rem ;
        color:var(--bs-red);
        
    } 
    button{
        margin-top:3rem;
    }


    
`

