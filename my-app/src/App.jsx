import { Routes, Route } from 'react-router-dom' // Sets up the page navigation
import Home from './pages/home'
import Menu from './pages/menu'
import Location from './pages/location'
import About from './pages/about'
import Order from './pages/order'
import Reservation from './pages/reservation'
import Cart from './pages/cart'
import ProductPage from './pages/product';
import Dashboard from "./admin/dashboard";
import Orders from "./admin/orders";
import Product_add from './admin/product_add'


function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/menu' element={<Menu/>} />
      <Route path='/location' element={<Location/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/reservation' element={<Reservation/>} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/order' element={<Order />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/orders" element={<Orders />} />
      <Route path='/admin/product_add' element={<Product_add />} />

      
     </Routes>
    </>
  )
}

export default App
