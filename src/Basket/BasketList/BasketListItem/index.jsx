import { useContext, useState, useEffect } from "react"
import { BasketContext, ProductContext } from "../../../App"
import { Loader } from "@mantine/core"
import { environment } from "../../../environments/environment"


/*
    TODO: Make + and - buttons functional
        If multiple of same item in basket, show once with correct quantity number
        Price on the right should show singular, AND sum based on quantity
        Add and remove copy pasted from Product. Have it elsewhere and pass throug context or props?
*/
function BasketListItem({item}) {
    const basketContext = useContext(BasketContext)
    const productContext = useContext(ProductContext)
    const [itemInfo, setItemInfo] = useState({})

    const handleClick = (event) => {
        if (event.target.name === "add") {
            if (basketContext.basket.filter(b => b.sku === item.sku).length === 0)
            {
                fetch(`${environment.apiUrl}basket/123${product.sku}`, {
                    method: 'POST',
                    header: [{'Content-Type': 'application/json'}],
                    body: JSON.stringify({
                        id: "123" + item.sku, /* To stop json-server from creating id */
                        userId: "123",
                        sku: item.sku,
                        quantity: 1
                    })
                })
                basketContext.setBasket([...basketContext.basket, {
                    id: "123" + item.sku, /* To stop json-server from creating id */
                    userId: "123",
                    sku: item.sku,
                    quantity: 1
                }]) 
            }
            else {
                /*
                    TODO: EDIT ID so it's not a hardcoded placeholder but comes from the url!!
                */
                let itemQuantity = basketContext.basket.filter(b => b.sku === item.sku)
                fetch(`${environment.apiUrl}basket/123${item.sku}`, {
                    method: 'PUT',
                    header: [{'Content-Type': 'application/json'}],
                    body: JSON.stringify({
                        id: "123" + item.sku, /* To stop json-server from creating id */
                        userId: "123",
                        sku: item.sku,
                        quantity: itemQuantity[0].quantity + 1
                    })
                })
                basketContext.setBasket([...basketContext.basket, {
                    id: "123" + item.sku, /* To stop json-server from creating id */
                    userId: "123",
                    sku: item.sku,
                    quantity: 1
                }])
            }
        } else if (event.target.name === "remove") {
            if (basketContext.basket.filter(b => b.sku === item.sku)[0].quantity === 1)
            {
                fetch(`${environment.apiUrl}basket/123${item.sku}`, {
                    method: 'DELETE',
                    header: [{'Content-Type': 'application/json'}]
                })
                basketContext.setBasket(basketContext.basket.filter((basketItem) => basketItem.sku !== item.sku)) 
            }
            else {
                /*
                    TODO: EDIT ID so it's not a hardcoded placeholder but comes from the url!!
                */
                let itemQuantity = basketContext.basket.filter(b => b.sku === item.sku)
                fetch(`${environment.apiUrl}basket/123${item.sku}`, {
                    method: 'PUT',
                    header: [{'Content-Type': 'application/json'}],
                    body: JSON.stringify({
                        id: "123" + item.sku, /* To stop json-server from creating id */
                        userId: "123",
                        sku: item.sku,
                        quantity: itemQuantity[0].quantity - 1
                    })
                })
                basketContext.setBasket([...basketContext.basket, {
                    id: "123" + item.sku, /* To stop json-server from creating id */
                    userId: "123",
                    sku: item.sku,
                    quantity: 1
                }])
            }
        }
    }

    useEffect(() => {
        setItemInfo(productContext.products.filter((p) => p.sku === item.sku))
    }, [])

    if (!itemInfo[0]) return <Loader color="blue" />;

    return(
        <li className="basket-list-item">
            <p>{itemInfo[0].name}</p>
            <p>
                <button name="remove" onClick={handleClick}>-</button> {item.quantity} <button name="add" onClick={handleClick}>+</button> {itemInfo[0].price}
            </p>
        </li>
    )
}

export default BasketListItem