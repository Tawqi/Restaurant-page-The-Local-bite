import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Card({ food }) {
  const [added, setAdded] = useState(false);
  const navigate = useNavigate();

  if (!food) return null;

  const handleCardClick = () => navigate(`/product/${food._id}`);

  const addToCart = (e, productId) => {
    e.stopPropagation();

    setAdded(true); // immediate button feedback
    setTimeout(() => setAdded(false), 1000);

    const request = indexedDB.open("cart", 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains("cart")) {
        db.createObjectStore("cart", { keyPath: "id" });
      }
    };

    request.onsuccess = (e) => {
      const db = e.target.result;
      const tx = db.transaction("cart", "readwrite");
      const store = tx.objectStore("cart");

      store.get(productId).onsuccess = (event) => {
        let data = event.target.result;
        if (data) data.quantity += 1;
        else data = { id: productId, quantity: 1 };
        store.put(data);
      };

      tx.oncomplete = () => db.close();
      tx.onerror = (err) => console.error("Transaction error:", err);
    };

    request.onerror = (err) => console.error("Database open error:", err);
  };

  return (
    <div
      onClick={handleCardClick}
      className="card flex flex-col justify-between bg-(--bg2) rounded-2xl shadow transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:cursor-default h-80 w-38 p-4 md:h-130 md:w-60 md:p-6"
    >
      <div className="flex flex-col gap-4">
        <div className="h-30 flex justify-center items-center md:h-36">
          <img src={food.image} alt={food.name} className="h-full" />
        </div>
        <h2 className="font-semibold text-1rem md:text-xl">{food.name}</h2>
        <ul className="hidden md:flex flex-col text-(--text2) font-light list-disc list-inside">
          {food.ingredients.slice(0, 4).map((item, index) => (
            <li className="text-sm md:text-base" key={index}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-lg flex items-center md:text-2xl">
          <span className="text-xl">৳</span>
          {food.price}
        </h3>
        <button
          onClick={(e) => addToCart(e, food._id)}
          className="text-sm text-(--bg1) bg-(--primary) font-semibold p-2 rounded-xl text-center shadow transition transform hover:scale-105 duration-300 ease-in-out hover:cursor-pointer md:text-lg"
        >
          {added ? "Added!" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
