import React from 'react';
import BoxModal from '../../../../components/boxModal';
import { ModalBox } from '../../style';
import { Box, Stack, Button, Typography } from '@mui/material'
import Loyalty from '@mui/icons-material/Loyalty';



const ConfirmNewSold = ({open, onClose, handleClick}) =>{
    return (
        <ModalBox
            open = {open}
            onClose={onClose}
        >
            <BoxModal>
                <Stack spacing={2} alignItems='center'>
                    <Loyalty sx={{fontSize:'10rem'}} color='success'/>
                    <Typography varient='h6'> Deseja Adicionar uma venda para este novo participante ?</Typography>
                    <Button variant='outlined' fullWidth onClick={()=>handleClick()}  color='info'>Sim</Button>
                    <Button variant='outlined' fullWidth onClick={()=>onClose(!open)} color='error'>Não</Button>
                </Stack>
            </BoxModal>
        </ModalBox>
    )
}   

export default ConfirmNewSold;