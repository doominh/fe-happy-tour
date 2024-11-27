import axios from "../axios";

export const apiGetCategories = () => axios({
    url: '/api/tour-category',
    method: 'get'
});

export const apiUpdateCategory = (id, data, token) => axios({
    url: `/api/tour-category/${id}`,
    method: 'put',
    data,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
});

export const apiDeleteCategory = (id, token) => axios({
    url: `/api/tour-category/${id}`,
    method: 'delete',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    },
});

export const apiAddCategory = (data, token) => {
    return axios({
        url: '/api/tour-category',
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        data: data
    });
};
