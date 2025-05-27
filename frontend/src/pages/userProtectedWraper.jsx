import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
export const userProtectedWraper = ({
    children 
}) => {
    const tokken = localStorage.getItem('token')
    const { user } = useContext(userDataContext)
    const navigate = useNavigate()
  if(!token){
        navigate('/userLogin')
    }
  return (
    <>
        {children}
    </>
  )
}
