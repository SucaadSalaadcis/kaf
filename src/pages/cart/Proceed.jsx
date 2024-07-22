import { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UseCart from "../../hooks/UseCart";


function Proceed() {
  const [cart] = UseCart();
  console.log(cart);

  // calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity
  }

  // calculate total price 
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item)
  }, 0);
  const orderTotal = cartSubTotal;


  //   const cartTotal = cart.reduce((sum, item) => sum + item.price, 0 );
  //   console.log(cartTotal)

  const [PhonePaid, setPhonePaid] = useState('')
  const [amountPaid, setamountPaid] = useState('')


  const navigate = useNavigate();

  // post
  const handlePost = (e) => {
    e.preventDefault();
    const data = {
      PhonePaid,
      amountPaid,
    }
    axios.post("http://localhost:7000/onlinePayment/", data).then(() => {

      toast("Paid Successfuly 😎...", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/");
    }).catch((error) => console.log(error))
  }



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-6">Checkout</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Billing Details */}
          <div className="flex-grow bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Billing details</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input type="text" value={PhonePaid} onChange={(e) => setPhonePaid(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Money</label>
                <input type="text" value={amountPaid} onChange={(e) => setamountPaid(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
              </div>
              <button onClick={handlePost} className="btn btn-md bg-purple-500 text-white px-8 py-1" >Place Order</button>


            </form>
          </div>
          
          {/* Order Summary and Payment Methods */}
          <div className="flex flex-col flex-grow">

            <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
              <h2 className="text-xl font-semibold mb-4">Your order</h2>
              <div className="space-y-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${orderTotal}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Number Of Items  {cart.length}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Proceed;
