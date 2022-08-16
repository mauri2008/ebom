import { NavLink } from 'react-router-dom';
import {
    Nav,

} from './style';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import CalculateIcon from '@mui/icons-material/Calculate';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import Person from '@mui/icons-material/Person';
import AssignmentInd  from '@mui/icons-material/AssignmentInd';
import Church from '@mui/icons-material/Church';
import LoyaltyIcon from '@mui/icons-material/Loyalty';


const itensMenu = [
    {
        title:'Dashboard',
        link:'/dashboard',
        icon: <DashboardIcon/>
    },
    {
        title:'Participantes',
        link:'/participantes',
        icon: <AssignmentInd/>
    },
    {
        title:'Compras',
        link:'/compras',
        icon: <LoyaltyIcon/>
    },
    {
        title:'Congregações',
        link:'/igrejas',
        icon: <Church/>
    },
    {
        title:'Financeiro',
        link:'/financeiro',
        icon: <CalculateIcon/>
    },
    {
        title:'Relatórios',
        link:'/relatorios',
        icon: <FactCheckIcon/>
    },
    {
        title:'Usuários',
        link:'/usuarios',
        icon: <Person/>
    },
]


const Menu = () =>{
    return (
        <Nav>
            <ul>
                {
                    itensMenu.map(item =>(
                        <li>
                            <NavLink 
                                to={item.link}
                                className={isActive =>`${isActive ? 'select':''}`}
                            >
                            {item.icon}
                            {item.title}
                            </NavLink>
                        </li> 
                    ))
                }
            </ul>       
        </Nav>
    )
}

export default Menu;