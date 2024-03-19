import { useContext, useState, useEffect } from "react"
import { ProductContext } from "../../../App"
import { Loader } from "@mantine/core"
import { environment } from "../../../environments/environment"


/*
    TODO: Make + and - buttons functional
        If multiple of same item in basket, show once with correct quantity number
        Price on the right should show singular, AND sum based on quantity
*/
function BasketListItem({item}) {
    const productContext = useContext(ProductContext)
    const [itemInfo, setItemInfo] = useState({})

    useEffect(() => {
        setItemInfo(productContext.products.filter((p) => p.sku === item.sku))
    }, [])

    if (!itemInfo[0]) return <Loader color="blue" />;

    return(
        <li className="basket-list-item">
            <p>{itemInfo[0].name}</p>
            <p>
                <button name="remove">-</button> {item.quantity} <button name="add">+</button> {itemInfo[0].price}
            </p>
        </li>
    )
}

export default BasketListItem