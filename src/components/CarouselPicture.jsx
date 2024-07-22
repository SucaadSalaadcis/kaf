import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

function CarouselPicture({heading}) {

  const [electronics, setElectronics] = useState([]);

     const handleElectronics = () => {
      axios.get("https://kafoon.onrender.com/electronic/").then((response) => {
        setElectronics(response.data)
      }).catch((error) => console.log(error))
     }

    //  

    
     useEffect(()=> {
      handleElectronics();
     },[])


  // carousel
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear",

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
    <div className='w-[80%] m-auto '>
    <h2 className='text-4xl text-center font-bold text-black my-5 mt-20'>{heading}</h2>
    <div className='mt-20'>
    <Slider  {...settings} >
      {electronics.map((items) =>  (
        
        <div className='text-black rounded-xl' >
          <div className='h-56 rounded-t-xl flex justify-center items-center'>
          <Link> <img src={items.ImageURL}  onClick={window.scrollTo(0,0)} alt="" className='h-[200px] w-[200px] rounded-md'/></Link> 
          </div>

          <div className='flex flex-col justify-center items-center gap-1 p-4'>
            <p className="text-black text-sm font-bold text-center">{items.title}</p>
            <p className="text-orange-500 text-sm ">{items.pcs}</p>

            <div> 
            <span className="font-bold">${items.price}</span>  
            <del className="ml-2">$185.00</del>
           </div> 

          </div>
        </div>
      ))}
    </Slider>
    </div>
    </div>
 
      </>
  )
}

export default CarouselPicture