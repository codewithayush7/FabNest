import React, { useContext,useEffect } from 'react'
import Title from '../components/Title'
import { useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const [CurrentState, setCurrentState] = useState('Sign Up')
  const {backendUrl, navigate, token, setToken} = useContext(ShopContext);

  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try {
      if(CurrentState === 'Sign Up'){
        const response = await axios.post(backendUrl + '/api/user/register',{name,email,password});
        // console.log(response.data);
        if(response.data.success){
          
          localStorage.setItem('token', response.data.token);
          setToken(localStorage.getItem('token'));
        }else{
          toast.error(response.data.message);
        }
        
      }
      else{
        const response = await axios.post(backendUrl + '/api/user/login',{email,password});
        // console.log(response.data);
        if(response.data.success){
          
          localStorage.setItem('token', response.data.token);
          setToken(localStorage.getItem('token'));
        }else{
          toast.error(response.data.message);
        }
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
      
    }
  }

  useEffect(() => {
    if(token){
      navigate('/');
    }

  }, [token])
  
  
  return (
    <form onSubmit={onSubmitHandler} className='flex justify-center items-center '>
      <div className='flex flex-col gap-2 w-full sm:w-0 sm:min-w-120 items-center mt-18'>
        <div className='flex gap-2 items-center'>
          <p className='prata-regular text-4xl'>{CurrentState}</p>
          <p className='bg-gray-700 h-[2px] w-8 sm:w-12'></p>
        </div>

        <div className='flex flex-col gap-4 w-full mt-5'>
          {CurrentState === 'Login' ? '' 
          : <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='border border-black py-2 px-4' placeholder='Name'/>}
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text" className='border border-black py-2 px-4' placeholder='Email'/>
          <input onChange={(e)=>setPassword(e.target.value)} value={password} type="text" className='border border-black py-2 px-4' placeholder='Password'/>
        </div>

        <div className='flex justify-between w-full'>
          <p className='cursor-pointer'>Forgot your password?</p>
          { CurrentState === 'Login'
          ? <p onClick={()=>setCurrentState('Sign up')} className='cursor-pointer'>Create Account</p>
          : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here </p>
          }
        </div>

        <div>
          {CurrentState === 'Login'
          ? <button className='bg-black px-8 py-3 text-white cursor-pointer mt-5'>Sign in</button>
          : <button className='bg-black px-8 py-3 text-white cursor-pointer mt-5'>Sign up</button>
          }
        </div>
        
      </div>
    </form>
  )
}

export default Login