import { useContext } from 'react'
import './style.css'
import { BasketContext } from '../../App'
import { environment } from '../../environments/environment'

/*
    TODO: When clicking add to basket, show confirmation. Possibly change button from add to basket to [-]<amount>[+] ?
        When adding existing item, update quantity
        Replace placeholder values with userid
*/
function Product({product}) {
    const basketContext = useContext(BasketContext)

    const handleClick = (event) => {
        if (basketContext.basket.filter(b => b.sku === product.sku).length === 0)
        {
            fetch(`${environment.apiUrl}basket`, {
                method: 'POST',
                header: [{'Content-Type': 'application/json'}],
                body: JSON.stringify({
                    id: "123" + product.sku, /* To stop json-server from creating id */
                    userId: "123",
                    sku: product.sku,
                    quantity: 1
                })
            })
            basketContext.setBasket([...basketContext.basket, {
                id: "123" + product.sku, /* To stop json-server from creating id */
                userId: "123",
                sku: product.sku,
                quantity: 1
            }]) 
        }
        else {
            /*
                TODO: EDIT ID so it's not a hardcoded placeholder but comes from the url!!
            */
            let itemQuantity = basketContext.basket.filter(b => b.sku === product.sku)
            fetch(`${environment.apiUrl}basket/123${product.sku}`, {
                method: 'PUT',
                header: [{'Content-Type': 'application/json'}],
                body: JSON.stringify({
                    id: "123" + product.sku, /* To stop json-server from creating id */
                    userId: "123",
                    sku: product.sku,
                    quantity: itemQuantity[0].quantity + 1
                })
            })
            basketContext.setBasket([...basketContext.basket, {
                id: "123" + product.sku, /* To stop json-server from creating id */
                userId: "123",
                sku: product.sku,
                quantity: 1
            }])
        }
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