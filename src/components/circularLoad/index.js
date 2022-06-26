import React from 'react'
import CircularProgress from   '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
const style = {
    display:'flex',
    justifyContent: 'center',
    alignItems:'center',
    padding:'50px 50px',
}

const CircularIdeterminate = ()=>{
    return (
        <Box sx={style}>
            <CircularProgress/>
        </Box>
    )
}

export default CircularIdeterminate;