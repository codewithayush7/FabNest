import React from 'react'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[18%] border-r-2 border-gray-200 font-bold'>
        <div className='md:pl-15 min-h-screen pl-5 pt-5 md:pt-10 flex flex-col gap-5'>
            <NavLink className='border-2 border-gray-300 border-r-0 p-2 rounded-l-2xl flex gap-5' to="/add">
                <img src={assets.add_icon} alt="" className='w-5 md:w-6'/>
                <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink className='border-2 border-gray-300 border-r-0 p-2 rounded-l-2xl flex gap-5' to="/list">
                <img src={assets.order_icon} alt="" className='w-5 md:w-6'/>
                <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink className='border-2 border-gray-300 border-r-0 p-2 rounded-l-2xl flex gap-5' to="/orders">
                <img src={assets.order_icon} alt="" className='w-5 md:w-6'/>
                <p className='hidden md:block'>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar