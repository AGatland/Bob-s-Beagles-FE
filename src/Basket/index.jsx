import { useContext, useEffect } from "react"
import BasketList from "./BasketList"
import { environment } from "../environments/environment"
import { BasketContext } from "../App"
import './style.css'

function Basket() {
    const basketContext = useContext(BasketContext)

    /*
        TODO: Add id for requesting from API once user login is here
    */
    useEffect(() => {
        fetch(`${environment.apiUrl}basket`)
        .then(response => response.json())
        .then(basketContext.setBasket)
    })
    return(
        <div className="basket">
            <h1>Basket</h1>
            <BasketList basket={basketContext.basket}></BasketList>
            <button>Place order</button>
        </div>
    )
}

export default Basket