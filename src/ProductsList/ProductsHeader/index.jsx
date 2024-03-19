import { useState, useEffect } from 'react'
import './style.css'

/*
    TODO: Style category buttons. They are not pretty
*/
function ProductsHeader({products, setCategory}) {
    const [categories, setCategories] = useState(products.map(product => product.category))
    const [filteredCategories, setFilteredCategories] = useState([])

    useEffect(() => {
        let temp = new Set()
        categories.forEach(category => temp.add(category))
        setFilteredCategories(Array.from(temp))
    },[products])

    const handleClick = (event) => {
        setCategory(event.target.name)
    }

    return(
        <div className="products-header">
            <button name="All items" onClick={handleClick}>All items</button>
            {filteredCategories.map((category, index) => 
            <>
                <button name={category} key={index} onClick={handleClick}>{category}</button>
            </>
            )}
        </div>
    )
}

export default ProductsHeader