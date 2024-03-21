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
    const [pagination, setPagination] = useState({
        data: productContext.products,
        offset: 0,
        numberPerPage: 12,
        currentData: []
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

    const filterPage = (category) => {
      setCategory(category);
      const data = category === "All items" ? productContext.products : productContext.products.filter((product) => product.category === category);
      const pageCount = data.length / pagination.numberPerPage;
      const offset = pagination.offset > pageCount ? pageCount : pagination.offset
      setPagination((prevState) => ({
        ...prevState,
        data: data,
        pageCount: pageCount,
        offset: offset,
        currentData: data.slice(offset, offset + pagination.numberPerPage)
      }))
    }

    if (!productContext.products) return <Loader color="blue" />;

    return(
        <div className="products-list-container">
            <ProductsHeader products={productContext.products} filterPage={filterPage} setCategory={setCategory} category={category}/>
            <h2>{category}</h2>
            <div className="products-grid">
            {pagination.currentData && pagination.currentData.map(((product, index) => 
                <Product className="product-item" key={index} product={product} />
            ))
            }
            </div>
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