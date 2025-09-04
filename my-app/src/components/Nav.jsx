import { Link, useLocation } from 'react-router-dom';

export default function Nav() {
    const location = useLocation();
      const links = [
    { to: '/', label: 'Home', icon: 'fas fa-house-chimney' },
    { to: '/menu', label: 'Menu', icon: 'fas fa-utensils' },
    // { to: '/location', label: 'Location', icon: 'fas fa-location-dot' },
    { to: '/reservation', label: 'Reservation', icon: 'fas fa-bookmark' },
    { to: '/cart', label: 'Cart', icon: 'fas fa-cart-shopping' },
  ];

    return (
        <>
        <div className="phone-nav bg-(--bg2) fixed bottom-0 w-full h-18 items-center justify-center pt-2 rounded-t-2xl md:hidden">
          <ul className="flex justify-between gap-2">
            {links.map(({ to, label, icon }) => {
              const isActive = location.pathname === to;
              return (
                <li key={to} className="flex-1">
                  <Link
                    to={to}
                    className={`text-sm md:text-base lg:text-lg xl:text-xl flex flex-col items-center gap-2 p-3 ${
                      isActive
                        ? 'text-(--primary) font-bold'  // active color + bold
                        : 'text-(--text1) hover:text-(--primary)'
                    }`}>
                    <i className={icon}></i>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="top-nav hidden md:flex justify-between items-center py-3 px-5">
            <Link to="/" className='text-3xl font-bold'>The <span className='text-(--primary)'>Local</span> Bite</Link>
            <ul className='flex justify-between items-center gap-5'>
                <li><Link to="/" className='text-lg font-semibold'>Home</Link></li>
                <li><Link to="/menu" className='text-lg font-semibold'>Menu</Link></li>
                <li><Link to="/about" className='text-lg font-semibold'>About</Link></li>
                <li><Link to="/reservation" className='text-lg font-semibold'>
                <button className='bg-(--primary) text-(--bg1) flex rounded-xl px-3 py-1 transition transform hover:scale-105 duration-300 ease-in-out'>Reservation</button>
                </Link></li>
                <li><Link to="/cart">
          <i className="fas fa-cart-shopping text-2xl bg-(--bg3) p-3 rounded-xl"></i>
        </Link></li>
            </ul>
        </div>
        </>
    )
}
