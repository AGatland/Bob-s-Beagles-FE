import BasketListItem from "./BasketListItem"
import './style.css'
import { useContext, useState, useEffect } from "react"
import { ProductContext } from "../../App"

function BasketList({basket, setBasket}) {
    const productContext = useContext(ProductContext)
    const [total, setTotal] = useState(0.0)

    useEffect (() => {
        if (basket){
        let tempTotal = 0
        basket.forEach(b => {
            let item = productContext.products.filter((product) => product.sku === b.sku)
            if(item[0]) tempTotal += item[0].price * b.quantity
        })
        setTotal(Math.round(tempTotal * 100) / 100)}
    }, [basket, productContext.products])

    return(
        <ul className="basket-list">
            {basket && basket.map((item, index) => (
                <BasketListItem key={index} item={item} setBasket={setBasket} basket={basket}></BasketListItem>
            ))}
            <li>
                <p>Total:</p> 
                <p>£{total}</p>
            </li>
        </ul>
    )
}

export default BasketList