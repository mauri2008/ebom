import styled from "styled-components";

export const Container = styled.div`
     flex: 1;
     margin-top: 20px;
`
export const Table = styled.table`

width: 100%;
border:none;
background: #fff;
border-radius:10px;
text-align: left;
font-size: 14px;
font-family: 'roboto', sans-serif;

& thead {

& tr{         
    & th{
        font-family: 'roboto', sans-serif;
        font-weight:400;
        color:#bebebe;
        background: #fff;
    }
}
}
& tbody {
& tr{
    
    & td{
        padding:15px 5px;
        color:#535353;
        border-bottom: 1px solid #e5e5e5;



        /* & img{
            width: 2rem;
        }

        .disabledItem {
            pointer-events:none;
            cursor:default;
            color: #c3c3c3c3;
        }

        & a{
            margin: 0px 5px;
            padding:2px;
            text-decoration:none;
            color: var(--bs-dark);
            transition: all ease .2s;
            cursor:pointer;
        }
        & a:hover{
            opacity:0.5 ;
        } */
    }
}
}
`
export const ContainerHeader = styled.div`
    display:flex;
    justify-content: space-between ;
    margin-bottom: 30px;
`
export const TitleHeader = styled.div`

`
export const ElementsChildrenHeader = styled.div`

`


