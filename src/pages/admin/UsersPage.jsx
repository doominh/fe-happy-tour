import React, { useCallback, useEffect, useState } from 'react'
import { apiDeleteUser, apiGetUser, apiUpdateUser } from '../../apis/user'
import {  roles, blockstatus} from '../../ultils/constant'
import moment from 'moment'
import InputField from '../../components/InputField'
import Pagination from '../../components/Pagination/Pagination'
import useDebounce from '../../hooks/useDebounce'
import { useForm } from 'react-hook-form'
import Select  from '../../components/Select'
// import Slect  from '../../components/Slect'
import Buttons from './Buttons'
import {useSearchParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'
import clsx from 'clsx'
const UsersPage = () => {
  const {handleSubmit, register, formState: {errors}, reset} = useForm({
    role:'',
    isBlocked:''
  })
  
  const [users, setUsers] = useState(null)
  const [queries, setQueries] = useState({
    q: ""
  })
  const [update, setUpdate] = useState(false)
  const [editElm, setEditElm] = useState(null)
  const [params] = useSearchParams()

  const fetchUsers = async (params) =>{
    const response = await apiGetUser({...params, limit: import.meta.env.VITE_REACT_APP_PRODUCT_LIMIT})
    
    if (response.success) setUsers(response)
  }

  const render = useCallback(() => {
    setUpdate(!update)
  },[update])
  // cứ sau 0.8s sẽ gọi api
  const queriesDebounce = useDebounce(queries.q, 800)
  useEffect(() =>{
    const queries = Object.fromEntries([...params])
    if (queriesDebounce) queries.q = queriesDebounce
    fetchUsers(queries)
  },[queriesDebounce, params])
  const handleUpdate = async (data) =>{
    const response = await apiUpdateUser(data, editElm._id)
    // console.log(response)
    if (response.success){
      setEditElm(null)
      render()
      toast.success(response.mes)
      window.location.reload();
    } else toast.error(response.mes)
    // console.log(data)
  }
  
  const handleDeleteUser = async (uid) => {
    Swal.fire({
      title: 'Xóa người dùng',
      text: 'Bạn có chắc chắn muốn xóa người dùng này?',
      showCancelButton: true
    }).then(async(result) => {
      if (result.isConfirmed) {
        apiDeleteUser(uid).then((response) => {
          if (response.success) {
            setUsers(prevUsers => prevUsers.filter(user => user._id !== uid));
            toast.success(response.mes);
            window.location.reload();
          } else {
            toast.error(response.mes);
          }
        });
      }
    });
  };
  
  useEffect(() => {
    if (editElm) {
      reset({
        role: editElm.role,
        status: editElm.isBlocked
      });
    }
  }, [editElm]);
  return (
    <>
    <div className={clsx('flex justify-between m-5', editElm)}>
        <h1 className="text-2xl font-bold">User list</h1>
        
        <div className="flex">
          
              <InputField
              nameKey={'q'}
              value={queries.q}
              setValue={setQueries}
              placeholder='Search name or mail user...'
              isHideLabel
              />
           
        </div>
      </div>
    <div>
      <div className="overflow-x-auto bg-white mx-2">
        <div className = 'flex jusify-end py-4'>
         
          {/* <button className="btn btn-primary">Add new user</button> */}
        </div>
        <form onSubmit={handleSubmit(handleUpdate)} >
          {/* {editElm && <button type='submit' className="btn btn-primary">Add new user</button>} */}
          {editElm && <Buttons type='submit'>Update</Buttons>}
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Email address</th>
                <th>Fullname</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.users?.map((el, idx) =>(
                
                  <tr key = {el._id}>
                    <td>{idx+1}</td>
                    <td>{el.email}</td>
                    <td>{`${el.lastname} ${el.firstname}`}</td>
                    <td>
                      {editElm?._id === el._id 
                      ? <Select
                      register={register}
                      fullWith
                      errors = {errors}
                      defaultValue = {editElm?.role}
                      id= {'role'}
                      validate={{ required: true}}
                      options = {roles}
                       /> : <span>{el.role}</span>}
                    </td>
                    <td>{el.mobile}</td>
                    <td>
                      {editElm?._id === el._id 
                      ? <Select 
                      register={register}
                      fullWith
                      errors = {errors}
                      defaultValue = {el.isBlocked}
                      id= {'isBlocked'}
                      validate={{ required: 'Require fill.'}}
                      options={blockstatus}
                      /> : <span>{el.isBlocked ? 'Blocked' : 'Active'}</span>}
                    </td>
                    <td>{moment(el.createdAt).format('DD/MM/YYYY')}</td>
                    <td> 
                      {editElm?._id === el._id ? <span onClick={() => setEditElm(null)} className='px-2 text-orange-600 hover:underline cursor-pointer'>Back</span>
                      : <span onClick={() => setEditElm(el)} className='px-2 text-orange-600 hover:underline cursor-pointer'>Edit</span>}
                      
                      <span onClick={() => handleDeleteUser(el._id)} className='px-2 text-orange-600 hover:underline cursor-pointer'>Delete</span>
                    </td>
                  </tr>
                
                
              ))}
              

            </tbody>
          </table>
          <div className='w-full flex justify-end'>
            <Pagination
            totalCount={users?.counts}
            />
          </div>
        </form>
        
      </div>
    </div>
  </>
  )
}

export default UsersPage
