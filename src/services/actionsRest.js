import UseApi from './api';
import { errorNotification, successNotification } from '../helpes/notification'

export const handleDelete = async (id, actions, endPoint, successMessage)=>{
    if( window.confirm('Deseja realmente remover este item?'))
    {
        const api = UseApi();
    
        actions.setIsLoading(true);
        const response = await api.delete(`${endPoint}/${id}`);
        if(response['status']  && response['status'] === 'error'){
            actions.setIsLoading(false);
            errorNotification(actions, 'Ocorreu um erro interno, tente novamente');
            return''
        }
        
        successNotification(actions, `${successMessage} removido com sucesso!`)
    
    }
    
    return''
}