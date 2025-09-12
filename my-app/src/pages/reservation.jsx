import Footer from "../components/footer";
import BNav from "../components/Bottom_Nav";
import TNav from "../components/Top_Nav";
import tablesImg from "../contents/tables.jpg";

export default function Reservation() {
  return (
    <>
      <TNav />
      <BNav />
      <div className="flex flex-col px-5 gap-6">
        <div className="sec1 flex flex-col gap-3 mt-5">
          <h1 className="text-3xl text-(--primary) font-bold">
            Reserver Your Table
          </h1>
          <p className="text-(--text2) font-light">
            Fill up the form to book your spot.
          </p>
        </div>
        <div className="flex gap-10 justify-between">
          <form className="flex flex-col gap-5 w-full">
            <label className="flex flex-col gap-2 md:text-xl">
              Name
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                required
                className="border bg-(--bg2) md:text-lg border-(--primary) font-thin px-4 py-2 rounded-xl"
              />
            </label>
            <label className="flex flex-col gap-2 md:text-xl">
              Phone Number
              <input
                type="tel"
                name="phone"
                placeholder="Your phone number"
                required
                className="border bg-(--bg2) md:text-lg border-(--primary) font-thin px-4 py-2 rounded-xl"
              />
            </label>
            <label className="flex flex-col gap-2 md:text-xl">
              Number of People
              <input
                type="number"
                name="people"
                placeholder="How many people will attend"
                min="1"
                required
                className="border bg-(--bg2) md:text-lg border-(--primary) font-thin px-4 py-2 rounded-xl"
              />
            </label>
            <div className="flex justify-between gap-3">
              <label className="flex flex-col gap-2 md:text-xl w-full">
                Date to Come
                <input
                  type="date"
                  name="date"
                  required
                  className="border bg-(--bg2) md:text-lg border-(--primary) font-thin px-4 py-2 rounded-xl"
                />
              </label>
              <label className="flex flex-col gap-2 md:text-xl w-full">
                Time to Come
                <input
                  type="time"
                  name="time"
                  required
                  className="border bg-(--bg2) md:text-lg border-(--primary) font-thin px-4 py-2 rounded-xl "
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 md:text-xl">
              Note (optional)
              <textarea
                name="note"
                rows="3"
                className="border bg-(--bg2) md:text-lg border-(--primary) font-thin px-4 py-2 rounded-xl"
              ></textarea>
            </label>
            <button
              type="submit"
              className="bg-(--primary) text-(--bg1) font-bold py-2 rounded-xl md:text-lg transition transform hover:scale-105 duration-300 ease-in-out"
            >
              Reserver
            </button>
          </form>
          <img
            src={tablesImg}
            className="hidden md:flex w-[50vw] rounded-2xl "
          ></img>
        </div>
      </div>
      <Footer />
    </>
  );
}
