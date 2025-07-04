import { useState, useEffect } from "react";
import food1 from "../contents/pexels-xmtnguyen-2664216-removebg-preview.png";

export default function Card({food}) {
  if (!food) return null;
  return (
    <>
      <div className="card border-white bg-(--bg2) rounded-2xl p-5 flex flex-col gap-5 w-60 shadow">
        <div className="p-3">
          <img src={food.image} alt={food.name} className="w-full"></img>
        </div>
        <h2 className="text-xl font-semibold">{food.name}</h2>
        <p className="font-light text-(--text2)">{food.description}</p>
        <div className="flex justify-between items-center">
          <h3 className="text-xl">৳{food.price}</h3>
          <button className="text-(--bg1) bg-(--primary) font-semibold p-2 rounded-xl text-center shadow">
            Order Now
          </button>
        </div>
      </div>
    </>
  );
}
