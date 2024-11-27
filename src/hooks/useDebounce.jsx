import React, { useEffect, useState } from "react";

const useDebounce = (value, ms) => {
    const [decounceValue, setDecounceValue] = useState('')
    useEffect(() => {
        const setTimeOutId = setTimeout(() => {
            setDecounceValue(value)
        }, ms)

        return () => {
            clearTimeout(setTimeOutId)
        }
    }, [value, ms])

    return decounceValue
}

export default useDebounce;

// Mong muốn : Khi thay đổi giá sẽ gọi api
// Vấn đè : onChange của input sẽ thay đổi liên tục > gọi api liên tục theo mỗi lượt nhập
// Giải quyết : chỉ call api khi người dùng nhập xong > dựa trên thời gian onchange
// Tách value truyền vào (price) thành 2 biến: 
// 1. biến để phục vụ UI, gõ tới đâu lưu tới đó => UI render
// 2. biến thứ 2 dùng để quyết định call api => settimeout => biến sẽ gán sau 1 khoảng thời gian
