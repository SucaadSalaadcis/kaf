import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile({ user }) {
    const {logOut} = useContext(AuthContext)
    const handleLogout = () => {
      logOut().then(() => {
        // logout successful.
        toast("Logout Successfuly...", {
            position: "top-right",
            autoClose: 3000,
        });
      }).catch((error) => {
        // An error happened.
        toast(error, {
            position: "top-right",
            autoClose: 3000,
        });
      });
    }
    return (
        <div>
            <div className="drawer drawer-end z-50">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost btn-circle avatar ">
                    <div className="w-10 rounded-full">
                        {/* means if user found my image if not the avatar image*/}
                       {
                        user.photoURL ?  <img alt="Tailwind CSS Navbar component" src={user.photoURL} /> :  <img alt="Tailwind CSS Navbar component" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                       }
                    </div>
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <li><a href='/update-profile'>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Profile