import React from 'react'
import usePagination from '../../hooks/usePagination'
import PagiItem from './PagiItem'
import { useSearchParams } from 'react-router-dom'

const Pagination = ({totalCount}) => {
  const [params] = useSearchParams()
  const pagination = usePagination(totalCount, +params.get('page') || 1)
  const range = () => {
    const currentPage = +params.get('page')
   const pageSize = +import.meta.env.VITE_REACT_APP_PRODUCT_LIMIT
   const start = ((currentPage - 1) * pageSize) + 1
   const end = Math.min(currentPage * pageSize, totalCount)

   return `${start} - ${end}`
  }
  return (
    <div className='flex w-full justify-between items-center'>
      {!+params.get('page') && <span className='text-sm italic'>{`Show tours 1 - ${Math.min(+import.meta.env.VITE_REACT_APP_PRODUCT_LIMIT,totalCount)} of ${totalCount}`}</span>}
      {+params.get('page') && <span className='text-sm italic'>{`Show tours ${range()} of ${totalCount}`}</span>}
      
      <div className='flex items-center'>
        {pagination?.map(el => (
          <PagiItem key={el}>
            {el}
          </PagiItem>
        ))}
      </div>
    </div>
  )
}

export default Pagination
