import React, { memo, useEffect, useState } from 'react'
import { AiOutlineDown } from 'react-icons/ai'
import { tourType } from '../ultils/constant'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { apiGetTours } from '../apis'
import useDebounce from '../hooks/useDebounce'

const SearchItem = ({ name, activeClick, changeActiveFilter, type = 'checkbox' }) => {
    const navigate = useNavigate()
    const { category } = useParams()
    const [selected, setSelected] = useState([])
    const [params] = useSearchParams()
    const [price, setPrice] = useState({
        from: '',
        to: ''
    })
    const [highestPrice, setHighestPrice] = useState(null)
    const handleSelect = (e) => {
        const alreadyEl = selected.find(el => el === e.target.value)
        if (alreadyEl) setSelected(prev => prev.filter(el => el !== e.target.value))
        else setSelected(prev => [...prev, e.target.value])
        changeActiveFilter(null)
    }
    const fetchHighestPriceTour = async () => {
        const response = await apiGetTours({ sort: '-price', limit: 1 })
        if (response?.success) setHighestPrice(response.toursData[0]?.price)
    }

    useEffect(() => {
        let param = []
        for (let i of params.entries()) param.push(i)
        const queries = {}
        for (let i of param) queries[i[0]] = i[1]
        if (selected.length > 0) {
            queries.tourType = selected.join(',')
            queries.page = 1
        } else delete queries.tourType
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString()
        })
    }, [selected])

    useEffect(() => {
        if (type === 'input') fetchHighestPriceTour()
    }, [type])

    const deboucePriceFrom = useDebounce(price.from, 500)
    const deboucePriceTo = useDebounce(price.to, 500)
    useEffect(() => {
        if (Number(price.from) > 0 && Number(price.to) > 0 && Number(price.to) < Number(price.from)) {
            alert('Giá khởi điểm không được cao hơn giá kết thúc')
            return;
        }
        let param = []
        for (let i of params.entries()) param.push(i)
        const queries = {}
        for (let i of param) queries[i[0]] = i[1]
        if (Number(price.from) > 0) queries.from = price.from
        else delete queries.from
        if (Number(price.to) > 0) queries.to = price.to
        else delete queries.to
        queries.page = 1
        navigate({
            pathname: `/${category}`,
            search: createSearchParams(queries).toString()
        })
    }, [deboucePriceFrom, deboucePriceTo])

    return (
        <div
            className='p-3 cursor-pointer text-gray-600 bg-white text-sm gap-6 relative border rounded-md border-gray-800 flex justify-between items-center'
            onClick={() => changeActiveFilter(name)}
        >
            <span className='capitalize'>{name}</span>
            <AiOutlineDown />
            {activeClick === name && <div className='absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-3 border bg-white min-w-[150px] rounded-md'>
                {type === 'checkbox' && <div className=''>
                    <div className='p-4 items-center flex justify-between gap-8 border-b'>
                        <span className='whitespace-nowrap'>{`${selected.length} selected`}</span>
                        <span
                            onClick={e => {
                                e.stopPropagation()
                                setSelected([])
                                changeActiveFilter(null)
                            }}
                            className='underline cursor-pointer hover:text-[#5dbc5d]'>Reset</span>
                    </div>
                    <div onClick={e => e.stopPropagation()} className='flex flex-col gap-3 mt-4'>
                        {tourType.map((el, index) => (
                            <div key={index} className='flex items-center gap-4'>
                                <input
                                    className='w-4 h-4 rounded'
                                    type="checkbox"
                                    value={el}
                                    onChange={handleSelect}
                                    id={el}
                                    checked={selected.some(selectedItem => selectedItem === el)}
                                />
                                <label className='capitalize text-gray-700' htmlFor={el}>{el}</label>
                            </div>
                        ))}
                    </div>
                </div>}
                {type === 'input' && <div className='w-96' onClick={e => e.stopPropagation()}>
                    <div className='p-4 items-center flex justify-between gap-8 border-b'>
                        <span className='whitespace-nowrap'>{`Giá cao nhất là ${Number(highestPrice).toLocaleString()} VND`}</span>
                        <span
                            onClick={e => {
                                e.stopPropagation()
                                setPrice({ from: '', to: '' })
                                changeActiveFilter(null)
                            }}
                            className='underline cursor-pointer hover:text-[#5dbc5d]'>Reset</span>
                    </div>
                    <div className='flex items-center p-2 gap-2'>
                        <div className='flex items-center gap-2'>
                            <label htmlFor="from">From</label>
                            <input
                                className='input input-bordered input-success w-full max-w-xs input-sm'
                                type="number"
                                id='from'
                                min={0}
                                value={price.from}
                                onChange={e => setPrice(prev => ({ ...prev, from: e.target.value }))}
                            />
                        </div>
                        <div className='flex items-center gap-2'>
                            <label htmlFor="to">To</label>
                            <input
                                className='input input-bordered input-success w-full max-w-xs input-sm'
                                type="number"
                                id='to'
                                min={0}
                                value={price.to}
                                onChange={e => setPrice(prev => ({ ...prev, to: e.target.value }))}
                            />
                        </div>
                    </div>
                </div>}
            </div>}

        </div>
    )
}

export default memo(SearchItem)
