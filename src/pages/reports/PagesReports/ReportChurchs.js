import { useContext, useEffect, useState } from "react"
import UseApi from '../../../services/api'
import { StateContext } from '../../../context'
import {
    Stack, 
    Select, 
    FormControl, 
    MenuItem , 
    InputLabel, 
    Button
} from '@mui/material';
import Typography  from '@mui/material/Typography';
import { paramsSystem } from "../../../helpes/paramsSystem";
import Loading from "../../../components/Loading";

export const ReportChurchs = () => {
    const api = UseApi();
    const { actions } = useContext(StateContext);
    
    const [ churchs, setChurchs ] = useState([]);
    const [ selectOption, setSelectOption ]= useState('');
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false)
    

    const getChurchs = async ()=>{
        const response = await api.get('church', actions);
        
        if(Object.keys(response.data).length > 0){ 
            setChurchs(response.data);
            setLoading(false)
            return ''
        }

        setLoading(false)
        setError(true)

    }



    useEffect(()=>{
        getChurchs()
    },[])

    return (
        <>
            {
                !loading &&
                    <Stack spacing={4}>
                        <Typography variant='h6'> Selecione uma congregação  </Typography>
                        {
                            !error &&
                            <>
                                <FormControl fullWidth>
                                    <InputLabel id="name-congregation">Congregação</InputLabel>
                                    <Select
                                        labelId="name-congregation"
                                        label='Congregação'
                                        value={selectOption}
                                        onChange={(e) => setSelectOption(e.target.value)}
                                    >
                                        <MenuItem value='all'>Todas</MenuItem>
                                        {
                                            churchs &&
                                            churchs.map(church => (
                                                <MenuItem value={church.id}>{church.name_church}</MenuItem>
                                            ))
                                        }
                    
                                    </Select>
                                </FormControl>
                                <Button variant='contained' onClick={() => { window.open(`${paramsSystem.URLBASE}reports?report=congregation&idchur=${selectOption}`, '_blank') }}>Gerar relatório</Button>
                            </>
                        }

                        {
                            error &&
                                <Typography variant='h6' sx={{textAlign:'center'}}>
                                    Ocorre um erro não foi possivel carregar a lista de congregações <br/>
                                    Tente novamente!
                                </Typography>
                        }
                    </Stack>  
            }
            {
                loading &&
                    <Loading/>
            }

        
        </>
    )
}