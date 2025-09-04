import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/card";
import Nav from "../components/Nav";
import Footer from "../components/footer";

export default function Product() {
  const { id } = useParams(); // gets the id form the route (URL)
  const [food, setFood] = useState(null);
  const [on, setOn] = useState(false); // for the toggle fav button
  const [Suggestin, setSuggestin] = useState({});

  const [added, setAdded] = useState(false);

  // const request = indexedDB.open('cart',1);

function addToCart(productId) {
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
      if (data) {
        data.quantity += 1;
      } else {
        data = { id: productId, quantity: 1 };
      }
      store.put(data);
    };

    tx.oncomplete = () => {
      db.close();
      console.log("Item added to cart successfully");
    };

    tx.onerror = (err) => {
      console.error("Transaction error:", err);
    };
  };

  request.onerror = (err) => {
    console.error("Database open error:", err);
  };
}


  const handleAdd = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    cart[food._id] = (cart[food._id] || 0) + 1; // use food._id
    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };
  useEffect(() => {
    axios
      .get(`/api/fooditem/id/${id}`)
      .then((res) => setFood(res.data))
      .catch((error) => {
        console.error("Error fetching food:", error);
      });
  }, [id]);

  useEffect(() => {
    if (!food || !Array.isArray(food.category)) return;

    setSuggestin({});

    food.category.forEach((category) => {
      axios
        .get(`/api/fooditems/${category}`)
        .then((res) => {
          setSuggestin((prev) => ({
            ...prev,
            [category]: res.data,
          }));
        })
        .catch((error) => {
          console.error(`Error fetching ${category} dishes:`, error);
        });
    });
  }, [food]);

  if (!food) return <h1>Loading...</h1>;

  return (
    <>
      <Nav />
      <div className="flex flex-col md:flex-row gap-10 md:mx-5 md:mt-5">
        <div className="sec1 flex flex-col">
          <Link
            to="/menu"
            className="flex bg-(--bg2) text-white px-8 py-5 rounded md:hidden"
          >
            <i className="fas fa-left-long text-2xl"></i>
          </Link>
          <div className="imgsec bg-(--bg2) h-70 w-full flex items-center justify-center rounded-b-2xl md:h-120 md:w-120 md:rounded-2xl">
            <img src={food.image} alt={food.name} className="px-20 pb-10" />
          </div>
        </div>
        <div className="textsec flex flex-col gap-4 px-5 md:justify-between md:">
          <div className="text-sec1 flex items-start justify-between gap-2">
            <div className="name_price flex flex-col gap-2">
              <h1 className="text-2xl font-semibold md:text-3xl">
                {food.name}
              </h1>
              <h2 className="text-2xl text-(--primary) md:text-3xl">
                ৳{food.price}
              </h2>
            </div>
            <button
              className={`fav-btn flex p-2 rounded-xl items-center justify-center md:hidden ${
                on ? "bg-(--primary)" : "bg-(--bg2)"
              }`}
              onClick={() => setOn(!on)}
            >
              <i className="fa-regular fa-heart text-3xl"></i>
            </button>
          </div>
          <div className="text-sec2 flex flex-col gap-4">
            <h2 className="text-xl text-(--text2) font-md md:text-2xl">
              Ingredients:
            </h2>
            <ul className="list-disc pl-5 flex flex-col gap-1">
              {food.ingredients.map((item, i) => (
                <li className="text-(--text2) font-thin md:text-lg" key={i}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="btns hidden md:flex gap-5">
            <button
              className={`fav-btn flex p-2 rounded-xl items-center justify-center transition transform hover:scale-105 duration-300 ease-in-out ${
                on ? "bg-(--primary)" : "bg-(--bg2)"
              }`}
              onClick={() => setOn(!on)}
            >
              <i className="fa-regular fa-heart text-3xl"></i>
            </button>
            <button onClick={() => addToCart(food._id)}
              className="text-2xl font-semibold px-5 py-2 text-center rounded-xl transition transform hover:scale-105 duration-300 ease-in-out bg-(--bg2)">
              Add to cart
            </button>
            <button className="text-2xl font-semibold px-5 py-2 text-center rounded-xl transition transform hover:scale-105 duration-300 ease-in-out text-(--bg1) bg-(--primary) ">
              Order Now
            </button>
          </div>
        </div>
      </div>
      <div className="Suggestions sec2 flex flex-col gap-4 px-5 mt-10 mb-20">
        <h1 className="text-xl font-semibold md:text-2xl">Similar Dishes</h1>
        <div className="show-suggestion flex gap-4 flex-wrap">
          {Object.values(Suggestin)
            .flat()
            .map((item) =>
              item._id !== food._id ? (
                <Link to={`/product/${item._id}`} key={item._id}>
                  <Card food={item} />
                </Link>
              ) : null
            )}
        </div>
      </div>
      <div className="bottom bar bg-(--bg2) fixed bottom-0 w-full h-18 flex items-center justify-around gap-5 px-5 rounded-t-2xl md:hidden">
        <Link to="/cart">
          <i className="fas fa-cart-shopping text-2xl bg-(--bg3) p-3 rounded-xl"></i>
        </Link>
        <button
          onClick={() => addToCart(food._id)}
          className="text-2xl font-semibold text-(--bg1) text-center w-full bg-(--primary) py-2 rounded-xl"
        >
          Add to Cart
        </button>
      </div>
      <Footer />
    </>
  );
}