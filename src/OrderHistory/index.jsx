import { useContext, useEffect, useState } from "react";
import "./style.css";
import { useParams } from "react-router-dom";
import { environment } from "../environments/environment";
import OrderHistoryItem from "./OrderHistoryItem";
import { AuthContext } from "../App";

function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState([]);
  let { id } = useParams();
  const { user, roles } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      if (user && (Number(user.id) === Number(id) || roles.some(role => role.name === "ROLE_ADMIN"))) {
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
      }
    }
  }, []);

  return (
    <div className="order-history">
      <h2>Order History</h2>
      {(user && Number(user.id) === Number(id)) || roles.some(role => role.name === "ROLE_ADMIN") ? (
        <table>
          <thead>
            <tr>
              <th>Date Ordered</th>
              <th>Status</th>
              <th>Link to Order View</th>
            </tr>
          </thead>
          <tbody>
            {orderHistory.map((order, index) => (
              <OrderHistoryItem key={index} order={order} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>
          Can&apos;t view other peoples order history. Your id is {user.id}.
        </p>
      )}
    </div>
  );
}

export default OrderHistory;
