import { Container, Label, Input } from './style';


export default function Inputs ({name, label, type, ...props}){

    return(
        <Container>
            <Label htmlFor={name}>{label}</Label>
            <Input name={name} type={type} {...props}/>
        </Container>
    )
}