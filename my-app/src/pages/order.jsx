import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


export default function Order() {
  const [city, setCity] = useState();
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

  // Open IndexedDB and get all cart items
  useEffect(() => {
    const openRequest = indexedDB.open("cart", 1);

    openRequest.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("cart")) {
        db.createObjectStore("cart", { keyPath: "id" });
      }
    };

    openRequest.onerror = () => console.error("DB failed to open");
    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const tx = db.transaction("cart", "readonly");
      const store = tx.objectStore("cart");

      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        const items = getAllRequest.result || [];
        setCartItems(items);

        if (items.length === 0) return;

        const ids = items.map((item) => item.id).join(",");

        // Fetch product details
        axios
          .get(`http://localhost:3000/api/fooditems/byids/${ids}`)
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
    <div className="p-4 space-y-10">
      <h2 className="text-2xl font-bold mb-4">Order</h2>
      <p className="text-(--text2) font-light mb-4">
        Fill up the details to confirm your order.
      </p>
      <div className="inputs flex flex-col gap-5">
        <div className="name input space-y-10">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="p-3 w-full bg-(--bg2) rounded-xl"
          ></input>
        </div>
        <div className="name input space-y-2">
          <label>Number:</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            className="p-3 w-full bg-(--bg2) rounded-xl"
          ></input>
        </div>
        <div className="space-y-2">
          <label>City:</label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="p-3 w-full bg-(--bg2) rounded-xl"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="name input space-y-2">
          <label>Address:</label>
          <input
            type="text"
            placeholder="Enter your address in detail"
            className="p-3 w-full bg-(--bg2) rounded-xl"
          ></input>
        </div>
      </div>
      <div className="space-y-2">
        <h1>Products</h1>
        <div className="flex flex-col gap-3 rounded-xl">
            {products.length === 0 && <p>Your cart is empty.</p>}

        {products.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center gap-3 bg-(--bg2) rounded-2xl p-4 mb-2 min-h-26">
            <img src={item.image} alt="product image" className="w-20" />
            <div>
              <h3 className="font-semibold">{item.name}</h3>
            </div>
            <div className="flex flex-col justify-between items-center gap-5">
              <div className="prod-unit flex flex-col text-right gap-2">
                <p className="font-bold">{getQuantity(item._id)}X</p>
                <p>
                  ৳{(Number(item.price) * Number(getQuantity(item._id))).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center border-b border-(--text3)  p-4">
            <h2 className="text-xl font-semibold ">Sub total:</h2>
            {products.length > 0 && (
          <div>
            <div className="text-lg rounded-2xl ">
              ৳{totalPrice.toFixed(2)}
            </div>
          </div>
        )}
        </div>
        <div className="flex justify-between items-center border-b border-(--text3)  p-4">
            <h2 className="text-xl font-semibold ">Shipping:</h2>
            
          <div>
            <div className="text-lg rounded-2xl "> ৳150
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-4">
            <h2 className="text-xl font-semibold ">Total:</h2>
            {products.length > 0 && (
          <div>
            <div className="text-lg rounded-2xl ">
              ৳{totalPrice.toFixed(2)}
            </div>
          </div>
        )}
        </div>
      </div>
      <button className="text-2xl font-semibold text-(--bg1) text-center w-full bg-green-500 py-2 rounded-xl hover:cursor-pointer">
        Confirm Order
      </button>
      </div>
    </div>
  );
}
