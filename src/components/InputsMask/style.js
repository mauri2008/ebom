import styled from 'styled-components';

export const Container = styled.div`
    width:100% ;
`
export const Label = styled.label`

`
export const Input = styled.input`
    width:100% ;
    padding:8px 10px ;
    margin-top:${props => props.marginTop? props.marginTop : '5px'};
    margin-bottom:${props => props.marginBottom? props.marginBottom : '5px'};
    margin-left:${props => props.marginLeft? props.marginLeft : '0px'};
    margin-right:${props => props.marginRight? props.marginRight : '0px'};
    border:1px solid ${props => props.colorBorder? props.colorBorder : '#c3c3c3'};
    border-radius: 5px;

`