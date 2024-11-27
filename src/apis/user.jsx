import axios from "../axios";

export const apiRegister = (data) => axios({
    url: '/api/user/register',
    method: 'post',
    data,
})

export const apiFinalRegister = (token) => axios({
    url: '/api/user/finalregister/' + token,
    method: 'put',
})

export const apiLogin = (data) => axios({
    url: '/api/user/login',
    method: 'post',
    data
})

export const apiForgotPassword = (data) => axios({
    url: '/api/user/forgotpassword',
    method: 'post',
    data
})

export const apiResetPassword = (data) => axios({
    url: '/api/user/resetpassword',
    method: 'put',
    data
})

export const apiGetCurrent = () => axios({
    url: '/api/user/current',
    method: 'get',
})

export const apiUpdateCurrent = (data) => axios({
    url: '/api/user/current',
    method: 'put',
    data
})

// Admin
export const apiGetUser = (params) => axios({
    url: '/api/user',
    method: 'get',
    params
})
export const apiUpdateUser = (data, uid) => axios({
    url: '/api/user/' +uid,
    method: 'put',
    data
})
export const apiDeleteUser = (uid) => axios({
    url: '/api/user/' + uid,
    method: 'delete',
})
