import { useEffect, useState } from "react";
import "./style.css";
import OrderViewProduct from "./OrderViewProduct";
import { Link, useParams } from "react-router-dom";
import { environment } from "../environments/environment";
import { IconArrowLeft } from "@tabler/icons-react";

function OrderView() {
  const [order, setOrder] = useState({
    id: "",
    status: "",
    dateOrdered: "",
    userId: "",
    products: [],
  });
  let { id, orderId } = useParams();

  useEffect(() => {
    fetch(`${environment.apiUrl}users/${id}/orders/${orderId}`, {
      Method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setOrder(data.data));
  }, []);

  return (
    <div className="order-view">
      <Link to={`/users/${id}/orders`}>
        <IconArrowLeft></IconArrowLeft> Back to order history
      </Link>
      <h2>Order View</h2>
      <div className="order-view-details">
        <h4>Ordered: </h4>
        <p>{order.dateOrdered}</p>
        <h4>Status: </h4>
        <p>{order.status}</p>
      </div>
      {order && (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((product, index) => (
              <OrderViewProduct key={index} productInOrder={product} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderView;
