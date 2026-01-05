import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const {Search, setSearch, ShowSearch, setShowSearch}= useContext(ShopContext);
    const [Visible, setVisible] = useState();
    const location= useLocation();

    useEffect(() => {
      if(location.pathname.includes('collection') && ShowSearch){
        setVisible(true);
      }
      else{
        setVisible(false);
      }
    }, [location])
    

  return ShowSearch && Visible ? (
    <div className='py-10 flex justify-center items-center'>
      <div className='border-2 py-1 w-70 sm:py-2 sm:w-150 border-gray-400 rounded-full flex'>
        <input value={Search} onChange={(e)=>setSearch(e.target.value)} className='w-full outline-none px-5'/>
        <img src={assets.search_icon} className='w-5 mr-3 cursor-pointer' />
      </div>
      <img onClick={()=>setShowSearch(false)} src={assets.cross_icon} className='cursor-pointer w-4 ml-5'/>
    </div>
  ) : null
}

export default SearchBar