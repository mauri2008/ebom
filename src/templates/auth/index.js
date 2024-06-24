import React, { useContext, useEffect } from 'react';
import {  StateContext } from '../../context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AuthLayout({children}) {

    const {state, actions} = useContext(StateContext);

    const notify = (params)=> toast[params.type](
      params.text,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
  
    useEffect(()=>{
      if(state.isError.status){
          console.log('chamada interna')
       notify({type:state.isError.type, text: state.isError.text})
      }
      console.log('App', state.isError)
    },[state.isError]);
  


    return (
        
        <div>
            <ToastContainer/>
            {children}
        </div>
    )
}