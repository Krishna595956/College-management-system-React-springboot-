import axios from "axios"

export const backend_url='http://localhost:8080'
const api= axios.create({
    baseURL:backend_url,
    // headers:{
    //     'Content-Type':'application/json',
    //     'Accept':'application/json',
    // }
})
export default api