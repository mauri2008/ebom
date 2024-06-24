import styled from 'styled-components'


export const Container = styled.main`
    display: flex;
    width:100%;
    height:100vh;
    box-sizing: border-box ;
    background-color: red ;
`
export const Aside = styled.aside`
    width:270px;
    height:100%;
    position:fixed;
    display:flex;
    flex-direction: column ;
    justify-content: space-between ;
    background:var(--bs-gray-200) ;
    box-sizing: border-box;
`

export const Content = styled.section`
    width:calc(100% - 270px);
    margin-left:270px;
    padding:30px 20px;
    background: #fff;
    box-sizing: border-box;
`
export const Logo = styled.img`
    width: 80px;

`

export const Nav = styled.nav`
    margin-top: 50px;
    box-sizing:border-box ;
    h6{}
    ul{
        list-style-type: none ;
        padding:0 ;

        li{

            a{    
                display:flex ;
                align-items:center ;
                padding-top:8px;
                padding-bottom:8px;
                padding-left: 20px ;
                text-decoration:none ;
                color: var(--bs-gray-800);
                font-family: 'roboto', sans-serif ;
                font-weight: bold ;
                font-size: 15px ;
                svg{
                    margin-right: 8px;
                    color:var(--bs-gray-600);
                    width:18px;
                }                
            }

            a:hover{
                font-size: 16px ;
                transition: all 0.5s ease ;
                background: var(--bs-gray-400) ;
            }

            .active{          
                background: var(--bs-gray-400) ;
            }

        }
    }
`
export const  Footer = styled.footer`
    display: flex ;
    justify-content: space-between ;
    height: 70px;
    padding:10px 15px ;
    box-sizing: border-box ;
    background:var(--bs-primary);
    border-top: 1px solid rgba(0,0,0,0.1);
    color: #fff;
`
export const Identifier = styled.div`
     display:flex;
     
     justify-content: center ;
     flex-direction:column ;
     font-family:'roboto', sans-serif ;
    p{
        font-size: 15px;
        margin:0;
    }
    small{
        font-size: 11px;
    }
`;  

export const MoreOptions = styled.div`
    display:flex ;
    justify-content: center ;
    align-items: center ;
    svg{
        cursor:pointer;
    }
`

export const ListOPtions = styled.div`
    position: absolute;
    background:var(--bs-gray-400);
    left:100%;
    bottom:0px;
    z-index:9999999;

    ul{
        padding:0;
        list-style-type:none ;
        li{        
            a{
                display:flex;
                padding:10px 15px;
                align-items: center ;
                text-decoration:none;
                color: var(--bs-gray-800);
                font-family: 'roboto', sans-serif;
                font-size: 15px;

                svg{
                    margin-right:5px;
                }
            }
            a:hover{
                background: var(--bs-gray-500) ;
            }
        }
    }
`

export const LogoType = styled.div`
    display : flex ;
    align-items:center ;
    padding:0px 20px;
    margin-top:15px ;
    border-bottom:1px solid #c3c3c3;

    p{
        font-weight: bold ;
        font-size:20px ;

    }
`

