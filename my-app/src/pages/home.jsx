import Nav from '../components/Nav'
import Card from '../components/card'
import Footer from '../components/footer'
import herobg from '../contents/pexels-pixabay-262918.jpg';

export default function Home() {
    return (
        <>
        <Nav />
        <div style={{ backgroundImage: `url(${herobg})` }} 
        className="heroSec bg-cover bg-center h-[85vh] rounded-b-2xl text-shadow-2xs flex flex-col items-center justify-center">
            <h1 className='text-[2.7rem] font-bold text-center'>The <span className='text-(--primary)'>Local</span> Bite</h1>
            <p className='text-center text-(--text2) font-semibold'>Serving fresh, flavorful dishes made with local ingredients in a warm, welcoming space.</p>
        </div>
        <div className="sec2 mt-10 mx-5 flex flex-col gap-[5vw]">
            <h1 className='text-3xl font-bold'>Popular Dishes</h1>
            <Card />
            <div className="flex ">
                <button className='text-xl font-bold text-center text-(--bg1) bg-(--primary) rounded-2xl p-3 shadow'>View More</button>
            </div> 
        </div>
        <div className="sec3 mt-10 mx-5 flex flex-col gap-5">
            <h1 className='text-3xl font-bold'>Reserve Your Table</h1>
            <p className='font-light text-(--text2)'>Book your spot in seconds and enjoy a hassle-free dining experience.</p>
            <div className="flex ">
             <button className='text-xl font-bold text-center text-(--bg1) bg-(--primary) rounded-2xl p-3 shadow'>Make Reservation</button>
            </div>
        </div>
        <div className="sec4 mt-10 mx-5 flex flex-col gap-5">
            <h1 className='text-3xl font-bold'>Find Us</h1>
            <p className='font-light text-(--text2)'>Visit us at our central location—easy to reach and always welcoming.</p>
            <div className="mapframe w-full aspect-[1/1] sm:aspect-[16/9]">
              <iframe
                className="w-full h-full rounded-2xl"
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15049.146055375091!2d90.49020151546053!3d23.63365779449645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1747561330008!5m2!1sen!2sbd"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
        </div>
        <Footer />
        </>
    )
}
