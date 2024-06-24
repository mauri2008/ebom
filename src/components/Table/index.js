import * as C from './style'
import Pagination from '../../components/pagination';

import Head from './head'
import Rows from './rows'


const Table = (
    {   data, 
        head ,
        handleDelete, 
        handleUpdate, 
        handleView, 
        handleQrCode,
        handleDownPay,
        countPagination,
        page,
        handlePagination,
        endpoint
    })=>{

    const blackList =[
        'paidout',
    ]
    
    const objectkeys = Object.keys(data[0]);
    const keys = objectkeys.filter(key => !blackList.includes(key))


    const actions = {
        handleDelete:handleDelete, 
        handleUpdate:handleUpdate,
        handleView:handleView, 
        handleQrCode:handleQrCode,
        handleDownPay:handleDownPay
    }

    return(
        <C.Container>
            <C.Table>
                <Head keys={keys} head={head} handleQrCode={handleQrCode}/>
                <tbody>
                    {
                        data.map((record, index )=> <Rows key={`row-${index}`} record={record}  actions={actions} endpoint={endpoint}/>)
                    }
                </tbody>
            </C.Table>
            {
                countPagination > 0 &&
                    <Pagination  count={countPagination} page={page} handleChange={handlePagination.bind(this)} />
            }
        </C.Container>
    );
}

export default Table;