import styled from 'styled-components'

export const Container = styled.section`

`

export const Content =  styled.main``



export const Header = styled.header`
    display:flex;
    justify-content: space-between ;
    border-bottom:1px solid rgba(0,0,0,0.1);
    padding-bottom:20px ;

    h2{
        display:flex;
        align-items:center ;
        font-weight:normal ;
        font-size:30px;
        color:var(--bs-primary);

        svg{
            font-size:35px ;
            margin-right:10px ;
            
        }
    }
    button{
        svg{
            margin-right:10px ;
        }
    }
`

export const ListUsers = styled.section`
    margin-top:30px;
    padding: 10px 0px;

    h3{
        font-weight:normal ;
        font-size: 18px;
    }
`

export const ContainerBox = styled.div`
    background:#fff ;
    width: 800px;
    box-sizing: border-box;
    padding:5px 20px;

    .inputUser{
        margin-bottom: 20px;
    }
`;

export const HeaderBox = styled.header`
    padding: 15px 0px ;
    border-bottom: 1px solid rgba(0,0,0,0.1);
`

export const ContentBox = styled.main`
    padding: 20px 0px;
    margin-top:20px;

`

export const CombineButton = styled.div`
    display:flex ;
    justify-content: flex-end ;
    margin-top:20px;

    button{
        font-size:14px;
        text-align:center ;
        margin-left: 10px ;
    }

`
