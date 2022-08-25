
import { Button } from '@mui/material'
import { Close } from '@mui/icons-material'
import { Container, Content, Header, ViewResult} from './style'
import { useHistory } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import logoEbom from '../../assets/images/ebom-logo.png'
import useApi from '../../services/api';
import { StateContext } from '../../context';



export const PrizeDraw = () => {


    const history = useHistory();
    const api = useApi();
    const { state, actions } = useContext(StateContext);

    const [toView, setToView] = useState(false);
    const [ list, setList ] = useState([]);
    const [ winner, setWinner ] = useState({});
    const [ error, setError ] = useState('')
    const [ listWinners, setListWinners ] = useState([])
 

    const getListDraw = async () => {
        const response =  await api.get(`list-draw`, actions);

        if(response?.clients){ 
            setList(response.clients);
        }

    }

    const backPage = () => {
        history.push('/dashboard');
    }

    const setDraw = () => {
        setToView(false)
        while (true) {
            
            if( list.length > listWinners.length ){

                const draw = list[Math.floor(Math.random() * list.length)]
                
                console.log(draw.id)

                if(listWinners.indexOf(draw.id) === -1)
                {
                    console.log('entrou na condição')
                    setWinner(draw);
                    setListWinners(winner => [...winner, draw.id]);
                    setToView(true)
                    return ''
                }
            } else {            
    
                setError('Não há mais participantes disponível para o sorteio!')
                setToView(true)
                return
            }
        }
    }

    const reSetDraw = () => {
        setToView (false)
    }

    useEffect(()=>{
        getListDraw()
    },[])


    return (
        <Container>
            <Header>
                <img src={logoEbom} alt='Logo Ebom'/>
                <Close onClick={()=>backPage()}/>
            </Header>
            <Content>
                {
                    !toView &&
                    <Button 
                        variant='contained' 
                        size='large'
                        onClick={()=>setDraw()}
                    >
                      Sortear
                    </Button>
                }
                {
                    toView && !error.length > 0 && 
                        <ViewResult className='animateview'>
                            <h2>Ganhador</h2>
                            <h1>{winner.name_client} </h1>
                            <h3>{winner.name_church}</h3>
                            <Button 
                                variant='contained' 
                                color='warning' 
                                size='large'
                                onClick={()=>reSetDraw()}
                            >
                              Sortear novamente
                            </Button>
                        </ViewResult>
                }
                {
                    toView && error.length > 0 &&
                    <ViewResult>
                        <h2>{error}</h2>
                        <Button 
                            variant='contained' 
                            color='warning' 
                            size='large'
                            onClick={()=>reSetDraw()}
                        >
                            Sortear novamente
                        </Button>
                    </ViewResult>
                }
            </Content>
        </Container>
    )
}

