import React, { memo } from 'react'

const InputSelect = ({value, changeValue, options}) => {
  return (
    <select className="select select-bordered w-full max-w-xs text-sm text-gray-600 border-gray-800" value={value} onChange={e => changeValue(e.target.value)}>
        <option value=''>Random</option>
        {options?.map(el => (
            <option key={el.id} value={el.value}>{el.text}</option>
        ))}
    </select>
  )
}

export default memo(InputSelect)
