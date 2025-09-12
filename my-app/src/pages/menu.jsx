import axios from "axios";
import BNav from '../components/Bottom_Nav'
import TNav from '../components/Top_Nav'
import Card from "../components/card";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  const [categories, setCategories] = useState([]);
  const [cleanCategories, setCleanCategories] = useState([]);
  const [dishes, setDishes] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(""); // search state


  useEffect(() => {
    axios.get('/api/categories')
      .then(res => {
        const uniqueCats = [...new Set(
          res.data.flatMap(cat => cat.split(',').map(c => c.trim()))
        )];
        setCleanCategories(["All", ...uniqueCats]);
      })
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  useEffect(() => {
    if (cleanCategories.length === 0) return;

    cleanCategories.forEach(category => {
      if(category === "All") return; 
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

  function filterDishes(items) {
    if (!searchTerm) return items;
    return items.filter(food =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <>
      <TNav />
      <BNav />
      <div className="mx-5 flex flex-col gap-5">
        <div className="sec1 flex flex-col mt-5 gap-5">
          <h1 className="text-3xl text-(--primary) font-bold">Explore our menu</h1>
          <p className="text-(--text2) font-light">
            Explore our variety of delicious dishes, made fresh with quality ingredients.
          </p>
          <div className="search flex items-center border border-(--primary) px-2 py-1 md:px-4 md:py-2 md:text-xl rounded-xl">
            <i className="fas fa-magnifying-glass"></i>
            <input
              className="px-3 w-full"
              type="text"
              placeholder="Search here....."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="cate flex flex-wrap gap-2">
            {cleanCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl ${
                  selectedCategory === cat ? "bg-(--primary) text-white" : "bg-(--bg2)"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic categories */}
        {selectedCategory === "All" ? (
          cleanCategories
            .filter(cat => cat !== "All")
            .map(cat => {
              const filteredFoods = filterDishes(dishes[cat] || []);
              return (
                <div key={cat} className="flex flex-col gap-5">
                  <h2 className="text-2xl font-semibold">{cat}</h2>
                  <div className="flex flex-wrap justify-evenly md:justify-normal gap-4">
                    {filteredFoods.length > 0 ? (
                      filteredFoods.map(food => (
                          <Card food={food} />
                      ))
                    ) : (
                      <p className="text-sm text-gray-400">No items found.</p>
                    )}
                  </div>
                </div>
              );
            })
        ) : (
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-semibold">{selectedCategory}</h1>
            <div className="flex flex-wrap gap-4">
              {filterDishes(dishes[selectedCategory] || []).map(food => (
                <Link key={food._id} to={`/product/${food._id}`}>
                  <Card food={food} />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
