import { Link } from "react-router-dom";

export default function Top_Nav() {
  return (
    <>
      <div className="top-nav hidden md:flex justify-between items-center py-3 px-5">
        <Link to="/" className="text-3xl font-bold">
          The <span className="text-(--primary)">Local</span> Bite
        </Link>
        <ul className="flex justify-between items-center gap-5">
          <li>
            <Link to="/" className="text-lg font-semibold">
              Home
            </Link>
          </li>
          <li>
            <Link to="/menu" className="text-lg font-semibold">
              Menu
            </Link>
          </li>
          {/* <li>
            <Link to="/about" className="text-lg font-semibold">
              About
            </Link>
          </li> */}
          <li>
            <Link to="/reservation" className="text-lg font-semibold">
              Reservation
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <i className="fas fa-cart-shopping text-lg bg-(--bg3) p-3 rounded-xl"></i>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
