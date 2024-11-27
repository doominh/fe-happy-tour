import clsx from 'clsx'
import { useSearchParams, useNavigate, createSearchParams, useLocation } from 'react-router-dom'

const PagiItem = ({ children }) => {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const location = useLocation()

    const handlePagination = () => {
        const queries = Object.fromEntries([...params])
        if (Number(children)) queries.page = children
        navigate({
            pathname: location.pathname,
            search: createSearchParams(queries).toString()
        })
    }
    return (
        <button
            className={clsx('w-10 h-10 flex justify-center rounded-full',
                !Number(children) && 'items-end pb-2',
                Number(children) && 'items-center hover:rounded-full transition ease-in hover:bg-[#5dbc5d] hover:text-white cursor-pointer',
                +params.get('page') === +children && 'rounded-full bg-[#5dbc5d] text-white',
                !+params.get('page') && +children === 1 &&'rounded-full bg-[#5dbc5d] text-white')}
            onClick={handlePagination}
            type='button'
            disabled={!Number(children)}
        >
            {children}
        </button>
    )
}

export default PagiItem
