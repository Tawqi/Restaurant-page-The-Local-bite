import { useState, useEffect } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';

import food1 from "../contents/pexels-xmtnguyen-2664216-removebg-preview.png"; 

export default function Cart() {
  const [cart, setCart] = useState({});
  const [products, setProducts] = useState([]);

  // Load cart from localStorage and fetch products
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || {};
    setCart(savedCart);

    const ids = Object.keys(savedCart);
    if (ids.length === 0) return;

    axios
      .get(`http://localhost:3000/api/fooditems/byids/${ids.join(',')}`)
      .then(res => {
        console.log("Fetched products:", res.data);
        setProducts(res.data);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  // Update quantity in cart
  const updateQty = (id, qty) => {
    const newCart = { ...cart };
    if (qty <= 0) delete newCart[id];
    else newCart[id] = qty;

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setProducts(prev => prev.filter(p => newCart[p._id]));
  };

  const totalPrice = products.reduce(
    (sum, item) => sum + item.price * cart[item._id],
    0
  );
  const removeFromCart = (id) => {
  const newCart = { ...cart };
  delete newCart[id];
  setCart(newCart);
  localStorage.setItem('cart', JSON.stringify(newCart));
  setProducts(prev => prev.filter(p => p._id !== id));
};


  return (
    <>
      <Nav />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {products.length === 0 && <p>Your cart is empty.</p>}

        {products.map(item => (
          <div
            key={item._id}
            className="flex justify-between items-center gap-3 bg-(--bg2) rounded p-3 mb-3">
            <img src={item.image} className='w-20' alt={item.name} />
            {/* <img src={food1} className='w-20' alt={item.name} /> */}
            
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p>৳{item.price.toFixed(2)}</p>
            </div>
            <div className='flex flex-col justify-between items-center gap-5'>
                <div className="prod-unit flex items-center gap-2">
              <button onClick={() => updateQty(item._id, cart[item._id] - 1)}>
                -
              </button>
              <input
                type="text"
                value={cart[item._id]}
                onChange={e => {
                  const val = parseInt(e.target.value);
                  if (!isNaN(val)) updateQty(item._id, val);
                }}
                className="w-12 text-center border rounded"
              />
              <button onClick={() => updateQty(item._id, cart[item._id] + 1)}>
                +
              </button>
            </div>
            <span>
                <button onClick={() => removeFromCart(item._id)} className=' bg-red-700 px-2 py-1 rounded-sm' ><i className='fas fa-xmark'></i></button>
            </span>
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
