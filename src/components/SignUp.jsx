import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Modal from './Modal';
import { MdOutlineClose } from "react-icons/md";
import { AuthContext } from '../contexts/AuthProvider';
import axios from 'axios';




function SignUp() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/"

    
    const {createUser,login, updateUserProfile,signUpWithGmail} = useContext(AuthContext);

    const onSubmit = data => {
        const email = data.email
        const password = data.password
        createUser(email,password).then((result) => {
            // Signed up 
            const user = result.user;
            // added
            updateUserProfile(data.email, data.photoURL).then(()=> {
               const userInfo = {
                name:data.name,
                email:data.email
               }
               axios.post('https://kafoon.onrender.com/users/', userInfo).then((res) => {
                // alert("account creation  Successfully done!")
                navigate(from,{replace: true})
                
              });
            });
            // end
            alert("Acount Creation Successfully done!")
            document.getElementById('my_modal_5').close();
            navigate(from,{replace: true})
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });

      
    };

    // login with google added
    const hangleRegister = () => {
        signUpWithGmail().then((result) => {
            const user = result.user;
         
                const userInfo = {
                 name: result?.user?.displayName,
                 email: result?.user?.email
                }
                axios.post('https://kafoon.onrender.com/users/', userInfo).then((res) => {
                 alert("Sign in successfully..")
                 navigate('/')
                 
               });
       

        }).catch((error) => {
           console.log(error)
          });
    }

    return (
        <div className='max-w-md bg-white shadow-xl w-full mx-auto flex items-center my-20 justify-center'>
            <div className="modal-action mt-0 flex flex-col justify-center">
                {/*  */}
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method='dialog'>
                    <h3 className='font-bold text-lg'>Create A Acount!</h3>
                    {/* name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input  {...register("name")} type="name" placeholder="name" className="input input-bordered" />
                    </div>
                    {/* email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input  {...register("email")} type="email" placeholder="email" className="input input-bordered" />
                    </div>
                    {/* password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input  {...register("password")} type="password" placeholder="password" className="input input-bordered" />
                        <label className="label mt-1">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    {/* error text */}

                    {/* login btn */}
                    <div className="form-control mt-6">
                        <input type='submit' value="Signup" className="btn bg-purple-500 text-white" />
                    </div>
                    <p className='text-center my-2 '> Have an account?
                        <button className='underline text-red ml-1' onClick={() => document.getElementById('my_modal_5').showModal()} >
                            Login
                        </button></p>
                    {/* close btn */}
                    <Link
                        to="/" className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
                        <MdOutlineClose className='text-2xl' />
                    </Link>
                </form>

                {/* social signin */}
                <div className='text-center space-x-3 mb-5'>
                    <button className="btn btn-circle hover:bg-purple-500 hover:text-white" onClick={hangleRegister}>
                        <FaGoogle />
                    </button>
                    <button className="btn btn-circle hover:bg-purple-500 hover:text-white">
                        <FaFacebookF />
                    </button>
                    <button className="btn btn-circle hover:bg-purple-500 hover:text-white">
                        <FaGithub />
                    </button>
                </div>

            </div>
            <Modal />
        </div>
    )
}

export default SignUp