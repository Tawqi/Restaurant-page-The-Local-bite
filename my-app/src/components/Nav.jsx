import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <>
        <div className="phone-nav bg-(--bg2) fixed bottom-0 w-full h-18 items-center justify-center pt-2 rounded-t-2xl md:hidden">
            <ul className="flex justify-between gap-2">
                <li className="flex-1"><Link to="/" className="text-(--text1) hover:text-(--primary) text-sm md:text-base lg:text-lg xl:text-xl flex flex-col items-center gap-2 p-3"><i className="fas fa-house-chimney"></i>Home</Link></li>
                <li className="flex-1"><Link to="/menu" className="text-(--text1) hover:text-(--primary) text-sm md:text-base lg:text-lg xl:text-xl flex flex-col items-center gap-2 p-3"><i className="fas fa-utensils"></i>Menu</Link></li>
                <li className="flex-1"><Link to="/location" className="text-(--text1) hover:text-(--primary) text-sm md:text-base lg:text-lg xl:text-xl flex flex-col items-center gap-2 p-3"><i className="fas fa-location-dot"></i>Location</Link></li>
                <li className="flex-1"><Link to="/adminpage" className="text-(--text1) hover:text-(--primary) text-sm md:text-base lg:text-lg xl:text-xl flex flex-col items-center gap-2 p-3"><i className="fas fa-bookmark"></i>Reservation</Link></li>
            </ul>
        </div>
        </>
    )
}
