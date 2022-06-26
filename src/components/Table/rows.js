import DeleteForever from '@mui/icons-material/DeleteForever'
import Edit from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'
import { Stack, IconButton } from '@mui/material'
import PresentToAllIcon from '@mui/icons-material/PresentToAll';


const Row = ({record ,actions}) =>{
    const keys  = Object.keys(record)
    const alterText = {
        yes:'Sim',
        no:'Não',
        nao_pago:'Em Aberto'
    }

    const validtext = (text)=>{
        return (text === 'yes' || text === 'no' || text === 'nao_pago')? alterText[text]:text;
    }

    return (
        <tr key={record.id}>
            {
                
                actions.handleQrCode && record.paidout ==='true' &&
                <td>
                    <input type="checkbox" name='selectQrCode' value={record.id} onChange={check=> actions.handleQrCode(check)}/>
                </td>
            }
            {
                actions.handleQrCode && record.paidout ==='false' &&
                <td>

                </td>
            }
            {
                keys.map(key => {
                    if(key ==='tumber'){
                        return <td key={key}><img src={record[key]} alt='Tumber'/></td>
                    }else{
                        if(key !=='paidout'){
                            return <td key={key}>{validtext(record[key])}</td>
                        }
                    }
                })

            }

            <td>
                <Stack direction='row' spacing={1}>
                    {
                        actions.handleView &&
                            <IconButton color='primary' aria-label="Apresentar item" onClick={()=>actions.handleView(record?.id)}>
                                <PresentToAllIcon />
                            </IconButton>
                    }
                    {
                        actions.handleUpdate &&
                            <IconButton color='warning' aria-label='Editar item' onClick={()=>actions.handleUpdate(record?.id)} >
                                <Edit/>
                            </IconButton>
                    }
                    {
                        actions.handleDelete &&
                            <IconButton color='error' aria-label="Remover item" onClick={()=>actions.handleDelete(record?.id)}>
                                <DeleteForever/>
                            </IconButton>
                    }
                </Stack>
            </td>
        </tr>
    )
}

export default Row