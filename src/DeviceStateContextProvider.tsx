import { createContext, useContext, useState, useEffect } from 'react';
import { ReactNode } from 'react';
import { io,Socket  } from 'socket.io-client';
import type { DefaultEventsMap } from '@socket.io/component-emitter';

type DeviceStateProviderProps ={
  children: ReactNode;
}

const BACKENDURL = import.meta.env.VITE_BACKEND_URL as string


const DeviceStateContext = createContext<any>(null);


export function DeviceStateProvider({ children }:DeviceStateProviderProps ) {
  const [switches, setSwitches] = useState<boolean[]>([false, false]);
  const [isConnected, setIsConnected]= useState<boolean>(false)
 

    const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

    useEffect(() => {
        const socket = io(BACKENDURL, {
        withCredentials: true
        });

        socket.on('connect', () => {
        //console.log('Connected:', socket.id);
    });

    socket.on('connect_error', (err) => {
        console.error('Connection error:', err.message);
    });

    socket.on('init', (deviceStatus)=>{
      console.log('init!', )
      setSwitches(deviceStatus.switchesStatus)
      setIsConnected(deviceStatus.isConnected)
    })

    socket.on('switch-toggle', ({switchId, switchState})=>{
        
        
        setSwitches((prev)=>{
          const newSwitches = [...prev]
          newSwitches[switchId-1]=switchState
          return  newSwitches
        })
    })

    socket.on('device-connection', ({isConnected})=>{
      setIsConnected(isConnected)
      if(!isConnected){
        setSwitches([false, false])
      }
    })

        setSocket(socket);
        return () => {socket.disconnect()};
    }, []);



    useEffect(()=>{
        if (!socket) return;

        socket.emit('join-room', 'esp32');

        return () => {
        socket.emit('leave-room', 'esp32');
        };
    },[socket])


     const value = { switches, setSwitches, isConnected, setIsConnected, socket };


  return (
    <DeviceStateContext.Provider value={value}>
      {children}
    </DeviceStateContext.Provider>
  );
}


export function useDeviceState() {
  const context = useContext(DeviceStateContext);
  return context;
}