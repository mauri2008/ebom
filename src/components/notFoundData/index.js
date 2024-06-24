import {
    Container
} from './style'
import ImgNoData from '../../assets/images/nodata.png'
export default function NotFoundData(){
    return(
        <Container>
            <img src={ImgNoData} alt='nenhum dados encontrado'/>
            <h3>Nenhum dados foi encontrado!</h3>
        </Container>
    )
}