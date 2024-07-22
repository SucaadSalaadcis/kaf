import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Slider.css';

// images
import laptop8 from "../assets/img/8L.png"


// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

 function Slider() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div className=''>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >


      <SwiperSlide><img className='md:w-[100%] md:h-[380px] ' src="https://img.freepik.com/premium-vector/black-friday-banner-with-spotlight-sale-text-product-podium_139523-709.jpg?w=826" alt="" /></SwiperSlide>
      <SwiperSlide><img className='md:w-[100%] md:h-[380px] ' src="https://img.freepik.com/free-psd/influencer-youtube-channel-art-design_23-2149489326.jpg?t=st=1716701324~exp=1716704924~hmac=1d751fd938827915028cfff6f073e8164cf9070a5b912970090eee9a2887ffeb&w=900" alt=""  /></SwiperSlide>
      <SwiperSlide><img className='md:w-[100%] md:h-[380px] ' src="https://img.freepik.com/free-psd/graphic-design-template-design_23-2150222552.jpg?t=st=1716700608~exp=1716704208~hmac=c6d23eb74908b8a912c82a5ab57aeff753565132ede9b07745bc70fce3ffebac&w=900" alt="" /></SwiperSlide>
      <SwiperSlide><img className='md:w-[100%] md:h-[380px] ' src="https://img.freepik.com/free-vector/8-august-shopping-day-flash-sale-design-with-3d-8-8-number-stage-podium-red-background_1314-3531.jpg?t=st=1716699853~exp=1716703453~hmac=ec261b1bf51deadfb4e520f513d4f71e3a1cea456676a79ae57c61e7e8b27834&w=996" alt="" /></SwiperSlide>
      <SwiperSlide><img className='md:w-[100%] md:h-[380px] ' src="https://img.freepik.com/premium-vector/new-laptop-sale-promotion-social-facebook-cover-banner_252779-424.jpg?w=996" alt=""  /></SwiperSlide>
      <SwiperSlide><img className='md:w-[100%] md:h-[380px] ' src="https://img.freepik.com/premium-vector/hand-typing-laptop-low-polygon-line_102957-131.jpg?w=900" alt=""  /></SwiperSlide>
      <SwiperSlide><img className='md:w-[100%] md:h-[380px] ' src="https://img.freepik.com/premium-vector/flat-design-realistic-banner-template_23-2150102688.jpg?w=900" alt=""  /></SwiperSlide>
      <SwiperSlide><img className='md:w-[100%] md:h-[380px] ' src={laptop8} alt="" /></SwiperSlide>
       
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div>
  );
}
export default Slider