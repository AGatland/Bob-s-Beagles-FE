import { useState, useEffect } from 'react'
import './style.css'

/*
    TODO: Style category buttons
*/
function ProductsHeader({products, setCategory, category}) {
    const [categories, setCategories] = useState([])
    const [filteredCategories, setFilteredCategories] = useState([])

    useEffect(() => {
        setCategories(products.map(product => product.category))
        let temp = new Set()
        categories.forEach(category => temp.add(category))
        setFilteredCategories(Array.from(temp))
    },[filteredCategories])

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