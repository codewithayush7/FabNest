import React, { useContext,useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrders = () => {

  const [Method, setMethod] = useState('cod');
  const {navigate, backendUrl, token, CartItem, setCartItem, getCartAmount, delivery_fee, products} = useContext(ShopContext)

  const [formData, setFormData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:'',
    city:'',
    state:'',
    zipcode:'',
    country:'',
    phone:''
  })

  const onChangeHandler = (e)=>{
    const name= e.target.name
    const value= e.target.value

    setFormData(data => ({...data, [name]:value}))
  }

  const onSubmitHandler = async(e) =>{
    e.preventDefault();
    try {

      let orderItems = []

      for(const items in CartItem){
        for(const size in CartItem[items]){
          if(CartItem[items][size] > 0){
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if(itemInfo){
              itemInfo.size = size
              itemInfo.quantity = CartItem[items][size]
              orderItems.push(itemInfo) 
            }
          }
        }
      }

      console.log(orderItems);

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

      switch (Method) {

        //api calls for cod
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{"Authorization":`Bearer ${token}`}})
          if(response.data.success){
            setCartItem({});
            navigate('/orders')
          }
          else{
            toast.error(response.data.message);
          }
          break;

        case 'stripe':
          const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData,{headers:{"Authorization":`Bearer ${token}`}})
          if(responseStripe.data.success){
             const {session_url} = responseStripe.data
             window.location.replace(session_url)
          } else {
            toast.error(responseStripe.data.message)
          }
      
        default:
          break;
      }
      
      
    } catch (error) {
        console.log(error);
        toast.error(error.message);
                      
    }
  }
   
  return (
    <form onSubmit={onSubmitHandler} className='mt-5 flex flex-col sm:flex-row sm:justify-between'>
      {/* left side */}
      <div className='flex flex-col sm:w-1/2 gap-7'>
        <Title text1={"DELIVERY"} text2={"INFORMATION"}/>
        <div className='flex flex-col gap-3 sm:max-w-119.5'>
          <div className='flex flex-row gap-5 '>
            <input required onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" placeholder='First name' className='border border-gray-400 p-2 rounded-sm w-1/2'/>
            <input required onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" placeholder='Last name' className='border border-gray-400 p-2 rounded-sm w-1/2'/>
          </div>
          <div >
            <input required onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder='Email address' className='border border-gray-400 p-2 rounded-sm w-full'/>
          </div>
          <div>
            <input required onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder='Street' className='border border-gray-400 p-2 rounded-sm w-full'/>
          </div>
          <div className='flex flex-row gap-5'>
            <input required onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder='City' className='border border-gray-400 p-2 rounded-sm w-1/2'/>
            <input required onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder='State' className='border border-gray-400 p-2 rounded-sm w-1/2'/>
          </div>
          <div className='flex flex-row gap-5'>
            <input required onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder='Zip-code' className='border border-gray-400 p-2 rounded-sm w-1/2'/>
            <input required onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder='Country' className='border border-gray-400 p-2 rounded-sm w-1/2'/>
          </div>
          <div>
            <input required onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder='Phone' className='border border-gray-400 p-2 rounded-sm w-full'/>
          </div>
        </div>
      </div>

      {/* right side */}
      <div className='flex flex-col gap-10 sm:justify-center mt-10 sm:mt-0'>
        <CartTotal/>

        <div className='flex flex-col gap-5'>
          <Title text1={"PAYMENT"} text2={"METHOD"}/>
          <div className='flex flex-col sm:flex-row sm:justify-start gap-2'>
            <div onClick={()=>setMethod('stripe')} className='flex gap-5 border border-gray-300 px-5 py-2 cursor-pointer items-center'>
              <p className={`w-5 h-5 border border-gray-200 rounded-full ${Method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.stripe_logo} alt="" className='w-14'/>
            </div>
            {/* <div onClick={()=>setMethod('razorpay')} className='flex gap-5 border border-gray-300 px-5 py-2 cursor-pointer items-center'>
              <p className={`w-5 h-5 border border-gray-200 rounded-full ${Method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img src={assets.razorpay_logo} alt="" className='h-6'/>
            </div> */}
            <div onClick={()=>setMethod('cod')} className='flex gap-5 border border-gray-300 px-5 py-2 cursor-pointer items-center'>
              <p className={`w-5 h-5 border border-gray-200 rounded-full ${Method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className=' text-lg'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='flex justify-end' >
            <button type='submit' className='bg-black text-white px-15 py-3 cursor-pointer'>PLACE ORDER</button>
          </div>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrders