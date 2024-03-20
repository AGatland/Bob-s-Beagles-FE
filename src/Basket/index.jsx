import { useContext } from "react"
import BasketList from "./BasketList"
import { BasketContext } from "../App"
import './style.css'

function Basket() {
    const basketContext = useContext(BasketContext)

    /*
        TODO: Place order on button click
    */

    return(
        <div className="basket">
            <h1>Basket</h1>
            <BasketList basket={basketContext.basket.data} setBasket={basketContext.setBasket}></BasketList>
            <button>Place order</button>
        </div>
    )
}

export default Basket