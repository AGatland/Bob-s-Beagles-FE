import { useParams } from 'react-router'
import './style.css'
import { environment } from '../environments/environment'
import { useContext, useEffect, useState } from 'react'
import { Loader } from '@mantine/core'
import { BasketContext } from '../App'

function ProductView() {
    const [product, setProduct] = useState({})
    const basketContext = useContext(BasketContext)

    let { id } = useParams()
    useEffect(() => {
        fetch(`${environment.apiUrl}products/${id}`)
            .then(response => response.json())
            .then(setProduct)
    }, [])

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

    if(!product) return <Loader color="blue" />

    return(
        <div className="product-view">
            <img src={product.image_url} />
            <div className="product-view-details">
                <div className="product-view-details-top-bottom">
                    <div>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                    </div>
                    <div>
                        <h4>£{product.price}</h4>
                        <button onClick={handleClick}>Add to Basket</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductView