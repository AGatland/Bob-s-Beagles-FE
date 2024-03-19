import { useContext, useState, useEffect } from "react"
import { ProductContext } from "../App";
import { Loader } from "@mantine/core";
import ProductsHeader from "./ProductsHeader";
import './style.css'
import Product from "./Product";
import ReactPaginate from "react-paginate";

/*
  TODO: Change cursor when hovering over buttons to pointer
*/
function ProductsList() {
    const productContext = useContext(ProductContext)
    const [category, setCategory] = useState("All items")
    const [categories, setCategories] = useState([])
    const [filteredCategories, setFilteredCategories] = useState([])
    const [pagination, setPagination] = useState({
        data: productContext.products,
        offset: 0,
        numberPerPage: 12,
        currentCata: []
    });

    useEffect(() => {
        setPagination((prevState) => ({
          ...prevState,
          pageCount: prevState.data.length / prevState.numberPerPage,
          currentData: prevState.data.slice(pagination.offset, pagination.offset + pagination.numberPerPage)
        }))
      }, [pagination.numberPerPage, pagination.offset])
      
      const handlePageClick = event => {
        const selected = event.selected;
        const offset = selected * pagination.numberPerPage
        setPagination({ ...pagination, offset })
      }

    if (!productContext.products) return <Loader color="blue" />;

    return(
        <div className="products-list-container">
            <ProductsHeader products={productContext.products} setCategory={setCategory} category={category}/>
            <h2>{category}</h2>
            <div className="products-grid">
            {pagination.currentData && pagination.currentData.map(((product, index) => 
                category === "All items" || category === product.category ?
            (
                <Product className="product-item" key={index} product={product} />
            ) : (<></>)
            ))
            }
            </div>
            {/* TODO: Find out how to click page numbers by clicking on entire div instead of just the text */}
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={pagination.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    )
}

export default ProductsList