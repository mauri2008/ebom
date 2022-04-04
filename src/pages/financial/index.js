import React from  'react'

import PriceCheck from '@mui/icons-material/PriceCheck';
import MonetizationOn from '@mui/icons-material/MonetizationOn';

import Header from '../../components/header'
import Cards from '../../components/cardBoard'
import CurrencyExchange from '@mui/icons-material/CurrencyExchange';
import PointOfSale from '@mui/icons-material/PointOfSale';

import {
    Container,
    CardsInfo
} from './style';

const Financial = ()=>{
    return (
        <Container>
            <Header 
                title='Financeiro'           
            />

            <CardsInfo>
                <Cards
                    Icon={PriceCheck}
                    title="Titulos em Aberto"
                    subtitle="R$ 120"
                    colorIcon='#ff9922'
                />
                <Cards
                    Icon={MonetizationOn}
                    title="Receita"
                    subtitle="R$ 120"
                    colorIcon='#339933'
                />
                <Cards
                    Icon={CurrencyExchange}
                    title="Despesas"
                    subtitle="- R$ 120"
                    colorIcon='#ff3333'
                />
                <Cards
                    Icon={PointOfSale}
                    title="Saldo"
                    subtitle="R$ 120"
                    
                />
            </CardsInfo>

        </Container>
    )
}

export default Financial;