import Nav from "./admin_nav";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/view_orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Error fetching orders:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-5">Loading orders...</p>;

function countItems(order) {
  return order.product_id?.length || 0;
}


  return (
    <>
      <Nav />
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Order Summary</h1>
        <div className="overflow-x-auto bg-(--bg2) rounded-2xl shadow">
          <table className="w-full border-collapse ">
            <thead className="bg-(--bg3) text-(--text2)">
              <tr>
                <th className="py-3 px-4 text-left">Order ID</th>
                <th className="py-3 px-4 text-left">Customer</th>
                <th className="py-3 px-4 text-left">Phone</th>
                <th className="py-3 px-4 text-left">Items</th>
                <th className="py-3 px-4 text-left">Total</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Payment</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-6 text-(--text2)">
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-(--bg4) hover:bg-(--bg4) transition"
                  >
                    <td className="py-3 px-4 text-(--text3)">{order._id}</td>
                    <td className="py-3 px-4">{order.name}</td>
                    <td className="py-3 px-4">{order.phone}</td>
                    <td className="py-3 px-4">{countItems(order)}</td>
                    <td className="py-3 px-4">{order.total}</td>
                    <td className="py-3 px-4">
                      {order.createdAt 
                        ? new Date(order.createdAt).toLocaleString() 
                        : "—"}
                    </td>
                    
                    <td className="py-3 px-4">{order.payment || "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
