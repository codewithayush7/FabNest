import React from 'react'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { useState,useEffect } from 'react';
import axios from 'axios';

const List = ({token}) => {

  const [list, setList] = useState([]);

  const fetchList = async () =>{
    try {
      const response = await axios.get(backendUrl + "/api/product/list")
      
    if(response.data.success){
      setList(response.data.products);
    }
    else{
      toast.error(response.data.message);
    }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

    
  }

  const removeProduct = async (id)=>{
    try {
      
      const response = await axios.post(backendUrl + "/api/product/remove",{id},{headers:{token}})

      if(response.data.success){
        toast.success(response.data.message)
        await fetchList();
      }
      else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])
  

  return (
    <div className='md:px-25 px-5 py-10 w-full h-full flex flex-col'>
      <h1 className='mb-2 text-lg'>All Products List</h1>
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] bg-gray-200 w-full h-8 items-center text-sm text-center'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {
        list.map((item,index)=>(
          <div key={index} className='grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center text-center border pl-4 border-gray-200 gap-5 text-sm mt-2'>
            <img className='w-20 ml-5' src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{currency}{item.price}</p>
            <p className='cursor-pointer' onClick={()=>removeProduct(item._id)}>X</p>
          </div>
        ))
      }

    </div>
  )
}

export default List