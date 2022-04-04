
const setNotification = (actions, text)=>{
    actions.setIsError({
        status:true,
        text,
        type:'error'
    })
    return ''
}

const setSuccessNotification = (actions, text) =>{
    actions.setIsError({
        status:true,
        text,
        type:'success'
    })
    return ''
}

const setNullNotification = (actions)=>{
    actions.setIsError({
        status:false,
        text:'',
        type:''
    })
    return ''
}

export const errorNotification = (actions, text) =>{
    setNotification(actions, text);
    setTimeout(() => {
        setNullNotification(actions)
    }, 1000);
    return '';
}

export const successNotification = (actions, text)=>{
    setSuccessNotification(actions, text)
    setTimeout(() => {
        setNullNotification(actions)
    }, 1000);
    return ''
}
