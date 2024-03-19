import BasketListItem from "./BasketListItem"
import './style.css'
import { useContext, useState, useEffect } from "react"
import { ProductContext } from "../../App"

function BasketList({basket}) {
    const productContext = useContext(ProductContext)
    const [total, setTotal] = useState(0.0)

    useEffect (() => {
        let tempTotal = 0
        basket.forEach(b => {
            let item = productContext.products.filter((product) => product.sku === b.sku)
            if(item[0]) tempTotal += item[0].price * b.quantity
        })
        setTotal(tempTotal)
    }, [basket])

    return(
        <ul className="basket-list">
            {basket.map((item, index) => (
                <BasketListItem key={index} item={item}></BasketListItem>
            ))}
            <li>
                <p>Total:</p> 
                <p>{total}</p>
            </li>
        </ul>
    )
}

export default BasketList