import { useEffect, useState } from "react";
import { environment } from "../../environments/environment";

function OrderViewProduct({ productInOrder }) {
  const [product, setProduct] = useState({});

  // Fetch product
  useEffect(() => {
    fetch(`${environment.apiUrl}products/${productInOrder.sku}`, {
      Method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setProduct(data.data));
  }, []);

  return (
    <li className="order-product">
      <img src={product.img} />
      <div className="product-view-details">
        <div className="product-view-details-top-bottom">
          <div>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
          </div>
          <div>
            <h4>£{product.price}</h4>
            <h4>Quantity: {productInOrder.quantity}</h4>
          </div>
        </div>
      </div>
    </li>
  );
}

export default OrderViewProduct;
