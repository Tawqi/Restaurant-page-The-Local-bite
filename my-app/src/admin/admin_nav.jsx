import { Link } from "react-router-dom";

export default function admin_nav() {
    return (
        <>
      <div className="top-nav hidden md:flex justify-between items-center py-3 px-5">
        <Link to="/" className="text-3xl font-bold">
          <span className="text-blue-600">Admin Pannel</span>
        </Link>
        <ul className="flex justify-between items-center gap-5">
          <li>
            <Link to="/admin/dashboard" className="text-lg font-semibold">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/product_add" className="text-lg font-semibold">
              Add Product
            </Link>
          </li>
          <li>
            <Link to="/admin/orders" className="text-lg font-semibold">
              Orders
            </Link>
          </li>
        </ul>
      </div>
    </>
    )
};
