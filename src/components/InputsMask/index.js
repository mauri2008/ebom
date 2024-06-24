import React, { useCallback } from 'react';
import { Container, Label, Input } from './style';
import { TextField } from '@mui/material'
import { maskCurrency } from '../../helpes/functions'


const InputMask = ({name, mask,label, ...props}) => {

    const handlekeyUp = useCallback(e=>{
        // if(mask === 'cep'){
        //     cep(e); 
        // }
        if(mask ==='currency'){
            maskCurrency(e)
        }
        // if(mask ==='taxa'){
        //     taxa(e)
        // }
        // if(mask ==='time'){
        //     time(e)
        // }
        
    },[])

    return(
        <Container>
            <TextField 
                label={label}
                name={name}
                onKeyUp={handlekeyUp}
                {...props}
            />
        </Container>
    )
}

export default InputMask