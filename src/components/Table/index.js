import * as C from './style'
import DeleteForever from '@mui/icons-material/DeleteForever'
import Edit from '@mui/icons-material/Edit'

const Row = ({record ,handleDelete, handleUpdate, handleView , handleQrCode}) =>{
    const keys  = Object.keys(record)
    return (
        <tr key={record.id}>
            {
                handleQrCode &&
                <td>
                    <input type="checkbox" name='selectQrCode' value={record.id} onChange={check=> handleQrCode(check)}/>
                </td>
            }
            {
                keys.map(key => {
                    if(key ==='tumber'){
                        return <td key={key}><img src={record[key]} alt='Tumber'/></td>
                    }else{

                        return <td key={key}>{record[key]}</td>
                    }
                })

            }
            <td>
            {
                handleView &&
                    <a to={`${handleView}/${record.id||0}`}>ver</a>
            }
            {
                handleUpdate &&
                    <a to="#" onClick={()=>handleUpdate(record.id||0)} title="Editar" style={{color:'orange'}}><Edit/></a>
            }
            {
                handleDelete &&
                    <a onClick={()=>handleDelete(record.id||0)} title="Remover" style={{color:'red', marginLeft:10}}><DeleteForever/></a>
            }
            </td>
        </tr>
    )
}


const Head = ({keys, head}) => {
    const tableHead = head || {}
    return(
        <thead>
            <tr>
                {keys.map(key=><th key={key}>{tableHead[key] || key}</th>)}
            </tr>
        </thead>
    )
}

const Table = ({data, head ,handleDelete, handleUpdate, handleView, handleQrCode})=>{

    
    const keys = Object.keys(data[0]);
    return(

        <C.Container>
            <C.Table>
                <Head keys={keys} head={head}/>
                <tbody>

                    {
                        data.map(record => <Row key={record.id} record={record} handleDelete={handleDelete} handleUpdate={handleUpdate} handleView={handleView} handleQrCode={handleQrCode}/>)
                    }
                </tbody>
            </C.Table>
            
        </C.Container>
    );
}

export default Table;