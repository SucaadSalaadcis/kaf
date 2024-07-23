

import { useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../contexts/AuthProvider';
import Swal from 'sweetalert2'
import { useLocation, useNavigate } from 'react-router-dom';


function Product({product}){

   
  const location = useLocation();
  const navigate = useNavigate();
 

  const { _id, name, ImageURL, category, price } = product

  const { user } = useContext(AuthContext)

  
  // add to cart
  const handleAddtoCart = (item) => {
    // console.log("btn ",item)
    if (user && user.email) {
      const cartItem = { menuItemId: _id, name, quantity: 1, ImageURL, price,category, email: user.email }
      //  console.log(cartItem)
      fetch("https://kafoon.onrender.com/carts", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItem)
      }).then(res => res.json()).then((data) => {
        // console.log(data)
        if (data.menuItemId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Food added on the cart",
            showConfirmButton: false,
            timer: 1500
          });
        }
        else if (data.menuItemId === data.menuItemId) {
          Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "Product already exist in the cart",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    }
    // else {
    //   Swal.fire({
    //     title: "Please Login",
    //     text: "Without an account can't able to add products",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Signup Now!"
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       navigate('/signup',{state:{from:location}})
    //     }
    //   });
    // }

  }




    return (
        <div className='sm:mt-10   mt-10 w-full lg:h-[415px]   shadow-3xl p-3 rounded md:mt-20'>
          {/*  */}
    
          <img src={product.ImageURL} alt="demo"
            className=' lg:ml-1 mt-0 rounded-md  hover:transition-all duration-500 lg:w-[240px] lg:h-[240px]' />
          <p className='font-bold '>{product.name}</p>
          <p className='font-bold text-red-400'>{product.pcs}</p>
          <h1 className='font-bold text-green-400'>{product.price}</h1>
    
          <button  className=' gradientBg cursor-pointer px-20 text-white rounded mt-5 py-2 ' onClick={() => handleAddtoCart(product)}>Add to Cart</button>
    
          {/*  */}
        </div>
      )
}

export default Product