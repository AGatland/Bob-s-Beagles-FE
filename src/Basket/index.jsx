import { useContext, useState } from "react"
import BasketList from "./BasketList"
import { AuthContext, BasketContext } from "../App"
import './style.css'
import { environment } from "../environments/environment"
import { useNavigate } from "react-router-dom"

function Basket() {
    const basketContext = useContext(BasketContext)
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const [order, setOrder] = useState({})

    const handleClick = async (event) => {
        if(authContext.user)
        {
            const responseOrder = await fetch(`${environment.apiUrl}users/${authContext.user.id}/orders`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: authContext.user.id,
                        products: basketContext.basket.data
                    })
                }
            )
            const order = await responseOrder.json()
            setOrder(order)
            navigate(`/users/${authContext.user.id}/orders/${order.data.id}`)
        }

    }

    return(
        <div className="basket">
            <h1>Basket</h1>
            <BasketList basket={basketContext.basket.data} setBasket={basketContext.setBasket}></BasketList>
            <button className="place-order" onClick={handleClick}>Place order</button>
        </div>
    )
}

export default Basket