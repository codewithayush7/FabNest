import React from 'react'
import { ShopContext } from '../context/ShopContext'
import { useContext } from 'react'
import { useState } from 'react';
import Title from './Title';
import { useEffect } from 'react';
import ProductItem from './ProductItem';

const LatestCollection = () => {

    const { products } = useContext(ShopContext);
    const [LatestProducts, setLatestProducts] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,10));
    },[products])
    
  return (
    <div className='my-10 py-10'>
        <div className='text-center'>
            <Title text1={'LATEST '} text2={'COLLECTIONS'}/>
            <p className='text-[12px] text-gray-500 sm:text-[20px] mt-5'>Just Dropped — Be the First to Shop! Fresh Styles. Limited Stock. This Season's Must-Haves Are Here!</p>

        </div>

        <div className='grid grid-cols-2 grid-rows-3 sm:grid-cols-5 sm:grid-rows-2 gap-5 py-10'>
                {
                    LatestProducts.map((item,index)=>(
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                    ))

                }
        </div>
        
    </div>
  )
}

export default LatestCollection