import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

const FinalRegister = () => {
    const {status} = useParams()
    const navigate = useNavigate( )
    useEffect(()=>{
        if(status === 'failed') Swal.fire('Oops!', 'Registration failed', 'error').then(() => {
            navigate('/dangnhap')
        })
        if(status === 'success') Swal.fire('Congratulations!', 'Registration success. Go login', 'success').then(() => {
            navigate('/dangnhap')
        })
    }, [])
  return (
    <div className='h-screen w-screen bg-gray-100'>

    </div>
  )
}

export default FinalRegister
