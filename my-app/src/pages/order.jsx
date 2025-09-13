import { useState, useEffect } from "react";
import axios from "axios";
import TNav from "../components/Top_Nav";

export default function Order() {
  const [city, setCity] = useState("");
  const [cartItems, setCartItems] = useState([]); // [{id, quantity}]
  const [products, setProducts] = useState([]);

  const cities = [
    "Dhaka",
    "Chattogram",
    "Khulna",
    "Sylhet",
    "Rajshahi",
    "Barishal",
    "Rangpur",
    "Mymensingh",
    "Comilla",
    "Narayanganj",
    "Gazipur",
    "Cox’s Bazar",
  ];

  // Fetch cart items from IndexedDB
  useEffect(() => {
    const openRequest = indexedDB.open("cart", 1);

    openRequest.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("cart")) {
        db.createObjectStore("cart", { keyPath: "id" });
      }
    };

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const tx = db.transaction("cart", "readonly");
      const store = tx.objectStore("cart");

      const getAllRequest = store.getAll();
      getAllRequest.onsuccess = () => {
        const items = getAllRequest.result || [];
        setCartItems(items);

        if (items.length === 0) return;

        const ids = items.map((i) => i.id).join(",");
        axios
          .get(`/api/fooditems/byids/${ids}`)
          .then((res) => setProducts(res.data))
          .catch((err) => console.error(err));
      };

      tx.oncomplete = () => db.close();
    };
  }, []);

  const getQuantity = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  const totalPrice = products.reduce(
    (sum, item) => sum + item.price * getQuantity(item._id),
    0
  );

  return (
    <>
      <TNav />
      <div className="p-4 space-y-6 min-h-screen">
        <h2 className="text-2xl font-bold">Order</h2>
        <p className="text-(--text2)">
          Fill up the details to confirm your order.
        </p>

        {/* Customer info */}
        <div className="flex flex-col md:flex-row gap-5">
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <input
              type="text"
              placeholder="Full Name"
              className="p-3 w-full bg-(--bg2) rounded-xl"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="p-3 w-full bg-(--bg2) rounded-xl"
            />
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="p-3 w-full bg-(--bg2) rounded-xl"
            >
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Address"
              className="p-3 w-full bg-(--bg2) rounded-xl"
            />
          </div>

          {/* Products */}
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            <h3 className="text-xl font-semibold">Products</h3>
            {products.length === 0 && <p>Your cart is empty.</p>}

            {products.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center p-3 bg-(--bg2) rounded-xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl"
                />
                <div className="flex-1 px-3">
                  <h4 className="font-semibold">{item.name}</h4>
                </div>
                <div className="text-right">
                  <p>{getQuantity(item._id)}X</p>
                  <p>৳{(item.price * getQuantity(item._id)).toFixed(2)}</p>
                </div>
              </div>
            ))}

            {/* Totals */}
            {products.length > 0 && (
              <div className="flex flex-col gap-2 mt-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>৳{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>৳150</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>৳{(totalPrice + 150).toFixed(2)}</span>
                </div>
              </div>
            )}

            <button className="mt-4 w-full bg-green-500 text-white p-3 rounded-xl font-semibold hover:bg-green-600 transition">
              Confirm Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
