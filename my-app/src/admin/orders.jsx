import Nav from "./admin_nav";
export default function Orders() {
    return (
        <>
        <Nav />
        <div className="sec2">
            <h1 className="mx-5 mb-5 font-semibold">Order Summary</h1>
            <div className="order_summary flex flex-col gap-3 p-2 rounded-2xl text-(--text1) bg-(--bg2) mx-5">
                <div className="head flex gap-10 py-2 px-4 text-(--text2) bg-(--bg3) rounded-xl">
                    <div className="id"># Order Id</div>
                    <div className="name">Customer</div>
                    <div className="total">Total</div>
                    <div className="item">Items</div>
                    <div className="date">Order Date</div>
                    <div className="payment">Payment</div>
                </div>
                
            </div>
        </div>
        </>
    )
};
