import { Link } from "react-router-dom";

function OrderHistoryItem({ order }) {
  return (
    <tr>
      <td>{order.dateOrdered}</td>
      <td>{order.status}</td>
      <td>
        <Link to={`/users/${order.userId}/orders/${order.id}`}>View Order</Link>
      </td>
    </tr>
  );
}

export default OrderHistoryItem;
