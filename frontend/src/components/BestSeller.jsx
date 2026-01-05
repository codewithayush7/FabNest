import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { ShopContext } from '../context/ShopContext'
import { useContext } from 'react';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {

    const {products} = useContext(ShopContext);
    const [BestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct= products.filter((item)=>(item.bestseller));
        setBestSeller(bestProduct.slice(0,5));
    }, [products])
    

  return (
    <div>
        <div className='text-center'>
            <Title text1={'BEST'} text2={'SELLER'}/>
            <p className='text-[12px] text-gray-500 sm:text-[20px] mt-5'>These are the Best Sellers of the week! Fresh Styles. Limited Stock. Hurry up!</p>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-5 sm:grid-rows-1 gap-5 py-10'>
            {
                BestSeller.map((item,index)=>(
                    <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default BestSeller