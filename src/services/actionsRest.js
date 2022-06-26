import UseApi from './api';
import { errorNotification, successNotification } from '../helpes/notification'

export const handleDelete = async (id, actions, endPoint, successMessage)=>{
    if( window.confirm('Deseja realmente remover este item?'))
    {
        const api = UseApi();

        const response = await api.delete(`${endPoint}/${id}`, actions);
        
        if(Object.keys(response).length === 0){          
            return ''
        }
        
        successNotification(actions, `${successMessage} removido com sucesso!`)
    
    }
    
    return''
}