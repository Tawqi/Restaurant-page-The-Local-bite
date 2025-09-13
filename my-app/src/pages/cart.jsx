import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TNav from "../components/Top_Nav";
import Footer from "../components/footer";
import axios from "axios";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]); // [{id, quantity}]
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

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
        console.log("Cart items from IndexedDB:", items); // check mobile
        setCartItems(items);

        if (items.length === 0) {
          console.log("Cart is empty");
          return;
        }

        const ids = items.map((item) => item.id).join(",");
        console.log("Fetching product details for IDs:", ids);

        axios
          .get(`/api/fooditems/byids/${ids}`)
          .then((res) => {
            console.log("Fetched products:", res.data);
            setProducts(res.data);
          })
          .catch((err) => console.error(err));
      };

      tx.oncomplete = () => db.close();
    };
  }, []);

  // Update quantity in IndexedDB and state
  const updateQty = (id, qty) => {
    const openRequest = indexedDB.open("cart", 1);

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const tx = db.transaction("cart", "readwrite");
      const store = tx.objectStore("cart");

      if (qty <= 0) {
        store.delete(id);
        setCartItems((prev) => prev.filter((item) => item.id !== id));
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        store.put({ id, quantity: qty });
        setCartItems((prev) =>
          prev.map((item) => (item.id === id ? { id, quantity: qty } : item))
        );
      }

      tx.oncomplete = () => db.close();
    };
  };

  // Remove item from IndexedDB and state
  const removeFromCart = (id) => updateQty(id, 0);

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
      <div className="p-4 min-h-[70vh] h-full mb-20">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {products.length === 0 && <p>Your cart is empty.</p>}

        {products.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center gap-3 bg-(--bg2) rounded-2xl p-3 mb-3 hover:cursor-default"
          >
            <img onClick={() => navigate(`/product/${item._id}`)} 
            src={item.image} alt="product image" className="w-20" />
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>৳{item.price.toFixed(2)}</p>
            </div>
            <div className="flex flex-col justify-between items-center gap-5">
              <div className="prod-unit flex items-center gap-2">
                <button
                  onClick={() => updateQty(item._id, getQuantity(item._id) - 1)}
                >
                  -
                </button>
                <input
                  type="text"
                  value={getQuantity(item._id)}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) updateQty(item._id, val);
                  }}
                  className="w-12 text-center border rounded"
                />
                <button
                  onClick={() => updateQty(item._id, getQuantity(item._id) + 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-700 px-2 py-1 rounded-sm"
              >
                <i className="fas fa-xmark"></i>
              </button>
            </div>
          </div>
        ))}
        {products.length > 0 && (
          <div className="flex justify-between items-center">
            <div className=" font-bold text-lg border p-3 rounded-2xl ">
              Total: ৳{totalPrice.toFixed(2)}
            </div>
            <div className="hidden md:flex gap-8 p-3 bg-(--bg2) rounded-2xl">
              <Link
                to="/menu"
                className="text-xl font-semibold text-(--text1) text-center bg-(--bg3) px-3 py-2 rounded-xl"
              >
                Go Back
              </Link>
              <Link
                to="/order"
                className="order_btn text-xl font-semibold text-(--bg1) text-center bg-(--primary) px-3 py-2 rounded-xl hover:cursor-pointer"
              >
                Order Now
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="bottom bar bg-(--bg2) fixed bottom-0 w-full h-18 flex items-center justify-around gap-5 px-5 rounded-t-2xl md:hidden">
        <Link
          to="/menu"
          className="text-2xl font-semibold text-(--text1) text-center w-2/3 bg-(--bg3) py-2 rounded-xl"
        >
          Go Back
        </Link>
        <Link
          to="/order"
          className="text-2xl font-semibold text-(--bg1) text-center w-full bg-(--primary) py-2 rounded-xl hover:cursor-pointer"
        >
          Order Now
        </Link>
      </div>
    </>
  );
}
