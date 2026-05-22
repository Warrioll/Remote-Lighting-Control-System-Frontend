import axios from "axios";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string

export const getDeviceStatus = async  (): Promise<{isConnected: boolean,sitch1status: boolean, switch2status:boolean}>=>{

    const response = await axios.get(`${BACKEND_URL}/deviceStatus`, {
        withCredentials: true,
    }, )
    return response.data
}