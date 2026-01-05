import React, { useContext,useState,useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'
import { toast } from 'react-toastify'

const Orders = () => {

  const {token, backendUrl ,currency} = useContext(ShopContext);

  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async ()=>{
    try {
      
      if(!token){
        return null;
      }

      const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{"Authorization":`Bearer ${token}`}})
      if(response.data.success){
        let allOrdersItem = [];

        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item);
          })
        })
        setOrderData(allOrdersItem.reverse());
        
      }
      
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
  }


  useEffect(() => {
    loadOrderData()
  }, [token])
  

  return (
    <div className='flex flex-col gap-5 pt-5'>
      <div>
        <Title text1={"MY"} text2={"ORDERS"}/>
      </div>

      <div>
        {orderData.map((item,index)=>(
          <div key={index} className='border-t border-b border-gray-300 py-3 flex sm:justify-between flex-col gap-7 sm:flex-row sm:items-center'>
            <div className='flex gap-5 mt-2'>
              <div>
                <img src={item.image[0]} className='w-25'/>
              </div>

              <div className='flex flex-col gap-3 justify-center'>
                <div><p>{item.name}</p></div>
                <div className='flex gap-3'>
                  <p>{currency}{item.price}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <div className='text-gray-400'><span className='text-black'>Date:</span> {new Date(item.date).toDateString()}</div>
                <div className='text-gray-400'><span className='text-black'>Payment:</span> {item.paymentMethod}</div>
              </div>
            </div>
            
            <div className='flex gap-2 sm:items-center justify-center'>
              <p className='rounded-full bg-green-400 w-2 h-2'></p>
              <p>{item.status}</p>
            </div>

            <div className='flex sm:items-center justify-center'>
              <button onClick={loadOrderData} className='border border-gray-300 py-2 px-3 cursor-pointer'>Track Order</button>
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Orders