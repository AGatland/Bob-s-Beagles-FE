import './style.css'
import { IconHome, IconDogBowl, IconUser, IconShoppingCart, IconSettings } from '@tabler/icons-react'

function Sidebar() {
    return(
        <nav>
            <button>
                <IconHome></IconHome>
                Home
            </button>
            <button>
                <IconDogBowl></IconDogBowl>
                Products
            </button>
            <button>
                <IconShoppingCart></IconShoppingCart>
                Basket
            </button>
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