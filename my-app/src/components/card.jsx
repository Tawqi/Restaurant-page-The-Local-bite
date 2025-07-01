import food1 from "../contents/pexels-xmtnguyen-2664216-removebg-preview.png";
export default function Card() {
  return (
    <>
      <div className="card bg-(--bg2) rounded-2xl p-5 flex flex-col gap-[5vw] w-60 shodow">
        <div className="p-3">
          <img src={food1} className="w-full"></img>
        </div>
        <h2 className="text-xl font-semibold">Special Noodles</h2>
        <p className="font-light text-(--text2)">
          Stir-fried noodles tossed with fresh vegetables, savory sauce, and
          your choice of protein.
        </p>
        <div className="flex justify-between items-center">
          <h3 className="text-xl">৳700.00</h3>
          <button className="text-(--bg1) bg-(--primary) font-semibold p-2 rounded-xl text-center shadow">
            Order Now
          </button>
        </div>
      </div>
    </>
  );
}
