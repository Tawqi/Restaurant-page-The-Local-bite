import axios from "axios";
import Nav from "../components/Nav";
import Card from "../components/card";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function Menu() {
  const [categories, setCategories] = useState([]);
const [cleanCategories, setCleanCategories] = useState([]);
const [dishes, setDishes] = useState({});
const [on, setOn] = useState(false);


useEffect(() => {
  axios.get('/api/categories')
    .then(res => {
      setCategories(res.data);
      // Clean & flatten here once
      const uniqueCats = [...new Set(
        res.data.flatMap(cat => cat.split(',').map(c => c.trim()))
      )];
      setCleanCategories(uniqueCats);
    })
    .catch(err => console.error("Error fetching categories:", err));
}, []);

useEffect(() => {
  if (cleanCategories.length === 0) return;

  cleanCategories.forEach(category => {
    axios.get(`/api/fooditems/${category}`)
      .then(res => {
        setDishes(prev => ({
          ...prev,
          [category]: res.data
        }));
      })
      .catch(err => console.error(`Error fetching dishes for ${category}:`, err));
  });
}, [cleanCategories]);


  return (
    <>
      <Nav />
      <div className="mx-5 flex flex-col gap-5">
        <div className="sec1 flex flex-col mt-5 gap-5">
          <h1 className="text-3xl text-(--primary) font-bold">Explore our menu</h1>
          <p className="text-(--text2) font-light">
            Explore our variety of delicious dishes, made fresh with quality ingredients.
          </p>
          <div className="search flex items-center border border-(--primary) px-2 py-1 rounded-xl">
            <i className="fas fa-magnifying-glass"></i>
            <input className="px-3 w-full" type="text" placeholder="Search here....." />
          </div>
          <div className="cate flex gap-2">
            <button
              className={`flex px-4 py-2 rounded-xl items-center justify-center ${
                on ? "bg-(--primary)" : "bg-(--bg2)"
              }`}
              onClick={() => setOn(!on)}
            >
              All
            </button>
          </div>
        </div>

        {/* Dynamic categories */}
        <div className="sec2 flex flex-col gap-5">
          {cleanCategories.map(category => (
            <div key={category} className="flex flex-col gap-5">
              <h1 className="text-2xl font-semibold">{category}</h1>
              <div className="flex flex-wrap justify-between gap-2">
                {dishes[category]?.length > 0 ? (
                  dishes[category].map(food => (
                    <Link key={food._id} to={`/product/${food._id}`}>
                      <Card food={food} />
                    </Link>
                  ))
                ) : (
                  <p className="text-sm text-gray-400">No items found.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
