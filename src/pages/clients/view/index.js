import React, {useState} from 'react';
import { useHistory } from 'react-router-dom'
import { Box, Typography, Grid, Divider, Button, Stack, IconButton} from '@mui/material'
import { labels } from '../../../helpes/constantsLabel'
import { currentViewFormat, convertDateNotUtcInBR } from '../../../helpes/functions'
import Payment from '@mui/icons-material/Payment';
import FormDownPay from '../../../components/FormDownPay';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';


const  ViewClient =  ({client , handleClose, actions , updateViewUser, updateListPage}) => {
    const history = useHistory();
    const [downPay, setDownPay] = useState(false)

    const handleRedirectSales = () =>{
        history.push(`/compras/${client.id}`)
    }
    

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant='caption'>Email</Typography>
                    <Typography variant='subtitle1'>{client?.email}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='caption'>Telefone</Typography>
                    <Typography variant='subtitle1'>{client?.phone ?? ''}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='caption'>Congregação</Typography>
                    <Typography variant='subtitle1'>{client?.name_church ?? ''}</Typography>
                </Grid>
            </Grid>
            <Divider sx={{padding:'0.5rem 0px', marginBottom:'1rem'}}/>

            <Stack direction="row" justifyContent='space-between' sx={{margin:'2rem 0px'}}>
                <Typography variant='h6' ><AddShoppingCart/> Compra</Typography>
                {
                    !client?.idsales &&
                        <Button variant='outlined' onClick={()=>handleRedirectSales()}>Adicionar Compra</Button>
                }
            </Stack>
            {
                client?.idsales &&
                <Grid container  spacing={2}>
                    <Grid item xs={1}  >
                        <Typography variant='caption'>ID</Typography>
                        <Typography variant='body2'>{client?.idsales}</Typography>
                    </Grid>
                    <Grid item xs={client?.form_of_payment !=='nao_pago'? 2:4}  >
                        <Typography variant='caption'>Data</Typography>
                        <Typography variant='body2'>{convertDateNotUtcInBR(client?.data_sale)}</Typography>
                    </Grid>
                    <Grid item xs={2}  >
                        <Typography variant='caption'>status</Typography>
                        <Typography variant='body2'>{client?.paid_sale? labels.paid[client?.paid_sale]:''}</Typography>
                    </Grid>
                    {
                        client?.form_of_payment !=='nao_pago' &&
                            <Grid item xs={4}  >
                                <Typography variant='caption'>Forma de pagamento </Typography>
                                <Typography variant='body2'>{client?.form_of_payment !=='nao_pago'?client?.form_of_payment:""}</Typography>
                            </Grid>

                    }
                    <Grid item xs={2}  >
                        <Typography variant='caption'>Valor</Typography>
                        <Typography variant='body2'>{client?.value_sale ? currentViewFormat(client?.value_sale):''}</Typography>
                    </Grid>
                    {
                        client?.form_of_payment === 'nao_pago' &&
                            <Grid item xs={2}>
                                <Box sx={{height:'100%'}}>
                                    <IconButton aria-label="Baixar Titulo" title="Baixar Titulo" color="success" onClick={()=>setDownPay(true)}>
                                        <Payment />
                                    </IconButton>
                                </Box>
                            </Grid>
                    }

                </Grid>
                

            }
            {
                !client?.idsales &&
                    <Box>

                        <Typography>Cliente não possui compra registrada.</Typography>
                    </Box>
            }

            {
                downPay &&
                <>
                    <Divider sx={{padding:'0.5rem 0px', marginBottom:'1rem'}}/>
                    <FormDownPay
                        onClose={setDownPay}
                        id={client?.idsales}
                        idClient={client?.id}
                        actions={actions}
                        updateViewUser={updateViewUser}
                        updateListView = {updateListPage}
                    />
                </>

            }
            {
                !downPay &&
                <Stack justifyContent='flex-end' sx={{marginTop:'3rem'}}>
                    <Button variant='outlined' onClick={()=>handleClose(false)}>Fechar</Button>
                </Stack>

            }

        </Box>


    );
}

export default ViewClient;