import React from 'react'
import {assets} from '../assets/assets.js'

const Navbar = ({setToken}) => {
  return (
    <div>
      <div className='flex justify-between items-center sm:px-15 sm:py-2 p-2'>
        <img src={assets.logo} alt="" className='sm:w-40 w-33'/>
        <button onClick={()=>setToken('')} className='bg-gray-800 text-white cursor-pointer rounded-full sm:px-5 sm:py-2 text-[15px] px-2 py-1'>Logout</button>
      </div>
      <div className='bg-gray-200 w-full h-0.25'></div>
    </div>
  )
}

export default Navbar