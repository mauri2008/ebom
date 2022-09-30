
import {
    ContainerPrint,
    ToolsPrint,
    InputStart,
    SectionPrint,
    Codes
} from './style';
import { TextField } from '@mui/material'
import { Print } from '@mui/icons-material'
import { useState } from 'react';
import QRCode from 'react-qr-code'
import { useEffect } from 'react';
import { paramsSystem } from '../../../../helpes/paramsSystem';


export function PrintQrcode ({ clients , onclose}) {

    const [ printPosition, setPrintPosition ] = useState(0);


    function handleSetPostion ( event ) {
        const position = event.target.value ;
        if( position >= 0 && position <= 20 ) {
            setPrintPosition(position);
        }
    }

    function contentQrcode ( client ) {
        console.log('Clients',client)
        return(
            <Codes key={client.id}> 
                <p>{client.name}</p>
                <QRCode value={client.id.toString()} size={90} title='Qrcode'/>
            </Codes>
        )
    }
    

    function RenderListQrcode () {
           
        const countQrcodes =  clients.length;

        const countQrcodesAndPositionPrint = parseInt(countQrcodes)+parseInt(printPosition);

        if(countQrcodesAndPositionPrint > 21)
        {
            return '';
        } 

        let pointerCode = 0
        let container = [];
        for (let i = 0 ; i < 21; i++ )
        {        
            if (i >= printPosition && pointerCode < countQrcodes) {
                container.push(contentQrcode(clients[pointerCode]));
                pointerCode = pointerCode + 1;
                console.log(pointerCode)
            }else{
                container.push(<Codes></Codes>)
            }

        }
        return container
    }

    async function handlePrintPage () {
        try{
            const listIdClient = clients.map(client => client.id)
            
            const url = `clients/print?ids=${JSON.stringify(listIdClient)}&initialposition=${printPosition}`;

            window.open(`${paramsSystem.URLBASE}${url}`)
           
            onclose()
            
        }catch(error){
            console.log(error)
        }
    }

    useEffect(()=>{
        RenderListQrcode()
    },[ printPosition ])

    return (
        <ContainerPrint >
            <ToolsPrint className='no-print'>
                <InputStart>
                    <TextField
                        id="outlined-number"
                        label="Number"
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        size='small'
                        value={printPosition}
                        onChange={handleSetPostion}
                        helperText='Range de posições: 0 - 21'
                    />      
                    <Print onClick={handlePrintPage}/>
                </InputStart>
                
            </ToolsPrint>
            <SectionPrint className='print'>
                { RenderListQrcode() }
            </SectionPrint>                   
        </ContainerPrint>
    )
}