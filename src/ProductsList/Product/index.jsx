import { useContext } from 'react'
import './style.css'
import { AuthContext, BasketContext } from '../../App'
import { environment } from '../../environments/environment'
import { Link } from 'react-router-dom'

/*
    TODO: When clicking add to basket, show confirmation. Possibly change button from add to basket to [-]<amount>[+] ?
        When adding existing item, update quantity
        Replace placeholder values with userid
*/
function Product({product}) {
    const basketContext = useContext(BasketContext)
    const authContext = useContext(AuthContext)

    const handleClick = (event) => {
        if (basketContext.basket.data && basketContext.basket.data.filter(b => b.sku === product.sku).length === 0)
        {
            fetch(`${environment.apiUrl}basket/${authContext.user.id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    sku: product.sku,
                    quantity: 1
                })
            })
            basketContext.setBasket({status: "success", data: basketContext.basket.data.map((b) => b.sku === product.sku ? {sku: b.sku, quantity: 1} : b)})

        }
        else if (basketContext.basket.data) {
            let itemQuantity = basketContext.basket.data.filter(b => b.sku === product.sku)
            fetch(`${environment.apiUrl}basket/${authContext.user.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify({
                    sku: product.sku,
                    quantity: itemQuantity[0].quantity + 1
                })
            })
            basketContext.setBasket({status: "success", data: basketContext.basket.data.map((b) => b.sku === product.sku ? {sku: b.sku, quantity: itemQuantity[0] + 1} : b)})

        }
    }

    return(
        <div className="product-item">
            <Link to={`/products/${product.sku}`}>
                <img src={product.img} />
                <p>{product.name}</p>
                <p>£{product.price}</p>
            </Link>
                <button onClick={handleClick}>Add to cart</button>
        </div>
    )
}

export default Product