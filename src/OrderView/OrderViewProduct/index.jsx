import { useEffect, useState } from "react";
import { environment } from "../../environments/environment";
import { Link } from "react-router-dom";

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
    <tr className="order-product">
      <td>
        <Link to={`/products/${product.sku}`}>{product.name}</Link>
      </td>
      <td>{productInOrder.quantity}</td>
      <td>£{product.price * productInOrder.quantity}</td>
      <td>
        <img src={product.img} />
      </td>
    </tr>
  );
}

export default OrderViewProduct;
