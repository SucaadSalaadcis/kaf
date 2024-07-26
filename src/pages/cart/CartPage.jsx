import React, { useContext, useState } from 'react'
import axios from "axios";
import UseCart from '../../hooks/UseCart'
import { FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { AuthContext } from '../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import { FiMinus } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";

// import { FaShoppingCart } from "react-icons/fa";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CartPage() {
    const [cart, refetch] = UseCart();
    // console.log(cart);

    const [cartItems, setCartitems] = useState([])
    const { user } = useContext(AuthContext);


    const handleIncrease = (item) => {
        // console.log(item)
        // console.log(item._id)
        fetch(`https://kafoon.onrender.com/carts/${item._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ quantity: item.quantity + 1 }), // body data type must match "Content-Type" header
        }).then(res => res.json()).then(data => {

            const updatedCart = cartItems.map((cartItem) => {
                if (cartItem.id === item.id) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + 1
                    }
                }
                return cartItem
            })
            refetch();
            setCartitems(updatedCart)
        })
        refetch();
    }
    const handleDecrease = (item) => {

        if (item.quantity > 1) {
            fetch(`https://kafoon.onrender.com/carts/${item._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ quantity: item.quantity - 1 }), // body data type must match "Content-Type" header
            }).then(res => res.json()).then(data => {

                const updatedCart = cartItems.map((cartItem) => {
                    if (cartItem.id === item.id) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity - 1
                        }
                    }
                    return cartItem
                })
                refetch();
                setCartitems(updatedCart)
            })
            refetch();
        } else {
            // alert("Item can't be zero")
            toast("Item can't be Zero", {
                position: "top-right",
                autoClose: 3000,
              });
        }
    }


    // calculate price
    const calculatePrice = (item) => {
        return item.price * item.quantity
    }

    // calculate total price 
    const cartSubTotal = cart.reduce((total, item) => {
        return total + calculatePrice(item)
    }, 0);
    const orderTotal = cartSubTotal;



    // delete item
    const handleDelete = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://kafoon.onrender.com/carts/${item._id}`).then(response => {
                    if (response) {
                        refetch();
                        Swal.fire("Deleted!", "Your file has been deleted.", "success");
                    }
                })
                    .catch(error => {
                        console.error(error);
                    });
            }
        });
    }

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 mb-[200px] '>

            {/* banner*/}
            <div className="">
                <div className="py-24 flex flex-col  items-center justify-center gap-8">
                    {/* texts */}
                    <div className=" px-4 space-y-7">
                        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
                            Items Added to The <span className="text-green">Cart</span>
                        </h2>
                    </div>

                </div>
            </div>
            {/*  */}
    {
        (cart.length > 0) ? <div>
            <div className="">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead className="bg-purple-500 text-white rounded-sm text-center" >
                            <tr>
                                <th>#</th>
                                <th>ImageURL</th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.ImageURL} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="font-medium">{item.name}</td>
                                    <td>
                                        <button className="btn btn-xs  "  onClick={() => handleDecrease(item)}> <FiMinus/>  </button>
                                        <input type="number" value={item.quantity} onChange={() => console.log(quantity)} className=' text-center w-12 mx-2 overflow-hidden appearance-none border-none' />
                                        <button className="btn btn-xs " onClick={() => handleIncrease(item)}> <FaPlus/></button>
                                    </td>
                                    <td>${calculatePrice(item).toFixed(2)}</td>
                                    <td>
                                        <button className="btn btn-sm border-none text-red bg-transparent" onClick={() => handleDelete(item)}>
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        {/* foot */}
                    </table>
                </div>
            </div>
            <hr />
            <div className="flex flex-col md:flex-row justify-between items-start my-12 gap-8">
                <div className="md:w-1/2 space-y-3">
                    <h3 className="text-lg font-semibold">Customer Details</h3>
                    <p>Name: {user?.displayName || "None"}</p>
                    <p>Email: {user?.email}</p>
                    <p> User_id: <span className="text-sm">{user?.uid}</span> </p>
                </div>
                <div className="md:w-1/2 space-y-3">
                    <h3 className="text-lg font-semibold">Shopping Details</h3>
                    <p>Total Items: {cart.length}</p>
                    <p> Total Price:{" "}
                        <span id="total-price">${orderTotal.toFixed(2)}</span>
                    </p>
                  <Link to={'/proceed'}> <button  className="btn btn-md bg-purple-500 text-white px-8 py-1"> 
                        Procceed to Checkout
                    </button> </Link>
                </div>
            </div>
        </div> : <div className="text-center mt-1">
           {/* <FaShoppingCart className='text-purple-500 text-9xl  md:ml-[500px] ml-24'/> */}
            <p className='font-bold text-2xl'>Your cart is empty</p>
            <p>Get some amazing products & offers..</p>
            <Link to="/menu"><button className="btn bg-purple-500 text-white mt-3">Start Shopping</button></Link>
        </div>
    }
            {/*  */}

        </div>
    )
}

export default CartPage





