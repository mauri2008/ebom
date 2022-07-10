import React, {useState} from 'react'
import { Stack, TextField, FormControl, Select, InputLabel, MenuItem, Typography, Box, Button} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { CreditScore } from '@mui/icons-material'
import { useFormik } from 'formik'
import useAPi from '../../services/api'
import { successNotification } from '../../helpes/notification';

const FormDownPay = ({ onClose, id, actions, updateViewUser, idClient, updateListView}) =>{

    const ENDPOINT = 'sales';
    const api = useAPi();
    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues:{
            form_of_payment:'',
        },
        onSubmit: async values=>{
            if(window.confirm('Deseja Confirmar a baixa desta compra?'))
            {
                const payload = {
                    paid_sale:'yes',
                    form_of_payment:values.form_of_payment,
                }
                const setSales =  await api.update(`${ENDPOINT}/update/${id}`,payload, actions);
                if(Object.keys(setSales).length === 0){          
                         setLoading(false)
                        return ''
                }

                successNotification(actions,'Ação registrada com sucesso!');
                setLoading(false)
                if(updateViewUser ){
                    updateViewUser(idClient)
                }
                if(updateListView){
                    updateListView()
                }
                handleClose()

            }

        }
    })

    const handleClose = ()=>{
        formik.resetForm();
        onClose(false)
    }

    return(
        <form onSubmit={formik.handleSubmit}>
            <Stack  spacing={2} sx={{marginTop:'1rem'}}> 
                <Box sx={{display:'flex', alignItems:'center'}}>
                    <CreditScore sx={{marginRight:'5px'}}/>
                    <Typography variant='h6'> Baixar compra</Typography>
                </Box>
                <FormControl fullWidth size='medium' >
                    <InputLabel id="label-form-of-payment"> Forma de pagamento</InputLabel>
                    <Select
                        labelId='label-form-of-payment'
                        label="Forma de pagamento"
                        name="form_of_payment"
                        value={formik.values.form_of_payment}
                        required={true}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="dinheiro">Dinheiro</MenuItem>
                        <MenuItem value="cartão">Cartão</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    name="value_sale"
                    type="text"
                    label="Valor"
                    fullWidth
                    size='normal'
                    className="inputUser"
                    value='50.00'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    disabled
                    
                />

                <Stack spacing={2} direction='row-reverse'>
                    <Button  variant="outlined" color="error" onClick={()=>handleClose()} disabled={loading}>Cancelar</Button>
                    <LoadingButton variant="outlined" type="submit" loading={loading}>Baixar</LoadingButton>
                </Stack>
            </Stack>

        </form>
    )
}

export default FormDownPay;