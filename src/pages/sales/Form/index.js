import React,{ useContext, useState, useEffect } from "react";
import FormControl  from '@mui/material/FormControl';
import InputLabel  from '@mui/material/InputLabel';
import Select  from '@mui/material/Select';
import MenuItem  from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton'
import Autocomplete  from '@mui/material/Autocomplete';
import TextField  from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import {Box} from '@mui/material'
import { useFormik } from 'formik'
import UseAPI from '../../../services/api'
import { StateContext } from '../../../context';
import { successNotification } from '../../../helpes/notification';


const FormSales = ({clients, update , setCloseModal, clientUpdate, clientURL, cleanForm, setCleanForm}) =>{
    const ENDPOINT = 'sales';

    const api = UseAPI()
    const [loading , setLoading] = useState(false)
    const [ client, setClient ] = useState(clientUpdate? clientUpdate : clientURL)
    const [ controlPaid, setControlPaid] = useState(false)
    const [ controlFormOfPayment, setControlFormOfPayment] = useState(false)
    const {state, actions} = useContext(StateContext);

    const handleSetClient = (event, value) =>{
        setClient(value)
    }   

    const valueDefaultFormik = {
        id:update?.id??'',
        paid_sale:update?.paid_sale?? "", 
        paying_sale: update?.paying_sale ?? "",
        value_sale: "50.00",
        form_of_payment: update?.form_of_payment??"",
        note: update?.note??''
    }

    const handleCleanform = () =>{
        formik.setValues({
            id:'',
            paid_sale: "", 
            paying_sale:"",
            value_sale: "50.00",
            form_of_payment: "",
            note: ''
        })
        setClient({label:'',id:''})
        setCleanForm(false)
    }

    
    const formik = useFormik({
        initialValues:valueDefaultFormik,
        validationSchema:'',
        onSubmit: async value=>{
            setLoading(true)
            value.id_client = client.id
            const setSales = !update ? await api.insert(ENDPOINT,value, actions) : await api.update(`${ENDPOINT}/update/${value.id}`,value, actions);
            if(Object.keys(setSales).length === 0){          
                     setLoading(false)
                    return ''
            }
                successNotification(actions,'Ação registrada com sucesso!');
                setLoading(false)
                setCloseModal(false)
            }
        })
        

    const handleAbilityFunc = ()=>{
        if(formik.values.paying_sale === 'yes'){
            setControlPaid(true)
            if(formik.values.paid_sale === 'yes'){
                setControlFormOfPayment(true)
            }else{
                setControlFormOfPayment(false)
                formik.setFieldValue('form_of_payment','nao_pago')
            }
        }else{
            setControlPaid(false);
            formik.setFieldValue('paid_sale','')

            formik.setFieldValue('form_of_payment','')
        }
    }

    useEffect(()=>{
        if(cleanForm){
            handleCleanform()
        }
    })

    useEffect(() => {
        handleAbilityFunc()
    }, [formik.values]);
    return(
        <Box>
            <form onSubmit={formik.handleSubmit}>
                <input type="hidden" name="id" value={formik.values.id}/>
                <Stack spacing={3}>

                    <Autocomplete 
                        disablePortal
                        name='id_client'
                        inputValue={ client.label }
                        options={clients??[]}
                        getOptionLabel={(option) => option.label || ''}
                        onChange={handleSetClient}
                        renderInput={(params)=> <TextField {...params} label="Participante"/>}
                        disabled={clientURL}
                        required
                    />
                    <FormControl fullWidth>
                        <InputLabel id="label-paid">Pagante</InputLabel>
                        <Select
                            labelId='label-paid'
                            label="Participante Pagante"
                            name="paying_sale"
                            value={formik.values.paying_sale}
                            onChange={formik.handleChange}
                            required

                        >
                            <MenuItem value='yes'>Sim</MenuItem>
                            <MenuItem value='no'>Não</MenuItem>
                        </Select>
                    </FormControl>
                    
    {               controlPaid &&
                        <>
                            <FormControl fullWidth >
                                <InputLabel id="label-paying">Pago</InputLabel>
                                <Select
                                    labelId='label-paying'
                                    label="Pago"
                                    name="paid_sale"
                                    value={formik.values.paid_sale??''}
                                    required={controlPaid}
                                    onChange={formik.handleChange}
                                >
                                    <MenuItem value="yes">Sim</MenuItem>
                                    <MenuItem value="no">Não</MenuItem>
                                </Select>
                            </FormControl>

                            {
                                controlFormOfPayment &&
                                    <FormControl fullWidth >
                                        <InputLabel id="label-form-of-payment">Forma de pagamento</InputLabel>
                                        <Select
                                            labelId='label-form-of-payment'
                                            label="Forma de pagamento"
                                            name="form_of_payment"
                                            value={controlFormOfPayment? formik.values.form_of_payment:'nao_pago'}
                                            required={controlFormOfPayment}
                                            onChange={formik.handleChange}

                                        >
                                            <MenuItem value="dinheiro">Dinheiro</MenuItem>
                                            <MenuItem value="cartão">Cartão</MenuItem>
                                            <MenuItem value="pix">Pix</MenuItem>
                                        </Select>
                                    </FormControl>

                            }

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

                        </>
                    }
                    {formik.touched.value_sale && formik.errors.value_sale ? (
                        <div className="messageError">{formik.errors.name_church}</div>
                    ) : null}

                    
                    <TextField
                        name="note"
                        label="Observação"
                        fullWidth
                        size='normal'
                        className="inputUser"
                        multiline
                        rows={5}
                        value={formik.values.note}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}

                        sx={{marginTop:1,}}
                    />
                    <Stack 
                        spacing={3}
                        direction="row"
                        justifyContent="flex-end"
                    >
                        <LoadingButton type="submit" variant="outlined" loading={loading} >Salvar</LoadingButton>
                        <Button color="error" variant="outlined" onClick={()=>setCloseModal(false)} disabled={loading}>Cancelar</Button>
                    </Stack> 
                </Stack>
            </form>


        </Box>


    )
}


export default FormSales