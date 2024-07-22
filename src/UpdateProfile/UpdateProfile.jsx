import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";


function UpdateProfile() {
  const {updateUserProfile} = useContext(AuthContext)
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/"


  const onSubmit = data => {
    const name = data.name;
    const photoURL = data.photoURL;
    updateUserProfile(name,photoURL).then(() => {
     alert("updated Successfully")
      navigate(from,{replace: true})
    }).catch((error) => {
      // An error occurred
      // ...
    });
  };

  return (
    // center 
    <div className='flex justify-center items-center h-screen'>
    
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
          <h3 className='font-bold'>Update Your Profile</h3>
          <div className="form-control">
            <label className="label">Name</label>
            <input  {...register("name")} type="text" placeholder="your name" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Upload photo</span>
            </label>
            <input   {...register("photoURL")} type="text" placeholder="photoURL" className="input input-bordered" required />
            {/* TODO: uploading image will be later */}
            {/* <input type="file" className="file-input w-full max-w-xs" /> */}
          
          </div>
          <div className="form-control mt-6">
            <button className="btn gradientBg text-white">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateProfile