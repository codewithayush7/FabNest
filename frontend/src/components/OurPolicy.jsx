import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-evenly gap-30 sm:py-40 pt-20 pb-40 text-center'>
        <div>
            <img src={assets.exchange_icon} alt="" className='m-auto sm:w-15 w-12'/>
            <div className='mt-10 flex flex-col gap-4'>
                <p className='font-semibold'>Easy Exchange Policy</p>
                <p className='text-gray-400'>We offer hassle free exchange policy</p>
            </div>
        </div>
        <div>
            <img src={assets.quality_icon} alt=""className='m-auto sm:w-15 w-12' />
            <div className='mt-10 flex flex-col gap-4'>
                <p className='font-semibold'>7 Days Return Policy</p>
                <p className='text-gray-400'>We provide free 7 Days Return Policy</p>
            </div>
        </div>
        <div>
            <img src={assets.support_img} alt="" className='m-auto sm:w-15 w-12'/>
            <div className='mt-10 flex flex-col gap-4'>
                <p className='font-semibold'>Best Customer Support</p>
                <p className='text-gray-400'>We provide 24/7 customer support</p>
            </div>
        </div>

    </div>
  )
}

export default OurPolicy