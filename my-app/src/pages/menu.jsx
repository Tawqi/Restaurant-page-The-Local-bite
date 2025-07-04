import axios from "axios";
import Nav from "../components/Nav";
import Card from "../components/card";
import { useEffect, useState } from 'react';
export default function Menu() {

    const [on, setOn] = useState(false);
    const [specialdish, showdish] = useState([])

    useEffect(() => {
      axios.get('http://localhost:3000/fooditem/Special')
      .then((res) => 
        {console.log('API data:', res.data);
        showdish(res.data)})
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
      },[])
    
  return (
    <>
      <Nav />
      <div className="mx-5 flex flex-col gap-5">
        <div className="sec1 flex flex-col mt-5 gap-5">
        <h1 className="text-3xl text-(--primary) font-bold">
          Explore our menu
        </h1>
        <p className="text-(--text2) font-lite">
          Explore our variety of delicious dishes, made fresh with quality
          ingredients.
        </p>
        <div className="search flex items-center border border-(--primary) px-2 py-1 rounded-xl ">
          <i className="fas fa-magnifying-glass"></i>
          <input
            className="px-3 w-full"
            type="text"
            placeholder="Search here....."
          ></input>
        </div>
        <div className="cate flex gap-2">
            <div className={`flex px-4 py-2 rounded-xl items-center justify-center ${on ? 'bg-(--primary)' : 'bg-(--bg2)'}`}>
                <button onClick={() => setOn(!on)}>All</button>
            </div>
        </div>
        </div>
        <div className="sec2 flex flex-col gap-5">
            <h1 className="text-3xl font-semibold">Special</h1>
            <div className="special_cate flex gap-4">
              {specialdish.map((food) => 
              <Card key={food._id} food={food} />
              )}
            </div>
        </div>
      </div>
    </>
  );
}
