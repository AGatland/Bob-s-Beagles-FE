import { useEffect, useState } from "react";
import "./style.css";
import OrderViewProduct from "./OrderViewProduct";
import { useParams } from "react-router-dom";
import { environment } from "../environments/environment";

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
      <h2>Order View</h2>
      {console.log(order)}
      {order && (
        <p>
          Ordered: {order.dateOrdered}, Status:{order.status}
        </p>
      )}
      {order && (
        <ul>
          {order.products.map((product, index) => (
            <OrderViewProduct key={index} productInOrder={product} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderView;
