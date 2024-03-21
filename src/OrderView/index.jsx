import { useContext, useEffect, useState } from "react";
import "./style.css";
import OrderViewProduct from "./OrderViewProduct";
import { Link, useParams } from "react-router-dom";
import { environment } from "../environments/environment";
import { IconArrowLeft } from "@tabler/icons-react";
import { AuthContext } from "../App";

function OrderView() {
  const { user, roles } = useContext(AuthContext);

  let { id, orderId } = useParams();

  const [order, setOrder] = useState({
    id: "",
    status: "",
    dateOrdered: "",
    userId: "",
    products: [],
  });

  useEffect(() => {
    if (id) {
      // Data fetched only when current users id is the same as userid in path
      if (user && Number(user.id) === Number(id) || roles.some(role => role.name === "ROLE_ADMIN")) {
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
      }
    }
  }, [id, user, orderId]);

  return (
    <div className="order-view">
      <Link to={`/users/${id}/orders`}>
        <IconArrowLeft></IconArrowLeft> Back to order history
      </Link>
      <h2>Order View</h2>
      {/* Only display data if userId of fetched order is same as current users id, or the user is admin role */}
      {(order.userId === user.id || roles.some(role => role.name === "ROLE_ADMIN")) && (
        <div>
          <div className="order-view-details">
            <h4>Ordered: </h4>
            <p>{order.dateOrdered}</p>
            <h4>Status: </h4>
            <p>{order.status}</p>
          </div>
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
        </div>
      )}
    </div>
  );
}

export default OrderView;
