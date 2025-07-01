import { Routes, Route } from 'react-router-dom' // Sets up the page navigation
import Home from './pages/home'
import Menu from './pages/menu'
import Location from './pages/location'
import About from './pages/about'
import Reservation from './pages/reservation'

function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/menu' element={<Menu/>} />
      <Route path='/location' element={<Location/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/reservaiton' element={<Reservation/>} />
     </Routes>
    </>
  )
}

export default App
