import UseApi from './api';
import { successNotification } from '../helpes/notification'

export const handleDelete = async (props)=>{
    if( window.confirm(props?.messageAlert ? props?.messageAlert :'Deseja realmente remover este item?'))
    {
        const api = UseApi();

        const response = await api.delete(`${props.endPoint}/${props.id}`, props.actions);
        
        if(Object.keys(response).length){          
            successNotification(props.actions, `${props.successMessage} removido com sucesso!`)
        }

        props.actions.setReloadList(true);
        
    }
    
    return''
}