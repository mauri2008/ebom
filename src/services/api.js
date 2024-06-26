import {AlertError} from './alertError';
import { paramsSystem } from '../helpes/paramsSystem';
 
const apiFetch = async (endpoint, body, method, actions) =>{
        
    try{
        const token = sessionStorage.getItem('token');

        const params = {
          method,
          headers:{
              'Accept': 'aplication/json',
              'Content-Type':'application/json',
              'Authorization':`Bearer ${token}`
          }
        }

        if(method.toUpperCase() !== 'GET')
        {
          params.body = JSON.stringify(body)
        }

        const res= await fetch(paramsSystem.URLBASE+endpoint,params)
        const responseJson = await res.json()

        const responseStatus = {
          200: responseJson,
          400: responseJson?.message??'Ocorreu um erro interno Tente novamente',
          404: 'Elemento requisitado Não encontrado',
          500: 'Ocorreu um erro interno, Tente novamente'
        }

        const status = await res.status;
        if(status === 200)
          return responseStatus[status];
        
        if(status !== 204){
          AlertError(actions, responseStatus[status])
          return ''
        }


     }catch(error){
        AlertError(actions, 'Ocorreu um erro No servidor tente novamente')
        return '';
     }
}

const apiFetchLogin = async(endpoint, body)=>{
    try{
      const res = await fetch(paramsSystem.URLBASE+endpoint,{
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type':'application/json',
        },       
        body:JSON.stringify(body)
      })
      const status = await res.status;
      const json = (status === 200)? await res.json():{status:'error', msg:res.message};
      return json;
    }catch(error){
      return {status:'error', msg:"Error no sistema tente novamente!"};
    }
  
  }

const API = {
    login: async (email, password) =>{
        const response = await apiFetchLogin(
            'users/login',
            {email,password}
        );
        return response;
    },
    get: async(endpoint, action )=>{
      const response = await apiFetch(
        endpoint,
        '',
        'get',
        action
      )
      return response;
    },
    insert:async(endpoint,data,action)=>{
      const response = await apiFetch(
        endpoint,
        data,
        'post',
        action
      )
      return response;
    },
    update:async(endpoint,data,action)=>{
      const response = await apiFetch(
        endpoint,
        data,
        'put',
        action
      )
      return response;
    },
    delete:async(endpoint, action)=>{
      const response = await apiFetch(
        endpoint,
        '',
        'delete', 
        action
      )
      return response;
    },
  

}

export default ()=>API;
