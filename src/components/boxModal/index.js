import  React from 'react';
import  Box from '@mui/material/Box';
import  { styleContainerModal, CloseModal } from './style'
import Close from '@mui/icons-material/Close'





const  BoxModal= ({handleClose,titleModal ,children})=>{
    return (
        <Box sx={styleContainerModal}>
            {   handleClose &&
                    <CloseModal>
                        <Close onClick={()=>handleClose(false)}/>
                    </CloseModal>

            }
            <Box>
                {
                    titleModal &&
                        <h2 className="TitleModal" >{titleModal}</h2>
                }
                {children}
            </Box>
        </Box>
    )
}

export default BoxModal