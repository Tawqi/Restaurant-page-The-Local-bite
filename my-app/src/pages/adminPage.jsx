export default function AdminPage() {
  return (
    
    <>
    <nav className="flex justify-center p-3 bg-(--primary) text-3xl font-bold">Admin Page</nav>
    <div className="sec1 flex m-5">
      <div className="form flex flex-col gap-3 w-[40vw] border border-yellow-500 rounded-3xl p-5">
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <p>Fill up the form to add new product</p>
        <form action="/addProduct" method="post" className="flex flex-col gap-3">
          
          <label className="ml-2 text-xl font-bold" htmlFor="name">Product Name</label>
          <input
            className="border border-yellow-500 rounded-2xl p-3"
            id="name"
            name="name"
            type="text"
            placeholder="Product name"
            required
          />

          <label className="ml-2 text-xl font-bold" htmlFor="ing">Ingredients</label>
          <input
            className="border border-yellow-500 rounded-2xl p-3"
            id="ing"
            name="ingredients"
            type="text"
            placeholder="Ingredients (comma-separated)"
            required
          />
          <label className="ml-2 text-xl font-bold" htmlFor="desc">Description</label>
          <input
            className="border border-yellow-500 rounded-2xl p-3"
            id="desc"
            name="description"
            type="text"
            placeholder="Description"
          />

          <label className="ml-2 text-xl font-bold flex items-center gap-2" htmlFor="price">
            <i className="fa-solid fa-bangladeshi-taka-sign"></i>Price
          </label>
          <input
            className="border border-yellow-500 rounded-2xl p-3"
            id="price"
            name="price"
            type="number"
            placeholder="Price"
            step="0.01"
            required
          />

          <label className="ml-2 text-xl font-bold" htmlFor="image">Image URL</label>
          <input
            className="border border-yellow-500 rounded-2xl p-3"
            id="image"
            name="image"
            type="url"
            placeholder="Image URL"
          />

          <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="available"
                id="available"
                className="w-5 h-5 accent-yellow-500 rounded"
              />
              <span className="text-xl font-bold">Available</span>
            </label>


          <input
            className="bg-yellow-500 text-white font-semibold rounded-2xl p-3 hover:bg-yellow-600 cursor-pointer"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
    </>
  );
}
