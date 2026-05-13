import axios from "axios";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string

export const logIn =async  (username: string, pass: string)=>{

    const response = await axios.post(`${BACKEND_URL}/login`, {username, password: pass}, {
        withCredentials: true
    })

}

export const checkIfLoggedIn = async ()=>{
     const response = await axios.get(`${BACKEND_URL}/isLoggedIn`,  {
        withCredentials: true
    })
}