
import React, { useContext, useState } from 'react';
import { FaUser, FaHeart, FaShoppingCart, FaRegUser } from 'react-icons/fa';

import { HiBars3 } from "react-icons/hi2";
import { HiOutlineXMark } from "react-icons/hi2";

import { Link } from 'react-router-dom'

import Profile from "./Profile";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import UseCart from '../hooks/UseCart';


const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  const [cart, refetch] = UseCart();

  // now we are using data by user 
  const { user } = useContext(AuthContext);
  // console.log(user.phoneNumber);



  return (
    <nav className="gradientBg p-4">
      <div className="container mx-auto flex justify-around items-center">
        <div className="flex items-center space-x-4">
          <div className="text-white text-3xl font-bold">Kaaftoon</div>
          <input
            type="text"
            placeholder="Search for products"
            className="hidden md:block px-28  py-2 rounded-md w-full max-w-2xl"
          />
        </div>
        <div className="hidden md:flex space-x-7 text-white items-center ">
          <div className="flex space-x-2 items-center">
            <Link to={'/'}> <span>Home</span> </Link>
          </div>
          <div className="flex space-x-2 items-center">
            <Link to={'/menu'}> <span>Shop</span> </Link>
          </div>
          <div className="flex space-x-2 items-center">
            <Link to={'/about'}> <span>About</span> </Link>
          </div>
          <div className="flex space-x-2 items-center">
            <Link to={'/'}> <span>Contect Us</span> </Link>
          </div>

          {/* desyUI cart */}
          <label tabIndex={0}
            className="btn btn-ghost btn-circle hidden  lg:flex ">
            <div className="indicator">
              <Link to={"/cart-page"}><svg xmlns="http://www.w3.org/2000/svg" className=" hover:text-black h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"  >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg> </Link>

              <span className="badge badge-sm indicator-item">{cart.length || 0}</span>
            </div>
          </label>

          {/* heart */}
          <div className="flex  items-center ">
            <FaHeart className='hover:text-red-600 text-xl' />
          </div>


          {/*login*/}
          <div className="flex items-center">
            {
              user ? <Profile user={user} /> : <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn flex items-center gap-2 rounded-full px-6 gradientBg text-white">
                <FaRegUser /> <span className='cursor-pointer'>Login / Register</span>
              </button>
            }
          </div>



          {/*   <ol className='text-3xl'>
            <Link to="/cart">
              <i class="fa-solid fa-cart-shopping">{cartItems.length}</i>
            </Link>
          </ol> */}

        </div>

        <Modal />




        {/* mobile phone responsive */}

        <div className="md:hidden">
          <button onClick={() => setNavOpen(!navOpen)} className="text-white">
            {navOpen ? <HiOutlineXMark className='text-3xl font-bold' /> : <HiBars3 className='text-3xl font-bold' />}
          </button>
        </div>

      </div>

      {navOpen && (
        <div className="md:hidden bg-purple-900 p-4">
          <input
            type="text"
            placeholder="Search for products"
            className="px-10 py-2 rounded-md w-full mb-4"
          />
          <div className="flex flex-col space-y-2 text-white">
            <div className="flex justify-between items-center">
              <Link to={'/'}> <span>Home</span> </Link>
            </div>
            <Link to={'/about'}> <span>About</span> </Link>
            <div className="flex justify-between items-center">
              <Link to={'/'}> <span>Contact Us</span> </Link>
            </div>
            <div className="flex space-x-2 items-center">
              <Link to={'/menu'}> <span>Shop</span> </Link>
            </div>

            <div className="flex items-center">
              {
                user ? <Profile user={user} /> : <button onClick={() => document.getElementById('my_modal_5').showModal()} className="btn flex items-center gap-2 rounded-full px-6 gradientBg text-white">
                  <FaRegUser /> <span className='cursor-pointer'>Login / Register</span>
                </button>
              }
            </div>
            <FaHeart className='hover:text-red-600' />
            <FaShoppingCart className='hover:text-black' />
          </div>

        </div>
      )}
    </nav>
  );
};

export default Header;










