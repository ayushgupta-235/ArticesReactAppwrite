import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import authService from '../appwrite/auth'
import { useSelector } from 'react-redux'

export default function Protected({children,authentication = true}) {
    const navigate = useNavigate()
    const [loading,setLoading] = useState(true)
    const authStatus = useSelector((state)=>state.auth.status)
    useEffect(()=>{
        if(authentication && authStatus!==authentication){
            navigate('/login')// Redirect to login if not authenticated
        }else if(!authentication && authStatus!==authentication){
            navigate('/')// Redirect to home if already authenticated
        }
        setLoading(false)
    },[authStatus,authentication,navigate])

  return loading ? <h1>Loading.....</h1> : <>{children}</>
}

