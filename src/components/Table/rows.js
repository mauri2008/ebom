import DeleteForever from '@mui/icons-material/DeleteForever'
import Edit from '@mui/icons-material/Edit'
import { Link } from 'react-router-dom'
import { Stack, IconButton } from '@mui/material'
import PresentToAllIcon from '@mui/icons-material/PresentToAll';
import FileDownload from '@mui/icons-material/FileDownload';


const Row = ({record ,actions, endpoint}) =>{
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

            <td style={{maxWidth:'5rem'}}>
                <Stack direction='row' spacing={1} justifyContent='flex-end' sx={{paddingRight:'1.5rem'}}>
                    {
                        actions.handleView &&
                            <IconButton color='primary' aria-label="Apresentar item" onClick={()=>actions.handleView(record?.id, endpoint)}>
                                <PresentToAllIcon />
                            </IconButton>
                    }
                    {
                        (actions.handleDownPay && (record?.Pagante === 'yes' && record?.Pago === 'no')) &&
                        <IconButton color='success' aria-label="baixar titulo" onClick={()=>actions.handleDownPay(record?.id, endpoint)}>
                            <FileDownload/>
                        </IconButton>
                    }
                    {
                        actions.handleUpdate &&
                            <IconButton color='warning' aria-label='Editar item' onClick={()=>actions.handleUpdate(record?.id, endpoint)} >
                                <Edit/>
                            </IconButton>
                    }
                    {
                        actions.handleDelete &&
                            <IconButton color='error' aria-label="Remover item" onClick={()=>actions.handleDelete(record?.id, endpoint)}>
                                <DeleteForever/>
                            </IconButton>
                    }

                </Stack>
            </td>
        </tr>
    )
}

export default Row