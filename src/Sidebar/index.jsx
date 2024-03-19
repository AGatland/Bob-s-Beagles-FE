import { Link } from 'react-router-dom'
import './style.css'
import { IconHome, IconDogBowl, IconUser, IconShoppingCart, IconSettings } from '@tabler/icons-react'

function Sidebar() {
    return(
        <nav>
            <Link to="/">
                <button>
                    <IconHome></IconHome>
                    Home
                </button>
            </Link>
            <Link to="/products">
                <button>
                    <IconDogBowl></IconDogBowl>
                    Products
                </button>
            </Link>
            <Link to="/basket">
                <button>
                    <IconShoppingCart></IconShoppingCart>
                    Basket
                </button>
            </Link>
            <button>
                <IconUser></IconUser>
                Login
            </button>
            <button>
                <IconSettings></IconSettings>
                Settings
            </button>
        </nav>
    )
}

export default Sidebar