import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler= (event)=>{
        event.preventdefault();
    }

  return (
    <div className='text-center flex flex-col gap-4'>
        <p className='text-3xl font-bold'>Subscribe now & get 20% off</p>
        <p className='text-gray-500'>This is limited time offer! Hurry up and join Forever for extensive features.</p>
        <form onSubmit={onSubmitHandler} className='mt-7 '>
            <input type="text" className='border-2 border-gray-300 placeholder:text-gray-300 px-2 sm:py-3 py-2 sm:w-1/3' placeholder='Enter your email id' />
            <button type='submit' className='bg-black text-white sm:py-3 py-2 px-2 sm:px-5 border-2 border-black cursor-pointer'>SUBSCRIBE</button>
        </form>
    </div>
  )
}

export default NewsLetterBox