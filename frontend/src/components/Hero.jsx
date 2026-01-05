import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='border-3 border-gray-200 w-full flex flex-wrap sm:flex'>
        {/* left subpart */}
        <div className='w-full sm:w-1/2 h-full'>
            <div className='text py-[5rem] px-[3rem] sm:px-[6rem] sm:py-[10rem]'>
                <div className='flex gap-2 items-center font-semibold'>
                    <hr className='w-10' /> 
                    <p>OUR BESTSELLERS</p>
                </div>
                <div className='py-5 font-semibold text-4xl sm:text-6xl prata-regular'>
                    Latest Arrivals
                </div>
                <div className='flex gap-2 items-center font-semibold'>
                    <p>SHOP NOW</p> 
                    <hr className='w-10' /> 
                </div>
            </div>
        </div>
        {/* right subpart */}
        <div className='w-full sm:w-1/2 h-full'>
            <img className='h-full w-full' src={assets.hero_img} alt="" />
        </div>
    </div>
  )
}

export default Hero