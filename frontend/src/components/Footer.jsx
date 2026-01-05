import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className=' flex flex-col gap-10 sm:grid sm:grid-cols-[3fr_1fr_1fr] mt-25 py-15 text-gray-600'>
            <div className=''>
                <img className='w-40' src={assets.logo} alt="" />
                <p className='mt-7 sm:w-lg'>At FOREVER, we believe shopping should feel like second nature—easy, joyful, and dependable. Whether you're chasing the latest trends or stocking up on your daily essentials, we're right here with you, every step of the way.</p>
            </div>

            <div>
                <h1 className='text-gray-900 text-xl font-bold'>COMPANY</h1>
                <div className='flex flex-col gap-2 mt-5 cursor-pointer'>
                    <div>Home</div>
                    <div>About us</div>
                    <div>Delivery</div>
                    <div>Privacy Policy</div>
                </div>
            </div>

            <div>
                <h1 className='text-gray-900 text-xl font-bold'>GET IN TOUCH</h1>
                <div className='flex flex-col gap-2 mt-5 cursor-pointer'>
                    <div>+1-212-564-7850</div>
                    <div>shouryaforever@gmail.com</div>
                </div>
            </div>
        </div>
        <div className='bg-gray-300 w-full h-0.25'></div>
        <p className='text-center p-5 text-gray-500'>Copyright 2024 © GreatStack.dev - All Right Reserved.</p>
    </div>
  )
}

export default Footer