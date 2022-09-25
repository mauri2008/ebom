import React, {useContext, useEffect, useState} from 'react';
import { 
    Box, 
    Typography, 
    Grid, 
    Divider, 
    Button, 
    Stack, 
    IconButton, 
    Skeleton, 

} from '@mui/material'

import { labels } from '../../../helpes/constantsLabel'
import { currentViewFormat, convertDateNotUtcInBR } from '../../../helpes/functions'
import Payment from '@mui/icons-material/Payment';
import FormDownPay from '../../../components/FormDownPay';
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';
import UseApi from '../../../services/api';
import { StateContext } from '../../../context'



const  ViewClient =  ({idClient , onclose, updateListPage}) => {
    const api = UseApi();
    const { actions } = useContext( StateContext );
    const [ client, setClient ] = useState({});
    const [downPay, setDownPay] = useState(false);
    const [ loading, setLoading ] = useState(true)

    async function getClient () {
        const response = await api.insert('clients/search',{search:'user', value:idClient});
        if(response){
            setClient(response.data)
            setLoading(false)
        }
    }

    function handleCloseModal () {
        onclose(false)
    }

    function handleUpdateListSales () {
        getClient()
        actions.setReloadList(true);
    }

    function handleOpenAndCloseDowPay () {
        setDownPay(!downPay);
    }

    useEffect(()=>{
        getClient()
    },[])

    return (
        
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {
                        loading ? 
                        <Skeleton variant='rectangular' width={'50%'} height={30}/>
                        :
                        <Typography variant='h5' sx={{mt:3, mb:2}}>
                            {client?.name_client}
                        </Typography>
                    }
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='caption'>Email</Typography>
                    {
                        loading ?
                        <Skeleton variant='rectangular' width={'60%'} />
                        :
                        <Typography variant='subtitle1'>{client?.email??'-'}</Typography>
                    }
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='caption'>Telefone</Typography>
                    {
                        loading ?
                        <Skeleton variant='rectangular' width={'60%'} />
                        :
                        <Typography variant='subtitle1'>{client?.phone ?? '-'}</Typography>
                    }
                </Grid>
                <Grid item xs={6}>
                    <Typography variant='caption'>Congregação</Typography>
                    {
                        loading ?
                        <Skeleton variant='rectangular' width={'60%'} />
                        :
                        <Typography variant='subtitle1'>{client?.name_church ?? '-'}</Typography>
                    }
                </Grid>
            </Grid>
            <Divider sx={{padding:'0.5rem 0px', marginBottom:'1rem'}}/>

            <Stack direction="row" justifyContent='space-between' sx={{margin:'2rem 0px'}}>
                <Typography variant='h6' ><AddShoppingCart/> Compra</Typography>
            </Stack>

            {

                client?.idsales ?
                <Grid container  spacing={1}>
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
                        client?.paid_sale === 'no' &&
                            <Grid item xs={1}>
                                <Box sx={{height:'100%'}}>
                                    <IconButton aria-label="Baixar Titulo" title="Baixar Titulo" color="success" onClick={handleOpenAndCloseDowPay}>
                                        <Payment />
                                    </IconButton>
                                </Box>
                            </Grid>
                    }

                </Grid>
                :
                <Box>
                    {
                        loading ?
                            <Skeleton variant='rectangular' height={30} />
                        :
                        <Typography>Cliente não possui compra registrada.</Typography>
                    }
                </Box>
            
            }
            {
                downPay &&
                <>
                   <Divider sx={{padding:'0.5rem 0px', marginBottom:'1rem'}}/>
                    <FormDownPay
                        onClose={handleOpenAndCloseDowPay}
                        id={client?.idsales}
                        updateList={handleUpdateListSales}
                    /> 
                </>

            }

            <Stack justifyContent='flex-end' sx={{marginTop:'3rem'}}>
                <Button variant='outlined' onClick={handleCloseModal}>Fechar</Button>
            </Stack>

            

        </Box>


    );
}

export default ViewClient;