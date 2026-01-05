import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline-flex gap-2 items-center text-[20px] sm:text-3xl'>
        <p className='text-gray-500'>{text1} <span className='text-gray-700 font-medium'>{text2}</span></p>
        <p className='bg-gray-700 h-[2px] w-8 sm:w-12'></p>
    </div>
  )
}

export default Title