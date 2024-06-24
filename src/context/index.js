import React, { useState } from 'react';

const initialState = {
    user:{
        nome:'',
        email:'',
        token:''
    },
    isError:{
        status:false,
        text:'',
        type:'default'
    },
    loading: false,
    reloadlist:false
}

export const StateContext = React.createContext(
    {
        state:initialState,
        actions:{
            setUser:() => {},
            setIsError:() => {},
            setIsLoading:() => {}
        }
    }
);

const setUser = (state, setState, user) => {
    setState({ user })
}

const setIsError = (state, setState, isError) =>{
    setState({ isError })
}

const setIsLoading = (state, setState, loading) =>{
    setState({ loading } )
}

const setReloadList= (state, setState, reloadlist) =>{
    setState({ reloadlist } )
}


export const Context = props => {
    const [state, _setState] = useState(initialState)

    const setState = (_state) => {
        const newState = {...state, ..._state}
        _setState(newState)
    }

    const actions = {
        setUser: setUser.bind(null, state, setState),
        setIsError: setIsError.bind(null, state, setState),
        setIsLoading: setIsLoading.bind(null, state, setState),
        setReloadList: setReloadList.bind(null, state, setState)
    }

    return(
        <StateContext.Provider value={{ state, actions }}>
            {props.children}
        </StateContext.Provider>
    )
}