import { useParams } from 'react-router'
import './style.css'
import { environment } from '../environments/environment'
import { useContext, useEffect, useState } from 'react'
import { Loader } from '@mantine/core'
import { AuthContext, BasketContext } from '../App'

function ProductView() {
    const [product, setProduct] = useState({})
    const basketContext = useContext(BasketContext)
    const authContext = useContext(AuthContext)

    let { id } = useParams()
    useEffect(() => {
        fetch(`${environment.apiUrl}products/${id}`, {
            Method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
          })
            .then(response => response.json())
            .then(setProduct)
    }, [id])

    const handleClick = (event) => {
        if (basketContext.basket.data && basketContext.basket.data.filter(b => b.sku === product.data.sku).length === 0)
        {
            fetch(`${environment.apiUrl}basket/${authContext.user.id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    sku: product.data.sku,
                    quantity: 1
                })
            })
            basketContext.setBasket({status: "success", data: [...basketContext.basket.data,  {sku: product.data.sku, quantity: 1}]})

        }
        else if (basketContext.basket.data) {
            let itemQuantity = basketContext.basket.data.filter(b => b.sku === product.data.sku)
            fetch(`${environment.apiUrl}basket/${authContext.user.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    sku: product.data.sku,
                    quantity: itemQuantity[0].quantity + 1
                })
            })
            basketContext.setBasket({status: "success", data: basketContext.basket.data.map((b) => b.sku === product.data.sku ? {sku: b.sku, quantity: itemQuantity[0].quantity + 1} : b)})

        }
    }

    if(!product.data) return <Loader color="blue" />

    return(
        <div className="product-view">
            <img src={product.data.img} />
            <div className="product-view-details">
                <div className="product-view-details-top-bottom">
                    <div>
                        <h3>{product.data.name}</h3>
                        <p>{product.data.description}</p>
                    </div>
                    <div>
                        <h4>£{product.data.price}</h4>
                        <button onClick={handleClick}>Add to Basket</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductView