import './style.css'

function ProductsHeader({products, setCategory, category}) {

    const handleClick = (event) => {
        setCategory(event.target.name)
    }

    /*
      TODO: Make buttons in header change category. Render items in category (render all if All items)
    */
    return(
        <div className="products-header">
            <button>All items</button>
            {products.map((product, index) => 
            <>
                <button name={product.category} key={index} onClick={handleClick}>{product.category}</button>
            </>
            )}
        </div>
    )
}

export default ProductsHeader