import React, { memo, useEffect, useRef, useState } from 'react'
import logo from '../assets/Logo.png'
import { voteOptions } from '../ultils/constant'
import { AiFillStar } from 'react-icons/ai'
import Button from '../components/Button'

const VoteOption = ({ nameProduct, handleSubmitVoteOption }) => {
    const modalRef = useRef()
    const [chosenScore, setChosenScore] = useState(null)
    const [comment, setComment] = useState('')
    const [score, setScore] = useState(null)
    useEffect(() => {
        modalRef.current.scrollIntoView({ block: 'center', behavior: 'smooth' })
    }, [])
    return (
        <div onClick={e => e.stopPropagation()} ref={modalRef} className='bg-white w-[700px] p-4 flex flex-col gap-4 items-center justify-center rounded-xl'>
            <img src={logo} alt="logo" className='w-[300px] object-contain' />
            <h5 className='text-center'>{`Đánh giá ${nameProduct}`}</h5>
            <textarea
                className="textarea textarea-success w-full placeholder:italic placeholder:text-xs placeholder:text-gray-500 text-sm"
                placeholder="Hãy nhập gì đó ..."
                value={comment}
                onChange={e => setComment(e.target.value)}
            ></textarea>
            <div className='w-full flex flex-col items-center'>
                <p>Bạn cảm thấy thế nào ?</p>
                <div className='flex items-center gap-4'>
                    {voteOptions.map(el => (
                        <div
                            key={el.id}
                            className='w-[100px] h-[100px] bg-gray-200 hover:bg-gray-300 cursor-pointer transition ease-in rounded-md p-4 flex items-center justify-center flex-col'
                            onClick={() => {
                                setChosenScore(el.id);
                                setScore(el.id)
                            }}
                        >
                            {(Number(chosenScore) && chosenScore >= el.id) ? <AiFillStar color='orange' /> : <AiFillStar color='gray' />}

                            <span>{el.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-full'>
                <Button handleOnClick={() => handleSubmitVoteOption({ comment, score })} name='Gửi' fw />
            </div>
        </div>
    )
}

export default memo(VoteOption)
