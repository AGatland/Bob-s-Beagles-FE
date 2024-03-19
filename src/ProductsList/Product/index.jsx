import { useContext } from 'react'
import './style.css'
import { BasketContext } from '../../App'
import { environment } from '../../environments/environment'

/*
    TODO: When clicking add to basket, show confirmation. Possibly change button from add to basket to [-]<amount>[+] ?
        When adding existing item, update quantity
*/
function Product({product}) {
    const basketContext = useContext(BasketContext)

    const handleClick = (event) => {
        fetch(`${environment.apiUrl}basket`, {
            method: 'POST',
            header: [{'Content-Type': 'application/json'}],
            body: JSON.stringify({
                userId: "123",
                sku: product.sku,
                quantity: 1
            })
        })
    }

    return(
        <div className="product-item">
            <img src={product.image_url} />
            <p>{product.name}</p>
            <p>{product.price}</p>
            <button onClick={handleClick}>Add to cart</button>
        </div>
    )
}

export default Product