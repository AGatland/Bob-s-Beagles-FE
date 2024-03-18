import './style.css'

function Product({product}) {
    return(
        <div className="product-item">
            <img src={product.image_url} />
            <h4>{product.name}</h4>
            <p>{product.price}</p>
            <button>Add to cart</button>
        </div>
    )
}

export default Product