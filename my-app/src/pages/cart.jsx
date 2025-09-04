import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]); // [{id, quantity}]
  const [products, setProducts] = useState([]);

  // Open IndexedDB and get all cart items
  useEffect(() => {
    const openRequest = indexedDB.open('cart', 1);

openRequest.onupgradeneeded = e => {
  const db = e.target.result;
  if (!db.objectStoreNames.contains('cart')) {
    db.createObjectStore('cart', { keyPath: 'id' });
  }
};


    openRequest.onerror = () => console.error('DB failed to open');
    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const tx = db.transaction('cart', 'readonly');
      const store = tx.objectStore('cart');

      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => {
        const items = getAllRequest.result || [];
        setCartItems(items);

        if (items.length === 0) return;

        const ids = items.map(item => item.id).join(',');

        // Fetch product details
        axios.get(`http://localhost:3000/api/fooditems/byids/${ids}`)
          .then(res => setProducts(res.data))
          .catch(err => console.error(err));
      };

      tx.oncomplete = () => db.close();
    };
  }, []);

  // Update quantity in IndexedDB and state
  const updateQty = (id, qty) => {
    const openRequest = indexedDB.open('cart', 1);

    openRequest.onsuccess = () => {
      const db = openRequest.result;
      const tx = db.transaction('cart', 'readwrite');
      const store = tx.objectStore('cart');

      if (qty <= 0) {
        store.delete(id);
        setCartItems(prev => prev.filter(item => item.id !== id));
        setProducts(prev => prev.filter(p => p._id !== id));
      } else {
        store.put({ id, quantity: qty });
        setCartItems(prev => prev.map(item => (item.id === id ? { id, quantity: qty } : item)));
      }

      tx.oncomplete = () => db.close();
    };
  };

  // Remove item from IndexedDB and state
  const removeFromCart = (id) => updateQty(id, 0);

  const getQuantity = (id) => {
    const item = cartItems.find(i => i.id === id);
    return item ? item.quantity : 0;
  };

  const totalPrice = products.reduce((sum, item) => sum + item.price * getQuantity(item._id), 0);

  return (
    <>
      <Nav />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {products.length === 0 && <p>Your cart is empty.</p>}

        {products.map(item => (
          <div key={item._id} className="flex justify-between items-center gap-3 bg-(--bg2) rounded p-3 mb-3">
            <img src={item.image} alt={item.name} className="w-20" />
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>৳{item.price.toFixed(2)}</p>
            </div>
            <div className="flex flex-col justify-between items-center gap-5">
              <div className="prod-unit flex items-center gap-2">
                <button onClick={() => updateQty(item._id, getQuantity(item._id) - 1)}>-</button>
                <input
                  type="text"
                  value={getQuantity(item._id)}
                  onChange={e => {
                    const val = parseInt(e.target.value);
                    if (!isNaN(val)) updateQty(item._id, val);
                  }}
                  className="w-12 text-center border rounded"
                />
                <button onClick={() => updateQty(item._id, getQuantity(item._id) + 1)}>+</button>
              </div>
              <button onClick={() => removeFromCart(item._id)} className="bg-red-700 px-2 py-1 rounded-sm">
                <i className="fas fa-xmark"></i>
              </button>
            </div>
          </div>
        ))}

        {products.length > 0 && (
          <div className="mt-4 font-bold text-lg">
            Total: ৳{totalPrice.toFixed(2)}
          </div>
        )}
      </div>
    </>
  );
}
