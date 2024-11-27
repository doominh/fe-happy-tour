
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import InputForm from '../../components/InputForm'
import Select from '../../components/Select'
import { useSelector } from 'react-redux'
import Buttons from './Buttons'
import MarkdownEditor from '../../components/MarkdownEditor'
import { validate, getBase64 } from '../../ultils/helpers'
import { apiCreateTour} from '../../apis/tour'
// import { Link } from 'react-router-dom'
const CreateTour = () => {
    

  const { categories } = useSelector(state => state.app);
  const {register, formState: {errors}, retset, handleSubmit, watch} = useForm()

  const [payload, setPayload] = useState({
    description:''
  })
  const [preview, setPreview] = useState({
    thumb: null,
    images: []
  })
  const [invalidFields, setInvalidFields] = useState([])
  const changeValue = useCallback((e) => {
    setPayload(e)
  },[payload])

  // const toBase64 = async file => await getBase64(file)
  const handlePreview = async (file) =>{
    const base64Thumb = await getBase64(file)
    setPreview(prev => ({...prev, thumb: base64Thumb}))
  }
  useEffect(() =>{
    // if(watch('thumb').length>0) setPreview(prev => ({...prev, thumb: toBase64(watch('thumb'[0]))}))
    // console.log(watch('thumb'))
    handlePreview(watch('thumb')[0])
  },[watch('thumb')])
  const handleCreateTour = async (data) =>{
    const invalids = validate(payload, setInvalidFields)
    if (invalids === 0){
      if (data.category) data.category = categories?.find(el => el._id === data.category)?.name
      const finalPayload = { ...data, ...payload}
      console.log(finalPayload)
      const formData = new FormData()
      for (let i of Object.entries(finalPayload))
        formData.append(i[0], i[1])
      if (finalPay.thumb) formData.append('thumb',finalPayloadthum[0])
      //  const response = await apiCreateTour(finalPayload)
    }
  }

  console.log(invalidFields)
  return (
    <>
    <div className="m-4">
        <h1 className="text-2xl font-bold">Create New Tour</h1>
        <form onSubmit={handleSubmit(handleCreateTour)} >
                
                
                <InputForm
                  label= "Name tour"
                  register={register}
                  errors={errors}
                  id='name'
                  validate={{
                    required: 'Need fill this field'
                  }}
                  style='border border-gray-300 rounded-lg px-4 py-2 w-full'
                  placeholder='Name of new tour'
                />
                
                <div className="w-full my-6 flex gap-4">
                <InputForm
                  label= "Price"
                  register={register}
                  errors={errors}
                  id='price'
                  validate={{
                    required: 'Need fill this field'
                  }}
                  style='border border-gray-300 rounded-lg px-4 py-2 w-full flex-auto'
                  placeholder='Price of new tour'
                  type='number'
                />
                
                </div>
                {/* <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-success text-white"
                  >
                    Save
                  </button>
                </div> */}
                <div >
                  <Select
                  label = 'Category'
                  options= {categories?.map(el => ({code: el._id, value: el.name}))}
                  register={register}
                  id='category'
                  validate={{required: 'Need fill this field'}}
                  style='border border-gray-300 rounded-lg px-4 py-2 w-full flex-auto'
                  errors={errors}
                  />

                </div>
                <MarkdownEditor
                name='description'
                changeValue={changeValue}
                label='Description'
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
                />
                <div className='flex flex-col gap-2 mt-7'>
                  <label className='font-semibold' htmlFor="thumb">Upload Image</label>
                  <input 
                  type="file" 
                  id="thumb"
                  {...register('thumb', {required: 'Need fill'})}
                  
                  />
                  {errors['thumb'] && <small className="text-xs text-red-500">{errors['thumb']?.message}</small>}

                </div>
                {preview.thumb && <div className='my-4'>
                  <img src={preview.thumb} alt="thumbnail" className='w-[200px] object-contain' />

                </div>}
                
                  <div className='mt-6'>
                  <Buttons type='submit'>Create New Tour</Buttons>

                  </div>
                
              </form>
        
    </div>
    
  </>
  )
}

export default CreateTour
