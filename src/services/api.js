import React, { useContext } from "react";
import { StateContext } from "../context"
const BASEAPI = "http://127.0.0.1:8000/api/";


const apiFetch = async (endpoint, body, method) =>{
        
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

        const res= await fetch(BASEAPI+endpoint,params)

        const status = await res.status;
        const json = (status === 200)? await res.json():{status:'error', message:'Ocorreu um erro no sistema! tente novamente'};
        return (status === 204)?'' :json;

     }catch(error){
        return {status:'error', message:"Error no sistema tente novamente!", error};
     }
}

const apiFetchLogin = async(endpoint, body)=>{
    try{
      const res = await fetch(BASEAPI+endpoint,{
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
    get: async(endpoint)=>{
      const response = await apiFetch(
        endpoint,
        '',
        'get'
      )
      return response;
    },
    insert:async(endpoint,data)=>{
      const response = await apiFetch(
        endpoint,
        data,
        'post'
      )
      return response;
    },
    update:async(endpoint,data)=>{
      const response = await apiFetch(
        endpoint,
        data,
        'put'
      )
      return response;
    },
    delete:async(endpoint)=>{
      const response = await apiFetch(
        endpoint,
        '',
        'delete'
      )
      return response;
    },
  

}

export default ()=>API;
