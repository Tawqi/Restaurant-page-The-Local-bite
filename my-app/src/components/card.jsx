import { useState, useEffect } from "react";
import food1 from "../contents/pexels-xmtnguyen-2664216-removebg-preview.png";

export default function Card({ food }) {
  if (!food) return null;
  return (
    <>
      <div className="card flex flex-col justify-between bg-(--bg2) rounded-2xl shadow transition-transform duration-300 ease-in-out hover:rotate-[2deg] hover:origin-top-left h-100 w-[43vw] p-4 md:h-130 md:w-60 md:p-6">
        <div className="flex flex-col gap-4">
          <div className="h-30 flex justify-center items-center md:h-36">
            <img src={food.image} alt={food.name} className="h-full"></img>
          </div>
          <h2 className="font-semibold md:text-xl">{food.name}</h2>
          <ul className="flex flex-col text-(--text2) font-light list-disc list-inside">
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
          <button className="text-sm text-(--bg1) bg-(--primary) font-semibold p-2 px-2 rounded-xl text-center shadow transition transform hover:scale-105 duration-300 ease-in-out md:text-lg">
            Order Now
          </button>
        </div>
      </div>
    </>
  );
}
