import React, { memo } from 'react'

const Button = ({name, handleOnClick, style, iconsBefore, iconsAfter, fw}) => {
  return (
    <div>
        <button 
            type='button'
            className={style ? style: `px-4 py-2.5 rounded-md text-white bg-[#55c255] hover:bg-[#87d587] transition ease-in text-semibold my-2 ${fw ? 'w-full' : 'w-fit'}`}
            onClick={() => {handleOnClick && handleOnClick()}}
        >
            {iconsBefore}
            <span>{name}</span>
            {iconsAfter}
        </button>
    </div>
  )
}

export default memo(Button)
