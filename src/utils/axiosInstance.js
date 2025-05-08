import axios from "axios"


export const axiosInstance = axios.create({
 baseURL :'https://localhost:7023/api/User',
});