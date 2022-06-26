import React, { useState, useContext } from 'react'
import { useFormik } from  'formik';
import { StateContext } from '../../../context';
import {Box, TextField, Stack, Button, CircularProgress } from '@mui/material'
import { maskValueCurrency, setMaxDataUpDataBase  } from '../../../helpes/functions'
import InputMask from '../../../components/InputsMask'
import { recipeSchema } from '../../../helpes/validations'
import { Title } from './style'
import UseApi from '../../../services/api'
import { successNotification } from '../../../helpes/notification';



const Expenditure = ({handleClose, update})=>{
    const api = UseApi();
    const {state, actions} = useContext(StateContext)
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues:{
            valuerecive:update?.value??'',
            description:update?.decription??''
        },
        validationSchema: recipeSchema,
        onSubmit: async (value)=>{
            setLoading(true)

            let payload = {
                value_ex:setMaxDataUpDataBase(value.valuerecive),
                description_ex:value.description
            }
            if(update?.id){
                payload.id = update.id 
            }

            const response = await update? api.update('expenses',payload, actions):api.insert('expenses',payload, actions)
            
            if(response.length === 0){          
                setLoading(false)
                console.log('Saiu antes de chamar noticficação')
                return ''
            }
            console.log('Chamou noticiação ')
            successNotification(actions,'Ação registrada com sucesso!');
            setLoading(false)
            handleClose(false)

        }
        
    })

    return(
        <Box>
            <Title>{update?'Editar Despesa':'Adicionar Despesa' }</Title>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>

                    <InputMask
                        label="valor"
                        value={maskValueCurrency(formik.values.valuerecive)}
                        mask="currency"
                        onChange={formik.handleChange}
                        name="valuerecive"
                        fullWidth
                        error={(formik.errors.valuerecive && formik.touched.valuerecive)}
                        helperText={formik.errors.valuerecive && formik.touched.valuerecive ? formik.errors.valuerecive:null}
                    />
                    <TextField
                        label="Descrição"
                        name='description'
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        fullWidth
                        rows={5}
                        multiline
                        error={(formik.errors.description && formik.touched.description)}
                        helperText={formik.errors.description && formik.touched.description ? formik.errors.description:null}
                    />
                    <Stack 
                        spacing={3}
                        direction='row'
                        justifyContent='flex-end'
                        
                    >
                        <Button type='submit' variant="outlined" disabled={loading}> {loading? (<CircularProgress size={18} />) : 'Salvar'} </Button>
                        <Button color="error" variant="outlined" disabled={loading} onClick={()=>handleClose(false)}>Cancelar</Button>
                    </Stack>
                </Stack>
            </form>

        </Box>
    )
}
export default Expenditure;