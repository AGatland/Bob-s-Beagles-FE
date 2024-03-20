import { IconDog } from '@tabler/icons-react'
import './style.css'
import UserIcon from "../UserIcon"

function Header() {
    return(
        <header>
            <div className='title-box'>
                <h1>Bob&apos;s Beagles</h1>
                <IconDog></IconDog>
            </div>
            <UserIcon />
        </header>
    )
}

export default Header