import React, { useState } from 'react'
import { Label, TextInput, } from 'flowbite-react';

import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UploadElec() {
  const navigate = useNavigate()

 
  // handlebook submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const ImageURL = form.ElecImageURl.value;
    const name = form.ProductName.value;
    const category = form.category.value;
    const title = form.ProductTitle.value;
    const pcs = form.Pcs.value;
    const price = form.Price.value;

    console.log(ImageURL);

    const ElectronicObj = {
      ImageURL,
      name,
      category,
      title,
      pcs,
      price,
    }
    console.log(ElectronicObj);

    // send data to the database
    fetch("http://localhost:7000/electronic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ElectronicObj)
    }).then(res => res.json()).then(data => {
      toast("Uploaded Successfuly...", {
        position: "top-right",
        autoClose: 3000,
      });
      form.reset();
      navigate('/dashboard/manage')
    })


  }


  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A Product</h2>
      {/* form */}
      <form onSubmit={handleSubmit} className="flex lg:w-[900px] flex-col flex-wrap gap-4">
        {/* first row */}
        <div className='flex gap-8'>

          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="ElecImageURl" value="Image URL " className='text-lg' />
            </div>
            <TextInput id="imageurl" name='ElecImageURl' type="text" placeholder="Image URL" required />
          </div>
          {/* author name */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="name" value=" Name " className='text-lg' />
            </div>
            <TextInput id="name" name='ProductName' type="text" placeholder="Product Name" required />
          </div>
          {/* category */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="category" value=" Category " className='text-lg' />
            </div>
            <TextInput id="name" name='category' type="text" placeholder="category" required />
          </div>
           
        </div>

        {/* second row */}
        <div className='flex gap-8'>

          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="title" value="Title" className='text-lg' />
            </div>
            <TextInput id="title" name='ProductTitle' type="text" placeholder="Product Title'" required />
          </div>
          {/* third row */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="Pcs" value="Pcs" className='text-lg' />
            </div>
            <TextInput id="pcs" name='Pcs' type="text" placeholder="Enter Pcs" required />
          </div>
          {/* fourth row */}
          <div className='lg:w-1/2'>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Price" className='text-lg' />
            </div>
            <TextInput id="price" name='Price' type="text" placeholder="Enter Price" required />
          </div>
        </div>



        <button className='mt-5 bg-purple-500 text-white  h-10 font-extrabold' type="submit">Upload Product</button>

      </form>

    </div>
  )
}

export default UploadElec