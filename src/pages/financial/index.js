import React, { useState, useEffect, useContext } from  'react'

import PriceCheck from '@mui/icons-material/PriceCheck';
import MonetizationOn from '@mui/icons-material/MonetizationOn';

import Header from '../../components/header';
import Cards from '../../components/cardBoard';
import CurrencyExchange from '@mui/icons-material/CurrencyExchange';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal'
import AccountCircle from '@mui/icons-material/AccountCircle';
import PointOfSale from '@mui/icons-material/PointOfSale';
import Add from '@mui/icons-material/Add';
import Close from '@mui/icons-material/Close'

import { errorNotification, successNotification } from '../../helpes/notification';
import { setDataTable, updateLabelDateInBr, updateDataGrid } from '../../helpes/functions'

import UseApi from '../../services/api';
import { StateContext } from '../../context';
import { currencyFormat } from '../../helpes/functions'

import MoneyOffCsredIcon from '@mui/icons-material/MoneyOffCsred';
import Loading from '../../components/Loading'
import CircularLoading from '../../components/circularLoad'
import Table from '../../components/Table'
import NotFoundData from '../../components/notFoundData'

import BoxModal from '../../components/boxModal'
import FormExpenditure from './Forms/expenditure';
import FormRecipe from './Forms/recipe';

import {
    Container,
    CardsInfo,
    ContentTable,
    ContentButtom

} from './style';
import { getValue } from '@testing-library/user-event/dist/utils';

const Financial = ()=>{


    const api = UseApi()
    const {state, actions} = useContext(StateContext)

    const [valueInfo, setValueInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expenses, setExpenses] = useState([]);
    const [donations, setDonations] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [controlForm, setControlForm] = useState('recipe')
    const [pagesExpenses, setPagesExpenses] = useState(0)
    const [pagesDonations, setPagesDonations] = useState(0);
    const [pageNowExpense, setPageNowExpense] =  useState(1);
    const [pageNowDonations, setPageNowDonations] =  useState(1);

    const getValues = async (url) =>{
        const response = await api.get(url, actions)
        if(Object.keys(response).length === 0){          
            setLoading(false)
            return false
        }
        return response
    }
    
    const getStatusFinancial =  async () => {
        
        const statusFinan = await getValues('sales')
        if(statusFinan) 
            setValueInfo(statusFinan.data)          
        setLoading(false)
    }

    const getListExtense = async (search = false, page='all') => {
        setLoading(true)
        const offset = (pageNowExpense-1)*10;
        const listExt = await getValues(!search?`expenses/${offset}`:``)
        if(listExt){
            const dataExt = updateLabelDateInBr(listExt.data, 'created_at')

            setExpenses(setDataTable(dataExt,
                [            
                    {key:'id', title:'id'},
                    {key:'description', title:'Descrição'},
                    {key:'value', title:'Valor'},
                    {key:'created_at', title:'Data de Lançamento'},
                    {key:'added_by', title:'Adicionado por'}, 
                ]
                ))
            setPagesExpenses(listExt.pages)
        }
        setLoading(false)
    }

    const getListDonations = async (search = false , page = 'all') => {
         setLoading(true);
         const offset = (pageNowDonations-1)*10;
         const listBal = await getValues(!search?`donations/${offset}`:``);
         
         if(listBal){
             const dataBal = updateDataGrid(listBal.data,
                [
                    {action:'data', object:'created_at'},
                    {action:'current', object:'value_dn'},
                ]);

             setDonations(setDataTable(dataBal,[
                {key:'id',title:'id'},
                {key:'description_dn',title:'Descrição'}, 
                {key:'value_dn',title:'Valor'}, 
                {key:'created_at',title:'Data Criação'}, 
                {key:'added_at',title:'Adicionado por'}, 
             ]))
            setPagesDonations(listBal.pages)
         }
         setLoading(false);
    }

    const valuesCards = [
        {
            icon:PriceCheck,
            title:'Titulos em Aberto',
            subTitle:currencyFormat((valueInfo && valueInfo.open_sale) ?? 0),
            color:'#ff9922'
        },
        {
            icon:AccountCircle,
            title:'Ingressos',
            subTitle:currencyFormat((valueInfo && valueInfo.close_sale) ?? 0),
            color:'#339933'
        },
        {
            icon:MonetizationOn,
            title:'Doações',
            subTitle:currencyFormat((valueInfo && valueInfo.donations) ?? 0),
            color:'#339933'
        },
        {
            icon:CurrencyExchange,
            title:'Despesas',
            subTitle:currencyFormat((valueInfo && valueInfo.expense) ?? 0),
            color:'#ff3333'
        },
        {
            icon:PointOfSale,
            title:'Saldo',
            subTitle:currencyFormat((valueInfo && valueInfo.balance) ?? 0),
            color:'#ff3333'
        }


    ]


    const handleOpenModal = (form)=>{
        setControlForm(form)
        setOpenModal(true);
    }

    const setForms = {
        recipe: <FormRecipe handleClose={setOpenModal.bind(false)}/>,
        expenditure: <FormExpenditure handleClose={setOpenModal.bind(false)}/>
    }

    useEffect(()=>{
        getStatusFinancial()
        getListExtense()
        getListDonations()
    },[openModal])
    


    // useEffect(()=>{
    //     getListExtense(false, pageNowExpense)
    // },[pageNowExpense])



    return (
        <Container>
            <Header 
                title='Financeiro' 
                titleButton='Adicionar Despesa'
                handleShowModal={()=>handleOpenModal('expenditure')}
                IconButton={MoneyOffCsredIcon} 
                colorButton='error'        
            />

            <CardsInfo>
            {                
                valuesCards.map((value, index)=>(
                    <Cards
                        key={`${index}-${value.title}`}
                        Icon={value.icon}
                        title={value.title}
                        subtitle={value.subTitle}
                        colorIcon={value.color}
                        loading={loading}
                        
                    />
                ))
            }
            </CardsInfo>

            <Stack spacing={3}>
                <ContentTable >
                    <h3>Lista de despesas</h3>
                    {
                        loading &&
                            <CircularLoading/>
                    }
                    {
                        (!loading && expenses.length > 0) &&
                        <Table 
                            data={expenses}
                            countPagination={pagesExpenses}
                            page={pagesExpenses}
                            handlePagination={(event, value)=>setPageNowExpense(value)}
                        />
                    }
                    {
                        (!loading && expenses.length === 0 )&&
                            <>
                                <NotFoundData />
                            </>
                    }
                </ContentTable>
                <ContentButtom>
                    <Button  onClick={()=>handleOpenModal('recipe')} ><Add /> Adicionar Receira </Button>
                </ContentButtom>

                <ContentTable >
                    <h3>Lista de Receitas</h3>
                    {
                        loading &&
                        <CircularLoading/>
                    }

                    {(!loading && donations.length > 0) &&
                        <Table 
                            data={donations}
                            countPagination={pagesDonations}
                            page={pagesDonations}
                            handlePagination={(event, value)=>setPageNowExpense(value)}
                        />
                    }
                        {
                        (!loading && donations.length === 0) &&
                            <>
                                <NotFoundData />
                            </>
                    }
                </ContentTable>                    
                
            </Stack>

            <Modal 
                open={openModal}
            >
                <BoxModal handleClose={setOpenModal.bind()}>
                    {setForms[controlForm]}
                </BoxModal>
            </Modal>

        </Container>
    )
}

export default Financial;