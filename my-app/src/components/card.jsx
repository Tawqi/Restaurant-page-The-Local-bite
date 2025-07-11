import { useState, useEffect } from "react";
import food1 from "../contents/pexels-xmtnguyen-2664216-removebg-preview.png";

export default function Card({food}) {
  if (!food) return null;
  return (
    <>
      <div className="card bg-(--bg2) rounded-2xl flex flex-col justify-between w-39 h-100 max-w-120 p-4 shadow">
        <div className="flex flex-col gap-3">
          <div className="h-30 flex justify-center items-center">
          <img src={food.image} alt={food.name} className="h-full"></img>
        </div>
        <h2 className="font-semibold">{food.name}</h2>
        <ul className="flex flex-col text-(--text2) font-light list-disc list-inside">
          {food.ingredients.slice(0,4).map((item, index) => (
          <li className="text-sm" key={index}>{item}</li>
        ))}
        </ul>  
        </div>      
        <div className="flex flex-col gap-3">
          <h3 className="text-xl flex items-center">
            <span className="text-xl">৳</span>{food.price}</h3>
          <button className="text-sm text-(--bg1) bg-(--primary) font-semibold p-1 px-2 rounded-xl text-center shadow">
            Order Now
          </button>
          </div>
      </div>
    </>
  );
}
