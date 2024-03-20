import { useContext, useEffect } from "react"
import BasketList from "./BasketList"
import { environment } from "../environments/environment"
import { AuthContext, BasketContext } from "../App"
import './style.css'
import { useNavigate } from "react-router-dom"

function Basket() {
    const basketContext = useContext(BasketContext)
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    /*
        TODO: Add id for requesting from API once user login is here
    */
    useEffect(() => {
        if (authContext.user)
        {
            fetch(`${environment.apiUrl}basket`, {
            Method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then(response => response.json())
            .then(basketContext.setBasket)
        }
        if (!authContext.user) navigate("/login")
    }, [authContext.user])
    return(
        <div className="basket">
            <h1>Basket</h1>
            <BasketList basket={basketContext.basket} setBasket={basketContext.setBasket}></BasketList>
            <button>Place order</button>
        </div>
    )
}

export default Basket