import axios from "axios";

const instance = axios.create({
    withCredentials: false,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {'API-KEY': '67e9bc59-d756-4699-841e-f4005ff4fe7c'},
})

export const getUsers = (currentPage, pageSize) => {
    return (
        instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    )
}