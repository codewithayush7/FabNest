import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { NavLink,Link } from 'react-router-dom'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {

  const [visible, setvisible] = useState(false);

  const {setShowSearch, getCartCount, token, setToken, setCartItem, navigate}= useContext(ShopContext);

  const logout = ()=>{
    navigate('/login')
    localStorage.removeItem('token')
    setToken('')
    setCartItem({})

  }

  return (
    <div className=' py-10 flex justify-between items-center'>
        <NavLink to='/'>
          <img src={assets.logo} className='h-12 sm:h-15' alt="" />

        </NavLink>

        <ul className='hidden md:flex gap-10 text-lg font-semibold'>
            <NavLink to='/' className="flex flex-col gap-2 items-center">
                <p>HOME</p>
                <hr className='h-1 w-1/2 hidden' />
            </NavLink>
            <NavLink to='/collection' className="flex flex-col gap-2 items-center">
                <p>COLLECTION</p>
                <hr className='h-1 w-1/2 hidden' />
            </NavLink>
            <NavLink to='/about' className="flex flex-col gap-2 items-center">
                <p>ABOUT</p>
                <hr className='h-1 w-1/2 hidden' />
            </NavLink>
            <NavLink to='/contact' className="flex flex-col gap-2 items-center">
                <p>CONTACT</p>
                <hr className='h-1 w-1/2 hidden' />
            </NavLink>
        </ul>

        <div className='flex gap-5 sm:gap-7 items-center'>
          <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='h-5 cursor-pointer' alt="" />
          
          <div className='group relative'>
            <Link to='/login' ><img onClick={()=> token ? null: navigate('/login')} src={assets.profile_icon} className='h-5 cursor-pointer' alt="" /></Link>
            {/* dropdown_menu */}
            {token && 
            <div className='group-hover:block absolute hidden dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 bg-slate-100 w-36 px-5 py-3 text-gray-700'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>}
          </div>
          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='h-5 cursor-pointer' alt="" />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[10px]'>{getCartCount()}</p>
          </Link>
          <img onClick={()=>setvisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer md:hidden' alt="" />

          {/* sidebar menu for small devices */}
          <div className={`border-2 border-black absolute right-0 top-0 bottom-0 bg-white w-full ${visible ? 'block' : 'hidden'}`}>
              <div className='flex flex-col gap-5 '>
                <div onClick={()=>setvisible(false)} className='flex gap-2 text-gray-700 text-lg items-center px-4 pt-2'>
                  <img className='h-5' src={assets.dropdown_icon} alt="" />
                  <p>Back</p>
                </div>
                
                <NavLink className='px-5 py-2' onClick={()=>setvisible(false)} to="/">HOME</NavLink>
                <NavLink className='px-5 py-2' onClick={()=>setvisible(false)} to="/collection">COLLECTION</NavLink>
                <NavLink className='px-5 py-2' onClick={()=>setvisible(false)} to="/about">ABOUT</NavLink>
                <NavLink className='px-5 py-2' onClick={()=>setvisible(false)} to="/contact">CONTACT</NavLink>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Navbar