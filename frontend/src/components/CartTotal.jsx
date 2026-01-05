import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

    const {currency,delivery_fee,getCartAmount,navigate} = useContext(ShopContext);

  return (
    <div className='mt-10 text-[15px]'>
        <div>
            <Title text1={"CART"} text2={"TOTAL"}/>
        </div>

        <div className='py-8 flex flex-col'>
            <div className='flex flex-row sm:gap-100 justify-between'>
                <div>Subtotal</div>
                <div>{currency} {getCartAmount()}.00</div>
            </div>

            <div className='flex flex-row justify-between border-b border-t border-gray-300 py-2'>
                <div>Shipping Fee</div>
                <div>{currency} {delivery_fee}</div>
            </div> 

            <div className='flex flex-row justify-between'>
                <b>Total</b>
                <b>{currency} {getCartAmount()===0 ? 0 : getCartAmount() + delivery_fee}.00</b>
            </div>

            
        </div>

        
    </div>
  )
}

export default CartTotal