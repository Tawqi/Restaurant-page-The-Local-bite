import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../components/card"

export default function Product() {
  const { id } = useParams(); // gets the id form the route (URL)
  const [food, setFood] = useState(null);
  const [on, setOn] = useState(false); // for the toggle fav button
  const [Suggestin, setSuggestin] = useState({});
  const navigate = useNavigate(); // for the retuen button function 

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
      <div className="sec1 flex flex-col">
        <button onClick={() => navigate(-1)} 
          className=" flex bg-(--bg2) text-white px-8 py-5 rounded hover:">
          <i className="fas fa-left-long text-2xl"></i>
        </button>

      <div className="imgsec bg-(--bg2) h-70 flex items-center justify-center rounded-b-2xl">
        <img src={food.image} alt={food.name} className="px-20 pb-10" />
      </div>
      </div>
      <div className="textsec flex flex-col gap-4 px-5 mt-10">
        <div className="sec1 flex items-start justify-between gap-2">
          <div className="name_price flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">{food.name}</h1>
            <h2 className="text-2xl text-(--primary)">৳{food.price}</h2>
          </div>
          <button className={`fav-btn flex p-2 rounded-xl items-center justify-center ${
              on ? "bg-(--primary)" : "bg-(--bg2)"
            }`}
            onClick={() => setOn(!on)}
          >
            <i className="fa-regular fa-heart text-3xl"></i>
          </button>
        </div>
        <div className="sec2 flex flex-col gap-3">
          <h2 className="text-2xl text-(--text2) font-semibold">Ingredients:</h2>
          <ul className="list-disc pl-5 flex flex-col gap-1">
            {food.ingredients.map((item, i) => (
              <li className="text-(--text2)" key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
     <div className="Suggestions sec2 flex flex-col gap-4 px-5 mt-10 mb-20">
        <h1 className="text-xl font-semibold">Similar Dishes</h1>
        <div className="show-suggestion flex gap-4 flex-wrap">
          {Object.values(Suggestin).flat().map((item) =>
            item._id !== food._id ? (
              <Link to={`/product/${item._id}`} key={item._id}>
                <Card food={item} />
              </Link>
            ) : null
          )}
        </div>
      </div>
      <div className="bg-(--bg2) fixed bottom-0 w-full h-18 flex items-center justify-around gap-5 px-5 rounded-t-2xl md:hidden">
          <button><i className="fas fa-cart-shopping text-2xl bg-(--bg3) p-3 rounded-xl"></i></button>
          <button className="text-2xl font-semibold text-(--bg1) text-center w-full bg-(--primary) py-2 rounded-xl">Order Now</button>
      </div>
    </>
  );
}
