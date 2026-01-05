import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div className='py-5 flex flex-col gap-10 sm:gap-15'>
      
      <div className='flex justify-center'>
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className='flex flex-col sm:flex-row gap-15 sm:justify-center '>
        {/* left side */}
        <div className='sm:w-120 '>
          <img src={assets.contact_img} alt="" />
        </div>

        {/* right side */}
        <div className='flex flex-col gap-7 text-[15px] sm:text-[17px] text-gray-500 justify-center'>

          <b className='text-black text-xl'>Our Store</b>

          <div>
            <p>54709 Willms Station</p>
            <p>Suite 350, Washington, USA</p>
          </div>
          
          <div>
            <p>Tel: (415) 555-0132</p>
            <p>Email: admin@forever.com</p>
          </div>
          
          <b className='text-black text-xl'>Careers at Forever</b>
          <p>Learn more about our teams and job openings.</p>

          <div>
            <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer">Explore Jobs</button>
          </div>
        </div>
      </div>

      <div className='py-10 mt-10 sm:mt-2'>
        <NewsLetterBox/>
      </div>

    </div>
  )
}

export default Contact