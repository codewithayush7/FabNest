import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div className='py-5 flex flex-col gap-10 sm:gap-15'>
      
      <div className='flex justify-center'>
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className='flex flex-col sm:flex-row gap-15'>
        {/* left side */}
        <div className='sm:w-120 '>
          <img src={assets.about_img} alt="" />
        </div>

        {/* right side */}
        <div className='flex flex-col gap-5 text-[15px] sm:text-[17px] text-gray-500 justify-center sm:w-150'>
          <p>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <p>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <b className='text-black'>Our Mission</b>
          <p>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>
        </div>
      </div>

      <div className='flex flex-col gap-10 mt-5 sm:mt-5'>
        <Title text1={"WHY"} text2={"CHOOSE US"} />
        <div className='flex sm:flex-row flex-col text-[15px]'>
          <div className='border-1 border-gray-300 flex flex-col items-center justify-center gap-5 text-gray-500 p-10 sm:py-15 sm:px-12 sm:w-1/3'>
            <b className='text-black'>Quality Assurance:</b>
            <p>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
          </div>
          <div className='border-1 border-gray-300 flex flex-col items-center justify-center gap-5 text-gray-500 p-10 sm:py-15 sm:px-12 sm:w-1/3'>
            <b className='text-black'>Convenience:</b>
            <p>With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
          </div>
          <div className='border-1 border-gray-300 flex flex-col items-center justify-center gap-5 text-gray-500 p-10 sm:py-15 sm:px-12 sm:w-1/3'>
            <b className='text-black'>Exceptional Customer Service:</b>
            <p>Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.</p>
          </div>
        </div>
      </div>

      <div className='py-10 mt-5 sm:mt-0'>
        <NewsLetterBox/>
      </div>

    </div>
  )
}

export default About