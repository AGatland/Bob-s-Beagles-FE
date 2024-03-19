import { useContext, useState, useEffect } from "react"
import { ProductContext } from "../../../App"
import { Loader } from "@mantine/core"

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
            <p>{itemInfo[0].price}</p>
        </li>
    )
}

export default BasketListItem