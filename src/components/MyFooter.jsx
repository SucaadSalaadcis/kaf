import { Footer } from 'flowbite-react';
import {BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import { FaDribbble } from 'react-icons/fa6'
import logo from '../assets/img/logo.png'

function MyFooter() {
  return (
    <Footer className='bg-black text-white'>
    <div className="w-full px-4 lg:px-24">
      <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
        <div>
        <img src={logo} alt="" className='w-32 h-20 mr-10' />
          <Footer.LinkGroup col>
          <Footer.Link href="#" className='mt-3'>Address: mogadishu somalia</Footer.Link>
            <Footer.Link href="#" className='mt-3'>Phone: +2348</Footer.Link>
            <Footer.Link href="#" className='mt-3'>Email: kaaftoon@gmail.com</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div>
        <Footer.Title title="Useful Links" className='font-bold '  />
          <Footer.LinkGroup col>
            {/* mt-3 */}
            <Footer.Link href="#" className='mt-3'>Your Account</Footer.Link>
            <Footer.Link href="#" className='mt-3'>Privacy & Policy</Footer.Link>
            <Footer.Link href="#" className='mt-3'>Terms & Conditions</Footer.Link>
            <Footer.Link href="#" className='mt-3'>Refund Policy</Footer.Link>
            <Footer.Link href="#" className='mt-3'>How to participate</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div>
        <Footer.Title title="Useful Links" className='font-bold' />
          <Footer.LinkGroup col>
            <Footer.Link href="/home" className='mt-3'>Home</Footer.Link>
            <Footer.Link href="#" className='mt-3'>Orders</Footer.Link>
            <Footer.Link href="#" className='mt-3'>Contact</Footer.Link>
            <Footer.Link href="#" className='mt-3'>About</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <div>
        <Footer.Title title="Join our vibrant online  community" className='font-bold' />
          <Footer.LinkGroup col>
            <Footer.Link href="#" className='mt-3'>Follow our social media channels for</Footer.Link>
            <Footer.Link href="#" className='mt-3'>the latest updates and exclusive <br/> content.</Footer.Link>
            <Footer.Link href="#" className='mt-3'>Windows</Footer.Link>
            <Footer.Link href="#" className='mt-3'>MacOS</Footer.Link>
          </Footer.LinkGroup>
        </div>
      </div>
      <div className="w-full  gradientBg px-4 py-6 sm:flex sm:items-center sm:justify-between">
      <Footer.Copyright className='text-black font-bold' href="#" by="Kaaftoon" year={2024} />
        <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
          <Footer.Icon className='text-black' href="https://www.facebook.com/people/B4U-Online-LLC/61556972256025/?mibextid=LQQJ4d" icon={BsFacebook} />
          <Footer.Icon className='text-black' href="https://www.instagram.com/b4uonline1/?igsh=YjhnczNjNWU0cmVh&utm_source=qr" icon={BsInstagram} />
          <Footer.Icon className='text-black' href="#" icon={BsTwitter} />
          <Footer.Icon className='text-black' href="#" icon={BsGithub} />
          <Footer.Icon className='text-black' href="#" icon={FaDribbble} />
        </div>
      </div>
    </div>
  </Footer>
  )
}

export default MyFooter