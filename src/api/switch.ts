import axios from "axios";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string

export const putSwitchMode =async  (id: number, mode: 'OFF' | 'ON')=>{

    const response = await axios.put(`${BACKEND_URL}/switch/${id.toString()}`, {mode}, {
        withCredentials: true
    })

}