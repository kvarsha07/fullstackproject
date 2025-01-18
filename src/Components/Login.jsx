import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router';

const Login =()=>{
    
    const[data,setData]=useState({
        email:'',
        password:''
    })

    const navigate =useNavigate()

    useEffect(()=>{
        const auth =localStorage.getItem('user')
        if(auth)
        {
            navigate("/")
        }
    },[])

    const collectData=(e)=>{
     const {name,value}=e.target;
     setData((preData)=>({
        ...preData,
        [name]:value

     }))
    }

    const handleData=async(e)=>{
        e.preventDefault();
        try{
            const response= await axios.post("http://localhost:3000/login",data)
            console.log(response.data,"data")
            alert("User loging successfully!")
            localStorage.setItem("user",JSON.stringify(response.data))
            navigate("/")
        }catch(err){
            console.log(err,"err")
            alert("Something went wrong. Please try again!");
        }
    }



    return(
        <div className='login'>
            <input 
            type='text'
            placeholder='Enter Email'
            className='input-box'
            value={data.email}
            name='email'
            onChange={collectData}
            />
            <input
            type='password'
            placeholder='Enter Password'
            className='input-box'
            value={data.password}
            name='password'
            onChange={collectData}/>
            <button
            className='btn'
            onClick={handleData}
            type='submit'
            >
                Login
                </button>

        </div>
    )
}
export default Login