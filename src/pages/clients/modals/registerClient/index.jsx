import {
    Stack,
    FormControlLabel,
    Checkbox,
    TextField,
    MenuItem,
} from '@mui/material'

import { LoadingButton } from '@mui/lab';
import { RegisterContainer } from './style'
import { useFormik } from 'formik';
import { registerClient } from '../../../../helpes/validations';
import { useEffect, useState } from 'react';
import UseApi from '../../../../services/api';
import { StateContext } from '../../../../context';
import { useContext } from 'react';
import { successNotification } from '../../../../helpes/notification';


export function RegisterClient({idUpdate, onClose, onUpdateId}) {

    const api = UseApi();
    const { actions } = useContext( StateContext );
    const [ isShepherd, setIsShepherd ] = useState(false);
    const [ isPaying, setIsPaying ] = useState(false);
    const [ loading, setLoading ] = useState(false);
    const [ churchs, setChurchs ] = useState([]);
    const [ loadingChurchs, setLoadingChurchs ] = useState(false)
 
    const valueFormikDefault = {
        id:'',
        name_client:'',
        id_church:'',
        email:'',
        phone:''
    }

    function handleCloseModal(){
        onClose(false)
    }

    const formik = useFormik({
        initialValues:valueFormikDefault,
        onSubmit: async values =>{
            setLoading(true)
            values.shepherd = isShepherd?1:0;
            values.paying_sale = isPaying?'no':'yes';

            const insertClient = !idUpdate ? 
                                    await api.insert(`clients`,values, actions) 
                                    :
                                    await api.update(`${`clients`}/update/${values.id}`,values, actions);

            if(Object.keys(insertClient).length > 0){          
                const message = !idUpdate ?
                                `Participante cadastrado com sucesso!`
                                :
                                `Participante alterado com sucesso!`; 

                successNotification(actions,message);
                onUpdateId(false)
                actions.setReloadList(true)
                handleCloseModal();

            }
            
            setLoading(false)

        },
        validationSchema: registerClient
    })

    async function getClient () {
        setLoading(true)
        const response = await api.insert('clients/search', {search:'user', value: idUpdate})
        
        if(response){
            const { data : client} = response
            formik.setValues({
                id:client.id,
                name_client:client.name_client,
                id_church:client.id_church,
                email:client.email,
                phone:client.phone
            })

            setIsShepherd(client.shepherd === 1)
            setIsPaying(client.paying_sale==='no')
        }


        setLoading(false)
    }

    const getChurch = async ()=>{
        setLoadingChurchs(true)
        const response = await api.get('church', actions);
        if(Object.keys(response).length === 0){          
            setLoadingChurchs(false)
            return ''
        }
        setChurchs(response.data)
        setLoadingChurchs(false)
    }

    function handleIsShepherd ( element ) {
        setIsShepherd(element.target.checked);
    }

    function handleIsPaying( element ) {
        setIsPaying(element.target.checked);
    }

    useEffect(()=>{
        getChurch();
        formik.resetForm();

        if(idUpdate){
            getClient()
        }
    },[])

    return (
        <RegisterContainer>
            <input type="hidden" name="id" value={formik.values.id}/>
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <Stack direction='row' justifyContent='flex-end'>
                    
                        <FormControlLabel 
                            control={
                                <Checkbox name='shepherd' checked={isShepherd} onChange={handleIsShepherd} disabled={loading}/>
                            } 
                            label="Participante é um pastor?" 
                            sx={{display:'flex', justifyContent:'flex-end', marginTop:"20px", }}
                        />
                        <FormControlLabel 
                            control={
                                <Checkbox name='paying_sale' checked={isPaying} onChange={handleIsPaying} disabled={loading}/>
                            } 
                            label="Participante isendo ?" 
                            sx={{display:'flex', justifyContent:'flex-end', marginTop:"20px", }}
                            disabled={idUpdate}
                        />
                    </Stack>
                    <TextField
                        name="name_client"
                        type="text"
                        label="Nome"
                        fullWidth
                        size='normal'
                        className="inputUser"
                        value={formik.values.name_client}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        helperText={formik.touched.name_client && formik.errors.name_client?formik.errors.name_client:''}
                        error={formik.touched.name_client && formik.errors.name_client}
                        disabled={loading}
                    />

                    <TextField
                        name="email"
                        type="email"
                        label="Email"
                        fullWidth
                        size='normal'
                        className="inputUser"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.touched.email && formik.errors.email}
                        helperText={formik.touched.email && formik.errors.email?formik.errors.email:''}
                        disabled={loading}
                    />

                    <TextField
                        name="phone"
                        type="text"
                        label="Telefone"
                        fullWidth
                        size='normal'
                        className="inputUser"
                        value={formik.values.phone}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && formik.errors.phone}
                        helperText={formik.touched.phone && formik.errors.phone?formik.errors.phone:''}
                        disabled={loading}
                    />


                        
                        <TextField
                            labelId='label-church'
                            label="Igreja"
                            name="id_church"
                            value={formik.values.id_church}
                            onChange={formik.handleChange}
                            error={formik.touched.id_church && formik.errors.id_church}
                            helperText={formik.touched.id_church && formik.errors.id_church?formik.errors.id_church:''}
                            disabled={loadingChurchs||loading}
                            select

                        >
                            <MenuItem value=""></MenuItem>
                            {
                                churchs &&
                                    churchs.map(
                                        church =>(
                                            <MenuItem value={church.id} key={church.id}>{church.name_church}</MenuItem>
                                        )
                                    )
                            }
                        </TextField>
                  
                    <Stack direction='row' justifyContent='flex-end' spacing={3} sx={{paddingTop:'2rem'}}>
                        <LoadingButton type="submit" loading={loading}  variant='outlined'>Salvar</LoadingButton>
                    </Stack>
                </Stack>
            </form>
        </RegisterContainer>
    )
}