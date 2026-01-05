import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'



const Login = ({setToken}) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHandler= async (e) =>{
        try {
            e.preventDefault();
            const response = await axios.post(backendUrl + '/api/user/admin', {email,password})
            if(response.data.success){
                setToken(response.data.token)
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
    <div className='min-h-screen flex justify-center items-center w-full'>
        <div className='bg-white shadow-md rounded-lg min-w-[25%] p-10'>
            <h1 className='font-bold text-3xl mb-5'>Admin Panel</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <p className='mb-1 font-bold'>Email Address</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='enter your email' className='border-gray-400 border-1 rounded-md p-2 w-full'/>
                </div>

                <div className='mt-4 '>
                    <p className='mb-1 font-bold'>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='enter your password' className='border-gray-400 border-1 rounded-md p-2 w-full'/>
                </div>

                <button type="submit" className='mt-5 font-bold w-full bg-black text-white rounded-md py-3 cursor-pointer text-xl'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login