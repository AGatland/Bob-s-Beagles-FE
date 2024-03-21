import { useContext, useState, useEffect } from "react"
import { AuthContext, BasketContext, ProductContext } from "../../../App"
import { Loader } from "@mantine/core"
import { environment } from "../../../environments/environment"
import './style.css'

/*
    TODO: 
        Price on the right should show singular, AND sum based on quantity
        Add and remove copy pasted from Product. Have it elsewhere and pass throug context or props?
*/
function BasketListItem({item}) {
    const basketContext = useContext(BasketContext)
    const productContext = useContext(ProductContext)
    const authContext = useContext(AuthContext)
    const [itemInfo, setItemInfo] = useState({})

    const handleClick = (event) => {
        if (event.target.name === "add") {
            if (basketContext.basket.data && basketContext.basket.data.filter(b => b.sku === item.sku).length === 0)
            {
                fetch(`${environment.apiUrl}basket/${authContext.user.id}`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify({
                        sku: item.sku,
                        quantity: 1
                    })
                })
                basketContext.setBasket({status: "success", data: basketContext.basket.data.map((b) => b.sku === item.sku ? {sku: b.sku, quantity: 1} : b)})
            }
            else if (basketContext.basket.data) {
                let itemQuantity = basketContext.basket.data.filter(b => b.sku === item.sku)
                fetch(`${environment.apiUrl}basket/${authContext.user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify({
                        sku: item.sku,
                        quantity: itemQuantity[0].quantity + 1
                    })
                })
                basketContext.setBasket({status: "success", data: basketContext.basket.data.map((b) => b.sku === item.sku ? {sku: b.sku, quantity: itemQuantity[0].quantity + 1} : b)})
            }
        } else if (event.target.name === "remove") {
            if (basketContext.basket.data.filter(b => b.sku === item.sku)[0].quantity === 1)
            {
                fetch(`${environment.apiUrl}basket/${authContext.user.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        sku: item.sku,
                        quantity: 1
                    })})
                basketContext.setBasket({status: "success", data: basketContext.basket.data.filter((basketItem) => basketItem.sku !== item.sku)}) 
            }
            else if (basketContext.basket.data) {
                let itemQuantity = basketContext.basket.data.filter(b => b.sku === item.sku)
                fetch(`${environment.apiUrl}basket/${authContext.user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                      },
                    body: JSON.stringify({
                        sku: item.sku,
                        quantity: itemQuantity[0].quantity - 1
                    })
                })
                basketContext.setBasket({status: "success", data: basketContext.basket.data.map((b) => b.sku === item.sku ? {sku: b.sku, quantity: itemQuantity[0].quantity - 1} : b)})
            }
        }
    }

    useEffect(() => {
        setItemInfo(productContext.products.filter((p) => p.sku === item.sku))
    }, [item.sku, productContext.products])

    if (!itemInfo[0]) return <Loader color="blue" />;

    return(
        <li className="basket-list-item">
            <p>{itemInfo[0].name}</p>
            <p className="price-container">
                <button name="remove" onClick={handleClick}>-</button> {item.quantity} <button name="add" onClick={handleClick}>+</button> <p>£{itemInfo[0].price}</p> | <p>£{itemInfo[0].price * item.quantity}</p>
            </p>
        </li>
    )
}

export default BasketListItem