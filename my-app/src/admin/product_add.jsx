import { useState } from "react";
import Nav from "./admin_nav";

export default function ProductAdd() {
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    description: "",
    category: "",
    price: "",
    image: "",
    available: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const ingredientList = formData.ingredients
    ? formData.ingredients.split(",").map((ing) => ing.trim())
    : [];

  return (
    <>
      <Nav />
      <div className="sec1 flex m-5 gap-20">
        {/* Form */}
        <div className="form flex flex-col gap-3 w-[40vw] bg-(--bg2) rounded-3xl p-5">
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <p>Fill up the form to add new product</p>
          <form className="flex flex-col gap-3">
            <label className="ml-2 text-xl">Product Name</label>
            <input
              className="bg-(--bg3) rounded-2xl p-3"
              name="name"
              type="text"
              placeholder="Product name"
              value={formData.name}
              onChange={handleChange}
            />

            <label className="ml-2 text-xl">Ingredients</label>
            <input
              className="bg-(--bg3) rounded-2xl p-3"
              name="ingredients"
              type="text"
              placeholder="Ingredients (comma-separated)"
              value={formData.ingredients}
              onChange={handleChange}
            />

            <label className="ml-2 text-xl">Description</label>
            <input
              className="bg-(--bg3) rounded-2xl p-3"
              name="description"
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />

            <label className="ml-2 text-xl">Category</label>
            <input
              className="bg-(--bg3) rounded-2xl p-3"
              name="category"
              type="text"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
            />

            <label className="ml-2 text-xl flex items-center gap-2">
              ৳Price
            </label>
            <input
              className="bg-(--bg3) rounded-2xl p-3"
              name="price"
              type="number"
              placeholder="Price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
            />

            <label className="ml-2 text-xl">Image URL</label>
            <input
              className="bg-(--bg3) rounded-2xl p-3"
              name="image"
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
            />

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="available"
                checked={formData.available}
                onChange={handleChange}
                className="w-5 h-5 accent-green-500 rounded"
              />
              <span className="text-xl font-bold">Available</span>
            </label>

            <input
              className="bg-blue-600 text-white font-semibold rounded-2xl p-3 hover:bg-yellow-600 cursor-pointer"
              type="submit"
              value="Submit"
            />
          </form>
        </div>

        {/* Preview */}
        <div className="preview flex flex-col gap-15">
          <div className="imgsec bg-(--bg2) h-90 w-90 flex items-center justify-center rounded-b-2xl md:rounded-2xl">
            {formData.image ? (
              <img src={formData.image} alt={formData.name} className="px-10 pb-5 object-contain h-full" />
            ) : (
              <span className="text-(--text2)">Image Preview</span>
            )}
          </div>

          <div className="textsec flex flex-col gap-4">
            <div className="name_price flex flex-col gap-2">
              <h1 className="text-2xl font-semibold md:text-3xl">{formData.name || "Product Name"}</h1>
              <h2 className="text-2xl text-(--primary) md:text-3xl">
                {formData.price ? `৳${formData.price}` : "৳Price"}
              </h2>
            </div>

            <div className="text-sec2 flex flex-col gap-4">
              <h2 className="text-xl text-(--text2) font-md md:text-2xl">Ingredients:</h2>
              <ul className="list-disc pl-5 flex flex-col gap-1">
                {ingredientList.length
                  ? ingredientList.map((item, i) => (
                      <li className="text-(--text3) md:text-lg" key={i}>
                        {item}
                      </li>
                    ))
                  : "Ingredients ....."}
              </ul>
              <p className="text-(--text2)">{formData.description || "Description will appear here"}</p>
              <p className="text-(--text2)">Category: {formData.category || "Category"}</p>
              <p className="text-(--text2)">Available: {formData.available ? "Yes" : "No"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
