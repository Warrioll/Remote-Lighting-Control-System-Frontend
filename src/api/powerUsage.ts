import axios from "axios";


const BACKEND_URL = import.meta.env.VITE_BACKEND_URL as string

export const getPowerUsageData = async  (from: Date, to: Date): Promise<{value: number, time: string}[]>=>{

    const fromISO = from.toISOString(); 
  const toISO = to.toISOString();
    const response = await axios.get(`${BACKEND_URL}/powerUsage/${fromISO}/${toISO}`, {
        withCredentials: true,
       params: {
      from: fromISO,
      to: toISO,
      _t: new Date().getTime() // <-- Omijamy cache unikalnym timestampem, BEZ nagłówków Cache-Control
    }
    }, )
    return response.data
}