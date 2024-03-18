import './style.css'

function ProductsHeader({products}) {
    
    return(
        <div className="products-header">
            <input id="all" type="checkbox"/>
            <label htmlFor="all">All items</label>
            {products.map((product, index) => 
            <>
                <input key={index} id={product.sku} type="checkbox"/>
                <label htmlFor={product.sku}>{product.category}</label>
            </>
            )}
        </div>
    )
}

export default ProductsHeader