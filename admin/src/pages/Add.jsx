import React from 'react'
import { assets } from '../assets/assets'
import { useState } from 'react';
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({token}) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("Men")
  const [subCategory, setSubCategory] = useState("Topwear")
  const [bestseller, setBestseller] = useState(false)
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) =>{
    e.preventDefault();

    try {
      const formData = new FormData()

      formData.append("name",name)
      formData.append("description",description)
      formData.append("price",price)
      formData.append("category",category)
      formData.append("subCategory",subCategory)
      formData.append("bestseller",bestseller)
      formData.append("sizes",JSON.stringify(sizes))

      image1 && formData.append("image1",image1)
      image2 && formData.append("image2",image2)
      image3 && formData.append("image3",image3)
      image4 && formData.append("image4",image4)

      const response = await axios.post(backendUrl + "/api/product/add",formData,{headers:{token}})

      if(response.data.success){
        toast.success(response.data.message);
        setName('')
        setDescription('')
        setPrice('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setBestseller(false)
      }
      else{
        toast.error(response.data.message)
      }
      

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  }

  return (
  <div className='md:w-[85%] w-full h-full md:px-25 px-5 py-10 md:text-[18px] text-gray-600'>
    <form onSubmit={onSubmitHandler} className='flex flex-col gap-5'>
      <div>
        <p>Upload Image</p>
        <div className='flex gap-3 mt-3'>
          <label htmlFor="image1">
            <img className='w-20' src={image1 ? URL.createObjectURL(image1) : assets.upload_area} alt="" />
            <input onChange={(e)=>setImage1(e.target.files[0])} type="file" id="image1" hidden/>
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={image2 ? URL.createObjectURL(image2) : assets.upload_area} alt="" />
            <input onChange={(e)=>setImage2(e.target.files[0])} type="file" id="image2" hidden/>
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={image3 ? URL.createObjectURL(image3) : assets.upload_area} alt="" />
            <input onChange={(e)=>setImage3(e.target.files[0])} type="file" id="image3" hidden/>
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={image4 ? URL.createObjectURL(image4) : assets.upload_area} alt="" />
            <input onChange={(e)=>setImage4(e.target.files[0])} type="file" id="image4" hidden/>
          </label>
        </div>
      </div>
      <div>
        <p>Product name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='mt-3 bg-white md:w-md w-full border-2 border-gray-300 rounded-md md:px-5 md:py-2 px-3 py-2 md:text-[18px]' placeholder='Type here' required/>
      </div>
      <div>
        <p>Product Description</p>
        <textarea onChange={(e)=>setDescription(e.target.value)} value={description} className='mt-3 bg-white md:w-md w-full border-2 border-gray-300 rounded-md md:px-5 md:py-2 px-3 py-2 md:text-[18px]' placeholder='Write content here' required></textarea>
      </div>
      <div className='md:flex md:flex-row flex-col md:gap-10 gap-3'>
        <div >
          <span>Product category</span>
          <select onChange={(e)=>setCategory(e.target.value)} className='border-1 border-gray-300 w-full bg-white px-3 py-2 mt-3 block'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <span>Sub category</span>
          <select onChange={(e)=>setSubCategory(e.target.value)} className='border-1 border-gray-300 bg-white w-full px-3 py-2 mt-3 block'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <span>Product Price</span>
          <input onChange={(e)=>setPrice(e.target.value)} value={price} type="Number" className='border-1 border-gray-300 bg-white w-30 px-3 py-2 mt-3 block' placeholder='25' />
        </div>
      </div>
      <div>
        <p>Product Sizes</p>
        <div className='flex gap-3 mt-3'>
          <p onClick={()=>setSizes( prev => prev.includes("S") ? prev.filter( item => item !== "S") : [...prev,"S"])} className={`${sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"} py-2 px-3 cursor-pointer`} >S</p>
          <p onClick={()=>setSizes( prev => prev.includes("M") ? prev.filter( item => item !== "M") : [...prev,"M"])} className={`${sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"} py-2 px-3 cursor-pointer`}  >M</p>
          <p onClick={()=>setSizes( prev => prev.includes("L") ? prev.filter( item => item !== "L") : [...prev,"L"])} className={`${sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"} py-2 px-3 cursor-pointer`} >L</p>
          <p onClick={()=>setSizes( prev => prev.includes("XL") ? prev.filter( item => item !== "XL") : [...prev,"XL"])} className={`${sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"} py-2 px-3 cursor-pointer`}  >XL</p>
          <p onClick={()=>setSizes( prev => prev.includes("XXL") ? prev.filter( item => item !== "XXL") : [...prev,"XXL"])} className={`${sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"} py-2 px-3 cursor-pointer`}  >XXL</p>
        </div>
      </div>
      <div className='flex gap-2'>
        <input onChange={()=>setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='checkbox'/>
        <label htmlFor="checkbox" className='cursor-pointer'>Add to Bestseller</label>
      </div>
      <div className='mt-2'>
        <button type='submit' className='bg-black text-white py-4 px-10 cursor-pointer'>ADD</button>
      </div>
      
    
    </form>
  </div>
    
  )
}

export default Add