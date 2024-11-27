import React, { useState } from 'react'
import Button from '../../components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { apiResetPassword } from '../../apis'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const [password, setPassword] = useState('')
  const { token } = useParams()
  const navigate = useNavigate()
  const handleResetPassword = async () => {
    const response = await apiResetPassword({ password, token })
    if (response.success) {
      toast.success(response.mes)
      navigate('/dangnhap')
    } else toast.info(response.mes)
  }

  return (
    <div className='absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex flex-col items-center py-8 z-50'>
      <div className='flex flex-col gap-4'>
        <label htmlFor="password">Nhập mật khẩu mới:</label>
        <input
          type="text"
          id='password'
          className='w-[800px] pb-2 border-b outline-none placeholder:text-sm'
          placeholder='Type here'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div className='flex justify-end gap-4'>
          <Button
            name='Gửi'
            handleOnClick={handleResetPassword}
          />
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
