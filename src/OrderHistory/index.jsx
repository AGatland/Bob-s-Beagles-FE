import { useEffect, useState } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import { environment } from "../environments/environment";
import OrderHistoryItem from "./OrderHistoryItem";

function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  let { id } = useParams();

  useEffect(() => {
    fetch(`${environment.apiUrl}users/${id}/orders`, {
      Method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setOrderHistory(data.data));
  }, []);

  return (
    <div className="order-history">
      <h2>Order History</h2>
      <table>
        <tr>
          <th>Date Ordered</th>
          <th>Status</th>
          <th>Link to Order View</th>
        </tr>
        {orderHistory.map((order, index) => (
          <OrderHistoryItem key={index} order={order} />
        ))}
      </table>
    </div>
  );
}

export default OrderHistory;
