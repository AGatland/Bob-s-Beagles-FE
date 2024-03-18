import './style.css'

function Product({product}) {
    return(
        <div className="product-item">
            <h4>{product.name}</h4>
            <img src={product.image_url} />
            <p>{product.price}</p>
            <button>Add to cart</button>
        </div>
    )
}

export default Product