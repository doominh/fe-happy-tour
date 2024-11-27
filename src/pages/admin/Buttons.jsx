import React, { memo } from 'react'

const Buttons = ({ children, handleOnClick, style, fw, type='button'}) => {
  return (
    <div>
        <button 
            type={type}
            className={style ? style: `px-4 py-2 rounded-md text-white bg-[#55c255] hover:bg-[#87d587] transition ease-in text-semibold my-2  ${fw ? 'w-full' : 'w-fit'}`}
            onClick={() => {handleOnClick && handleOnClick()}}
        >
           {children}
        </button>
    </div>
  )
}

export default memo(Buttons)
